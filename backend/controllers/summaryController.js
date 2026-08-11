const { summarizeWebsite } = require("../services/flaskService");

const summarize = async (req, res) => {

    try {

        const { url, style } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }

        const result = await summarizeWebsite(url, style);

        res.json(result);

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    summarize
};