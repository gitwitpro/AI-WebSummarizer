import { useState } from "react";
import axios from "axios";

function Hero() {
  const [showStyles, setShowStyles] = useState(false);

  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedStyle, setSelectedStyle] = useState("professional");

  const styles = [
    { label: "Funny 😂", value: "funny" },
    { label: "Sarcastic 😏", value: "sarcastic" },
    { label: "Sad 😢", value: "sad" },
    { label: "Angry 😡", value: "angry" },
    { label: "Professional 💼", value: "professional" },
    { label: "Motivational 🚀", value: "motivational" },
    { label: "Pirate 🏴‍☠️", value: "pirate" },
    { label: "Shakespeare 🎭", value: "shakespeare" },
  ];

  const generateSummary = async () => {

    if (!url) {
      alert("Please enter a website URL.");
      return;
    }

    try {
      setSummary("");
      setLoading(true);
      setSummary("");

      const response = await axios.post(
        "http://localhost:5000/api/summarize",
        {
          url,
          style: selectedStyle,
        }
      );

      setSummary(response.data.summary);

    } catch (error) {

      console.log(error);

      alert("Unable to generate summary.");

    } finally {

      setLoading(false);

    }

  };

  const clearAll = () => {
    setUrl("");
    setSummary("");
    setSelectedStyle("professional"); // Optional: reset style
};

  return (
    <section className="main-layout">

      <div className="sidebar">

        <button
          className="style-header"
          onClick={() => setShowStyles(!showStyles)}
        >
          Summary Styles {showStyles ? "▲" : "▼"}
        </button>

        {showStyles && (
          <div className="styles-container">

            {styles.map((style) => (
              <button
                key={style.value}
                className={`style-btn ${
                  selectedStyle === style.value ? "selected-style" : ""
                }`}
                onClick={() => {
                  setSelectedStyle(style.value);
                  setSummary("");
                }}
              >
                {style.label}
              </button>
            ))}

          </div>
        )}

      </div>

      <div className="hero-card">

        <h1>
          ✨ Transform Any Website Into An AI Summary
        </h1>

        <p>
          Enter a URL and generate summaries in different styles.
        </p>

        <div className="input-group">

          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setSummary("");
            }}
          />

          <div className="button-group">
              <button onClick={generateSummary}>
                  {loading ? "Generating..." : "Generate Summary"}
              </button>

              <button
                  className="clear-btn"
                  onClick={clearAll}
              >
                  Clear
              </button>
          </div>

        </div>

        <div className="summary-output">

          {summary || "Summary will appear here..."}

        </div>

      </div>

    </section>
  );
}

export default Hero;