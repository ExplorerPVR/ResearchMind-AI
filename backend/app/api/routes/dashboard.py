from fastapi import APIRouter

from app.services.dashboard_service import DashboardService

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("")
async def dashboard():

    return DashboardService.get_statistics()