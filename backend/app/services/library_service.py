from pathlib import Path

from app.rag.vector_store import collection

UPLOAD_DIR = Path("app/uploads")


class LibraryService:

    @staticmethod
    def get_documents():

        results = collection.get(include=["metadatas"])

        metadatas = results.get("metadatas", [])

        documents = {}

        for meta in metadatas:

            filename = meta.get("filename", "Unknown")

            if filename not in documents:

                documents[filename] = {
                    "filename": filename,
                    "stored_name": meta.get("stored_name"),
                    "chunks": 0,
                    "pages": set(),
                }

            documents[filename]["chunks"] += 1
            documents[filename]["pages"].add(meta.get("page", 1))

        response = []

        for doc in documents.values():

            response.append(
                {
                    "filename": doc["filename"],
                    "stored_name": doc["stored_name"],
                    "pages": len(doc["pages"]),
                    "chunks": doc["chunks"],
                }
            )

        response.sort(key=lambda x: x["filename"].lower())

        return response

    @staticmethod
    def delete_document(filename: str):

        results = collection.get(include=["metadatas"])

        ids = results["ids"]
        metadatas = results["metadatas"]

        ids_to_delete = []
        stored_name = None

        for doc_id, meta in zip(ids, metadatas):

            if meta.get("filename") == filename:

                ids_to_delete.append(doc_id)
                stored_name = meta.get("stored_name")

        if ids_to_delete:

            collection.delete(ids=ids_to_delete)

        if stored_name:

            pdf_path = UPLOAD_DIR / stored_name

            if pdf_path.exists():
                pdf_path.unlink()

        return {
            "success": True,
            "deleted": filename
        }