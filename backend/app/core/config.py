from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Application configuration loaded from .env
    """

    # =========================
    # Google Gemini
    # =========================
    GOOGLE_API_KEY: str
    MODEL_NAME: str = "gemini-3.5-flash"

    # =========================
    # LLM Configuration
    # =========================
    TEMPERATURE: float = 0.2
    MAX_OUTPUT_TOKENS: int = 4096

    # =========================
    # File Upload Configuration
    # =========================
    UPLOAD_DIR: str = "app/uploads"
    MAX_FILE_SIZE: int = 50

    # =========================
    # Vector Database
    # =========================
    CHROMA_DB_PATH: str = "./chroma_db"

    # =========================
    # Application
    # =========================
    APP_NAME: str = "ResearchMind AI"
    APP_VERSION: str = "1.0.0"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()

from app.core.config import settings

settings.MODEL_NAME
settings.MAX_FILE_SIZE
settings.CHROMA_DB_PATH