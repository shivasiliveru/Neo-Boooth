@echo off
cd /d "%~dp0dist"
echo Starting NeoBooth...
python -m http.server 8888