CREATE DATABASE bean_database;

--\c into todo_database

CREATE TABLE bean(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description VARCHAR(255),
    image bytea
);