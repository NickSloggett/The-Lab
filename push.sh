#!/bin/bash

echo "🚀 Pushing to GitHub..."
echo ""

# Authenticate with workflow scope
echo "Step 1: Authenticating..."
gh auth refresh -s workflow -h github.com

if [ $? -eq 0 ]; then
    echo ""
    echo "Step 2: Pushing to main..."
    git push origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SUCCESS! Your repo is now upgraded!"
        echo "👉 Visit: https://github.com/NickSloggett/The-Lab"
    else
        echo "❌ Push failed. Try: git push origin main"
    fi
else
    echo "❌ Authentication failed"
    echo "Try running manually: gh auth refresh -s workflow -h github.com"
fi
