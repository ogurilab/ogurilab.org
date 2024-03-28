#!/bin/bash

dir="src/docs/news"
mkdir -p $dir

filename="$(date +%s).mdx"


filepath="$dir/$filename"


cat <<EOF > $filepath
---
title: ""
href: ""
category: "" 
date: "$(date +%Y-%m-%d)"
image: "" # public/news に画像を配置し、その画像名(example.webp)を指定
---

EOF

echo "$filepath が生成されました。"
