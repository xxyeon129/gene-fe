@echo off
REM Backend server start script for Windows

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
) else (
    echo Creating virtual environment...
    py -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
)

REM Start server
echo Starting GENE-Q Backend API Server on port 8005...
uvicorn main:app --reload --host 0.0.0.0 --port 8005

