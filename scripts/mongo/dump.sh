#!/bin/bash

mongodump --db $MONGO_INITDB_ROOT_USERNAME --username $MONGO_INITDB_ROOT_USERNAME --password $MONGO_INITDB_ROOT_PASSWORD -o /export/
mongoexport --db $MONGO_INITDB_ROOT_USERNAME --username $MONGO_INITDB_ROOT_USERNAME --collection users --password $MONGO_INITDB_ROOT_PASSWORD -o /export/$MONGO_INITDB_ROOT_USERNAME/dump.json
