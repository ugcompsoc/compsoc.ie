#!/bin/bash

# Stop the docker container currently running the API
echo -e "\n > Shutting down CompSoc API"
docker-compose -f docker-compose.prod.yml down

# Update image
docker-compose -f docker-compose.prod.yml pull

# Pull down any new workflow related stuff
echo -e "\n > Pulling down new updates from master"
git checkout master
git pull 

# Start the service again
echo -e "\n > Starting CompSoc API"
docker-compose -f docker-compose.prod.yml up -d --remove-orphans