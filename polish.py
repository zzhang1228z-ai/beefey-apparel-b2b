import os
import re

def final_polish(path):
    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Fix broken tags from previous regex
    text = text.replace('&#9989;/span>', '&#9989;</span>')
    text = text.replace('&#9989;span>', '&#9989;<span>')
    
    # Also fix typical navigation corruption seen in screenshot
    text = text.replace('Factory&#240;&#151;&#142;&#145;', 'Factory')
    text = text.replace('Factory&#10037;', 'Factory')
    
    # Fix any remaining '?' button artifacts
    text = text.replace('&#9662;/button>', '&#9662;</button>')
    text = text.replace('&#9776;/button>', '&#9776;</button>')

    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(text)

for root, dirs, files in os.walk('.'):
    for f in files:
        if f.endswith('.html'):
            final_polish(os.path.join(root, f))
