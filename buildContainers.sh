#!/bin/bash

uiImage=$( docker images -q frontend )
apiImage=$( docker images -q backend )
uiContainer=$( docker ps -a -q -f name=react-ui )
apiContainer=$( docker ps -a -q -f name=node-api )

if [[ -n "$uiContainer" ]]; then
  docker stop $uiContainer
  docker rm $uiContainer
fi

if [[ -n "$apiContainer" ]]; then
  docker stop $apiContainer
  docker rm $apiContainer
fi

if [[ -n "$uiImage" ]]; then
  docker rmi $uiImage
fi


if [[ -n "$apiImage" ]]; then
  docker rmi $apiImage
fi

docker build -f backend/Dockerfile -t backend .
docker build -f frontend/Dockerfile -t frontend .
