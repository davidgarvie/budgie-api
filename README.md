# Budgie API

A simple API which manages a list of transactions

## Running Locally

### With Docker

```sh
make up (development config)
make up-prod (production config)
```

### Without Docker

The application requires a connection string to a Mongo database. The application expects the following environment variables to be specified. Some default values have been included for illustration

```
PORT=4000
MONGO_URI=mongodb://localhost:27017
```

```sh
npm install
npm start
```
