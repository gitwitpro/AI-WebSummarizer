const axios = require("axios");

const summarizeWebsite = async (url, style) => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:5001/summarize",
            {
                url,
                style,
            }
        );

        return response.data;

    } catch (err) {
        console.error("Flask Error:", err.message);

        throw new Error("Unable to connect to AI Service");
    }
};

module.exports = {
    summarizeWebsite,
};