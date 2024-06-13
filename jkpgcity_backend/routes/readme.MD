# Routes
This directory contains all the routes for the application. Each route is a separate file that is imported into the main server file, each version of the API has its own directory. It helps to keep the codebase clean and organized.

## Structure
Each route file should export a function that takes the express app as an argument and sets up the routes for that file. This function should be called in the main server file.

```bash
routes
├── v1
│   ├── DistributeRoutes.js
│   ├── UserRoutes.js
│   ├── VenueRoutes.js
    └── NewsRoutes.js
```





