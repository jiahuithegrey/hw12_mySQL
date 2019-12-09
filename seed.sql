DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT(30) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
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

-- Build Table department
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Sales");

-- Build Table role
INSERT INTO role (tile, salary, department_id)
VALUES ("Lead Engineer", 150000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Software Engineer", 120000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Legal Team Lead", 250000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Lawyer", 190000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Sales Lead", 100000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Salesperson", 80000, ???);
INSERT INTO role (tile, salary, department_id)
VALUES ("Accountant", 125000, ???);

-- Build Table employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", "Lead Engineer", 1, ?);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hermione", "Granger", "Lead Engineer", 2, ?);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Weasley", "Lead Engineer", 3, ?);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Neville", "Longbottom", "Software Engineer", 3, ?);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Albus", "Dumbledore", "Legal Team Lead", 4, ?);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sirius", "Black", "Lawyer", 5, ?);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Weasley", "Sales Lead", 6, ?);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Weasley", "Salesperson", 7, ?);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ginny", "Weasley", "Accountant", 8, ?);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
