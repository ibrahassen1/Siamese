# Siamese

Siamese is a stock market simulation platform that lets users practice investing with virtual money. The project is being built as a full-stack application with a Spring Boot backend, PostgreSQL database, and a React frontend.

The current repository setup focuses on the backend, database, environment configuration, and CI pipeline.

## Tech Stack

- Java 21
- Spring Boot
- Spring Data JPA / Hibernate
- PostgreSQL
- Flyway
- Maven
- Docker / Docker Compose
- GitHub Actions
- React + TypeScript (frontend planned/in progress)

## Prerequisites

Before running Siamese locally, install:

- Git
- Java 21
- Maven
- Docker Desktop

Verify your installation:

```bash
git --version
java --version
mvn --version
docker --version
docker compose version
```

Docker Desktop must be running before starting the PostgreSQL container.

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/ibrahassen1/Siamese.git
cd Siamese
```

### 2. Create your local environment file

Copy the provided example:

```bash
cp .env.example .env
```

Your `.env` should contain the following variables:

```env
DB_URL=jdbc:postgresql://localhost:5432/siamese
DB_USERNAME=siamese
DB_PASSWORD=siamese_dev

POSTGRES_DB=siamese
POSTGRES_USER=siamese
POSTGRES_PASSWORD=siamese_dev

MARKET_DATA_API_KEY=
CLERK_ISSUER_URI=
```

You may choose different local database credentials, but `DB_USERNAME` must match `POSTGRES_USER`, and `DB_PASSWORD` must match `POSTGRES_PASSWORD`.

`MARKET_DATA_API_KEY` and `CLERK_ISSUER_URI` can remain empty until those integrations are required.

> Do not commit `.env`. It contains local configuration and may eventually contain secrets. The repository tracks `.env.example` instead.

### 3. Start PostgreSQL

From the repository root:

```bash
docker compose up -d
```

Check that PostgreSQL is running:

```bash
docker compose ps
```

You should see the `siamese-postgres` container with a status similar to:

```text
Up ... (healthy)
```

### 4. Load the environment variables

Spring Boot reads its database configuration from environment variables.

From the repository root:

```bash
set -a
source .env
set +a
```

Verify that the database URL was loaded:

```bash
echo "$DB_URL"
```

Expected output:

```text
jdbc:postgresql://localhost:5432/siamese
```

Environment variables must be loaded again when you open a new terminal session.

### 5. Start the backend

From the repository root:

```bash
cd backend
mvn spring-boot:run
```

When startup succeeds, the logs should contain something similar to:

```text
Started BackendApplication
```

The backend runs at:

```text
http://localhost:8080
```

## Running Tests

Make sure PostgreSQL is running and your environment variables are loaded.

From the `backend` directory:

```bash
mvn clean verify
```

A successful run should end with:

```text
BUILD SUCCESS
```

If you opened a new terminal and are already inside `backend`, reload the environment variables with:

```bash
set -a
source ../.env
set +a
```

Then run:

```bash
mvn clean verify
```

## Stopping the Local Database

From the repository root:

```bash
docker compose down
```

This stops the PostgreSQL container without deleting the database volume.

To intentionally delete the local database data as well, use:

```bash
docker compose down -v
```

Only use `-v` when you actually want to reset the local database.

## Common Issues

### `${DB_URL}` appears in a database error

If Spring reports an error similar to:

```text
Driver org.postgresql.Driver claims to not accept jdbcUrl, ${DB_URL}
```

your environment variables were not loaded.

From the repository root:

```bash
set -a
source .env
set +a
```

Or, if you are already inside `backend`:

```bash
set -a
source ../.env
set +a
```

Then restart the application.

### PostgreSQL is not running

Check:

```bash
docker compose ps
```

If the container is stopped, start it with:

```bash
docker compose up -d
```

### Port 5432 is already in use

Another PostgreSQL instance may already be using the default port.

Check what is using the port on macOS:

```bash
lsof -i :5432
```

Stop the conflicting service or update the local Docker/database configuration before starting Siamese.

## Continuous Integration

GitHub Actions automatically runs the backend build and tests when code is pushed or a pull request is opened.

The CI workflow:

1. Checks out the repository.
2. Sets up Java 21.
3. Starts a temporary PostgreSQL 16 service.
4. Provides CI database environment variables.
5. Runs:

```bash
mvn -B clean verify
```

A pull request should have a passing CI build before it is merged.

## Project Structure

```text
Siamese/
├── .github/
│   └── workflows/
│       └── ci.yml
├── backend/
│   ├── pom.xml
│   └── src/
├── docs/
├── .env.example
├── .gitignore
├── compose.yaml
├── LICENSE
└── README.md
```

## Current Development Notes

The backend and PostgreSQL development environment are currently supported locally.

The frontend setup instructions will be added once the React application is included in the repository.

## License

This project is licensed under the MIT License.
