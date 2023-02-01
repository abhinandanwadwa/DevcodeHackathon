CREATE DATABASE devcode;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    email_id VARCHAR(255),
    password VARCHAR(255),
    imageURI VARCHAR(255)
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    languages VARCHAR[],
    repoName VARCHAR(255),
    repoLink VARCHAR(255),
    level VARCHAR(255),
    image_url VARCHAR(255),
    click VARCHAR(255),
    likedBy VARCHAR[]
);