#!/bin/bash
echo "Updating portfolio..."

git add .
commit_msg="Portfolio update: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$commit_msg"
git push origin main

echo "Portfolio updated and live at https://ratnesh-12.github.io"
