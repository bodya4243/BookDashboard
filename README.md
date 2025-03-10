# BookDashboard

BookDashboard is a web application for managing and visualizing book data.

## Features
- View a list of books with details
- Add new books to the collection
- Edit and delete book entries
- Search and filter books
- User authentication with JWT

## Installation

### Backend
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Build and run the Spring Boot application:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm start
   ```

## Project Structure
```
BookDashboard/
│── backend/        # Spring Boot backend
│── frontend/       # React frontend
│── database/       # Database schema and migrations
│── README.md       # Project documentation
```

## Technologies Used
- **Backend**: Java, Spring Boot, Hibernate, JWT authentication
- **Frontend**: React, TypeScript, Redux
- **Database**: PostgreSQL

## License
This project is licensed under the MIT License.
