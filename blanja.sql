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
    profile_picture TEXT NULL,
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
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE products (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    category_id VARCHAR(64) NOT NULL,
    seller_id VARCHAR(64) NOT NULL,
    name VARCHAR(50) NOT NULL,
    price INT(10) NOT NULL,
    product_condition VARCHAR(50) NOT NULL,
    stock INT(100) NOT NULL,
    description TEXT NOT NULL,
    image1 TEXT NOT NULL,
    image2 TEXT NOT NULL,
    image3 TEXT NOT NULL,
    image4 TEXT NOT NULL,
    image5 TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES product_category(id)
    ON DELETE RESTRICT,
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
    ON DELETE CASCADE
);

CREATE TABLE payment_methods (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    logo TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE orders (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL,
    address_id VARCHAR(64) NOT NULL,
    payment_method_id VARCHAR(64) NOT NULL,
    status ENUM('Pending', 'Success'),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE RESTRICT,
    FOREIGN KEY (address_id) REFERENCES addresses(id)
    ON DELETE RESTRICT,
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
    ON DELETE RESTRICT
);

CREATE TABLE customer_bags (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    order_id VARCHAR(64) NULL,
    total_price INT(10) NOT NULL,
    total_quantity INT(10) NOT NULL,
    status ENUM('Pending', 'Success'),
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE RESTRICT
);


CREATE TABLE bag_item (
    id VARCHAR(64) NOT NULL PRIMARY KEY,
    customer_bags_id VARCHAR(64) NULL,
    product_id VARCHAR(64) NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(20) NULL,
    quantity INT(10) NOT NULL,
    status ENUM('Pending', 'Success'),
    FOREIGN KEY (customer_bags_id) REFERENCES customer_bags(id)
    ON DELETE RESTRICT,
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE RESTRICT
);





-- product id, category id, seller id, name, price, amount, size, color

