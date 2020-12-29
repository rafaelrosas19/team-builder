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
                message: "What is the employee's first name?",
                name: 'firstname',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lastname',
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
            const manager = new Manager(answers.firstname, answers.lastname, answers.id, answers.email, answers.role[0], answers2.officenumber);
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
            const engineer = new Engineer(answers.firstname, answers.lastname, answers.id, answers.email, answers.role[0], answers2.github);
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
            const intern = new Intern(answers.firstname, answers.lastname, answers.id, answers.email, answers.role[0], answers2.school);
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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
