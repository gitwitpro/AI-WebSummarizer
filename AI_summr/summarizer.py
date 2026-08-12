import os
from dotenv import load_dotenv
from openai import OpenAI

from prompts import get_style_prompt
from scraper import fetch_website_contents

load_dotenv()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError("GROQ_API_KEY is not configured")

client = OpenAI(
    api_key=api_key,
    base_url="https://api.groq.com/openai/v1",
)


def summarize(text, style):
    if not text.strip():
        raise Exception("No readable content was found on the website")

    style_prompt = get_style_prompt(style)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": style_prompt
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )

    if not response.choices:
        raise Exception("Groq returned no response choices")

    content = response.choices[0].message.content

    if not content:
        raise Exception("Groq returned an empty summary")

    return content


def summarize_website(url, style):
    text = fetch_website_contents(url)

    return summarize(text, style)