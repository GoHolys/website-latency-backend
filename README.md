# Website Latency Monitor API

This project is an Express-based application designed to conduct regular latency checks for each monitored website according to user-defined intervals. 

## Functionalities

- **Latency Checks**: The application conducts regular latency checks for each monitored website according to user-defined intervals.
- **API**: The application implements an API that supports CRUD (Create, Read, Update, Delete) operations for updating website data and latency settings.

## API Endpoints

- `GET /latency/websites`: Fetch all monitored websites.
- `POST /latency/websites`: Add a new website to the monitoring list.
- `PUT /latency/websites/`: Update details of a specific website.
- `DELETE /latency/websites/:websiteId`: Remove a website from the monitoring list.

## Getting Started

To get started with this project:

1. Clone the repository
2. Install dependencies with `npm install`.
3. Start the development server with `npm start`.

