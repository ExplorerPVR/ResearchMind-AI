from chromadb import PersistentClient

client = PersistentClient(path="app/database/chroma")

collection = client.get_or_create_collection(
    name="researchmind_documents"
)