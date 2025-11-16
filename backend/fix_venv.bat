@echo off
REM Fix virtual environment script for Windows CMD

echo Removing existing virtual environment...
if exist venv rmdir /s /q venv

echo Creating new virtual environment with pip...
py -m venv venv
if errorlevel 1 (
    echo Error: Python not found. Please install Python or add it to PATH.
    echo Trying alternative: python -m venv venv
    python -m venv venv
    if errorlevel 1 (
        exit /b 1
    )
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Upgrading pip...
pip install --upgrade pip

echo Installing requirements...
pip install -r requirements.txt

echo Done! Virtual environment is ready.
echo To activate it in the future, run: venv\Scripts\activate.bat

