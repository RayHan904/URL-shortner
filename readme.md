# URL Shortener API

## Overview

This is a URL shortener API developed using PostgreSQL, Node.js, and Express.js. The API allows users to shorten long URLs, track the number of clicks on each short URL, and provides analytics data.

## Features

- Shorten long URLs into unique short codes.
- Track the number of clicks on each short URL.
- View analytics data including device types, operating systems, countries, cities, and browser types.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Typescript

## Getting Started

## Prerequisites

- Node.js installed
- PostgreSQL database

## Installation

- Clone the repository:

  ```bash
  git clone https://github.com/RayHan904/URL-shortner
  ```

- Install dependencies:

  ```bash
  npm install
  ```


- Run Server:

```bash
npm run dev
```

## API Endpoints

For API documentation, visit OpenAPI docs : https://url-shortner-api-7cp2.onrender.com/api-docs

token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJyZWhhbjk5QGdtYWlsLmNvbSIsImlhdCI6MTcwMDYxOTI1Nn0.RIbdPq-bXKn0FcaRSXw5h09fDKcvF-4bW_cY69ukXg8

(Note: you might have to use the bearer token provided for authorization)

## Configuration

Database: Configure your PostgreSQL database in the .env file.
Port: By default, the server runs on port 8000. You can change it in the .env file.

## License

This project is licensed under the MIT License.
