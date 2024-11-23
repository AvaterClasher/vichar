# Vichar

**Vichar** is a complete platform for managing and interacting with user-authored posts. It comprises a **backend service** for authentication, authorization, and CRUD operations, and a **frontend interface** for users to explore, write, and manage posts. Built with scalability and modern best practices in mind, Vichar offers seamless integration between its frontend and backend components.

## Table of Contents

1. [Features](#features)  
2. [Repositories](#repositories)  
3. [Getting Started](#getting-started)  
4. [Architecture](#architecture)  
5. [License](#license)  
6. [Contact](#contact)  

## Features

### Backend

- User authentication and JWT-based authorization.
- RESTful APIs for CRUD operations on posts.
- Database integration with PostgreSQL using Sequelize.
- Relational data handling (Users and Posts).
- Dockerized setup for development and deployment.

For detailed backend documentation, visit the [Vichar Backend README](./backend/README.md).

### Frontend

- A responsive UI built with Next.js 14 and React Server Components.
- Dynamic routing for blogs using slugs.
- Authentication and role-based access for user actions.
- Blog editor and dashboard for managing posts.
- Support for dark mode and reusable UI components.

For detailed frontend documentation, visit the [Vichar Frontend README](./frontend/README.md).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional for backend database)

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/AvaterClasher/vichar.git
   cd vichar
   ```

2. **Run Backend**:
   - Navigate to the `backend/` directory:
     ```bash
     cd backend
     ```
   - Follow the instructions in the [Backend README](./backend/README.md).

3. **Run Frontend**:
   - Navigate to the `frontend/` directory:
     ```bash
     cd frontend
     ```
   - Follow the instructions in the [Frontend README](./frontend/README.md).

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For queries or suggestions, feel free to reach out via [GitHub](https://github.com/AvaterClasher) or [Linkedin](https://linkedin.com/in/soumyadip-moni).