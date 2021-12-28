from typing import Optional

from pydantic import BaseModel


# Shared properties
class GiftBase(BaseModel):
    name: str
    url: Optional[str] = None
    price: Optional[float] = None
    buy_price: Optional[float] = None
    recipient: str
    giver: Optional[str] = None


# Properties to receive via API on creation
class GiftCreate(GiftBase):
    pass


# Properties to receive via API on update
class GiftUpdate(GiftBase):
    pass


class GiftInDBBase(GiftBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Gift(GiftInDBBase):
    pass


# Additional properties stored in DB
class GiftInDB(GiftInDBBase):
    pass
