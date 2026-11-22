#!/bin/sh
# Usage: sh set-domain.sh https://www.yourdomain.com
# Replaces the placeholder domain in every file of this folder.
[ -z "$1" ] && echo "Give your domain, e.g. https://www.example.com" && exit 1
D=$(echo "$1" | sed 's#/*$##')
find . -type f \( -name "*.html" -o -name "*.xml" -o -name "*.txt" -o -name "*.webmanifest" \) -exec sed -i "s#https://alicaptn.github.io#$D#g" {} +
echo "Done. Domain set to $D"
