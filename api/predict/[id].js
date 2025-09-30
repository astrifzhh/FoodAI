export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.replicate.com/v1/predictions/${id}`,
      {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    let recommendation = null;
    if (data.status === "succeeded" && data.output && data.output.length > 0) {
      try {
        const outputObj = JSON.parse(data.output[0]);
        if (outputObj?.message?.content) {
          recommendation = JSON.parse(outputObj.message.content);
        }
      } catch (err) {
        console.error("Gagal parse recommendation:", err);
      }
    }

    res.status(200).json({ ...data, recommendation });
  } catch (err) {
    console.error("Error polling Replicate:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
}
