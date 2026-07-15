from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logger import logger

from app.api.routes.health import router as health_router
from app.api.routes.test import router as test_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Agentic AI Research Assistant",
    docs_url="/docs",
    redoc_url="/redoc"
)

# --------------------------
# CORS
# --------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------
# Routes
# --------------------------

app.include_router(health_router)
app.include_router(test_router)

# --------------------------
# Root
# --------------------------

@app.get("/")
async def root():

    logger.info("Root endpoint accessed.")

    return {
        "message": f"{settings.APP_NAME} Backend Running 🚀"
    }