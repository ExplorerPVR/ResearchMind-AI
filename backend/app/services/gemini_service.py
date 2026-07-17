from langchain_google_genai import ChatGoogleGenerativeAI
from app.core.config import settings


class GeminiService:

    llm = ChatGoogleGenerativeAI(
        model=settings.MODEL_NAME,
        google_api_key=settings.GOOGLE_API_KEY,
        temperature=settings.TEMPERATURE,
    )

    @classmethod
    async def generate_answer(
        cls,
        question: str,
        context: str,
        history: list,
    ) -> str:

        # Build conversation history
        history_text = ""

        for message in history:
            history_text += (
                f"{message['role'].capitalize()}: "
                f"{message['message']}\n"
            )

        # Build complete prompt
        prompt = f"""
You are ResearchMind AI.

You are an expert research assistant that answers questions ONLY from the uploaded research papers.

Conversation History:
-----------------------
{history_text}

Retrieved Context:
-----------------------
{context}

Current Question:
{question}

Instructions:

1. Answer ONLY using the retrieved context.
2. If multiple papers discuss the topic, compare them.
3. Mention differences when applicable.
4. If the answer is not available in the retrieved context, reply exactly:
"I couldn't find that information in the uploaded documents."
5. Do not make up facts.
6. Keep the answer clear and well formatted.

Answer:
"""

        try:
            response = await cls.llm.ainvoke(prompt)

        except Exception as e:
            print("Gemini Error:", e)

            return (
                "ResearchMind AI is temporarily unavailable. "
                "Please try again later."
            )

        content = response.content

        # Handle Gemini returning multiple content blocks
        if isinstance(content, list):

            texts = []

            for block in content:

                if hasattr(block, "text"):
                    texts.append(block.text)

                elif isinstance(block, dict):
                    texts.append(block.get("text", ""))

                else:
                    texts.append(str(block))

            return "\n".join(texts).strip()

        return str(content).strip()