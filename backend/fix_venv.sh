#!/bin/bash
# Fix virtual environment script for Git Bash on Windows

echo "Removing existing virtual environment..."
rm -rf venv

echo "Creating new virtual environment with pip..."
# Try different Python commands (Windows Git Bash)
PYTHON_CMD=""

# Clear problematic environment variables that might cause encodings error
unset PYTHONPATH
unset PYTHONHOME

# Try to find Python in common Windows locations (use cmd.exe for Windows paths)
if [ -f "/c/Users/$USER/AppData/Local/Programs/Python/Python314/python.exe" ]; then
    PYTHON_CMD="cmd.exe //c \"C:\\Users\\$USER\\AppData\\Local\\Programs\\Python\\Python314\\python.exe\""
elif [ -f "/c/Users/$USER/AppData/Local/Programs/Python/Python312/python.exe" ]; then
    PYTHON_CMD="cmd.exe //c \"C:\\Users\\$USER\\AppData\\Local\\Programs\\Python\\Python312\\python.exe\""
elif [ -f "/c/Users/$USER/AppData/Local/Programs/Python/Python311/python.exe" ]; then
    PYTHON_CMD="cmd.exe //c \"C:\\Users\\$USER\\AppData\\Local\\Programs\\Python\\Python311\\python.exe\""
elif [ -f "C:/Python312/python.exe" ]; then
    PYTHON_CMD="cmd.exe //c \"C:\\Python312\\python.exe\""
elif command -v py &> /dev/null; then
    # Test if py command works
    if py --version &> /dev/null; then
        PYTHON_CMD="py"
    fi
elif command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
fi

if [ -z "$PYTHON_CMD" ]; then
    echo "Error: Python not found. Please install Python or add it to PATH."
    echo ""
    echo "Troubleshooting:"
    echo "1. If you see 'encodings module' error, try:"
    echo "   - Use CMD or PowerShell instead of Git Bash"
    echo "   - Or run: cmd.exe /c \"C:\\Users\\$USER\\AppData\\Local\\Programs\\Python\\Python314\\python.exe\" -m venv venv"
    echo "2. Make sure Python is properly installed"
    exit 1
fi

echo "Using Python: $PYTHON_CMD"
if [[ "$PYTHON_CMD" == cmd.exe* ]]; then
    # Use cmd.exe for Windows paths
    eval "$PYTHON_CMD -m venv venv"
else
    # Use direct command for py/python/python3
    $PYTHON_CMD -m venv venv
fi

if [ ! -d "venv" ]; then
    echo "Error: Failed to create virtual environment"
    echo "Try using CMD or PowerShell:"
    echo "  cmd.exe /c \"C:\\Users\\$USER\\AppData\\Local\\Programs\\Python\\Python314\\python.exe\" -m venv venv"
    exit 1
fi

echo "Activating virtual environment..."
source venv/Scripts/activate

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing requirements..."
pip install -r requirements.txt

echo "Done! Virtual environment is ready."
echo "To activate it in the future, run: source venv/Scripts/activate"

