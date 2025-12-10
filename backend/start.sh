#!/bin/bash
# Backend server start script for Linux/Mac

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Install dependencies if needed
if [ ! -d "venv" ] || [ ! -f "venv/bin/activate" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Start server
echo "Starting GENE-Q Backend API Server on port 8005..."
uvicorn main:app --reload --host 0.0.0.0 --port 8005

