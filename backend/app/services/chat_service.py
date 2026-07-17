from app.services.memory_service import MemoryService
from app.services.retrieval_service import RetrievalService
from app.services.gemini_service import GeminiService


class ChatService:

    @staticmethod
    async def chat(session_id: str, question: str):

        # Get previous conversation
        history = MemoryService.get_history(session_id)

        # Retrieve relevant chunks
        chunks = RetrievalService.retrieve(question)

        # Build context for Gemini
        context = "\n\n".join(
            chunk["text"] for chunk in chunks
        )

        # Generate answer
        answer = await GeminiService.generate_answer(
            question=question,
            context=context,
            history=history
        )

        # Save conversation
        MemoryService.add_message(
            session_id=session_id,
            role="user",
            message=question
        )

        MemoryService.add_message(
            session_id=session_id,
            role="assistant",
            message=answer
        )

        # Remove duplicate citations
        sources = list(dict.fromkeys(
            f'{chunk["filename"]} (Page {chunk["page"]})'
            for chunk in chunks
        ))

        return {
            "answer": answer,
            "sources": [
                f'{chunk["filename"]} (Page {chunk["page"]})'
                for chunk in chunks
            ]
        }