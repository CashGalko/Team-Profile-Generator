const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const fs = require("fs");
const readline = require("readline");
var htmlCards = '';

// Manager inquirer handeler
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the current Manager?",

    },
    {
        type: "input",
        name: "id",
        message: "Please enter the Manager's employee ID.",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }

    },
    {
        type: "input",
        name: "email",
        message: "Please enter the Manager's employee email address.",

    },
    {
        type: "input",
        name: "officeNum",
        message: "Please enter the Manager's office phone number.",

    },
    {
        type: "list",
        name: "addEmployee",
        message: "Add an additional team member?",
        choices: ["Engineer", "Intern", "No"],

    },
]

// Engineer inquirer handeler
const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?",

    },
    {
        type: "input",
        name: "id",
        message: "Please enter the Engineer's employee ID.",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }

    },
    {
        type: "input",
        name: "email",
        message: "Please enter the Engineer's employee email address.",

    },
    {
        type: "input",
        name: "gitHub",
        message: "Please enter a link to the Engineer's GitHub profile.",

    },
    {
        type: "list",
        name: "addEmployee",
        message: "Add an additional team member?",
        choices: ["Engineer", "Intern", "No"],

    },
]

// Intern inquirer handeler
const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?",

    },
    {
        type: "input",
        name: "id",
        message: " Please enter the Intern's employee ID.",
        validate: (id) => {
            if (isNaN(id)) {
                return "Please enter a number";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: " Please enter the Intern's employee email address.",

    },
    {
        type: "input",
        name: "school",
        message: "Which school the the Intern currently attend?",

    },
    {
        type: "list",
        name: "addEmployee",
        message: "Add an additional team member?",
        choices: ["Engineer", "Intern", "No"],

    },
]

// Handels the addition of a manager. There must be at least a single manager for the team.
menu = () => {
    inquirer.prompt(managerQuestions).then(({ name, id, email, officeNum, addEmployee }) => {
        const manager = new Manager(name, id, email, officeNum);
        renderCard(manager);
        if (addEmployee === 'No') {
            renderHtml();
        }
        else {
            return addMember(addEmployee);
        }
    })
}
// This only needs to handel the intern or engineer since the manager is created in the first step.
addMember = (role) => {
    switch (role) {
        case 'Engineer':
            return inquirer.prompt(engineerQuestions).then(({ name, id, email, gitHub, addEmployee }) => {
                var engineer = new Engineer(name, id, email, gitHub);
                renderCard(engineer);
                if (addEmployee === 'No') {
                    renderHtml();
                }
                else {
                    return addMember(addEmployee);
                }
            })
        case 'Intern':
            return inquirer.prompt(internQuestions).then(({ name, id, email, school, addEmployee }) => {
                var intern = new Intern(name, id, email, school)
                renderCard(intern);
                if (addEmployee === 'No') {
                    renderHtml();
                }
                else {
                    return addMember(addEmployee);
                }
            })

    }
}


renderCard = (data) => {
    var thirdItem;
    var icon;
    switch (data.getRole()) {
        case 'Manager':
            icon = `<i class="bi bi-briefcase text-light"></i>`;
            thirdItem = `Office Number: ${data.officeNum}`;
            break
        case 'Intern':
            icon = `<i class="bi bi-linkedin text-light"></i>`
            thirdItem = `School: ${data.school}`;
            break
        case 'Engineer':
            icon = `<i class="bi bi-puzzle text-light"></i>`
            thirdItem = `GitHub: ${data.gitHub}`;
            break
    }
    htmlCards += `<div class="col">
    <div class="card bg-grey" style="width: 18rem;">
        <div class="card-body bg-dark">
            <h4 class="card-title text-light">${data.name}</h4>
            <h4 class="card-text text-light">${icon} ${data.getRole()}</h4>
        </div>
        <ul class="list-group list-group-flush p-3">
            <li class="list-group-item">ID: ${data.id}</li>
            <li class="list-group-item">Email: ${data.email}</li>
            <li class="list-group-item">${thirdItem}</li>
        </ul>
    </div>
</div>`;
}


renderHtml = () => {
    let ws = fs.createWriteStream('./dist/index.html')
    var interface = readline.createInterface(
        {
            input: fs.createReadStream('./src/index.html'),

        }
    )

    interface.on('line', (line) => {
        if (line.match(/<!--cards-->/)) {

            line = line.replace(/<!--cards-->/, htmlCards)

        }
        ws.write(`${line}\n`);
        
    })



}

// Begins the program when you use npm start
 menu();