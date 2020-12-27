CREATE DATABASE moneygoose;

CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(1) NOT NULL CHECK(gender = 'M' OR gender = 'F'),
    adminRights INTEGER NOT NULL CHECK (adminRights = 1 OR adminRights = 2),
    nationality VARCHAR(255) REFERENCES nationality(description),
    occupation VARCHAR(255) REFERENCES occupation(description),
    education VARCHAR(255) REFERENCES education(description)
);

CREATE TABLE nationality (
    description VARCHAR(255) PRIMARY KEY
);

CREATE TABLE occupation (
    description VARCHAR(255) PRIMARY KEY
);

CREATE TABLE education (
    description VARCHAR(255) PRIMARY KEY
);

CREATE TABLE userSpending (
    sid SERIAL PRIMARY KEY,
    uid INTEGER REFERENCES users(uid) NOT NULL,
    description VARCHAR(255) NOT NULL,
    dateTime DATE NOT NULL,
    category VARCHAR(255) REFERENCES spendingCategory(description)
);

CREATE TABLE spendingCategory (
    description VARCHAR(255) PRIMARY KEY
);



