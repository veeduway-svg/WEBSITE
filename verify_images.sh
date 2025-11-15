#!/bin/bash
echo "=== Image Verification Script ==="
echo ""

# Check Construction.png
if [ -f "public/Construction.png" ]; then
    size=$(stat -f%z "public/Construction.png" 2>/dev/null || echo 0)
    type=$(file -b "public/Construction.png" 2>/dev/null | cut -d, -f1)
    if [ "$size" -gt 10000 ] && [[ "$type" == *"PNG"* ]]; then
        echo "✅ Construction.png: OK ($(numfmt --to=iec-i --suffix=B $size 2>/dev/null || echo ${size}B))"
    else
        echo "❌ Construction.png: PLACEHOLDER ($size bytes, $type)"
        echo "   → Replace with actual construction worker image"
    fi
else
    echo "❌ Construction.png: MISSING"
fi

# Check Logo
if [ -f "src/assets/veeduway-logo.png" ]; then
    size=$(stat -f%z "src/assets/veeduway-logo.png" 2>/dev/null || echo 0)
    type=$(file -b "src/assets/veeduway-logo.png" 2>/dev/null | cut -d, -f1)
    if [ "$size" -gt 10000 ] && [[ "$type" == *"PNG"* ]]; then
        echo "✅ veeduway-logo.png: OK ($(numfmt --to=iec-i --suffix=B $size 2>/dev/null || echo ${size}B))"
    else
        echo "❌ veeduway-logo.png: PLACEHOLDER ($size bytes, $type)"
        echo "   → Replace with actual VeeduWay logo image"
    fi
else
    echo "❌ veeduway-logo.png: MISSING"
fi

echo ""
echo "=== Other Solution Stage Images ==="
for img in Planning Permits quality Completion; do
    if [ -f "public/${img}.png" ]; then
        size=$(stat -f%z "public/${img}.png" 2>/dev/null || echo 0)
        if [ "$size" -gt 10000 ]; then
            echo "✅ ${img}.png: OK"
        else
            echo "⚠️  ${img}.png: Small file ($size bytes)"
        fi
    fi
done
