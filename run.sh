#!/bin/bash

if [ ! -d "redis" ]; then
  echo "Redis not found, downloading..."
  wget http://download.redis.io/releases/redis-3.2.6.tar.gz
  echo "Redis downloaded successfully!"
  tar xzf redis-3.2.6.tar.gz
  rm redis-3.2.6.tar.gz
  mv redis-3.2.6 redis
  cd redis
  echo "Installing Redis..."
  make &> /dev/null
  echo "Redis installed!"
fi

cd redis/src
nohup redis-server &> /dev/null &

cd ../../api
./run.sh

cd ../web
./run.sh

