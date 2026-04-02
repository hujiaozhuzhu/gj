#!/bin/bash
# Quick verification script for CVE-2025-29927-POC

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║   CVE-2025-29927-POC Quick Setup                      ║"
echo "║                                                            ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Check if running in correct directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

# Check Python
echo "📦 Checking Python installation..."
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    echo "✅ Python installed: $PYTHON_VERSION"
else
    echo "❌ Python 3 not found. Please install Python 3.8+"
    exit 1
fi

# Check pip
echo ""
echo "📦 Checking pip..."
if command -v pip3 &> /dev/null; then
    echo "✅ pip installed"
else
    echo "❌ pip not found"
    exit 1
fi

# Install dependencies
echo ""
echo "📦 Installing Python dependencies..."
pip3 install -q -r requirements.txt
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check Docker
echo ""
echo "🐳 Checking Docker installation..."
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version | cut -d' ' -f3 | cut -d',' -f1)
    echo "✅ Docker installed: $DOCKER_VERSION"
    HAS_DOCKER=true
else
    echo "⚠️  Docker not found (optional for target environment)"
    HAS_DOCKER=false
fi

# Check Docker Compose
echo ""
echo "🐳 Checking Docker Compose..."
if command -v docker-compose &> /dev/null; then
    echo "✅ Docker Compose installed"
    HAS_COMPOSE=true
else
    echo "⚠️  Docker Compose not found (optional for target environment)"
    HAS_COMPOSE=false
fi

# Set permissions on exploit scripts
echo ""
echo "🔐 Setting permissions on exploit scripts..."
chmod +x exploit/*.py
echo "✅ Permissions set"

# Summary
echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                     SETUP SUMMARY                                ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║ ✅ Python: $PYTHON_VERSION                                    ║"
echo "║ ✅ Dependencies: Installed                                      ║"
echo "║ ✅ Exploit scripts: Executable                               ║"
if [ "$HAS_DOCKER" = "true" ]; then
    echo "║ ✅ Docker: $DOCKER_VERSION                                     ║"
else
    echo "║ ⚠️  Docker: Not installed (optional)                      ║"
fi
if [ "$HAS_COMPOSE" = "true" ]; then
    echo "║ ✅ Docker Compose: Installed                                  ║"
else
    echo "║ ⚠️  Docker Compose: Not installed (optional)               ║"
fi
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Next steps
echo "📚 NEXT STEPS:"
echo ""
echo "1. Setup Vulnerable Environment:"
if [ "$HAS_DOCKER" = "true" ] && [ "$HAS_COMPOSE" = "true" ]; then
    echo "   cd target && docker-compose up -d"
    echo "   Then visit http://localhost:3000"
else
    echo "   cd target"
    echo "   npm install"
    echo "   npm run dev"
    echo "   Then visit http://localhost:3000"
fi
echo ""
echo "2. Test Vulnerability:"
echo "   python exploit/cve_2025_29927.py -u http://localhost:3000"
echo ""
echo "3. Read Documentation:"
echo "   - Quick start: README.md"
echo "   - Usage guide: docs/usage_guide.md"
echo "   - Vulnerability analysis: docs/vuln_analysis.md"
echo "   - Defense and remediation: docs/defense.md"
echo ""
echo "4. Batch Scanning (optional):"
echo "   python exploit/batch_scanner.py -f targets.txt"
echo ""
echo "⚠️  LEGAL DISCLAIMER:"
echo "   This tool is for authorized security testing ONLY."
echo "   Use only on systems you own or have explicit permission to test."
echo "   Unauthorized access is illegal and unethical."
echo ""
