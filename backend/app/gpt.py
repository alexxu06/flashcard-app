from openai import OpenAI
from dotenv import load_dotenv
import os
import PyPDF2
import json
import re

def parse_flashcards(page_summary):
    # Regex to extract questions and answers
    flashcards = re.findall(r"Q:\s*(.*?)\s*A:\s*(.*?)\s*(?=Q:|$)", page_summary, re.DOTALL)

    # Convert to JSON format
    cards = [
        {"question": q.strip(), "answer": a.strip()} for q, a in flashcards
    ]

    return json.dumps(cards, indent=4)


def process_pdf(file_path):
    # Load environment variables
    load_dotenv()

    with open(file_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # grabs the API key from the environment file
        client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

        for page_num in range(len(pdf_reader.pages)):
            # indexing 0 means the first page, so 1 would be the second page, etc.
            page_text = pdf_reader.pages[page_num].extract_text()

            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",  # what you want the AI to be aware of/take the role of
                        "content": "You are a master at making flashcards. Instead of just copying the text, try to understand the content and generate a set of flashcards that will help someone else learn the material."
                    },
                    {
                        "role": "user",  # what you want the AI to actually do
                        "content": f"Generate a set of educational flashcards (at least make 5 flashcards) based on the following content. Each flashcard should follow the format 'Q: [Question] A: [Answer]' and focus on clear, concise explanations. Ensure the questions test understanding rather than just recall. Make as many flashcards as you see fit to ensure a solid grasp of the topics. Content: {page_text}"
                    }
                ]
            )
            # The index 0 accesses the first choice of generated responses.
            page_summary = response.choices[0].message.content

            cards_json = parse_flashcards(page_summary)

        return cards_json

