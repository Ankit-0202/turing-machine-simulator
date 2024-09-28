# Makefile for Turing Machine Simulator

# Directories
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Virtual Environment
VENV_DIR=$(BACKEND_DIR)/venv

# Shell
SHELL := /bin/bash

.PHONY: all run backend frontend install install-backend install-frontend build-executable stop

# Default target
all: run

# Install all dependencies
install: install-backend install-frontend

# Install backend dependencies
install-backend:
	@echo "Setting up backend environment..."
	@cd $(BACKEND_DIR) && python3 -m venv venv
	@echo "Activating virtual environment and installing backend dependencies..."
	@source $(VENV_DIR)/bin/activate && pip install -r requirements.txt

# Install frontend dependencies
install-frontend:
	@echo "Installing frontend dependencies..."
	@cd $(FRONTEND_DIR) && npm install

# Run both backend and frontend concurrently
run:
	@echo "Starting backend and frontend..."
	@cd $(BACKEND_DIR) && source venv/bin/activate && python app.py & \
	cd $(FRONTEND_DIR) && npm start & \
	wait

# Run backend only
backend:
	@echo "Starting backend..."
	@cd $(BACKEND_DIR) && source venv/bin/activate && python app.py

# Run frontend only
frontend:
	@echo "Starting frontend..."
	@cd $(FRONTEND_DIR) && npm start

# Build the executable
build-executable:
	@echo "Building the frontend..."
	@cd $(FRONTEND_DIR) && npm run build
	@echo "Copying frontend build to backend static directory..."
	@rm -rf $(BACKEND_DIR)/static && cp -R $(FRONTEND_DIR)/build $(BACKEND_DIR)/static
	@echo "Installing PyInstaller..."
	@cd $(BACKEND_DIR) && source venv/bin/activate && pip install pyinstaller
	@echo "Building the backend executable with PyInstaller..."
	@cd $(BACKEND_DIR) && source venv/bin/activate && pyinstaller --onefile app.py
	@echo "Executable built successfully. You can find it in $(BACKEND_DIR)/dist/app"
	@echo "Please upload the executable to GitHub Releases for users to download."

# Stop all background processes
stop:
	@echo "Stopping all background processes..."
	@pkill -f "python app.py"
	@pkill -f "npm start"
	@echo "All processes stopped."
