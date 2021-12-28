#!/bin/sh -e
set -x

autoflake --remove-all-unused-imports --remove-unused-variables --in-place --exclude=__init__.py --recursive app alembic
black app alembic
isort app alembic
