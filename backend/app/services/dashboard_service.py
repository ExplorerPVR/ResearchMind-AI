from pathlib import Path

from app.rag.vector_store import collection

UPLOAD_DIR = Path("app/uploads")


class DashboardService:

    @staticmethod
    def get_statistics():

        results = collection.get(include=["metadatas"])

        metadatas = results.get("metadatas", [])

        documents = {}

        total_chunks = len(metadatas)
        total_pages = 0

        for meta in metadatas:

            filename = meta["filename"]

            if filename not in documents:

                documents[filename] = {
                    "pages": set()
                }

            documents[filename]["pages"].add(meta["page"])

        for doc in documents.values():
            total_pages += len(doc["pages"])

        total_size = 0

        if UPLOAD_DIR.exists():

            for pdf in UPLOAD_DIR.glob("*.pdf"):
                total_size += pdf.stat().st_size

        recent_documents = []

        for filename, data in documents.items():

            recent_documents.append({
                "filename": filename,
                "pages": len(data["pages"])
            })

        recent_documents.sort(
            key=lambda x: x["filename"],
            reverse=True
        )

        return {
            "papers": len(documents),
            "pages": total_pages,
            "chunks": total_chunks,
            "storage_mb": round(total_size / (1024 * 1024), 2),
            "recent_documents": recent_documents[:5]
        }