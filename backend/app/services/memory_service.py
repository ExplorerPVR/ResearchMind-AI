class MemoryService:

    conversations = {}

    @classmethod
    def get_history(cls, session_id: str):

        return cls.conversations.get(session_id, [])

    @classmethod
    def add_message(cls, session_id: str, role: str, message: str):

        if session_id not in cls.conversations:
            cls.conversations[session_id] = []

        cls.conversations[session_id].append({
            "role": role,
            "message": message
        })