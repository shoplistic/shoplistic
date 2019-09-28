#!/bin/bash

read -p "Are you sure? (y/n): " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo 'About to delete "data", "export" and "server/node_modules". Waiting for 5 seconds...'
  sleep 5
  rm -rf 'data' 'export' 'server/node_modules'
  echo 'Done'
fi
