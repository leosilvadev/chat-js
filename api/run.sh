#!/bin/bash

echo "Installing dependencies for chat-api..."
npm install &> /dev/null
echo "Dependencies installed!"

echo "Starting chat-api..."
npm run dev

