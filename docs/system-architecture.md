# System Architecture

## Overview

CreatorIQ follows a client-server architecture.

The system consists of three main layers:

1. Frontend
2. Backend
3. Database

## Architecture Components

### 1. Frontend

The frontend is developed using React.js.

Responsibilities:

- User Interface
- Login and Registration
- Creator Dashboard
- Analytics Visualization
- Charts and KPI Cards

### 2. Backend

The backend is developed using FastAPI.

Responsibilities:

- User Authentication
- Role-Based Access Control
- Analytics Data Processing
- API Development
- Database Communication

### 3. Database

PostgreSQL is used as the primary database.

The database stores:

- User Information
- User Roles
- Content Data
- Analytics Data

## System Workflow

User
↓
React Frontend
↓
FastAPI Backend
↓
Authentication and Analytics APIs
↓
PostgreSQL Database
↓
FastAPI Backend
↓
React Dashboard

## Milestone 1 Architecture

For Milestone 1, the system will implement:

- React frontend initialization
- FastAPI backend initialization
- PostgreSQL database design
- User authentication
- Role-based access control
- Creator dashboard
- Analytics visualization using sample data
