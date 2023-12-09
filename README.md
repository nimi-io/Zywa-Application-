# Transaction Report Endpoint - User Guide

Your README file is normally the first entry point to your code. It should tell people why they should use your module, how they can install it, and how they can use it. Standardizing how you write your README makes creating and maintaining your READMEs easier. Great documentation takes work!

<!-- This repository contains: -->

## Features and Description

- A basic API that accepts a period of time (two dates) and the user's email address.
- A database service that collects the relevant transactions
- A PDF generation service that takes in the above data and generates a PDF of the transaction list
- An email service that sends the above PDF to the user's email address as an attachment

Langusge: Nodejs-Typescript
Architecture: Monolithic(single service/server)
Design Pattern: Factory Method

I opted for this language primarily due to my comfort and experience with it. Despite the application not being particularly complex, the familiarity with the language allowed me to expedite the development process within the given time constraints.

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js
- npm (Node Package Manager)
- Typescript

Note: Kindly fill .env file with the neccessary information as stated in the .env.sample file

### Installation

1. Clone this repository:

   ```shell
   cd ZYWA-APPLICATION

   npm install

   npm run start:dev OR npm run start
   ```

## Endpoints

### Hello Endpoint

- **URL:** `api/v1/hello`
- **Method:** `GET`
- **Description:** Welcome to Zywa api Endpoint.
- **Query Parameters:**
  - none

### Generete transaction Pdf and send to Email enpoit

- **URL:** `api/v1/blog/posts`
- **Method:** `POST`
- **Description:** genrate transaction history pdf report and send to email
- **Request Body:**

  ```json
  {
    "email": "user4@example.com",
    "startDate": "2023-02-15T00:00:00.000Z",
    "endDate": "2023-09-03T00:00:00.000Z"
  }

  ### Description
  ```

### How it works

- #### Express Server Setup:
- - The application sets up an Express server to handle HTTP requests.

- #### API Endpoint for PDF Generation:
- - The server exposes an API endpoint (/generate_pdf) that expects a POST request with JSON payload containing user_email, start_date, and end_date.

- #### Factories for Service Creation:
- - Two factories are used (databaseFactory and reportFactory) to create instances of the PDF Generator and Database Service, respectively.

- #### Database Factory/Service:
- - The DatabaseService class handles reading transactions from a CSV file based on the provided user email and date range.

- #### Report Factory/Service:
- - The Report uses the puppereer library to create a PDF document from the fetched transactions.

- #### Email Factory/Service:
- - The Report uses the puppereer library to create a PDF document from the fetched transactions.

- #### HTTP Request Handling:
- - When a request is received at /generate_pdf, the server:
- - - Extracts parameters from the request.
- - - Uses the DatabaseServiceFactory to create a DatabaseService instance.
- - - Fetches relevant transactions from the database.
- - - Uses the PdfGeneratorFactory to create a PdfGenerator instance.
- - - Generates a PDF document using the PDF Generator.
- - - Sends the generated PDF in the to the email of the recipient .

- #### Error Handling:
- - If any error occurs during the process, the server responds with a 500 status code and an error message in JSON format.

- #### Dependencies:
- The code relies on external libraries like express for the web server, pdf-lib for PDF generation, and csv-parser for parsing CSV files.

- #### File Organization:
- - Code is organized into separate files for better readability and maintainability.