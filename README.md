StockMaster Full-Stack Inventory Management System

This repository contains the complete codebase for the StockMaster Inventory Management System (IMS), featuring a React/Vite frontend and a Node.js/Express backend connected to a PostgreSQL database.

🚀 Setup & Installation

This project requires two separate services (frontend and backend) to be run concurrently.

Prerequisites

Node.js (v18+)

npm (or yarn/pnpm)

PostgreSQL Database instance

1. Backend Setup

The backend handles all data storage, processing, and API endpoints.

A. Environment Configuration

Navigate to the backend directory. Create a file named .env and configure the following variables. Note that the backend runs on port 5001.

# Server Configuration

PORT=5001
FRONTEND_URL=http://localhost:5173 # Must match your frontend development port

# PostgreSQL Database Credentials

DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=stockmaster_db
DB_PASSWORD=your_password
DB_PORT=5432

B. Run Backend

Install dependencies:

cd backend
npm install

Start the server (this also runs database migration to create the usersRole table):

npm run dev

The API will be accessible at http://localhost:5001/api.

2. Frontend Setup

The frontend is a single-page application (SPA) built with React and Tailwind CSS.

A. API Configuration

Navigate to the frontend directory. Ensure that the API base URL in your frontend files (like Login.jsx) points to the correct backend port:

// In Login.jsx and other API service files
const API_BASE_URL = "http://localhost:5001/api";

B. Run Frontend

Install dependencies (including necessary React icons, if applicable):

cd frontend
npm install react-router-dom axios

# If using external icon packs: npm install react-icons

Start the development server (default port is usually 5173):

npm run dev

The frontend application should now be accessible in your browser, and it will be able to communicate with the backend on port 5001.

📂 Backend Project Structure

The API follows a standard layered architecture:

Directory/File

Role

config/db.js

PostgreSQL connection pool setup.

data/createUserTable.js

Initial database schema creation.

middleware/errorhandler.js

Centralized error handling.

model/

Data/Service Layer (DB interaction, business logic, mock data).

controller/

Controller Layer (API route handlers, request validation).

routes/

Routing Layer (Defines URL paths and maps to controllers).

index.js

Main entry point and router registration.

🔑 Full API Endpoints Reference

All API endpoints are prefixed with /api.

1. User Management (/api)

Module

Method

Endpoint

Description

Auth

POST

/api/user

Register a new user.

Auth

POST

/api/login

Authenticate user credentials.

Users

GET

/api/user/:id

Fetch a single user by loginId.

Users

PUT

/api/user/:id

Update user password.

2. Dashboard Module (/api/dashboard)

Module

Method

Endpoint

Description

Data

GET

/api/dashboard

Fetches all KPIs, move history, alerts, and inventory snapshots.

3. Products Module (/api/products)

Module

Method

Endpoint

Description

CRUD

GET

/api/products

Retrieves a list of all products.

Filters

GET

/api/products/filters

Retrieves category, warehouse, and status filters.

CRUD

POST

/api/products

Creates a new product record.

CRUD

PUT

/api/products/:id

Updates an existing product record.

CRUD

DELETE

/api/products/:id

Deletes a product record.

4. Receipts Module (/api/receipts)

Manages the workflow for incoming goods and shipments.

Module

Method

Endpoint

Description

Data

GET

/api/receipts

Retrieves the list of all inbound receipts.

Data

GET

/api/receipts/auxdata

Retrieves auxiliary data (Suppliers, Statuses) for forms.

Detail

GET

/api/receipts/:id

Retrieves detailed information for a specific receipt (line items, logs).

CRUD

POST

/api/receipts

Creates a new receipt (saved as 'Draft').

Status

PUT

/api/receipts/status/:id

Updates the status of a receipt (Requires { "newStatus": "Waiting" } in body).

CRUD

DELETE

/api/receipts/:id

Deletes a receipt document.
