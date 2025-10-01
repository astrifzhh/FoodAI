import BookmarkIcon from "./icons/BookmarkIcon";

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

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave: (item: Recommendation) => void;
  isSaved: boolean;
}

const RecommendationCard = ({
  recommendation,
  onSave,
  isSaved,
}: RecommendationCardProps) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="bg-[#FFE274] p-6">
      <h2 className="text-3xl font-bold text-[#419166]">
        {recommendation.name}
      </h2>
    </div>
    <div className="p-6 space-y-4">
      <p className="text-gray-700 text-lg">{recommendation.description}</p>
      <div>
        <h3 className="font-bold text-[#419166] mb-2">
          Kenapa ini cocok untukmu:
        </h3>
        <p className="text-gray-600">{recommendation.reason}</p>
      </div>
      <div>
        <h3 className="font-bold text-[#419166] mb-2">Bahan Utama:</h3>
        <div className="flex flex-wrap gap-2">
          {recommendation.ingredients?.map((item, index) => (
            <span
              key={index}
              className="bg-green-100 text-[#419166] text-sm font-medium px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-4 mt-4 border-t">
        <h3 className="font-bold text-[#419166] mb-2">
          Restoran Terdekat (Simulasi):
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          {recommendation.places?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        {/* <p className="text-xs text-gray-400 mt-2">
          Fitur ini akan menggunakan lokasimu untuk mencari restoran sungguhan.
        </p> */}
      </div>
    </div>
    <div className="p-4 bg-gray-50">
      <button
        onClick={() => onSave(recommendation)}
        disabled={isSaved}
        className="w-full bg-[#419166] text-white font-bold py-3 px-4 rounded-xl hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        <BookmarkIcon saved={isSaved} />{" "}
        {isSaved ? "Sudah Disimpan" : "Simpan Rekomendasi"}
      </button>
    </div>
  </div>
);

export default RecommendationCard;
