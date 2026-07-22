from app.rag.vector_store import collection
from app.services.gemini_service import GeminiService


class SummaryService:

    @staticmethod
    async def generate_summary(filename: str):

        # Retrieve everything from ChromaDB
        results = collection.get(
            include=["documents", "metadatas"]
        )

        documents = results.get("documents", [])
        metadatas = results.get("metadatas", [])

        paper_chunks = []

        # Collect only chunks belonging to this PDF
        for text, meta in zip(documents, metadatas):

            if meta.get("filename") == filename:
                paper_chunks.append(
                    (
                        meta.get("page", 1),
                        text,
                    )
                )

        # No document found
        if len(paper_chunks) == 0:
            return "Document not found."

        # Sort by page number
        paper_chunks.sort(key=lambda x: x[0])

        # Merge all text
        full_text = "\n\n".join(
            chunk for _, chunk in paper_chunks
        )

        # Limit context to avoid token overflow
        full_text = full_text[:25000]

        # Ask Gemini to summarize
        summary = await GeminiService.generate_summary(full_text)

        return summary