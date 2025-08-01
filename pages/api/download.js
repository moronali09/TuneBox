import ytdl from 'ytdl-core';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const { id, format } = req.query;
    if (!id || !format) return res.status(400).send('Missing id or format');

    const info = await ytdl.getInfo(id);
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, "_");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${title}.${format}"`
    );
    res.setHeader("Content-Type", "application/octet-stream");

    const filter =
      format === "mp3"
        ? "audioonly"
        : format === "mp4"
        ? "videoandaudio"
        : null;

    if (!filter) return res.status(400).send("Invalid format");

    const stream = ytdl(id, {
      quality: "highestaudio",
      filter: filter === "audioonly" ? "audioonly" : "audioandvideo",
    });

    stream.pipe(res);
  } catch (err) {
    console.error("Error downloading:", err);
    res.status(500).send("Internal Server Error");
  }
}
