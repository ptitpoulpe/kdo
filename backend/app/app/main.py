from fastapi import FastAPI
from fastapi_pagination import add_pagination

from app.routers import gifts
from app.utils.config import settings

app = FastAPI()

app.include_router(gifts.router, prefix=settings.API_V1_STR)

add_pagination(app)
