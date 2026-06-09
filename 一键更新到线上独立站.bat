@echo off
echo ===================================================
echo             Beefey Apparel B2B Site Auto-Update
echo ===================================================
echo.
echo [1/3] Scanning and preparing files...
git add .
echo.
echo [2/3] Committing changes...
git commit -m "feat: Upgrade independent store to new multi-page template"
echo.
echo [3/3] Pushing to GitHub... (Please check for popup windows!)
git push origin main
echo.
echo ===================================================
echo Success! Push Completed!
echo Vercel will rebuild and publish your site in 10-20 seconds.
echo Live website: https://www.beefeyapparel.com
echo ===================================================
echo.
pause
