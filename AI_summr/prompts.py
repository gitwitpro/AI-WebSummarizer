STYLE_PROMPTS = {
    "funny": """
Summarize the website in a funny and playful way.
Keep the important information accurate.
Use light humor.
""",

    "sarcastic": """
Summarize the website in a sarcastic and witty way.
Keep the important information accurate.
""",

    "sad": """
Summarize the website in a sad and emotional tone.
Keep the important information accurate.
""",

    "angry": """
Summarize the website in an angry and frustrated tone.
Keep the important information accurate.
""",

    "professional": """
Summarize the website in a professional and formal tone.
Be clear, concise and informative.
""",

    "motivational": """
Summarize the website in an energetic and motivational tone.
Focus on useful and positive takeaways.
""",

    "pirate": """
Summarize the website as if you were a pirate.
Use pirate-style language while keeping the information accurate.
""",

    "shakespeare": """
Summarize the website in the style of Shakespearean language.
Keep the important information accurate.
"""
}

def get_style_prompt(style):
    return STYLE_PROMPTS.get(style, STYLE_PROMPTS["professional"])