#!/bin/bash

echo "Installing dependencies for chat-web..."
npm install &> /dev/null
echo "Dependencies installed!"

echo "Starting chat-web..."
npm run dev-background

