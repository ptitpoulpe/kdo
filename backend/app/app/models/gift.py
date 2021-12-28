from sqlalchemy import Column, Float, Integer, String

from .session import Base


class Gift(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    url = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    buy_price = Column(Float, nullable=True)
    recipient = Column(String, index=True)
    giver = Column(String, index=True, nullable=True)
