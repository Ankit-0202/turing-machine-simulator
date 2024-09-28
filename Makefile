# Makefile for Turing Machine Simulator

# Directories
BACKEND_DIR=backend
FRONTEND_DIR=frontend

# Virtual Environment
VENV_DIR=$(BACKEND_DIR)/venv

# Shell
SHELL := /bin/bash

.PHONY: all run backend frontend install install-backend install-frontend stop build-executable clean-executable

# Default target
all: run

# Install all dependencies
install: install-backend install-frontend

# Install backend dependencies
install-backend:
	@echo "Setting up backend environment..."
	@cd $(BACKEND_DIR) && python3 -m venv venv
	@echo "Activating virtual environment and installing backend dependencies..."
	@source $(VENV_DIR)/bin/activate && pip install -r $(BACKEND_DIR)/requirements.txt

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

# Stop all background processes
stop:
	@echo "Stopping all background processes..."
	@pkill -f "python app.py"
	@pkill -f "npm start"
	@echo "All processes stopped."

# Build the executable for distribution
build-executable: install-backend install-frontend
	@echo "Building frontend..."
	@cd $(FRONTEND_DIR) && npm run build
	@echo "Copying frontend build to backend's static directory..."
	@rm -rf $(BACKEND_DIR)/static && cp -r $(FRONTEND_DIR)/build $(BACKEND_DIR)/static
	@echo "Packaging backend with frontend into an executable..."
	@cd $(BACKEND_DIR) && source venv/bin/activate && pyinstaller --onefile --hidden-import=_socket --hidden-import=_posixsubprocess app.py
	@echo "Executable built successfully. Check the 'dist' folder inside the backend directory."

# Run the executable
run-executable:
	./backend/dist/app

# Clean the executable build files
clean-executable:
	@echo "Cleaning up executable build files..."
	@rm -rf $(BACKEND_DIR)/dist
	@rm -rf $(BACKEND_DIR)/build
	@rm -rf $(BACKEND_DIR)/__pycache__
	@rm -rf $(BACKEND_DIR)/*.spec
	@echo "Cleaned up successfully."

# Clean the executable build files
full-build: clean-executable build-executable run-executable