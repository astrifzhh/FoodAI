export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version:
          "a325a0cacfb0aa9226e6bad1abe5385f1073f4c7f8c36e52ed040e5409e6c034",
        input: req.body.input,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Error calling Replicate:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
