from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.dependencies import get_db

router = APIRouter(
    prefix="/gifts",
    tags=["gifts"],
    dependencies=[Depends(get_db)],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.Gift)
def create_gift(
    gift_in: schemas.GiftCreate,
    db: Session = Depends(get_db),
) -> models.Gift:
    """
    Create new gift.
    """
    gift = crud.gift.create(db=db, obj_in=gift_in)
    return gift


@router.put("/{id}", response_model=schemas.Gift)
def update_gift(
    id: int,
    gift_in: schemas.GiftUpdate,
    db: Session = Depends(get_db),
) -> models.Gift:
    """
    Update a gift.
    """
    gift = crud.gift.get(db=db, id=id)
    if not gift:
        raise HTTPException(status_code=404, detail="Gift not found")
    gift = crud.gift.update(db=db, db_obj=gift, obj_in=gift_in)
    return gift


@router.get("/{id}", response_model=schemas.Gift)
def read_gift(
    id: int,
    db: Session = Depends(get_db),
) -> models.Gift:
    """
    Get gift by ID.
    """
    gift = crud.gift.get(db=db, id=id)
    if not gift:
        raise HTTPException(status_code=404, detail="Gift not found")
    return gift


@router.get("/", response_model=List[schemas.Gift])
def read_gifts(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
) -> List[models.Gift]:
    """
    Retrieve gifts.
    """
    gifts = crud.gift.get_multi(db, skip=skip, limit=limit)

    return gifts


@router.delete("/{id}", response_model=schemas.Gift)
def delete_gift(
    id: int,
    db: Session = Depends(get_db),
) -> models.Gift:
    """
    Delete a gift.
    """
    gift = crud.gift.get(db=db, id=id)
    if not gift:
        raise HTTPException(status_code=404, detail="Gift not found")
    crud.gift.remove(db=db, id=id)
    return gift
