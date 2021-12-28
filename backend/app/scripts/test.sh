#!/usr/bin/env bash

set -e
set -x

SQLITE_FILE=./test-gift.db
export SQLALCHEMY_DATABASE_URL=sqlite:///${SQLITE_FILE}
export PYTHONPATH=.

[ -e $SQLITE_FILE ] && rm $SQLITE_FILE

pytest --cov=app --cov-report=term-missing app/tests "${@}"

[ -e $SQLITE_FILE ] && rm $SQLITE_FILE