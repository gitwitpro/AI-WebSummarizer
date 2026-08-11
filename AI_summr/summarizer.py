import os
from dotenv import load_dotenv
from openai import OpenAI

from prompts import get_style_prompt
from scraper import fetch_website_contents


load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

# Groq's API is OpenAI-compatible - we just point the OpenAI client at
# Groq's base URL instead of OpenAI's. Free tier, no credit card needed.
client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)


def summarize(text, style):
    style_prompt = get_style_prompt(style)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": style_prompt},
            {"role": "user", "content": text},
        ],
    )

    choice = response.choices[0] if response.choices else None

    if choice is None:
        raise Exception("Groq returned no response choices")

    if choice.finish_reason not in ("stop", None):
        raise Exception(f"Groq stopped early: finish_reason={choice.finish_reason}")

    content = choice.message.content

    if not content:
        raise Exception("Groq returned an empty summary")

    return content


def summarize_website(url, style):
    text = fetch_website_contents(url)

    return summarize(text, style)