CREATE DATABASE blanja_app;
USE DATABASE blanja_app;

CREATE TABLE customers (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    gender ENUM('male', 'female') NULL,
    DOB DATE NULL,
    profile_picture TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE sellers (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    store_name VARCHAR(50) NOT NULL,
    store_description TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE addresses (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL,
    recipient_name VARCHAR(50) NOT NULL,
    recipient_phone_number VARCHAR(13) NOT NULL,
    address TEXT NOT NULL,
    postal_code INT(10) NOT NULL,
    city VARCHAR(64) NOT NULL,
    address_primary TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE
);

CREATE TABLE product_category (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE products (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    category_id VARCHAR(64) NOT NULL,
    seller_id VARCHAR(64) NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INT(10) NOT NULL,
    condition VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    image1 TEXT NOT NULL,
    image2 TEXT NOT NULL,
    image3 TEXT NOT NULL,
    image4 TEXT NOT NULL,
    image5 TEXT NOT NULL,
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
    ON DELETE CASCADE
);