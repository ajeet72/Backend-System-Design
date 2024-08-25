
# Backend System Design

This repository contains a backend system designed using Node.js, TypeScript, Prisma, PostgreSQL, Redis, Docker, Prometheus, and Grafana. The project demonstrates an efficient and scalable backend setup, including user authentication, request queueing, and monitoring.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ajeet72/Backend-System-Design.git
cd Backend-System-Design
```

### 2. Set Up PostgreSQL

Run the following command to start a PostgreSQL container locally using Docker:

```bash
sudo docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

### 3. Configure Environment Variables

Navigate to the \`node-backend\` directory and create a \`.env\` file:

```bash
cd node-backend
```

In the \`.env\` file, add the following content:

```plaintext
DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/postgres"
```

### 4. Install Node.js Dependencies

Install all necessary Node.js dependencies:

```bash
npm install
```

### 5. Set Up the Database

Use Prisma to migrate your database schema and generate the Prisma client:

```bash
npx prisma migrate dev
npx prisma generate
```

### 6. Set Up Redis

Start a Redis container locally using Docker:

```bash
sudo docker run --name my-redis -d -p 6379:6379 redis
```

### 7. Start the Docker Containers

To start the additional services defined in the Docker Compose file, run:

```bash
sudo docker-compose up -d
```

### 8. Build and Start the Project

Finally, compile the TypeScript files and start the Node.js server:

```bash
tsc -b
node dist/index.js
```

### 8. Build and Start the Project

alos we need to start worker
```bash
cd ..
cd worker
```

### 9. Build and Start the Project

Install all necessary Node.js dependencies:

```bash
npm install
```

### 10. Build and Start the Project

Finally, compile the TypeScript files and start the Node.js server:

```bash
tsc -b
node dist/index.js
```

## Accessing the Services

Once everything is running, you can access the following services:

- **Prometheus**: \`http://localhost:9090\` (for monitoring)
- **Grafana**: \`http://localhost:3000\` (for visualization, default login: \`admin\` / \`admin\`)

## Conclusion

Your backend system should now be up and running locally. If you encounter any issues, please refer to the documentation or open an issue in the repository.
