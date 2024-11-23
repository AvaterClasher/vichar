# Vichar Backend

**Vichar** is a backend service for managing user-authored posts, with features such as authentication, CRUD operations for posts, and user-post associations. Built with **Node.js**, **Express**, and **Sequelize**, it uses **PostgreSQL** as the database and includes a **Dockerized** setup for local development.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
5. [Database Models](#database-models)
6. [Contributing](#contributing)
7. [License](#license)
8. [Contact](#contact)

## Features

- **User Authentication**:
  - Secure sign-up and login using hashed passwords.
  - JWT-based token authentication.

- **Post Management**:
  - Create, update, delete, and fetch posts.
  - Filter posts by author or tags.
  - Fetch detailed post information by ID.

- **Dockerized Setup**:
  - Easily spin up a local PostgreSQL database using Docker Compose.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- PostgreSQL (optional for production environments)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/AvaterClasher/vichar.git
   cd vichar/backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=5000
   JWT_SECRET=<your-secret>
   DB_URL=postgres://admin:admin@localhost:5432/blogdb
   ```

4. Start the database (if not using Docker):

   ```bash
   docker-compose up -d
   ```

5. Start the server:

   ```bash
   npm run dev
   ```

## Project Structure

```
src
│   server.js          # Main application entry point
│   swagger.js         # Swagger documentation setup
│   swagger.json       # OpenAPI spec for API documentation
│
├── config
│       database.js    # Sequelize database configuration
│
├── logger
│       index.js       # Custom logger setup
│
├── middleware
│       debug.js       # Middleware for debugging requests
│       verify.js      # JWT verification middleware
│
├── models
│       index.js       # Model associations and initialization
│       post.js        # Post model definition
│       user.js        # User model definition
│
└── routes
        auth.js        # Authentication routes
        post.js        # Post management routes
```

## API Endpoints

### **Authentication**

- **POST /auth/signup**  
  Register a new user.  
  **Body**: `{ email, username, password }`  
  **Response**: `{ id, email, username, token }`

- **POST /auth/login**  
  Login for existing users.  
  **Body**: `{ email, password }`  
  **Response**: `{ id, email, username, token }`

---

### **Posts**

- **POST /posts**  
  Create a new post (requires authentication).  
  **Headers**: `Authorization: Bearer <token>`  
  **Body**: `{ title, content, tag, bannerImageLink, description }`

- **GET /posts**  
  Fetch all posts or filter by author.  
  **Query Params**: `author=<authorId>`  

- **GET /posts/tag/:tag**  
  Fetch posts filtered by tag.  

- **GET /posts/:postId**  
  Fetch detailed information about a specific post.  

- **PUT /posts/:postId**  
  Update an existing post (authenticated).  

- **DELETE /posts/:postId**  
  Delete a post by ID (authenticated).

## Database Models

### User

| Field         | Type    | Description                |
|---------------|---------|----------------------------|
| id            | UUID    | Primary key               |
| email         | String  | Unique user email         |
| username      | String  | Unique username           |
| passwordHash  | String  | Hashed password           |

### Post

| Field            | Type    | Description                |
|------------------|---------|----------------------------|
| id               | UUID    | Primary key               |
| title            | String  | Post title                |
| description      | Text    | Short post description    |
| content          | Text    | Full post content         |
| bannerImageLink  | String  | Image URL (default set)   |
| tag              | String  | Post tags for filtering   |
| authorId         | UUID    | Foreign key to User       |

## Contributing

Contributions are welcome! Please submit issues or pull requests for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, feel free to reach out via GitHub or email.