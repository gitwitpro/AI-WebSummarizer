const axios = require("axios");

// IMPORTANT: Node and Flask are separate services on Render - they do NOT
// share a machine, so "127.0.0.1" here points at the Node service itself,
// not Flask. We must call Flask's public URL instead.
//
// Set FLASK_API_URL in your Render Node service's Environment settings to
// your deployed Flask service's public URL + /summarize, e.g.:
//   FLASK_API_URL=https://ai-websummarizer.onrender.com/summarize
const FLASK_URL =
    process.env.FLASK_API_URL || "https://ai-websummarizer.onrender.com/summarize";

const summarizeWebsite = async (url, style) => {
    try {
        const response = await axios.post(FLASK_URL, {
            url,
            style,
        });

        return response.data;

    } catch (err) {
        console.error("Flask Error:", err.response?.data || err.message);

        throw new Error(
            err.response?.data?.error || "Unable to connect to AI Service"
        );
    }
};

module.exports = {
    summarizeWebsite,
};