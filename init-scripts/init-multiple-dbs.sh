#!/bin/bash
set -e

# Connect to the default database (POSTGRES_DB), using the POSTGRES_USER.
# We then run SQL commands to create additional databases.

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE big_up_db;
EOSQL
