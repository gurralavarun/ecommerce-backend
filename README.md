# E-Commerce Backend

A foundational e-commerce backend built for a technical assessment. The current implementation establishes user registration, login, JWT-based authentication, and a protected profile resource, with Sequelize managing the MySQL data model.

The project is intentionally structured to support future e-commerce capabilities without documenting unimplemented APIs as available functionality.

## Architecture

The application follows a layered Express architecture:

```text
Client
  -> Express routes
  -> Controllers
  -> Services
  -> Sequelize models
  -> MySQL
```

- **Routes** define HTTP paths and connect them to controllers.
- **Controllers** manage request and response handling.
- **Services** contain authentication business logic.
- **Middleware** validates JWTs before protected resources are accessed.
- **Models** define Sequelize entities and their relationships.
- **Configuration** provides database connectivity and initial role seeding.

## Technology Stack

- Node.js
- Express.js 5
- JavaScript (CommonJS)
- Sequelize ORM
- MySQL with `mysql2`
- JSON Web Tokens (`jsonwebtoken`)
- Password hashing with `bcrypt`
- Environment configuration with `dotenv`

## Current and Planned Backend Modules

| Module | Status | Scope |
| --- | --- | --- |
| Authentication | Implemented | User registration and login with JWT issuance |
| User profile | Implemented | Authenticated user profile retrieval |
| Role data | Implemented | `CUSTOMER` and `ADMIN` roles are initialized on startup |
| Role-based authorization | Planned | Role-specific permission checks and route guards |
| Product catalog | Planned | Product and category management |
| Cart | Planned | Customer shopping-cart operations |
| Orders | Planned | Checkout and order lifecycle management |
| Payments | Planned | Payment-provider integration and payment status handling |

## Database Entities

### `roles`

| Field | Description |
| --- | --- |
| `id` | Auto-increment primary key |
| `name` | Unique role name: `CUSTOMER` or `ADMIN` |

### `users`

| Field | Description |
| --- | --- |
| `id` | Auto-increment primary key |
| `name` | Required user name |
| `email` | Required, unique email address |
| `password` | Required bcrypt password hash |
| `roleId` | Required foreign key to `roles.id` |
| `createdAt` / `updatedAt` | Sequelize-managed timestamps |

Relationship: one `Role` has many `User` records; each `User` belongs to one `Role`.

## API Module Overview

Only the following endpoints are implemented:

| Module | Method | Path | Authentication |
| --- | --- | --- |
| Health check | `GET` | `/` | Not required |
| Authentication | `POST` | `/api/auth/register` | Not required |
| Authentication | `POST` | `/api/auth/login` | Not required |
| Users | `GET` | `/api/users/profile` | Bearer JWT required |

No product, cart, order, payment, or administration endpoints are currently implemented.

## Authentication Overview

- Registration accepts user details and stores the password as a bcrypt hash.
- New users are created with a customer role reference.
- Login validates the email and password, then returns a JWT that expires in one day.
- The token payload contains `userId` and `roleId`.
- Protected routes require an `Authorization: Bearer <token>` request header.

## Authorization Overview

Authentication middleware validates the JWT and exposes its decoded payload as `req.user`. The profile endpoint uses this middleware.

Roles are stored and seeded (`CUSTOMER`, `ADMIN`), but role-based route authorization has **not yet been implemented**. Future administrative or customer-specific routes should add explicit role checks rather than relying only on an authenticated token.

## Environment Variables

Create an `.env` file in the repository root (`ecommerce-backend/.env`) with the following variables:

```dotenv
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=ecommerce_db
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password

JWT_SECRET=replace_with_a_long_random_secret
```

| Variable | Purpose |
| --- | --- |
| `PORT` | HTTP port for the Express server; defaults to `5000` when unset |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port |
| `DB_NAME` | MySQL database name |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `JWT_SECRET` | Secret used to sign and verify JWTs |

Keep `.env` private. It is excluded from version control by `.gitignore`.

## Local Setup

Prerequisites:

- Node.js and npm
- A running MySQL server
- A MySQL database matching `DB_NAME`

1. Clone the repository and enter the project directory.

   ```bash
   cd ecommerce-backend
   ```

2. Install dependencies.

   ```bash
   npm install
   ```

3. Create and configure `.env` using the variables above.

4. Ensure the configured MySQL database already exists.

On startup, Sequelize authenticates the database connection, synchronizes the defined tables, and initializes the `CUSTOMER` and `ADMIN` roles.

## Run the Server

The repository currently has no `start` script. Run the entry point directly:

```bash
node server.js
```

On success, the API is available at `http://localhost:5000` by default.

## Test the APIs

Use Postman, Insomnia, or cURL. Replace the example values as appropriate.

### Health check

```bash
curl http://localhost:5000/
```

### Register a user

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","password":"your-password"}'
```

### Log in

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"your-password"}'
```

Copy the `token` from the login response.

### Access the profile

```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer <token>"
```

There is no automated test suite configured yet; the current `npm test` script is a placeholder. Automated unit and integration tests are planned future work.

## Swagger / OpenAPI

Swagger/OpenAPI has not yet been configured in this repository.

- **Live Swagger URL:** `TBD`

When API documentation is added, it should describe only implemented routes and be kept synchronized with route changes.

## Deployment

Deployment has not yet been configured.

- **Live backend URL:** `TBD`
- **Live Swagger URL:** `TBD`

For deployment, provide production MySQL credentials and a strong production-only `JWT_SECRET` through the hosting platform's secret-management facilities.

## Security Considerations

- Passwords are hashed with bcrypt before storage; they are not returned by registration or login responses.
- JWTs are signed with `JWT_SECRET` and protected routes reject missing, invalid, or expired tokens.
- Keep database credentials and JWT secrets out of source control.
- Use a long, random, environment-specific JWT secret in production and rotate it when needed.
- Enforce HTTPS, restrict CORS origins, add input validation, rate limiting, and security headers before exposing the API publicly.
- Add role-checking middleware before introducing privileged administrative operations.

## Project Folder Structure

```text
ecommerce-backend/
├── server.js                   # Application entry point and route registration
├── package.json                # Project metadata and dependencies
├── .env                        # Local environment configuration (not committed)
└── src/
    ├── config/
    │   ├── database.js          # Sequelize/MySQL connection configuration
    │   └── seedRoles.js         # Initial CUSTOMER and ADMIN role seeding
    ├── controllers/
    │   ├── authController.js
    │   └── userController.js
    ├── middleware/
    │   └── authMiddleware.js    # JWT validation middleware
    ├── models/
    │   ├── User.js
    │   ├── Role.js
    │   └── associations.js
    ├── routes/
    │   ├── authRoutes.js
    │   └── userRoutes.js
    └── services/
        └── authService.js       # Registration and login business logic
```
