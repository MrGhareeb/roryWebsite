//load the subject data from the DataBase to the subject DropDown List

function getMajor() {
    //load the elements to be used later
    let major = document.getElementById("dropdownMajor");
    try {
        //remove any Items in all DropDown Lists
        $("#dropdownMajor").empty();
        $("#dropdownSubject").empty();
        $("#dropdownUnit").empty();
        $("#dropdownSolutionType").empty();
        //get the data from the api
        fetch("https://api.rory.solutions/major")
            .then(response => response.json())
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    // create new option element
                    var opt = document.createElement("option");
                    // create text node to add to the option element (opt)
                    opt.appendChild(
                        document.createTextNode(data[index].MAJOR_FULLNAME)
                    );
                    // set value property of opt
                    opt.value = data[index].MAJOR_ID;
                    opt.className = "dropdown-item";
                    opt.id = "major";
                    major.appendChild(opt);
                    //document.getElementById("dropdownSubject").selectedIndex = "0";
                }
                getSubjects();
            });
    } catch (err) {

    }
}



function getSubjects() {
    //load the elements to be used later
    let major = document.getElementById("dropdownMajor").value;
    let subject = document.getElementById("dropdownSubject");
    try {
        //remove any Items in all DropDown Lists
        $("#dropdownSubject").empty();
        $("#dropdownUnit").empty();
        $("#dropdownSolutionType").empty();
        //get the data from the api
        fetch("https://api.rory.solutions/subjects" + "/" + major)
            .then(response => response.json())
            .then(data => {
                for (let index = 0; index < data.length; index++) {
                    // create new option element
                    var opt = document.createElement("option");
                    // create text node to add to the option element (opt)
                    opt.appendChild(
                        document.createTextNode(data[index].COURSE_TITLE)
                    );
                    // set value property of opt
                    opt.value = data[index].COURSE_ID;
                    opt.className = "dropdown-item";
                    opt.id = "subject";
                    subject.appendChild(opt);
                }
                getUnit();
            });
    } catch (err) {

    }
}

//load the units data from the DataBase to the unit DropDown List based on the subject
function getUnit() {
    let subject = document.getElementById("dropdownSubject").value;
    try {
        $("#dropdownUnit").empty();
        $("#dropdownSolutionType").empty();
        fetch("https://api.rory.solutions/unit/" + subject)
            .then(response => response.json())
            .then(data => {
                var unit = document.getElementById("dropdownUnit");
                for (let index = 0; index < data.length; index++) {
                    // create new option element
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(data[index].UNIT_TITLE));
                    // set value property of opt
                    opt.value = data[index].UNIT_ID;
                    //set the class name of the element
                    opt.className = "dropdown-item";
                    //add the data to the emelemt
                    unit.appendChild(opt);
                }
                getType();
            });
    } catch (err) {

    }
}

function getType() {
    //load the subject element value
    let subject = document.getElementById("dropdownSubject").value;
    //load the unit element value 
    let unit = document.getElementById("dropdownUnit").value;

    try {
        //remove any items in the solutionType element (clear)
        $("#dropdownSolutionType").empty();
        //get the data from the api
        fetch("https://api.rory.solutions/solutionTypeOfUnit/" + subject + "/" + unit)
            .then(response => response.json())
            .then(data => {

                var subjectType = document.getElementById("dropdownSolutionType");
                //create element for each data in the api
                for (let index = 0; index < data.length; index++) {
                    //create new option element
                    var opt = document.createElement("option");
                    opt.appendChild(document.createTextNode(data[index].SOLUTION_TYPE));
                    // set value property of opt
                    opt.value = data[index].SOLUTION_TYPE_ID;
                    //set the class name of the element 
                    opt.className = "dropdown-item";
                    //add the element to solutionType
                    subjectType.appendChild(opt);
                }
            });
    } catch (err) {

    }
}

function getResult() {
    var selectedUnit = document.getElementById("dropdownUnit").value;
    var selectedType = document.getElementById("dropdownSolutionType");
    var selectedSubject = document.getElementById("dropdownSubject").value;
    var resultDiv = document.getElementById("resultDiv");
    var downloadButton = document.getElementById("downloadButton");

    $("#resultDiv").empty();
    $('#downloadDiv').remove();
    fetch("http://api.rory.solutions/solution/" + selectedUnit + "/" + selectedType.value + "/" + selectedSubject)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                var figure = document.createElement("figure");
                var pre = document.createElement("pre");
                var code = document.createElement("code");
                var div = document.createElement('div');
                code.appendChild(document.createTextNode(data[index].solution));
                code.id = "codeResult";
                code.className = "text-center";
                div.id = "result";
                div.className = "container-sm flex";
                pre.appendChild(code);
                figure.appendChild(pre);
                div.appendChild(figure);
                resultDiv.appendChild(div);

                if (data[index].DOWNLOAD_LINK != null) {
                    var buttonDiv = document.createElement("div");
                    buttonDiv.id = "downloadDiv";
                    resultDiv.appendChild(buttonDiv);
                    var button = document.createElement("button");
                    var a = document.createElement("a");
                    a.appendChild(document.createTextNode("Download"));
                    button.className = "btn btn-primary submit";
                    button.id = "download";
                    button.type = "button";
                    button.className = "btn btn-primary mx-auto d-block";
                    a.href = data[index].DOWNLOAD_LINK;
                    a.id = "link";
                    button.appendChild(a);
                    buttonDiv.appendChild(button);
                    button.onclick = massage;
                } else {

                }
                //<div class="btn-group">
                //<button id="submitButton" class="btn btn-primary submit" data-bs-hover-animate="pulse" type="submit"><a
                //id="submit" onclick="getResult()">Submit</a></button>
                //</div>
            }

        })

    function massage() {
        alert("Download has Started");
        //var alertDiv = document.getElementById("alert");
        //alertDiv.style = "background-color: #f44336;";
        //var span = document.createElement("span");
        //span.id = "close";
        //span.onclick = $('#alert').remove();
        //span.innerHTML = "&times;";
        //span.appendChild();
        //alertDiv.appendChild(span);
        //alertDiv.appendChild(document.createTextNode("Download has started."));
    }
}


// let menu = document.getElementById("menu");
// while (menu.firstChild) {
//   menu.removeChild(menu.firstChild);
// }