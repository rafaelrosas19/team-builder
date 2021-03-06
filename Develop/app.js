const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var employees = [];

function initialQuestions() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's name?",
                name: 'name',
            },
            {
                type: 'input',
                message: "What is the employee's ID number?",
                name: 'id',
            },
            {
                type: 'input',
                message: "What is the employee's email address?",
                name: 'email',
                validate: function (email) {
  
                    valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        
                    if (valid) {
                        return true;
                    } else {
                        console.log(".  Please enter a valid email")
                        return false;
                    }
                },
            },
            {
                type: 'checkbox',
                message: "What is the employee's current role?",
                name: "role",
                choices: [
                    {
                        name: 'Manager',
                    },
                    {
                        name: 'Engineer',
                    },
                    {
                        name: 'Intern',
                    },
                ],
            },

        ])

        .then((answers) => {
            if (answers.role[0] == "Manager") {
                managerQuestions(answers);
            } else if (answers.role[0] == "Engineer") {
                engineerQuestions(answers);
            } else if (answers.role[0] == "Intern") {
                internQuestions(answers);
            }
        })
}


function managerQuestions(answers) {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is this manager's office number?",
                name: "officenumber",
            },
        )
        .then((answers2) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers2.officenumber);
            employees.push(manager);
            newEmp();
        })
}

function engineerQuestions(answers) {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is this engineer's GitHub username?",
                name: "github",
            },
        )
        .then((answers2) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers2.github);
            employees.push(engineer);
            newEmp();
        }
        )
}

function internQuestions(answers) {
    inquirer
        .prompt(
            {
                type: 'input',
                message: "What is this intern's university?",
                name: "school",
            },
        )
        .then((answers2) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers2.school);
            employees.push(intern);
            newEmp();
        }
        )
}

function newEmp() {
    inquirer.prompt([
      {
        type: 'confirm',
        message: 'Do you want to add another employee?',
        name: 'newEmp',
      },
    ],
    )
      .then((answers) => {
        if (answers.newEmp == true) {
          initialQuestions();
        } else {
          fs.writeFile(outputPath, render(employees), (err) => {
            if (err) throw err;
          });
        }
      })
}

initialQuestions();