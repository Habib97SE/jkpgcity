# Jönköping City Backend

## Description
This is the backend for the Jönköping City project. It is a RESTful API that provides data for the frontend. The backend is built with Node.js and Express.js. The database is MySQL built using Sequelize.

## Installation
1. Clone the repository

   `git clone https://github.com/Habib97SE/jkpgcity_backend.git`
    
    `cd jkpcity_backend/`
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root of the project and add the following environment variables:
   - `DB_USERNAME` - The username for the MySQL database
   - `DB_PASSWORD` - The password for the MySQL database
   - `DB_DATABASE` - The name of the MySQL database
   - `DB_HOST` - The host of the MySQL database
   - `DB_DIALECT` - The dialect of the MySQL database

## Usage
Run `npm start` to start the server. The server will start on port 3000 by default.

## Endpoints
The following endpoints are available:
- User: 
  - `GET /users` - Get all users
  - `GET /users/:id` - Get a user by id
  - `POST /users` - Create a new user
  - `PUT /users/:id` - Update a user by id
  - `DELETE /users/:id` - Delete a user by id
  - `POST /users/login` - Login a user
- Venue:
  - `GET /venues` - Get all venues
  - `GET /venues/:id` - Get a venue by id
  - `POST /venues` - Create a new venue
  - `PUT /venues/:id` - Update a venue by id
  - `DELETE /venues/:id` - Delete a venue by id

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
