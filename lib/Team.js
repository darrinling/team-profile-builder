const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const fs = require("fs");

class Team {
  constructor() {
    this.employees = [];
    this.questions = [
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "Exit"],
      },
      {
        type: "input",
        message: "What is the employee's name?",
        name: "name",
      },
      {
        type: "input",
        message: "Please enter the employee's ID",
        name: "id",
      },
      {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the employee's office number?",
        name: "officeNum",
      },
      {
        type: "input",
        message: "What is the employee's github username?",
        name: "github",
      },
      {
        type: "input",
        message: "What school did the employee attend?",
        name: "school",
      },
    ];
  }

  addEmp() {
    inquirer.prompt(this.questions).then((answers) => {
      switch (answers.role) {
        case "Exit":
          this.createFile();
          break;
        case "Manager":
          this.employees.push(
            new Manager(
              answers.name,
              answers.id,
              answers.email,
              answers.officeNum
            )
          );
          this.addEmp();
          break;
        case "Engineer":
          this.employees.push(
            new Engineer(
              answers.name,
              answers.id,
              answers.email,
              answers.github
            )
          );
          this.addEmp();
          break;
        case "Intern":
          this.employees.push(
            new Intern(answers.name, answers.id, answers.email, answers.school)
          );
          this.addEmp();
          break;
      }
    });
  }

  createFile() {
    var htmlOut = this.generatePage();

    fs.writeFile("./dist/index.html", htmlOut, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("file created");
    });
  }

  generatePage() {
    return `<!doctype html>
    <html lang="en">

    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <!-- CSS -->

        <!-- Bootstrap CSS  -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <title>Team Profile Generator</title>
    </head>

    <body>

        <div class="container" id="team">
            <div class="row">
                <div class="col-12 text-center bg-info my-5 py-5 display-4 text-white">My Team</div>
            </div>
            <div class="row" id="cards">


            </div>


        </div>

        <!-- jQuery JS -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

       '${this.generateCards()}'

        <!-- Bootstrap -->
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossorigin="anonymous"></script>

    </body>

    </html>`;
  }
  generateCards() {
    var allEmpCards = ``;
    this.employees.forEach((emp) => {
      var empInfo = "";
      switch (emp.getRole()) {
        case "Exit":
          break;
        case "Manager":
          empInfo = `Office #: ${emp.getOfficeNumber()}`;
          break;
        case "Engineer":
          empInfo = `Github: ${emp.getGithub()}`;
          break;
        case "Intern":
          empInfo = `School: ${emp.getSchool()}`;
          break;
      }

      var empCard = `<script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${emp.getName()}");
            var header2 = $('<div class="card-header text-center">');
            header2.text(" ${emp.getRole()}");
            var cardBody = $('<div class="card-body text-info">');
            var cardTitle = $('<h5 class="card-title">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${emp.getId()}");
            var cardText2 = $('<p class="card-text">');
            cardText2.text("Email: ${emp.getEmail()}");
            var cardText3 = $('<p class="card-text">');
            cardText3.text("${empInfo}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText3);

            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);</script>`;
      allEmpCards += empCard;
    });
    return allEmpCards;
  }
  init() {
    this.addEmp();
  }
}

module.exports = Team;
