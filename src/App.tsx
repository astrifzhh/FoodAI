import React, { useState, useEffect } from "react";
import SparklesIcon from "./components/icons/SparklesIcon";
import LoadingSpinner from "./components/icons/LoadingSpinner";
import RecommendationCard from "./components/RecommendationCard";
import SavedItemCard from "./components/SavedItemCard";

const LoadingSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="bg-gray-300 h-24 w-full"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
      <div className="flex flex-wrap gap-2">
        <div className="bg-gray-300 h-6 w-20 rounded-full"></div>
        <div className="bg-gray-300 h-6 w-24 rounded-full"></div>
        <div className="bg-gray-300 h-6 w-16 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function App() {
  interface Recommendation {
    id: number;
    name: string;
    description?: string;
    reason?: string;
    ingredients?: string[];
    places?: string[];
    review?: {
      place: number;
      taste: number;
      price: number;
    };
  }

  interface Review {
    place: number;
    taste: number;
    price: number;
  }

  interface SavedItem extends Omit<Recommendation, "review"> {
    review: Review; // required for saved items
  }

  const [prompt, setPrompt] = useState("");
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [view, setView] = useState("home"); // 'home' or 'saved'
  const [notification, setNotification] = useState("");

  // Efek untuk memuat data dari localStorage saat komponen pertama kali render
  useEffect(() => {
    try {
      const data = localStorage.getItem("foodai_saved_items");
      if (data) {
        setSavedItems(JSON.parse(data));
      }
    } catch (e) {
      console.error("Failed to parse saved items from localStorage", e);
    }
  }, []);

  // Efek untuk menyimpan data ke localStorage setiap kali savedItems berubah
  useEffect(() => {
    try {
      localStorage.setItem("foodai_saved_items", JSON.stringify(savedItems));
    } catch (e) {
      console.error("Failed to save items to localStorage", e);
    }
  }, [savedItems]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const performSearch = async (currentPrompt: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // 1️⃣ Start prediction via API

      const systemPrompt = `Anda adalah seorang ahli gizi, chef dan vlogger makanan. Berikan satu rekomendasi makanan berdasarkan permintaan pengguna. Analisa terlebih dahulu dengan akurat tentang makanan yang diinginkan, juga cari tempat yang memang populer dimana makanan itu dijual. Format respons HARUS JSON: {"name": "Nama Makanan", "description": "Deskripsi singkat", "reason": "Alasan kenapa cocok", "ingredients": ["Bahan1", "Bahan2"], "places": ["Tempat1", "Tempat2", "Tempat3"]}`;

      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: {
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Permintaan: "${currentPrompt}"` },
            ],
            temperature: 0.1,
            max_tokens: 500,
          },
        }),
      });

      let prediction = await response.json();

      // 2️⃣ Poll until end (client-side, bukan server-side)
      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await new Promise((r) => setTimeout(r, 2000)); // tunggu 2 detik
        const statusRes = await fetch(`/api/predict/${prediction.id}`);
        prediction = await statusRes.json();
      }

      // 3️⃣ Handle result
      if (prediction.status === "failed") {
        throw new Error("Prediction failed");
      }

      const aiOutput = Array.isArray(prediction.output)
        ? prediction.output.join("")
        : prediction.output || "";

      const jsonMatch = aiOutput.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Tidak menemukan JSON di output");

      const rec = JSON.parse(jsonMatch[0]);

      setRecommendation({
        id: Date.now(),
        name: rec.name || "Rekomendasi Makanan",
        description: rec.description || "",
        reason: rec.reason || "",
        ingredients: rec.ingredients || [],
        places: rec.places || [],
      });
    } catch (err) {
      console.error("API Error:", err);
      setError("Gagal mengambil rekomendasi");
    } finally {
      setIsLoading(false);
    }
  };

  // const performSearch = async (currentPrompt: string) => {
  //   setIsLoading(true);
  //   setError(null);
  //   setRecommendation(null);

  //   const systemPrompt = `Anda adalah seorang ahli gizi, chef dan vlogger makanan. Berikan satu rekomendasi makanan berdasarkan permintaan pengguna. Analisa terlebih dahulu dengan akurat tentang makanan yang diinginkan, juga cari tempat yang memang populer dimana makanan itu dijual. Format respons HARUS JSON: {"name": "Nama Makanan", "description": "Deskripsi singkat", "reason": "Alasan kenapa cocok", "ingredients": ["Bahan1", "Bahan2"], "places": ["Tempat1", "Tempat2", "Tempat3"]}`;

  //   try {
  //     // Start prediction from replicate
  //     const response = await fetch("/api/predict", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         input: {
  //           messages: [
  //             { role: "system", content: systemPrompt },
  //             { role: "user", content: `Permintaan: "${currentPrompt}"` },
  //           ],
  //           temperature: 0.1,
  //           max_tokens: 500,
  //         },
  //       }),
  //     });

  //     let prediction = await response.json();

  //     // Poll until end
  //     while (
  //       prediction.status !== "succeeded" &&
  //       prediction.status !== "failed"
  //     ) {
  //       await new Promise((r) => setTimeout(r, 2000));
  //       const statusRes = await fetch(`/api/predict/${prediction.id}`);
  //       prediction = await statusRes.json();
  //     }

  //     // Parse output
  //     const aiOutput = Array.isArray(prediction.output)
  //       ? prediction.output.join("")
  //       : prediction.output || "";

  //     const jsonMatch = aiOutput.match(/\{[\s\S]*\}/);
  //     if (!jsonMatch) throw new Error("Tidak menemukan JSON di output");

  //     const parsedResult = JSON.parse(jsonMatch[0]);
  //     console.log("AI Output:");

  //     // Parse to object JS
  //     const rec = JSON.parse(parsedResult.choices[0].message.content);

  //     // Try debug *show places
  //     console.log("Tempat:", rec.places[0]);

  //     // Safe setRecommendation to "Favoritku"
  //     setRecommendation({
  //       id: Date.now(),
  //       name: rec.name || "Rekomendasi Makanan",
  //       description: rec.description || "",
  //       reason: rec.reason || "",
  //       ingredients: rec.ingredients || [],
  //       places: rec.places || [],
  //     });
  //   } catch (err) {
  //     console.error("API Error:", err);
  //     setError("Gagal mengambil rekomendasi");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    performSearch(prompt);
  };

  const handleExampleClick = (examplePrompt: string) => {
    setPrompt(examplePrompt);
    performSearch(examplePrompt);
  };

  const handleSaveRecommendation = (itemToSave: Recommendation) => {
    if (savedItems.some((item) => item.name === itemToSave.name)) {
      showNotification("Rekomendasi ini sudah ada di daftar simpananmu!");
      return;
    }
    setSavedItems((prevItems) => [
      ...prevItems,
      {
        ...itemToSave,
        review: itemToSave.review ?? { place: 0, taste: 0, price: 0 },
      },
    ]);
    showNotification("Rekomendasi berhasil disimpan!");
  };

  const handleDeleteSavedItem = (idToDelete: number) => {
    setSavedItems((prevItems) =>
      prevItems.filter((item) => item.id !== idToDelete)
    );
    showNotification("Item berhasil dihapus.");
  };

  const handleUpdateReview = (
    idToUpdate: number,
    newReview: NonNullable<Recommendation["review"]>
  ) => {
    setSavedItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idToUpdate ? { ...item, review: newReview } : item
      )
    );
    showNotification("Review berhasil diperbarui!");
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3] font-sans text-gray-800">
      {/* Notifikasi Toast */}
      {notification && (
        <div className="fixed top-5 right-5 bg-[#419166] text-white py-2 px-4 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#419166] flex items-center justify-center">
            <SparklesIcon /> FoodAI
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Dapatkan rekomendasi makanan personal dari AI
          </p>
        </header>

        {/* Navigasi View */}
        <nav className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setView("home")}
            className={`py-2 px-6 rounded-full font-semibold transition-colors ${
              view === "home"
                ? "bg-[#FE875F] text-white"
                : "bg-white text-[#FE875F]"
            }`}
          >
            Cari Baru
          </button>
          <button
            onClick={() => setView("saved")}
            className={`py-2 px-6 rounded-full font-semibold transition-colors relative ${
              view === "saved"
                ? "bg-[#FE875F] text-white"
                : "bg-white text-[#FE875F]"
            }`}
          >
            Favoritku
            {savedItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#419166] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {savedItems.length}
              </span>
            )}
          </button>
        </nav>

        {view === "home" && (
          <main className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="food-prompt"
                  className="block text-lg font-semibold mb-2 text-gray-700"
                >
                  Aku ingin makan sesuatu yang...
                </label>
                <textarea
                  id="food-prompt"
                  // rows="3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FE875F] focus:border-transparent transition"
                  placeholder="Contoh: sehat untuk diet, pedas dan berkuah, atau sarapan tinggi protein."
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full bg-[#FE875F] text-white font-bold py-4 px-6 rounded-xl hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner /> Sedang Mencari...
                    </>
                  ) : (
                    "Cari Rekomendasi Makanan!"
                  )}
                </button>
              </form>
            </div>

            <div className="mt-12">
              {isLoading && !recommendation && <LoadingSkeleton />}
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl"
                  role="alert"
                >
                  {error}
                </div>
              )}
              {recommendation && (
                <RecommendationCard
                  recommendation={recommendation}
                  onSave={handleSaveRecommendation}
                  isSaved={savedItems.some(
                    (item) => item.name === recommendation.name
                  )}
                />
              )}

              {!isLoading && !recommendation && !error && (
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-600 mb-4">
                    Belum tahu mau makan apa?
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Coba salah satu ide di bawah ini!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() =>
                        handleExampleClick("Makanan penutup yang rendah kalori")
                      }
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-[#419166] font-semibold"
                    >
                      Rendah Kalori
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick("Makan malam yang cepat dibuat")
                      }
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-[#419166] font-semibold"
                    >
                      Cepat & Praktis
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick(
                          "Makanan tradisional Indonesia yang pedas"
                        )
                      }
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-[#419166] font-semibold"
                    >
                      Tradisional Pedas
                    </button>
                    <button
                      onClick={() =>
                        handleExampleClick("Camilan sehat untuk anak-anak")
                      }
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-[#419166] font-semibold"
                    >
                      Camilan Sehat
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        )}

        {view === "saved" && (
          <main className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#419166]">
              Rekomendasi Tersimpan
            </h2>
            {savedItems.length > 0 ? (
              <div>
                {savedItems.map((item) => (
                  <SavedItemCard
                    key={item.id}
                    item={item}
                    onUpdateReview={handleUpdateReview}
                    onDelete={handleDeleteSavedItem}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white p-8 rounded-2xl shadow-md">
                <p className="text-gray-500">
                  Kamu belum menyimpan rekomendasi apapun. <br />
                  Cari dan simpan makanan favoritmu!
                </p>
              </div>
            )}
          </main>
        )}

        <footer className="text-center mt-16 text-gray-400">
          <p>Dibuat dengan ❤️ oleh AI</p>
        </footer>
      </div>
    </div>
  );
}
