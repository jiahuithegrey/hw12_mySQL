var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
function start() {
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
    .then(function(answer) {
      console.log(answer);
      switch (answer.action) {
        case "View All Employees":
          viewAllEmployee();
          break;
        case "Add Employees":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Update Employee Manager":
          updateEmployeeManager();
          break;
        case "View All Employees By Department":
          viewEmployeeByDepartment();
          break;
        case "View All Employees By Manager":
          viewEmployeeByManager();
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
// 01 "View All Employees"-----------------------------------------
function viewAllEmployee() {
  connection.query(
    "SELECT * FROM employee JOIN (SELECT role.id,role.title,role.salary,role.department_id, department.department_name FROM role JOIN department ON role.department_id = department.id) AS rd ON employee.role_id = rd.id",
    // employee_id,first_name,last_name,manager_id
    function(err, res) {
      console.log("\n");
      console.table(res);
    }
  );
  start();
}

// 02 "Add Employees"-----------------------------------------
function addEmployee() {
  getRoles(promptToAddEmployee);
  //async function: run getRoles first, then prompToAddEmp(cb)
}

function getRoles(cb) {
  //cb is promptToAddEmp
  connection.query("SELECT * FROM role", function(err, res) {
    let roleArray = [];
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }
    console.log(res);
    cb(roleArray);
  });
}

function getAllEmployees(cb) {
  connection.query("SELECT * FROM employee", function(err, res) {
    // console.log(res);
    let employeeArray = ["none"];
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      let managerFirstname = res[i].first_name;
      let managerLastname = res[i].last_name;
      let managerFullname = managerFirstname + " " + managerLastname;

      employeeArray.push(managerFullname);
      //employeeArray.push({fullName: res[i].first_name + " " + res[i].last_name});
      //{key} for objects
    }
    cb(employeeArray);
  });
}

function promptToAddEmployee(roleArray) {
  getAllEmployees(function(employeeArray) {
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
          choices: roleArray
        },
        {
          name: "manager",
          type: "list",
          message: "Who is the employee's manager?",
          choices: employeeArray
        }
      ])
      .then(function(answer) {
        // console.log(answer);
        let managerFullName = answer.manager;
        let managerFirstName = managerFullName.split(" ")[0];
        let managerLastName = managerFullName.split(" ")[1];
        // console.log(managerFirstName);
        // console.log(managerLastName);
        connection.query(
          `SELECT * FROM employee WHERE employee.first_name = "${managerFirstName}" AND employee.last_name = "${managerLastName}"`,
          function(err, res) {
            if (err) throw err;
            // console.log(res[0].employee_id);
            let managerId = res[0].employee_id;

            connection.query(
              `SELECT * FROM role WHERE role.title = "${answer.role}"`,
              function(err, res) {
                if (err) throw err;
                // console.table(res);
                // console.log(res[0].id);
                let roleId = res[0].id;

                connection.query(
                  "INSERT INTO employee SET ?",
                  {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: roleId,
                    manager_id: managerId
                  },
                  function(err) {
                    if (err) throw err;
                    console.log(
                      `Added ${answer.firstName} ${answer.lastName} to the database.`
                    );
                    start();
                  }
                );
              }
            );
          }
        );
      });
  });
}
// 03 "Remove Employees" -----------------------------------------
function removeEmployee() {
  getAllEmployees(promptToRemoveEmployee);
  //async function: run getRoles first, then prompToRemoveEmployee(cb)
}

function promptToRemoveEmployee(roleArray) {
  getAllEmployees(function(employeeArray) {
    inquirer
      .prompt({
        name: "employeeToRemove",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employeeArray
      })
      .then(function(answer) {
        let employeeFullName = answer.employeeToRemove;
        let employeeFirstName = employeeFullName.split(" ")[0];
        let employeeLastName = employeeFullName.split(" ")[1];
        console.log(employeeFirstName);
        console.log(employeeLastName);

        connection.query(
          `SELECT * FROM employee WHERE employee.first_name = "${employeeFirstName}" AND employee.last_name = "${employeeLastName}"`,
          function(err, res) {
            if (err) throw err;
            // console.log(res[0].employee_id);
            let employeeId = res[0].employee_id;
            console.log(employeeId);
            connection.query(
              "DELETE FROM employee WHERE employee_id = ?",
              employeeId,
              function(err, res) {
                if (err) throw err;
                console.log(
                  "Removed ${answer.firstName} ${answer.lastName} from the database."
                );
                start();
              }
            );
          }
        );
      });
  });
}
// 04 "Update Employee Role" -----------------------------------------
function updateEmployeeRole() {
  getRoles(promptToUpdateEmployeeRole);
  //async function: run getRoles first, then prompToAddEmp(cb)
}

