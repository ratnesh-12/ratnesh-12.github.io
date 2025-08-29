#!/bin/bash

# Navigate to the portfolio folder (optional if you are already here)
# cd /path/to/your/portfolio

echo "Updating portfolio..."

# Stage all changes
git add .

# Create a timestamp commit message
commit_msg="Portfolio update: $(date '+%Y-%m-%d %H:%M:%S')"

# Commit
git commit -m "$commit_msg"

# Push to GitHub
git push origin main

echo "Portfolio updated and live at https://ratnesh-12.github.io"
