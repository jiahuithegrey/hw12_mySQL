DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT(30) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  role VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT(30) AUTO_INCREMENT NOT NULL,
  tilte VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT(30) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(30) NOT NULL,
  manager_id INT(30) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
