var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1990Lucky",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  start();
});

//a constructor function or a class to organize all functions?
function start(){
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employees",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee manager",
            "Exit"
        ]
    })
    .then(function(answer){
        switch (answer.action){
            case "View All Employees":
                viewAllEmp();
                break;
            case "View All Employees By Department":
                viewEmpByDep();
                break;
            case "View All Employees By Manager":
                viewEmpByMan();
                break;
            case "Add Employee":
                addEmp();
                break;
            case "Remove Employee":
                removeEmp();
                break;
            case "Update Employee Role":
                updateEmpRole();
                break;
            case "Update Employee Manager":
                updateEmpMan();
                break;
            case "Exit":
                connection.end();
                break;
            // * Delete departments, roles, and employees
            // * View the total utilized budget of a department -- 
            //   ie the combined salaries of all employees in that department
        }
    });
}
function viewAllEmp(){
    return consoleTable;
}
function addEmp(){
    inquirer
    .prompt(
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: 
            [
                "Salesperson",
                "Lead Engineer",
                "Software Engineer",
                "Account NavigationPreloadManager",
                "Accountant",
                "Legal Team Lead"
            ]
        },
        {
            name: "manager",
            type: "list",
            message: "Who is the employee's manager?"
            choices:
            []
        }
    )
    console.log("Added ${answear.person} to the database.");
    start();
    }

function removeEmp(){
    inquirer
    .prompt({
        name: "personToRemoved",
        type: "list",
        message: "Which employee would you like to remove?"
        choices:[]
    })
    .then(function(answer){

    })
    console.log("Removed employee from the database.")
    start();
}
function updateEmpMan(){
    inquirer.prompt(
        {
            name: "employee",
            type: "list",
            message: "Which employee's manager do you want to update?",
            choices: 
            [
                
            ]
        },
        {
            name: "emanager",
            type: "list",
            message: "Which employee do you want to set as manager for the selected employee?",
            choices: 
            [
                
            ]
        }
    )
    console.log("Updated employee's manager");
    start();
}
