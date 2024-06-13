## Description
This directory contains models that have been used in the project. 

## Structure

The models are defined using Sequelize, a promise-based ORM for Node.js. The models are defined in separate files and are stored in the `models` directory. The models are defined using the `sequelize.define` method. The models are then exported using the `module.exports` method.

The models are defined in the following structure:
````
models
     v1
       ├── News.js
       ├── NewsCategory.js
       ├── Permission.js
       ├── Role.js
       ├── User.js
       ├── Venue.js
       ├── VenueCategory.js
       └── VenueNews.js
````

## Models
- `User.js`: This file contains the schema for the user model.
- `Venue.js`: This file contains the schema for the venue model.
- `News.js`: This file contains the schema for the news model.
- `Role.js`: This file contains the schema for the rol model.
- `Permission.js`: This file contains the schema for the permission model.
- `NewsCategory.js`: This file contains the schema for the news category model.
- `VenueCategory.js`: This file contains the schema for the venue category model.
- `VenueNews.js`: This file contains the schema for the venue news model.

## Usage
These models are used to define the structure of the data that is stored in the database. They are used to create, read, update and delete data from the database.

## Contributing
To contribute to this project, please create a new branch and submit a pull request. 

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

