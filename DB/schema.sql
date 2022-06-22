DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

USE user_db;

CREATE TABLE customers(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(100),
    password VARCHAR(25),
    pay_day VARCHAR(25),
    monthly_income INT,
    checking INT,
    savings INT,
    credit_card INT,
    new_checking INT
    PRIMARY KEY(id)

);

CREATE TABLE bills(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    cost INT,
    due_date VARCHAR(15),
    auto_pay BOOLEAN,
    debited BOOLEAN,
    PRIMARY KEY(id)
);

-- CREATE TABLE accounts(
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(15),
--     amount INT,
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE cards(
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(15),
--     amount INT,
--     due_date VARCHAR(15),
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE debt(
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(30),
--     cost INT,
--     due_date VARCHAR(15),
--     payments INT,
--     auto_pay BOOLEAN,
--     debited BOOLEAN,
--     PRIMARY KEY(id)
-- );