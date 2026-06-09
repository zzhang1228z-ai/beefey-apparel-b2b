@echo off
echo ===================================================
echo             一键关闭 Git 梯子代理 (恢复系统直连)
echo ===================================================
echo.
git config --global --unset http.proxy
git config --global --unset https.proxy
echo.
echo ===================================================
echo  关闭成功！已恢复为默认无代理直连状态。
echo ===================================================
echo.
pause