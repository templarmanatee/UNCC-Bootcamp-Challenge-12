const dbConnection = require("./connection");
const inquirer = require("inquirer");
const { query } = require("express");
const cTable = require("console.table");

const mainMenu = async () => {
  const prompt = [
    {
      type: "list",
      name: "mainMenu",
      message: "Welcome! What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add department",
        "Add role",
        "Add employee",
        "Update employee role",
        "Exit",
      ],
      loop: false,
    },
  ];

  inquirer.prompt(prompt).then((answer) => {
    switch (answer.mainMenu) {
      case "View all departments":
        console.log("ding");
        viewDepts();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmps();
        break;
      case "Add department":
        addDept();
        break;
      case "Add role":
        addRole();
        break;
      case "Add employee":
        addEmp();
        break;
      case "Update employee role":
        updateEmpRole();
        break;
      case "Exit":
        dbConnection.end();
        return -1;
    }
  });
};

const viewDepts = () => {
  console.log("\n");
  dbConnection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewRoles = () => {
  console.log("\n");
  dbConnection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const viewEmps = () => {
  dbConnection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
};

const addEmp = () => {
  dbConnection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Type the employee's first name: ",
        },
        {
          type: "input",
          name: "last_name",
          message: "Type the employee's last name: ",
        },
        {
          type: "list",
          name: "role",
          message: "Choose a new role for the employee: ",
          choices: res.map((role) => role.title),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Choose the employee's assigned manager: ",
          choices: [1, 4, 6, 8, 10],
        },
      ])
      .then((input) => {
        let role = res.find((role) => role.title === input.role);
        dbConnection.query("INSERT INTO employee set ?", {
          first_name: input.first_name,
          last_name: input.last_name,
          role_id: role.id,
          manager_id: input.manager_id,
        });
        mainMenu();
      });
  });
};

const addRole = () => {
  mainMenu();
};

const addDept = async () => {
  mainMenu();
};

const updateEmpRole = async () => {
  mainMenu();
};

module.exports = { mainMenu };