var mysql = require("mysql");
var inquirer = require("inquirer");

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
                viewEmp();
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
        }
    });
}