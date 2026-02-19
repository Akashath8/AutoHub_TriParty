#!/usr/bin/env bash
# Exit on error
set -o errexit

npm install
npm install --prefix server
# Client needs devDependencies (like vite) to build
npm install --prefix client --include=dev
npm run build --prefix client
