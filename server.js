var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1990Lucky",
  database: "employeesDB"
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
            "Add Employees",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee manager",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Exit"
        ]
    })
    .then(function(answer){
        switch (answer.action){
            case "View All Employees":
                viewAllEmp();
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
            case "View All Employees By Department":
                viewEmpByDep();
                break;
            case "View All Employees By Manager":
                viewEmpByMan();
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
// 01 "View All Employees"
function viewAllEmp(){
    console.table(connection.database);
    start();
}

// 02 "Add Employees"
function addEmp(){
    connection.query("SELECT * FROM employee", function(err,answer){
        if(err)throw err;
        inquirer
        .prompt([
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
                choices: function(){
                    var roleArray=[];
                    for (var i=0; i<roleArray.length; i++){
                        roleArray.push(answer[i].title);
                        //is "answer" right?
                    }
                    return roleArray;
                }
            },
            {
                name: "manager",
                type: "list",
                message: "Who is the employee's manager?",
                choices: function(){
                    var managerArray=["none"];
                    for (var i=0; i<roleArray.length; i++){
                        managerArray.push(answer[i].first_name);
                    }
                    return managerArray;
                }
            }
        ])
        .then (function(answer){
            connection.query(
                "INSERT INTO employee SET?",
                {
                    firstName: answer.first_name,
                    lastName: answer.last_name,
                    role: answer.role,
                    manager: answer.manager
                }, function(err){
                    if(err) throw err;
                    console.log("Added ${answer.first_name}&nbsp${answer.last_name} to the database.");
                    start();
                }
            );
        });
    });
}

// 03 "Remove Employees"
function removeEmp(){
    connection.query("SELECT * FROM employee",function(err,res){
        if(err)throw err;
        inquirer
        .prompt(
            {
            name: "personToRemoved",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: function(){
                var empArray=[];
                for (var i=0; i<empArray.length; i++){
                    empArray.push(answer[i].first_name);
                }
                return managerArray;
            }
        })
        .then(function(answer){
            connection.query(
                "DELETE FROM employee WHERE?",
                {name: answer.personToRemove}, function(err,res){
                    if(err)throw err;
                    console.log("Removed employee from the database.");
                    start();
                }
            );
        });
    });  
}

// 04 "Update Employee Role"
// function updateEmpRole(){
//     connection.query("SELECT * FROM employee",function(err,res){
//         if(err)throw err;
//         inquirer
//         .prompt(
//             {
//             name: "personToRemoved",
//             type: "list",
//             message: "Which employee would you like to remove?",
//             choices: function(){
//                 var empArray=[];
//                 for (var i=0; i<empArray.length; i++){
//                     empArray.push(answer[i].(first_name&nbsplast_name));
//                 }
//                 return empArray;
//             }
//         })
//         .then(function(answer){
//             connction.query(
//                 "UPDATE employee SET? WHERE?",
//                 [

//                 ],
//                 function(err,res){
//                     if(err)throw err;
//                     console.log("Employee role updated!");
//                     start();
//                 }
//             )
//         });
//     });
// }

// 05 "Update Employees Manager"
// function updateEmpMan(){
//     connection.query("SELECT * FROM employee", function(err,answer){
//         if(err)throw err;
//         inquirer
//         .prompt([
//             {
//                 name: "employee",
//                 type: "list",
//                 message: "Which employee's manager do you want to update?",
//                 choices: function(){
//                     var empArray=[];
//                     for (var i=0; i<empArray.length; i++){
//                         empArray.push(answer[i].(first_name&nbsplast_name));
//                     }
//                     return empArray;
//                 }
//             },
//             {
//                 name: "newManager",
//                 type: "list",
//                 message: "Which employee do you want to set as manager for the selected employee?",
//                 choices: function(){
//                     var manArray=[];
//                     for (var i=0; i<manArray.length; i++){
//                         manArray.push(answer[i].(first_name&nbsplast_name));
//                     }
//                     return manArray;
//                 }
//             }
//         ]);
//     console.log("Updated employee's manager");
//     start();
// }
