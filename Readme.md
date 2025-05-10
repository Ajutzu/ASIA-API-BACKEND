# Server Documentation

## Overview
This is the backend server for the project, built with Node.js and Express.js. The server provides API endpoints for analytics and other functionalities.

## Project Structure
```
server/
├── controllers/     # Business logic and request handlers
├── database/        # Database configuration and connection
├── models/         # Database models and migrations
├── routes/         # API route definitions
├── server.js       # Main application entry point
└── package.json    # Project dependencies and scripts
```

## Technologies Used
- Node.js
- Express.js
- MySQL (via mysql2)
- CORS
- dotenv for environment variables
- Nodemon for development

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- MySQL Server

### Installation
1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   SERVER_PORT=3000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   ```

### Running the Server
Development mode:
```bash
npm run dev
```

## API Endpoints

### Analytics Endpoints
All analytics endpoints are prefixed with `/api/analytics`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/total-students` | GET | Get the total number of students |
| `/average-grade` | GET | Get the average grade across all students |
| `/attendance-rate` | GET | Get the overall attendance rate |
| `/top-performers` | GET | Get list of top performing students |
| `/monthly-grade-trend` | GET | Get monthly grade trends |
| `/grade-distribution` | GET | Get distribution of grades |
| `/attendance-breakdown` | GET | Get detailed attendance breakdown |
| `/performance-vs-attendance` | GET | Get correlation between performance and attendance |
| `/gender-distribution` | GET | Get gender distribution statistics |
| `/perfect-attendance` | GET | Get list of students with perfect attendance |
| `/activity-score-average` | GET | Get average activity scores |

### Response Format
All endpoints return JSON responses in the following format:
```json
{
    "success": true,
    "data": {
        // Endpoint specific data
    },
    "message": "Success message"
}
```

### Error Handling
In case of errors, the API will return:
```json
{
    "success": false,
    "error": "Error message",
    "code": "ERROR_CODE"
}
```

## Development
The server uses nodemon for development, which automatically restarts the server when changes are detected.

## Dependencies
- express: ^5.1.0
- cors: ^2.8.5
- dotenv: ^16.5.0
- mysql2: ^3.14.1
- colors: ^1.4.0
- nodemon: ^3.1.10

## License
ISC
