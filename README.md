
Built by https://www.blackbox.ai

---

# Cromi E-commerce Website

## Project Overview
Cromi E-commerce Website is a Node.js-based application designed for managing an e-commerce platform. This project serves static content and provides API endpoints for login, order management, and fetching product data.

## Installation
To run the Cromi E-commerce application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cromi-ecommerce.git
   cd cromi-ecommerce
   ```

2. **Install the dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   You can start the server using either of the following commands:
   - For production:
     ```bash
     npm start
     ```
   - For development (with auto-reload):
     ```bash
     npm run dev
     ```

The application will be available at `http://localhost:8000`.

## Usage
After starting the application, you can interact with it using a web browser or an API client (like Postman or cURL) via the following routes:

- **Static Files**: Serves static content (HTML, CSS, JS files) from the `public` directory.
- **Products Data**: Fetch available products from `/data/products.json`.
- **Login**: Authenticate as an admin via POST request to `/api/login` with the following payload:
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Logout**: Logout from the admin session by sending a POST request to `/api/logout`.
- **Orders**:
  - GET `/api/orders`: Retrieve all orders (requires admin authentication).
  - POST `/api/order`: Place a new order with body payload containing order details.

## Features
- JSON body parsing for incoming requests.
- CORS enabled for cross-origin requests.
- Static file serving with content type handling for JSON files.
- Basic admin authentication for managing orders.
- Error handling for various endpoints.

## Dependencies
Cromi E-commerce project relies on the following Node.js packages:
- **Express**: Web framework for building applications.
- **Body-parser**: Middleware for parsing request bodies.
- **Express-session**: Middleware for managing sessions.

Here’s the list of dependencies from `package.json`:
```json
"dependencies": {
  "body-parser": "^1.20.3",
  "express": "^4.21.2",
  "express-session": "^1.18.1"
},
"devDependencies": {
  "nodemon": "^2.0.22"
}
```

## Project Structure
The project has the following structure:
```
cromi-ecommerce/
│
├── public/                  # Static files (HTML, CSS, JS)
│   └── data/
│       └── products.json   # Example product data
│
├── data/                    # Data storage (orders.json)
│   └── orders.json         
│
├── server.js                # Main server file
├── package.json             # Project metadata and dependencies
└── package-lock.json        # Dependency tree
```

## License
This project is licensed under the MIT License.

---

For additional information and contributions, please refer to the [Contributing](#) section.