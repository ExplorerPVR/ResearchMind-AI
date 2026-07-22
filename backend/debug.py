from app.rag.vector_store import collection

results = collection.get()

print("Collection Data:")
print(results)

print("\nNumber of IDs:", len(results.get("ids", [])))