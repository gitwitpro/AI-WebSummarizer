import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from summarizer import summarize_website

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "AI Service is running"
    })


@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()

        url = data.get("url") if data else None
        style = data.get("style") if data else None

        if not url:
            return jsonify({
                "success": False,
                "error": "URL is required"
            }), 400

        summary = summarize_website(url, style)

        return jsonify({
            "success": True,
            "summary": summary
        })

    except Exception as e:
        print(f"[/summarize] error for url={locals().get('url')}: {e}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)