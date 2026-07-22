from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings
import json
import ast
import asyncio

class GeminiService:

    llm = ChatGoogleGenerativeAI(
        model=settings.MODEL_NAME,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=settings.TEMPERATURE,
    )
    # ----------------------------------------------------
    # Retry Gemini Request
    # ----------------------------------------------------

    @classmethod
    async def invoke_with_retry(cls, prompt: str):

        retries = 3

        delay = 2

        for attempt in range(retries):

            try:

                return await cls.llm.ainvoke(prompt)

            except Exception as e:

                print(f"Gemini Attempt {attempt+1}/{retries}")

                print(e)

                if attempt < retries - 1:

                    await asyncio.sleep(delay)

                    delay *= 2

                else:

                    raise

    # ----------------------------------------------------
    # Universal Gemini Response Parser
    # ----------------------------------------------------

    @staticmethod
    def parse_gemini_response(content):

        # Convert response into plain text

        if isinstance(content, str):

            text = content

        elif isinstance(content, list):

            texts = []

            for block in content:

                if hasattr(block, "text"):

                    texts.append(block.text)

                elif isinstance(block, dict):

                    if "text" in block:
                        texts.append(block["text"])
                    else:
                        texts.append(str(block))

                else:

                    texts.append(str(block))

            text = "\n".join(texts)

        else:

            text = str(content)

        text = text.strip()

        # Remove markdown blocks

        if text.startswith("```json"):
            text = text.replace("```json", "", 1)

        if text.startswith("```"):
            text = text.replace("```", "", 1)

        if text.endswith("```"):
            text = text[:-3]

        text = text.strip()

        # Gemini sometimes returns:
        # {'type':'text','text':'....'}

        try:

            wrapper = ast.literal_eval(text)

            if isinstance(wrapper, dict):

                if "text" in wrapper:
                    return wrapper["text"].strip()

        except Exception:

            pass

        return text


    # ----------------------------------------------------
    # Chat
    # ----------------------------------------------------

    @classmethod
    async def generate_answer(
        cls,
        question: str,
        context: str,
        history: list,
    ) -> str:

        history_text = ""

        for message in history:

            history_text += (
                f"{message['role'].capitalize()}: "
                f"{message['message']}\n"
            )

        prompt = f"""
You are ResearchMind AI.

Answer ONLY using the retrieved context.

Conversation History
--------------------
{history_text}

Retrieved Context
--------------------
{context}

Question
--------------------
{question}

Instructions

1. Answer ONLY from context.
2. Compare papers whenever appropriate.
3. Never hallucinate.
4. If the answer is unavailable, reply exactly:

"I couldn't find that information in the uploaded documents."

Answer:
"""

        try:

            response = await cls.invoke_with_retry(prompt)

        except Exception as e:

            print("Gemini Error:", e)

            return (
                "ResearchMind AI is temporarily unavailable. "
                "Please try again later."
            )

        return cls.parse_gemini_response(response.content)
    # ----------------------------------------------------
    # Summary
    # ----------------------------------------------------

    @classmethod
    async def generate_summary(
        cls,
        document: str,
    ) -> str:

        prompt = f"""
You are an expert Research Assistant.

Generate a professional research paper summary.

Include the following sections:

# Executive Summary

# Research Objective

# Methodology

# Key Findings

# Strengths

# Limitations

# Future Work

# Conclusion

Research Paper

{document}
"""

        try:

            response = await cls.invoke_with_retry(prompt)

        except Exception as e:

            print("Gemini Error:", e)

            return (
                "ResearchMind AI is temporarily unavailable."
            )

        return cls.parse_gemini_response(response.content)
    # ----------------------------------------------------
    # Compare Documents
    # ----------------------------------------------------

    @classmethod
    async def compare_documents(
        cls,
        documents: list,
    ) -> str:

        papers = ""

        for doc in documents:

            papers += f"""

=========================
Paper:
{doc["filename"]}

Content:

{doc["text"]}

"""

        prompt = f"""
You are an expert Research Scientist.

Compare the following research papers.

Generate a professional comparison report.

Include the following sections:

# Executive Overview

# Research Objectives

# Methodology Comparison

# Dataset Comparison

# Algorithms / Models Used

# Key Findings

# Strengths

# Weaknesses

# Future Work

# Final Recommendation

Rules:

1. Compare every paper fairly.
2. Use markdown headings.
3. Use markdown tables wherever possible.
4. Do not invent information.
5. Base everything only on the provided papers.

Research Papers

{papers}
"""

        try:

            response = await cls.invoke_with_retry(prompt)

        except Exception as e:

            print("Gemini Error:", e)

            return (
                "ResearchMind AI is temporarily unavailable. "
                "Please try again later."
            )

        return cls.parse_gemini_response(response.content)
    # ----------------------------------------------------
    # Citation Generator
    # ----------------------------------------------------

    @classmethod
    async def generate_citations(
        cls,
        document: str,
    ) -> dict:

        prompt = f"""
You are an expert academic citation generator.

Analyze the following research paper.

Generate citations in the following formats.

Return ONLY valid JSON.

Use exactly this format:

{{
    "apa": "",
    "ieee": "",
    "mla": "",
    "chicago": "",
    "harvard": "",
    "bibtex": ""
}}

Rules:

1. Extract Title.
2. Extract Authors.
3. Extract Year.
4. Extract Journal / Conference.
5. Extract Publisher.
6. Extract DOI if available.
7. Never invent missing information.
8. Return ONLY valid JSON.
9. No markdown.
10. No explanation.

Research Paper

{document}
"""

        try:

            response = await cls.invoke_with_retry(prompt)

        except Exception as e:

            print("Gemini Error:", e)

            return {
                "apa": "",
                "ieee": "",
                "mla": "",
                "chicago": "",
                "harvard": "",
                "bibtex": "",
            }

        text = cls.parse_gemini_response(response.content)

        try:

            citations = json.loads(text)

            if not isinstance(citations, dict):
                raise Exception("Response is not JSON")

            return {
                "apa": citations.get("apa", ""),
                "ieee": citations.get("ieee", ""),
                "mla": citations.get("mla", ""),
                "chicago": citations.get("chicago", ""),
                "harvard": citations.get("harvard", ""),
                "bibtex": citations.get("bibtex", ""),
            }

        except Exception as e:

            print("Citation JSON Parse Error:", e)
            print("Returned Text:")
            print(text)

            return {
                "apa": "",
                "ieee": "",
                "mla": "",
                "chicago": "",
                "harvard": "",
                "bibtex": "",
            }