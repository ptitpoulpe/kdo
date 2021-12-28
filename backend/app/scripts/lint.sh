#!/usr/bin/env bash

set -x

mypy app alembic
black app alembic --check
isort --check-only app alembic
flake8 app alembic
