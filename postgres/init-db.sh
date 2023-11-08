#!/bin/bash
psql -U $POSTGRES_USER -d postgres -c "CREATE DATABASE $POSTGRES_EXAM;"