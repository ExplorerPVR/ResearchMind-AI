from app.services.embedding_service import EmbeddingService
from app.rag.vector_store import collection


class RetrievalService:

    @classmethod
    def retrieve(cls, question: str, k: int = 5):

        # Generate embedding for the user's question
        query_embedding = EmbeddingService.embeddings.embed_query(question)

        # Search ChromaDB
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=k,
        )

        chunks = []

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        # Build chunk list with metadata
        for i, (doc, meta) in enumerate(zip(documents, metadatas), start=1):

            chunks.append(
                {
                    "chunk_id": i,
                    "text": doc,
                    "filename": meta.get("filename", "Unknown"),
                    "page": meta.get("page", 1),
                    "document": meta.get(
                        "document",
                        meta.get("filename", "Unknown")
                    ),
                }
            )

        return chunks