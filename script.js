class Student {
    id;
    name;
    grades;
    attendance;
    accomodations;

    constructor(params = []) {
        this.id = params[0];
        this.name = params[1];
        this.grades = params[2];
        this.attendance = params[3];
        this.accomodations = params[4];
    }

    numParams() {
        return 5;
    }
}

class Accomodations {
    neurodivergences;
    accomodations;
    sensors;

    constructor(params = []) {
        this.neurodivergences = params[0];
        this.accomodations = params[1];
        this.sensors = params[2];
    }
}

var studentDatabase = new Array();
var studentNum = 0;

function $(id) {
    return document.getElementById(id);
}

function revealElement(id) {
    const elem = $(id);
    if (elem.classList.contains("hidden")) {
        elem.classList.toggle("hidden");
    }
}

function hideElement(id) {
    $(id).classList.add("hidden");
}

function push() {
    const studentFormInfo = new FormData($("full_form"));
    if (!$('accomodations').classList.contains("hidden")) {
        studentFormInfo.append('class_acc', $('class_acc').value);
        studentFormInfo.append('word_acc', $('word_acc').value);
    }
    
    var studentArray = Array.from(studentFormInfo);
    var studentAccomodations = new Array();
    for (var i = 4; i < studentArray.length; i++) {
        studentAccomodations.push(studentArray[i][1]);
    }

    const studentInfo = [studentNum, studentArray[0][1], studentArray[1][1], (studentArray[2][1] + "/" + studentArray[3][1]), studentAccomodations];
    var student = new Student(studentInfo);
    studentNum++;

    studentDatabase.push(student);
    console.log(studentDatabase);

    toTable(studentDatabase, 'studentList');

    hideElement("pullout_form");
    hideElement("accomodations");
}

function toTable(studentArray, tableID) {
    var headers = ["Name", "Grades", "Attendance", "Profile", "Remove Row"];
    var table = $(tableID);
    table.innerHTML = "";
    for (var i = 0; i < studentArray.length; i++) {
        var row = table.insertRow(i);
        row.insertCell(0).innerHTML = studentArray[i].name;
        row.insertCell(1).innerHTML = studentArray[i].grades;
        row.insertCell(2).innerHTML = studentArray[i].attendance;
        row.insertCell(3).innerHTML = "<button class='moreInfo' onclick=revealInfo(\"" + studentArray[i].id + "\");>" + studentArray[i].accomodations[0] + "</button>";
        row.insertCell(4).innerHTML = "<button class='edit' onclick=edit(\"" + studentArray[i].id + "\");>MODIFY</button>";
        row.insertCell(5).innerHTML = "<button class='removal' onclick=removeStudent(\"" + studentArray[i].id + "\");>X</button>";
        row.id = studentArray[i].id;
    }

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for(var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }
}

function revealInfo(rowID) {
    const profile = document.createElement('div');

    var disorders, accomodations, sensories;
    for (var k = 0; k < studentDatabase.length; k++) {
        if (studentDatabase[k].id == rowID) {
            profile.id = ("s" + rowID + "_profile");
            disorders = studentDatabase[k].accomodations[0];
            accomodations = studentDatabase[k].accomodations[1];
            sensories = studentDatabase[k].accomodations[2];
            break;
        }
    }

    profile.innerHTML = `
        <button type="removal" onclick=$(`+ "'s" + rowID + "_profile'" + `).remove();>X</button>
        <h4>Accomodations</h4>
        <p id="acc_ls">` + accomodations + `</p>
        
        <h4>Sensory Triggers</h4>
        <p id="sen_ls">` + sensories + `</p>
    `;
    
    const profileContainer = $('profiles');
    profileContainer.appendChild(profile);
}

function removeStudent(studentID) {
    var row = $(studentID);
    row.parentNode.removeChild(row);

    for (var i = 0; i < studentDatabase.length; i++) {
        if (studentDatabase[i].id == studentID) {
            studentDatabase.splice(i, 1);
            break;
        }
    }
}

function edit(studentID) {
    
}
