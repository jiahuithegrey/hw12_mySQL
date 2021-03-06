DROP DATABASE IF EXISTS employeesDB;
CREATE database employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INT(30) AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT(30) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NULL,
  department_id INT(20) NOT NULL,
  PRIMARY KEY (id)
 
);

CREATE TABLE employee (
  employee_id INT(30) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(30),
  manager_id INT(30) NULL,
  PRIMARY KEY (employee_id)
);

-- Build Table department
INSERT INTO department (department_name)
VALUES ("Engineering");
INSERT INTO department (department_name)
VALUES ("Finance");
INSERT INTO department (department_name)
VALUES ("Legal");
INSERT INTO department (department_name)
VALUES ("Sales");

-- Build Table role
INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 120000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 190000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 125000, 4);

-- Build Table employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Harry", "Potter", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ron", "Weasley", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Albus", "Dumbledore", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sirius", "Black", 4, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Weasley", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("George", "Weasley", 6, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Luna", "Lovegood", 7, null);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT first_name, last_name, role_id FROM employee 
INNER JOIN role ON role.id = employee.role_id;

