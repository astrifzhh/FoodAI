import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
app.use(express.json());

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  app.post("/api/predict", async (req, res) => {
    try {
      const response = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`, // ✅ must be here
        },
        body: JSON.stringify({
          version:
            "a325a0cacfb0aa9226e6bad1abe5385f1073f4c7f8c36e52ed040e5409e6c034",
          input: req.body.input,
        }),
      });

      const data = await response.json();
      console.log("Prediction started:", data.id);

      res.json(data);
    } catch (err) {
      console.error("Error calling Replicate:", err);
    }
  });

  app.get("/api/predict/:id", async (req, res) => {
    try {
      const response = await fetch(
        `https://api.replicate.com/v1/predictions/${req.params.id}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          },
        }
      );

      const data = await response.json();

      let recommendation = null;

      if (
        data.status === "succeeded" &&
        data.output &&
        data.output.length > 0
      ) {
        try {
          const outputObj = JSON.parse(data.output[0]); // parse JSON string
          if (outputObj?.message?.content) {
            recommendation = JSON.parse(outputObj.message.content); // parse inner JSON
          }
        } catch (err) {
          console.error("Gagal parse recommendation:", err);
        }
      }
      res.json({
        ...data,
        recommendation, // bisa null kalau belum selesai
      });
    } catch (err) {
      console.error("Error polling Replicate:", err);
      res.status(500).json({ error: "Server error" });
    }
  });

  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );

  console.log("Using Replicate API key:", process.env.REPLICATE_API_TOKEN);
}
