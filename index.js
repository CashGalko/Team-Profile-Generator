const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const fs = require("fs");
const readline = require("readline");

const addEngineer = [
    {
        type: "input",
        name: "employeeName",
        message: "Name of the Employee?",
        required: true,

    },
    {
        type: "input",
        name: "employeeEmail",
        message: "Enter employee's email"
    },
    {
        type: "input",
        name: "employeeGit",
        message: "Enter a link to employee's github"
    },
    {
        type: "input",
        name: "employeeID",
        message: "Enter employee's ID"
    },
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to enter another employee?",
        choices: ["Engineer", "Intern", "No"],
    }
    
];

const addIntern = [
    {
        type: "input",
        name: "employeeName",
        message: "Name of the Employee?",
        required: true,

    },
    {
        type: "input",
        name: "employeeEmail",
        message: "Enter employee's email"
    },
    {
        type: "input",
        name: "employeeSchool",
        message: "What school does the intern addend?"
    },
    {
        type: "input",
        name: "employeeID",
        message: "Enter employee's ID"
    },
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to enter another employee?",
        choices: ["Engineer", "Intern", "No"],
    }
];

const addManager = [
    {
        type: "input",
        name: "employeeName",
        message: "Name of the Manager?",
        required: true,
    },
    {
        type: "input",
        name: "employeeEmail",
        message: "Enter employee's email"
    },
    {
        type: "input",
        name: "phoneNumber",
        message: "What is the manager's phone number?",

    },
    {
        type: "input",
        name: "employeeID",
        message: "Enter employee's ID"
    },
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to enter another employee?",
        choices: ["Engineer", "Intern", "No"],
    }
];

const startQuestions = () => {
    inquirer.prompt(addManager).then((data) => {
        const manager = new Manager(data);
        addTeamMember(manager);
        if (data.addAnother == "Intern") {
            employIntern();

        } else if (data.addAnother == "Engineer") {
            employEngineer();

        } else {
            buildPage();
        }
    })
}

const employIntern = () => {
    inquirer.prompt(addIntern).then((data) => {
        let intern = new Intern(data);
        addTeamMember(intern);
        if (data.addAnother == "Intern") {
            employIntern();

        } else if (data.addAnother == "Engineer") {
            employEngineer();

        } else {
            buildPage();
        }
    })
}

const employEngineer = () => {
    inquirer.prompt(addEngineer).then((data) => {
        let engineer = new Engineer(data);
        addTeamMember(engineer);
        if (data.addAnother == "Intern") {
            employIntern();

        } else if (data.addAnother == "Engineer") {
            employEngineer();

        } else {
            buildPage();
        }
    })
}

let htmlBuilder = '';
const addTeamMember = (data) => {
    let role;
    let card = '';
    if (data.getRole() == "engineer") {
        role = "Engineer"
        let github = data.employeeGit
    } else if (data.getrole() == "intern") {
        role = "Intern"
    } else {
        role = "Manager"
    };

    card = `<div class="col">
    <div class="card" style="width: 25px;">
        <div class="card-body">
            <h4 class="card-title">${data.name}</h4>
            <h4 class="card-text">${role}</h4>
        </div>
        <ul class="list-group">
            <li class="list-group-item">ID: ${data.id}</li>
            <li class="list-group-item">Email: ${data.email}</li>
        </ul>
    </div>
</div>`;

htmlBuilder = htmlBuilder + card;
}

const buildPage = () => {
    let writeSteam = fs.createWriteStream('./dist/index.html');
    const readStream = readline.createInterface(
        {
            input: fs.createReadStream('./src/index.html'),

        }
    )

    readStream.on('line', (line) => {
        if (line.match(/<!--employee-->/)) {

            line = line.replace(/<!--employee-->/, htmlBuilder)

        }
        writeSteam.write(`${line}\n`);
    })
}

// Runs on load
startQuestions();