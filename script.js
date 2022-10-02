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

function weightedSort() {
    var metrics = new Array();
    var resortedStudentDatabase = new Array();

    for (var i = 0; i < studentDatabase.length; i++) {
        var studentMetric =  (100 - parseInt(studentDatabase[i].grades))/3;
        if (studentDatabase[i].accomodations[1] !== undefined && studentDatabase[i].accomodations[2] !== undefined) {
            studentMetric += numLines(studentDatabase[i].accomodations[1]) + numLines(studentDatabase[i].accomodations[2]);
        }
        metrics.push([studentMetric, studentDatabase[i].id]);
    }
    
    metrics.sort(function (element_a, element_b) {
        return element_b[0] - element_a[0];
    });

    for (var i = 0; i < metrics.length; i++) {
        for (var j = 0; j < studentDatabase.length; j++) {
            if (studentDatabase[j].id == metrics[i][1]) {
                resortedStudentDatabase.push(studentDatabase[j]);
            }
        }
    }

    studentDatabase = resortedStudentDatabase;
    console.log(studentDatabase);
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
    for (var i = 5; i < studentArray.length; i++) {
        studentAccomodations.push(studentArray[i][1]);
    }

    const studentInfo = [studentNum, studentArray[0][1], studentArray[1][1], (studentArray[2][1] + "/" + studentArray[3][1]), studentAccomodations];
    var student = new Student(studentInfo);
    studentNum++;

    studentDatabase.push(student);
    weightedSort();

    toTable(studentDatabase, 'studentList');

    hideElement("pullout_form");
    hideElement("accomodations");

    document.getElementById("full_form").reset();
}

function toTable(studentArray, tableID) {
    var headers = ["Name", "Grades", "Attendance", "Profile"];
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
        <fieldset class="profile">
            <legend>` + studentDatabase[k].name + `'s Profile</legend>
            <h4>Accomodations</h4>
            <p id="acc_ls">` + accomodations + `</p>
        
            <h4>Sensory Triggers</h4>
            <p id="sen_ls">` + sensories + `</p>
            <button class="removal" onclick=$(`+ "'s" + rowID + "_profile'" + `).remove();>X</button>
        </fieldset>
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

    if (studentDatabase.length == 0) {
        $('studentList').innerHTML = "";
    }
}

function edit(studentID) {
    revealElement("pullout_form");

    var rowID = -1;
    for (var k = 0; k < studentDatabase.length; k++) {
        if (studentDatabase[k].id == studentID) {
            rowID = k;
            break;
        }
    }

    const form = $("full_form");

    form.submit.innerHTML = "Change";

    form.submit.onclick = function() {
        push();
        removeStudent(studentID);
        
        form.submit.innerHTML = "Submit";

        form.submit.onclick = function() {
            push();
        }
    }

    form.name.value = studentDatabase[rowID].name;
    form.grade.value = studentDatabase[rowID].grades;
    form.inschool.value = studentDatabase[rowID].attendance.substring(0, studentDatabase[rowID].attendance.indexOf("/"));
    form.outofschool.value = studentDatabase[rowID].attendance.substring(studentDatabase[rowID].attendance.indexOf("/") + 1);

    form.neurodivergences.value = studentDatabase[rowID].accomodations[0];
    $("class_acc").innerHTML = studentDatabase[rowID].accomodations[1];
    $("word_acc").innerHTML = studentDatabase[rowID].accomodations[2];
}

function numLines(textvals) {
    var numLines = 0;
    for (var i = 0; i < textvals.length; i++) {
        if (textvals[i] === "\n") {
            numLines++;
        }
    }
    return numLines;
}
