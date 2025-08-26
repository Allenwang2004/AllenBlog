#!/bin/zsh
cd /Users/coconut/AllenBlog || exit 1 
MESSAGE=$1

git add .
git commit -m "$MESSAGE" || exit 1   # 如果 commit 失敗就停
git push origin main