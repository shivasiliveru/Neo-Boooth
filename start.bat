@echo off
cd /d "%~dp0"
echo Starting NeoBooth server...
npx -y serve -s dist -l 3000
pause