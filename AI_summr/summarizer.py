import os
from dotenv import load_dotenv
from google import genai

from prompts import get_style_prompt
from scraper import fetch_website_contents


load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)


def summarize(text, style):
    style_prompt = get_style_prompt(style)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"{style_prompt}\n\n{text}"
    )

    return response.text


def summarize_website(url, style):
    text = fetch_website_contents(url)

    return summarize(text, style)