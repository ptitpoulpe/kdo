from fastapi import FastAPI

from app.routers import gifts
from app.utils.config import settings

app = FastAPI()


app.include_router(gifts.router, prefix=settings.API_V1_STR)
