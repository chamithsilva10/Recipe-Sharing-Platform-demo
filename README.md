# Recipe Sharing Platform

Welcome to the Recipe Sharing Platform! This project enables users to share, explore, and manage recipes effortlessly.

## Features

- Secure user authentication and profile management.
- Create, update, and delete recipes.
- Search and filter recipes by ingredients, cuisine, or category.
- Interact with recipes through likes, comments, and saving favorites.
- Fully responsive design for both mobile and desktop.

## Prerequisites

Ensure the following are installed before running the project:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (for database)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/recipe-sharing-platform.git
    cd recipe-sharing-platform
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory with the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## How to Run

1. Launch the backend server:
    ```bash
    npm run server
    ```

2. Start the frontend:
    ```bash
    npm run client
    ```

3. Access the application in your browser:
    ```
    http://localhost:3000
    ```

## Scripts

- `npm run dev`: Runs both backend and frontend in development mode.
- `npm run server`: Starts the backend server.
- `npm run client`: Starts the frontend development server.
- `npm run build`: Builds the frontend for production.

## Folder Structure

```
Recipe-Sharing-Platform/
├── backend/        # Backend code (Node.js, Express)
├── frontend/       # Frontend code (React.js)
├── .env            # Environment variables
├── package.json    # Project dependencies
└── README.md       # Project documentation
```

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to your branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.



## Contact

For any questions or feedback, feel free to reach out:

- Email: chamithsilva10@gmail.com
- GitHub: [your-username](https://github.com/chamithsilva10)

Happy cooking and sharing! 🍳