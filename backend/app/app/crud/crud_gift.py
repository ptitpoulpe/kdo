from app.crud.base import CRUDBase
from app.models.gift import Gift
from app.schemas.gift import GiftCreate, GiftUpdate


class CRUDGift(CRUDBase[Gift, GiftCreate, GiftUpdate]):
    pass


gift = CRUDGift(Gift)
