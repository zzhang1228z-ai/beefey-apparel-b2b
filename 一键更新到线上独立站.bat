@echo off
chcp 65001 >nul
echo ===================================================
echo             Beefey Apparel 独立站一键更新系统
echo ===================================================
echo.
echo [1/3] 正在准备更新文件 (index.html, style.css)...
git add index.html style.css
echo.
echo [2/3] 正在记录本次更新提交...
git commit -m "Upgrade homepage and styles to B2B optimized template v1.1"
echo.
echo [3/3] 正在向 GitHub 仓库推送... (如果弹出登录窗口，请按提示完成授权)
git push origin main
echo.
echo ===================================================
echo 恭喜您！推送完成！
echo Vercel 将在 10-20 秒内自动检测变动并完成线上独立站发布。
echo 您的在线网址：https://www.beefeyapparel.com
echo ===================================================
echo.
pause
