//load the subject data from the DataBase to the subject DropDown List
function getSubjects() {
    //load the elements to be used later
    let dropdown = document.getElementById("dropdownSubject");
    let unit = document.getElementById("dropdownUnit");
    let solutionType = document.getElementById("dropdownSolutionType");
    //remove any Items in all DropDown Lists
    while (
        dropdown.firstChild &&
        unit.firstChild &&
        solutionType.firstChild
    ) {
        dropdown.removeChild(dropdown.firstChild);
        unit.removeChild(unit.firstChild);
        solutionType.removeChild(solutionType.firstChild);
    }
    //get the data from the api
    fetch("https://api.rory.solutions/allSubjects")
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
                dropdown.appendChild(opt);
                document.getElementById("dropdownSubject").selectedIndex = "0";
            }
            getUnit();
        });
}

//load the units data from the DataBase to the unit DropDown List based on the subject
function getUnit() {
    let subject = document.getElementById("dropdownSubject").value;
    console.log(subject.value);
    let unit = document.getElementById("dropdownUnit");
    let solutionType = document.getElementById("dropdownSolutionType");
    while (unit.firstChild) {
        unit.removeChild(unit.firstChild);
        while (solutionType.firstChild) {
            solutionType.removeChild(solutionType.firstChild);
        }

    }
    fetch("https://api.rory.solutions/unit/" + subject)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var dropdown = document.getElementById("dropdownUnit");
            for (let index = 0; index < data.length; index++) {
                // create new option element
                var opt = document.createElement("option");
                opt.appendChild(document.createTextNode(data[index].UNIT_TITLE));
                // set value property of opt
                opt.value = data[index].UNIT_ID;
                //set the class name of the element
                opt.className = "dropdown-item";
                //add the data to the emelemt
                dropdown.appendChild(opt);
            }
            document.getElementById("dropdownUnit").selectedIndex = "4";
            getType();
        });
}

function getType() {
    //load the subject element value
    let subject = document.getElementById("dropdownSubject").value;
    //load the unit element value 
    let unit = document.getElementById("dropdownUnit").value;
    console.log(subject.value);
    console.log(unit.value);
    //load te solutionType element
    let solutionType = document.getElementById("dropdownSolutionType");
    //remove any items in the solutionType element (clear)
    while (solutionType.firstChild) {
        solutionType.removeChild(solutionType.firstChild);
    }
    //get the data from the api
    fetch("https://api.rory.solutions/solutionTypeOfUnit/" + subject + "/" + unit)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var dropdown = document.getElementById("dropdownSolutionType");
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
                dropdown.appendChild(opt);
            }
        });
}

function getResult() {
    var selectedUnit = document.getElementById("dropdownUnit").value;
    var selectedType = document.getElementById("dropdownSolutionType");
    var selectedSubject = document.getElementById("dropdownSubject").value;
    var resultDiv = document.getElementById("resultDiv");

    while (resultDiv.firstChild) {
        resultDiv.removeChild(resultDiv.firstChild);
    }

    fetch("http://api.rory.solutions/solution/" + selectedUnit + "/" + selectedType.value + "/" + selectedSubject)
        .then(response => response.json())
        .then(data => {
            for (let index = 0; index < data.length; index++) {
                console.log(data[index].solution);
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
            }

        })

}

// let menu = document.getElementById("menu");
// while (menu.firstChild) {
//   menu.removeChild(menu.firstChild);
// }
