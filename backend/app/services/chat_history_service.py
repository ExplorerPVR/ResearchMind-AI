import os
import json
import uuid
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent

CHAT_FOLDER = BASE_DIR / "storage" / "chat_history"
CHAT_FOLDER.mkdir(parents=True, exist_ok=True)


class ChatHistoryService:

    @staticmethod
    def get_sessions():

        sessions = []

        for file in CHAT_FOLDER.glob("*.json"):

            with open(file, "r", encoding="utf-8") as f:

                data = json.load(f)

                sessions.append({
                    "id": data["id"],
                    "title": data["title"],
                })

        return sessions

    @staticmethod
    def create_session():

        session_id = str(uuid.uuid4())

        data = {
            "id": session_id,
            "title": "New Chat",
            "messages": [],
        }

        path = CHAT_FOLDER / f"{session_id}.json"

        print(f"Creating session: {path}")

        with open(path, "w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False,
            )

        return data

    @staticmethod
    def get_session(session_id: str):

        path = CHAT_FOLDER / f"{session_id}.json"

        print(f"Loading session: {path}")

        if not path.exists():

            data = {
                "id": session_id,
                "title": "New Chat",
                "messages": [],
            }

            with open(path, "w", encoding="utf-8") as f:
                json.dump(
                    data,
                    f,
                    indent=4,
                    ensure_ascii=False,
                )
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)

    @staticmethod
    def save_message(
        session_id: str,
        role: str,
        message: str,
        sources=None,
    ):

        if sources is None:
            sources = []

        path = CHAT_FOLDER / f"{session_id}.json"

        print(f"Saving message -> {path}")

        if not path.exists():
            raise Exception(f"Chat session not found. ({path})")

        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        data["messages"].append({
            "role": role,
            "message": message,
            "sources": sources,
        })

        with open(path, "w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False,
            )

    @staticmethod
    def rename_session(
        session_id: str,
        title: str,
    ):

        path = CHAT_FOLDER / f"{session_id}.json"

        if not path.exists():
            raise Exception("Chat session not found.")

        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)

        data["title"] = title

        with open(path, "w", encoding="utf-8") as f:
            json.dump(
                data,
                f,
                indent=4,
                ensure_ascii=False,
            )

    @staticmethod
    def delete_session(session_id: str):

        path = CHAT_FOLDER / f"{session_id}.json"

        if path.exists():
            path.unlink()
            return {"success": True}

        return {"success": False}