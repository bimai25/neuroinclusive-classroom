class Student {
    name;
    grades;
    attendance;
    accomodations;

    constructor(params = []) {
        this.name = params[0];
        this.grades = params[1];
        this.attendance = params[2];
        this.accomodations = params[3];
    }

    numParams() {
        return 4;
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

function $(id) {
    return document.getElementById(id);
}

function revealElement(id) {
    const elem = $(id);
    if (elem.classList.contains("hidden")) {
        elem.classList.toggle("hidden");
    } else {
        elem.classList.add("hidden");
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

    const studentInfo = [studentArray[0][1], studentArray[1][1], studentArray[2][1], studentAccomodations];
    var student = new Student(studentInfo);

    studentDatabase.push(student);

    toTable(studentDatabase, 'studentList');

    hideElement("pullout_form");
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
        row.insertCell(3).innerHTML = "<button class='moreInfo' onclick=revealInfo(\"" + i + "\");>" + studentArray[i].accomodations[0] + "</button>";
        row.insertCell(4).innerHTML = "<button class='removal' onclick=removeStudent(\"" + i + "\");>X</button>";
        row.id = i;
    }

    var header = table.createTHead();
    var headerRow = header.insertRow(0);
    for(var i = 0; i < headers.length; i++) {
        headerRow.insertCell(i).innerHTML = headers[i];
    }
}

/* function revealInfo(rowID) {
    const profile = document.createElement('div');

    profile.innerHTML = `
        <h4>Accomodations</h4>
        
    `;
    
    const profileContainer = $('profiles');
    profileContainer.appendChild(profile);
} */

function removeStudent(studentID) {
    var row = $(studentID);
    row.parentNode.removeChild(row);

    for (var i = 0; i < studentDatabase.length; i++) {
        if (studentDatabase[i].name === studentID) {
            studentDatabase.splice(i, 1);
            break;
        }
    }
}

function testLines(textarea) {
    
}
