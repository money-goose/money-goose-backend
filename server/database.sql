CREATE DATABASE moneygoose;

CREATE TABLE user (
    uid INTEGER SERIAL,
    gender INTEGER NOT NULL CHECK(gender = 1 OR gender = 2),
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    nid INTEGER REFERENCES nationality(nid),
    oid INTEGER REFERENCES occupation(oid),
    eid INTEGER REFERENCES education(eid)
)

CREATE TABLE nationality (
    nid INTEGER PRIMARY KEY,
    description VARCHAR(255) NOT NULL
)

CREATE TABLE occupation (
    oid INTEGER PRIMARY KEY,
    description VARCHAR(255) NOT NULL
)

CREATE TABLE education (
    eid INTEGER PRIMARY KEY,
    description VARCHAR(255) NOT NULL
)

CREATE TABLE userSpending (
    sid INTEGER SERIAL,
    description VARCHAR(255) NOT NULL,
    dateTime DATE NOT NULL,
    scid INTEGER REFERENCES spendingCategory(scid)
)

CREATE TABLE spendingCategory (
    scid INTEGER PRIMARY KEY,
    description VARCHAR(255) NOT NULL
)



