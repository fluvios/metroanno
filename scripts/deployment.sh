#!/bin/sh
set -e


echo "================================================================"
echo "===========================DEPLOYMENT==========================="
echo "================================================================"

echo "Update codebase..."
cd ~/partime/metroanno
git fetch origin main
git reset --hard origin/main

echo "Installing dependencies 🛠"
yarn install

echo "Building application ⚙"
yarn build

echo "Restart pm2 service 🔥"
pm2 restart pm2.json

echo "Deploying Frontend Application Successfully Yeayyyy ........"