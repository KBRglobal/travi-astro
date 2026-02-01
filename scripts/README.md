# TRAVI Content Enhancement Strategy

## Problem
The current `common.json` files are too large (~1057 lines) for AI models to process in one request.
Models return malformed JSON or timeout.

## Solution
Split each language file into smaller sections and process them individually:

1. **nav** - Navigation (small)
2. **home** - Homepage content
3. **attractions** - Attractions page  
4. **pages.about** - About page
5. **pages.contact** - Contact page
6. etc...

## New Approach
Process each section separately and merge results.

This will be implemented in the next iteration.