function promptToUpdateEmployeeRole(roleArray) {
  getAllEmployees(function(employeeArray) {
    inquirer
      .prompt([
        {
          name: "employeeToUpdate",
          type: "list",
          message: "Which employee's role would you like to update?",
          choices: employeeArray
        },
        {
          name: "newRole",
          type: "list",
          message: "Which role do you want to set for the selected employee?",
          choices: roleArray
        }
      ])
      .then(function(answer) {
        let employeeFullName = answer.employeeToUpdate;
        let employeeFirstName = employeeFullName.split(" ")[0];
        let employeeLastName = employeeFullName.split(" ")[1];
        connection.query(
          `SELECT * FROM employee WHERE employee.first_name = "${employeeFirstName}" AND employee.last_name = "${employeeLastName}"`,
          function(err, res) {
            if (err) throw err;
            // console.log(res[0].employee_id);
            let employeeId = res[0].employee_id;

            connection.query(
              `SELECT * FROM role WHERE role.title = "${answer.newRole}"`,
              function(err, res) {
                if (err) throw err;
                // console.table(res);
                // console.log(res[0].id);
                let roleId = res[0].id;

                connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    // find employee by employee id
                    { employee_id: employeeId },
                    // find role by role id
                    { role_id: roleId }
                  ],
                  function(err, res) {
                    if (err) throw err;
                    console.log("${answer.firstName} ${answer.lastName} role updated!");
                    start();
                  }
                );
              }
            );
          }
        );
      });
  });
}

//05 "Update Employees Manager" -----------------------------------------
function updateEmployeeManager() {
  getRoles(promptToUpdateEmployeeManager);
  //async function: run getRoles first, then prompToAddEmp(cb)
}

function promptToUpdateEmployeeManager(roleArray) {
  getAllEmployees(function(employeeArray) {
  inquirer
    .prompt([
      {
        name: "employeeToUpdate",
        type: "list",
        message: "Which employee's manager would you like to update?",
        choices: employeeArray
        },
      {
        name: "newManager",
        type: "list",
        message: "Who do you want to set as the Manager for the selected employee?",
        choices: employeeArray + null
      }
    ])
    .then(function(answer) {
      let employeeFullName = answer.employeeToUpdate;
      let employeeFirstName = employeeFullName.split(" ")[0];
      let employeeLastName = employeeFullName.split(" ")[1];
      connection.query(
        `SELECT * FROM employee WHERE employee.first_name = "${employeeFirstName}" AND employee.last_name = "${employeeLastName}"`,
        function(err, res) {
          if (err) throw err;
          // console.log(res[0].employee_id);
          let employeeId = res[0].employee_id;

          connection.query(
            `SELECT * FROM employee WHERE employee.title = "${answer.newManager}"`,
            function(err, res) {
              if (err) throw err;
              // console.table(res);
              // console.log(res[0].id);
              let roleId = res[0].id;

              connection.query(
                "UPDATE employee SET ? WHERE ?",
                [
                  // find employee by employee id
                  { employee_id: employeeId },
                  // find role by role id
                  { manager_id: roleId }
                ],
                function(err, res) {
                  if (err) throw err;
                  console.log("${answer.firstName} ${answer.lastName} role updated!");
                  start();
                }
              );
            }
          );
        }
      );
    });
});
}
//06 "View All Employees By Department" -----------------------------------------
// function viewEmployeeByDepartment(){

// }

//07 "View All Employees By Manager" -----------------------------------------
// function getManagerViewEmployee(){
//     connection.query("SELECT * FROM employee", function(err, res) {
//         if (err) throw err;
//         let managerList = [];
//         for (var i = 0; i < employeeArray.length; i++) {
//           managerList.push(res[i].manager); //{key} for objects
//         }
//         viewEmployeeByManager(managerList);
//       });
//   }

// function viewEmployeeByManager(){
//     inquirer.prompt(
//         {
//             name: "managerFullName",
//             type: "list",
//             message: "Which manager would you like to pick?",
//             choices: managerList
//         })
//     .then(function(answer){
//         let fullName = answer.managerFullName;
//         let firstName = fullName.split(" ")[0];
//         let lastName = fullName.split(" ") [1];
//         connection.query(select * from employee, function(err,res){
//             if (err) throw err;
//             console.table(res);
//             start();
//         });
//     });
// }
