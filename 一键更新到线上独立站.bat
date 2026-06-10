@echo off
echo ===================================================
echo             Beefey Apparel B2B Site Auto-Update
echo ===================================================
echo.

:: Detect Windows System Proxy automatically
set "SYSTEM_PROXY="
for /f "tokens=3" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer 2^>nul') do set "SYSTEM_PROXY=%%a"

if not "%SYSTEM_PROXY%"=="" (
    echo [System Proxy Detected: http://%SYSTEM_PROXY%]
    git config --local http.proxy http://%SYSTEM_PROXY%
    git config --local https.proxy http://%SYSTEM_PROXY%
) else (
    echo [No System Proxy Detected, using direct connection]
    git config --local --unset http.proxy
    git config --local --unset https.proxy
)
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
