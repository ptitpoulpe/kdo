from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.models import Gift
from app.schemas import GiftCreate
from app.utils.config import settings


def create_random_gift(db: Session) -> Gift:
    gift_in = GiftCreate(
        name="kdo",
        url="http://kdo",
        price=10,
        buy_price=8,
        recipient="santa",
        giver="santa",
    )
    return crud.gift.create(db=db, obj_in=gift_in)


gift_data = {
    "name": "Present",
    "url": "http://test",
    "price": 5.0,
    "buy_price": 4,
    "recipient": "ptitpoulpe",
    "giver": "ptitpoulpe",
}


def test_create_gift(client: TestClient, db: Session) -> None:

    response = client.post(
        f"{settings.API_V1_STR}/gifts/",
        json=gift_data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == gift_data["name"]
    assert content["recipient"] == gift_data["recipient"]
    assert "id" in content


def test_update_gift(client: TestClient, db: Session) -> None:
    gift = create_random_gift(db)
    response = client.put(
        f"{settings.API_V1_STR}/gifts/{gift.id}",
        json=gift_data,
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == gift_data["name"]
    assert content["recipient"] == gift_data["recipient"]
    assert content["id"] == gift.id


def test_update_gift_not_found(client: TestClient, db: Session) -> None:
    response = client.put(
        f"{settings.API_V1_STR}/gifts/{0}",
        json=gift_data,
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Gift not found"}


def test_read_gift(client: TestClient, db: Session) -> None:
    gift = create_random_gift(db)
    response = client.get(
        f"{settings.API_V1_STR}/gifts/{gift.id}",
    )
    assert response.status_code == 200
    content = response.json()
    assert content["name"] == gift.name
    assert content["recipient"] == gift.recipient
    assert content["id"] == gift.id


def test_read_gift_not_found(client: TestClient, db: Session) -> None:
    response = client.get(
        f"{settings.API_V1_STR}/gifts/{0}",
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Gift not found"}


def test_read_gifts(client: TestClient, db: Session) -> None:
    gift = create_random_gift(db)
    response = client.get(
        f"{settings.API_V1_STR}/gifts/",
    )
    assert response.status_code == 200
    content = response.json()
    assert len(content) == 1
    assert content[0]["name"] == gift.name
    assert content[0]["recipient"] == gift.recipient
    assert content[0]["id"] == gift.id


def test_delete_gift(client: TestClient, db: Session) -> None:
    gift = create_random_gift(db)
    response = client.delete(f"{settings.API_V1_STR}/gifts/{gift.id}")
    assert response.status_code == 200
    content = response.json()
    assert content["id"] == gift.id
    assert crud.gift.get(db=db, id=gift.id) is None


def test_delete_gift_not_found(client: TestClient, db: Session) -> None:
    response = client.delete(
        f"{settings.API_V1_STR}/gifts/{0}",
    )
    assert response.status_code == 404
    assert response.json() == {"detail": "Gift not found"}
