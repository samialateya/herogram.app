# Herogram

Herogram is a modern polling and voting application designed to create, manage, and interact with polls in real-time. It provides a robust backend powered by PostgreSQL and Express, with a focus on scalability and performance.

## Overview

Herogram allows users to:

- Create polls with multiple options.
- Vote on polls anonymously or with user authentication.
- Retrieve poll results and associated votes.

The application is built with TypeScript for type safety and maintainability, and it leverages Docker for containerized deployment.

## How It Works

1. Users create polls by providing a question, options, and an expiration date.
2. Polls are stored in a PostgreSQL database with a unique UUID for identification.
3. Users can vote on polls, and votes are associated with the corresponding poll.
4. Poll results and votes can be retrieved via API endpoints.

## Key Components

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL
- **Validation**: JSON Schema
- **Containerization**: Docker
- **Logging**: Pino
- **UUID Management**: `uuid` library

## Local Development

### Prerequisites

- Node.js v16+
- PostgreSQL
- Docker (optional for containerized development)

### Steps to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/herogram.git
   cd herogram
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:

   ```
   PORT=3000
   DATABASE_URL=postgres://username:password@localhost:5432/herogram
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

5. Access the application at `http://localhost:3000`.

## API Endpoints

### Polls

- **POST /polls**
  - Create a new poll.
  - **Request Body**:

    ```json
    {
      "question": "What is your favorite color?",
      "options": ["Red", "Blue", "Green"],
      "expiresAt": "2025-05-07T12:54:24"
    }
    ```

  - **Response**:

    ```json
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
    }
    ```

- **GET /polls/:uuid**
  - Retrieve a poll by UUID.
  - **Response**:

    ```json
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "question": "What is your favorite color?",
      "options": ["Red", "Blue", "Green"],
      "votes": 8,
      "expiresAt": "2025-05-07T12:54:24"
    }
    ````

### Votes

- **POST /votes**
  - Cast a vote for a poll.
  - **Request Body**:

    ```json
    {
      "pollUUID": "123e4567-e89b-12d3-a456-426614174000",
      "option": "Red",
      "userId": "device123"
    }
    ```

## Testing

Run the test suite with:

```bash
npm test
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.
