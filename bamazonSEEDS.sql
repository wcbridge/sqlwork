DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE inventory (
  id INT NOT NULL AUTO_INCREMENT,
  item VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO inventory (item, price, stock)
VALUES ("thing1", 5, 100), ("thing2", 3, 100), ("redfish", 5, 100), ("bluefish", 3, 100), ("catw/hat", 3, 100), ("lorax", 3, 100), ("horton", 3, 100), ("who", 3, 100), ("yurtle", 3, 100), ("sneetchw/star", 3, 100), ("sneetchw/ostar", 3, 100);