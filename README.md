This is a scalable RESTful API built with Sequelize (MySQL) and Mongoose (MongoDB). It includes advanced features like database seeding, automated testing, and data validation, culminating in a fully integrated and deployable application.

## Features

- CRUD operations for users and posts
- Advanced querying (pagination, filtering, sorting)
- Database seeding with faker.js and sequelize-cli
- Automated testing with Jest
- Input validation using express-validator

## Installation

1. Clone the repository:
    
    ```
    git clone http://github.com/icywest/lab3.git
    ```
    
2. Install dependencies:
    
    ```
    npm install
    ```
    
3. Configure `.env` with database credentials.
4. Run migrations and seeders:
    
    ```
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```
    
5. Start the application:
    
    ```
    npm start
    ```
    

## API Endpoints

- `GET /users` - Retrieve users
- `POST /users` - Create a user
- `GET /posts` - Retrieve posts
- `POST /posts` - Create a post

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added feature'`)
4. Push (`git push origin feature-name`)
5. Open a pull request
