const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortID = nanoid(8);

    await URL.create({
      shortId: shortID,
      redirectURL: body.url,
      visitHistory: [],
    });

    return res.render("home", {
      id: shortID,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    // FIXED: Added null check
    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
