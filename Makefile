# Makefile for Turing Machine Simulator

# ================================
#        Directory Setup
# ================================

BACKEND_DIR := backend
FRONTEND_DIR := frontend
VENV_DIR := $(BACKEND_DIR)/venv

# ================================
#           Commands
# ================================

# Python and Pip within the virtual environment
PYTHON := $(VENV_DIR)/bin/python
PIP := $(VENV_DIR)/bin/pip

# ================================
#            Shell
# ================================

SHELL := /bin/bash

# ================================
#        Phony Targets
# ================================

.PHONY: all install install-backend install-frontend run run-backend run-frontend stop clean

# ================================
#          Default Target
# ================================

# Default target to run both backend and frontend
all: run

# ================================
#        Installation Targets
# ================================

# Install all dependencies (backend and frontend)
install: install-backend install-frontend

# Install backend dependencies
install-backend:
	@echo "Setting up backend environment..."
	@if [ ! -d "$(VENV_DIR)" ]; then \
		python3 -m venv $(VENV_DIR); \
		echo "Virtual environment created at $(VENV_DIR)"; \
		echo "Installing backend dependencies..."; \
		$(PIP) install --upgrade pip; \
		$(PIP) install -r $(BACKEND_DIR)/requirements.txt; \
		echo "Backend dependencies installed."; \
	else \
		echo "Backend virtual environment already exists. Skipping creation."; \
	fi

# Install frontend dependencies
install-frontend:
	@echo "Installing frontend dependencies..."
	@cd $(FRONTEND_DIR) && npm install
	@echo "Frontend dependencies installed."

# ================================
#          Run Targets
# ================================

# Run both backend and frontend concurrently
run: run-backend run-frontend
	@wait
	@echo "Both backend and frontend have exited."

# Run backend only
run-backend:
	@echo "Starting backend..."
	@cd $(BACKEND_DIR) && $(PYTHON) app.py &
	@BACKEND_PID=$$! && echo "Backend started with PID $$BACKEND_PID"

# Run frontend only
run-frontend:
	@echo "Starting frontend..."
	@cd $(FRONTEND_DIR) && npm start &
	@FRONTEND_PID=$$! && echo "Frontend started with PID $$FRONTEND_PID"

# ================================
#           Stop Target
# ================================

# Stop all background processes (backend and frontend)
stop:
	@echo "Stopping all background processes..."
	@pkill -f "python app.py" && echo "Backend stopped." || echo "Backend was not running."
	@pkill -f "npm start" && echo "Frontend stopped." || echo "Frontend was not running."
	@echo "All processes stopped."

# ================================
#          Clean Target
# ================================

# Clean build artifacts and dependencies
clean:
	@echo "Cleaning backend environment..."
	@if [ -d "$(VENV_DIR)" ]; then \
		rm -rf $(VENV_DIR); \
		echo "Removed virtual environment."; \
	else \
		echo "Virtual environment does not exist. Skipping."; \
	fi

	@echo "Cleaning frontend environment..."
	@cd $(FRONTEND_DIR) && npm run clean

	@echo "Cleaning completed."
