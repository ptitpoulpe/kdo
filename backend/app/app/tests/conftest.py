from typing import Generator

import pytest
from fastapi.testclient import TestClient

from alembic import command
from alembic.config import Config
from app.main import app
from app.models.session import SessionLocal


@pytest.fixture(scope="function")
def db() -> Generator:

    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")

    yield SessionLocal()

    command.downgrade(alembic_cfg, "base")


@pytest.fixture(scope="session")
def client() -> Generator:
    with TestClient(app) as c:
        yield c
