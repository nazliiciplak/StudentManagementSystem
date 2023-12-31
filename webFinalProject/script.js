// Arrays to store lecture and student data
var lectureArray = [];
var studentArray = [];

// Class representing a Lecture
class Lecture {
    constructor(name, code, pointScale, credit) {
        this.name = name;
        this.code = code;
        this.pointScale = pointScale;
        this.credit = credit;
        this.students = []; // Array to store students enrolled in this lecture
     
    }
}

// Class representing a Student
class Student {
    constructor(id, name, surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.lectures = []; // Array to store lectures that the student is enrolled in
    }
}

// Class representing a student's performance in a lecture
class studentLectures {
    constructor(lecture, midtermGrade, finalGrade,nonattendance) {
        this.lecture = lecture;
        this.midtermGrade = midtermGrade;
        this.finalGrade = finalGrade;
        this.nonattendance=nonattendance;
    }
}


const defaultLectureNames = ["Database", "Artifical Intelligence", "Mobil", "Web Development and Programming", "Computer Networks"];
for (let i = 0; i < defaultLectureNames.length; i++) {
    let lecture = new Lecture(defaultLectureNames[i], i.toString(), "10", "6"); 
    lectureArray.push(lecture);
    
    updateLectureDropdown1();
    updateLectureDropdown2();
    updateLectureDropdown3();
  
}

const dailyNames = [
    "Ali", "Ayşe", "Mehmet", "Fatma", "Ahmet", "Zeynep", "Mustafa", "Elif", "Emir", "Ece",
    "Ömer", "Aslı", "Can", "Deniz", "Burak", "Esra", "Ege", "Melis", "Kaan", "Ceren",
    "Tolga", "İrem", "Berk", "Gamze", "Furkan", "Selin", "Arda", "İlayda", "Yusuf", "Yaren",
    "Kerem", "Sude", "Umut", "Nazlı", "Onur", "Cansu", "Efe", "Zehra", "Baran", "Özge",
    "Emre", "Büşra", "Oğuz", "Nil", "Kuzey", "Eylül", "Kadir", "Cemre", "Mert", "Berna",
    "Serkan", "Gizem", "Orhan", "Pelin", "Yiğit", "Selma", "Deniz", "Gizem", "Serkan", "Zara",
    "Aylin", "Bora", "Selinay", "Okan", "Ezgi", "Yalın", "Eylül", "Görkem", "Simge", "Fırat",
    "Aysu", "Koray", "Elifnaz", "Okan", "Ezgi", "Yalın", "Eylül", "Görkem", "Simge", "Fırat"
];


const dailySurnames = [
    "Yılmaz", "Kaya", "Demir", "Çelik", "Koç", "Arslan", "Erdem", "Yıldırım", "Erdoğan", "Öztürk",
    "Şahin", "Yalın", "Aydın", "Karahan", "Aslan", "Taş", "Çetin", "Aksoy", "Çiçek", "Bulut",
    "Şen", "Cömert", "Emin", "Kurt", "Kaplan", "Özkan", "Genç", "Yıldız", "Karaca", "Toprak",
    "Güzel", "Türk", "Bilgin", "Demirtaş", "Tunç", "Sevinç", "Gür", "Yaman", "Çakır", "Baş",
    "Kurtuluş", "Kılıç", "Aktaş", "Çalışkan", "Yavuz", "Sarı", "Ateş", "Kartal", "Koçak", "Ay",
    "Ünal", "Akgül", "Gül", "Yorulmaz", "Ege", "Akın", "Küçük", "Beyaz", "Kurtbaş", "Kılıçoğlu",
    "Kara", "Kocaman", "Yiğit", "Taşkın", "Canbaz", "Çolak", "Akar", "Gökgöz", "Şimşek", "Avcı",
    "Gündoğdu", "Efe", "Alp", "Şanlı", "Arıkan", "Tuncer", "Oktay", "Ekmekçi", "Eren", "Batur"
];


for (let i = 1; i <= 80; i++) {
    const randomName = dailyNames[i - 1];
    const randomSurname = dailySurnames[i - 1];
  
    let student = new Student(i.toString(), randomName, randomSurname);
  
    // Assuming you have an array of lectures named lectureArray
    for (let j = 0; j < lectureArray.length; j++) {
      const lecture = lectureArray[j];
      student.lectures.push(new studentLectures(lecture, (Math.random() * 100).toFixed(2), (Math.random() * 100).toFixed(2), 0));
      lecture.students.push(student);
    }
  
    studentArray.push(student);
  }


// Function to add a new lecture
function addLecture() {
    // Retrieve values from the input fields
    let courseName = document.getElementById('courseName').value;
    let courseCode = document.getElementById('courseCode').value;
    let pointScale = document.getElementById('pointscale').value;
    let credit = document.getElementById('courseCredit').value;
  

    // Check if any input field is empty
    if (courseName == "" || courseCode == "" || pointScale == "" || credit == "") {
        alert("Please fill in all fields!");
        return;
    }

    // Check if the course code already exists
    if (lectureArray.some(lecture => lecture.code === courseCode)) {
        alert('This course code already exists. Choose a different course code.');
        return;
    }

    // Create a new Lecture object and add it to the lectureArray
    let newLecture = new Lecture(courseName, courseCode, pointScale, credit);
    lectureArray.push(newLecture);

    // Update dropdowns with the new lecture
    updateLectureDropdown1();
    updateLectureDropdown2();
    updateLectureDropdown3();
}
// Function to delete the lecture from the system
function deleteLecture(lectureName) {
     // Retrieve values from the input fields
     let courseName = document.getElementById('courseName').value;
     let courseCode = document.getElementById('courseCode').value;
     let pointScale = document.getElementById('pointscale').value;
     let credit = document.getElementById('courseCredit').value;
    // Check if any input field is empty
    if (courseName == "" || courseCode == "" || pointScale == "" || credit == "") {
        alert("Please fill in all fields!");
        return;
    }
   // Check if the course code  exists
   

    var lectureIndex = findLectureIndexByName(lectureName);

  
    if (lectureIndex !== -1) {
        // Remove the lecture from the lectureArray
        lectureArray.splice(lectureIndex, 1);
        deleteLectureFromStudents(lectureName);
        updateLectureDropdown1();
        updateLectureDropdown2();
        updateLectureDropdown3();
      
    }
    else{
        alert("There is no this lecture")
    }
    
    }

//Delete lecture from the students    
function deleteLectureFromStudents(lectureName) {
        for (var studentIndex = 0; studentIndex < studentArray.length; studentIndex++) {
            var student = studentArray[studentIndex];
    
            for (var lectureIndex = 0; lectureIndex < student.lectures.length; lectureIndex++) {
                let course = student.lectures[lectureIndex];
                let lecture = course.lecture;
                if (lecture.name === lectureName) {
                
                    student.lectures.splice(lectureIndex, 1);
                    break; 
                }
            }
        } 
    }
// Function to update the first lecture dropdown
function updateLectureDropdown1() {
    let selectLecture = document.getElementById('selectLecture');
    selectLecture.innerHTML = '';
    // Populate the dropdown with lecture names
    lectureArray.forEach(function (lecture) {
        let option = document.createElement('option');
        option.value = lecture.name;
        option.text = `${lecture.name}`;
        selectLecture.appendChild(option);
    });
}

// Function to update the second lecture dropdown
function updateLectureDropdown2() {
    let selectLecture = document.getElementById('Lecture');
    selectLecture.innerHTML = '';
    // Populate the dropdown with lecture names
    lectureArray.forEach(function (lecture) {
        let option = document.createElement('option');
        option.value = lecture.name;
        option.text = `${lecture.name}`;
        selectLecture.appendChild(option);
    });
}

// Function to update the third lecture dropdown
function updateLectureDropdown3() {
    let selectLecture = document.getElementById('Lecture2');
    selectLecture.innerHTML = '';
    // Populate the dropdown with lecture names
    lectureArray.forEach(function (lecture) {
        let option = document.createElement('option');
        option.value = lecture.name;
        option.text = `${lecture.name}`;
        selectLecture.appendChild(option);
    });
}


// Event listeners for buttons
document.getElementById("deleteLecture").addEventListener("click", function() {
    var lectureName = document.getElementById("courseName").value;
   deleteLecture(lectureName);
  });
document.getElementById('addLecture').addEventListener('click', addLecture);
document.getElementById('addStudentoLecture').addEventListener('click', function() {
    addStudentoLecture(); 
    clearStudentForm()   });
document.getElementById('showStudent').addEventListener('click', showStudent);    
document.getElementById('show').addEventListener('click', showStudents);

document.getElementById("searchStudent").addEventListener("click", function() {
  var studentName = document.getElementById("studentName").value;
  searchStudentScores(studentName);
});

// Function to add a student to a lecture
function addStudentoLecture() {
  // Retrieve values from the input fields
  let studentId = document.getElementById('stdId').value;
  let studentName = document.getElementById('stdName').value;
  let studentSurname = document.getElementById('stdSurname').value;
  let midtermGrade = document.getElementById('midGrade').value;
  let finalGrade = document.getElementById('finalGrade').value;
  let selectedLecture = document.getElementById('selectLecture').value;
  let nonattendance=document.getElementById('courseAtt').value;
  
  if (studentId ==="" || studentName ==="" || studentSurname =="" || midtermGrade ==""|| finalGrade =="" || nonattendance ==""|| selectedLecture=="") {
    alert("Please fill in all fields!");
    return;
}
if(nonattendance>=14 || nonattendance<0){
    alert("nonattendance should be between 0-14");
    return;
}
  // Check if the student already exists
  let existingStudent = studentArray.find(student => student.id === studentId);

  if (existingStudent) {
      // If the student exists, check if they have taken the selected lecture
      let lecture = lectureArray.find(lecture => selectedLecture == lecture.name);
      let hasTakenSameLecture = existingStudent.lectures.some(lecture => lecture.lecture.name === selectedLecture);

      if (hasTakenSameLecture) {
          // Alert if the student has already taken the selected lecture
          alert("Student has already taken the selected lecture.");
      } else {
          // If the student hasn't taken the lecture, add the lecture to the student's record
          if (midtermGrade >= 0 && midtermGrade <= 100 && finalGrade >= 0 && finalGrade <= 100) {
              let studentLecture = new studentLectures(lecture, midtermGrade, finalGrade,nonattendance);
              existingStudent.lectures.push(studentLecture);
              lecture.students.push(existingStudent);
          } else {
              // Alert if the entered grades are invalid
              alert("Invalid grade entry. Grades should be between 0 and 100.");
          }
      }
  } else {
      // If the student doesn't exist, create a new student and add the lecture
      let student = new Student(studentId, studentName, studentSurname);
      studentArray.push(student);
      let lecture = lectureArray.find(lecture => selectedLecture == lecture.name);
      if (midtermGrade >= 0 && midtermGrade <= 100 && finalGrade >= 0 && finalGrade <= 100) {
          let studentLecture = new studentLectures(lecture, midtermGrade, finalGrade,nonattendance);
          student.lectures.push(studentLecture);
          lecture.students.push(student);
      } else {
          // Alert if the entered grades are invalid
          alert("Invalid grade entry. Grades should be between 0 and 100.");
      }
  }

}

  


function clearStudentForm() {
    document.getElementById('stdId').value = '';
    document.getElementById('stdName').value = '';
    document.getElementById('stdSurname').value = '';
    document.getElementById('midGrade').value = '';
    document.getElementById('finalGrade').value = '';
    document.getElementById('courseAtt').value = '';
    
}


// Function to update the table with student data based on the selected lecture
function updateTable() {
  // Get the table body element
  let tbody = document.getElementById("studentData");
  // Clear the existing table content
  tbody.innerHTML = "";
  // Get the selected lecture from the dropdown
  var selectedLecture = document.getElementById("Lecture").value;

  // Loop through each student in the studentArray
  for (let studentIndex = 0; studentIndex < studentArray.length; studentIndex++) {
      var student = studentArray[studentIndex];
      // Loop through each lecture the student has taken
      for (var lectureIndex = 0; lectureIndex < student.lectures.length; lectureIndex++) {
          let course = student.lectures[lectureIndex];
          let lecture = course.lecture;
          // Check if the lecture matches the selected lecture
          if (lecture.name === selectedLecture) {
              // Insert a new row in the table
              let row = tbody.insertRow(tbody.rows.length);
              // Insert cells for each piece of student data
              let cell1 = row.insertCell(0);
              let cell2 = row.insertCell(1);
              let cell3 = row.insertCell(2);
              let cell4 = row.insertCell(3);
              let cell5 = row.insertCell(4);
              let cell6 = row.insertCell(5);
              let cell7 = row.insertCell(6);
              let cell8 = row.insertCell(7);
              let cell9 = row.insertCell(8);
              let cell10 = row.insertCell(9);

              // Populate the cells with student and grade information
              cell1.innerHTML = student.id;
              cell2.innerHTML = student.name;
              cell3.innerHTML = student.surname;
              cell4.innerHTML = student.name + " " + student.surname;
              cell5.innerHTML = course.midtermGrade;
              cell6.innerHTML = course.finalGrade;
              cell7.innerHTML = selectedLecture;

              // Calculate and display additional information such as letter grade, result score, and GPA
              let letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, course.lecture.pointScale,course.nonattendance);
          
              let resultScore = calculateScore(course.midtermGrade, course.finalGrade);
              let gpa = calculateOverallGPA(student);
              cell8.innerHTML = resultScore.toFixed(2);
              cell9.innerHTML = letterGrade;
              cell10.innerHTML = gpa.toFixed(2);
          }
      }
  }
}

      
  

// Function to display students who passed the selected lecture
function passStudents() {
  // Get the table body element
  let tbody = document.getElementById("studentData");
  // Clear the existing table content
  tbody.innerHTML = "";

  // Get the selected lecture from the dropdown
  let selectedLecture = document.getElementById("Lecture").value;

  // Loop through each student in the studentArray
  for (let studentIndex = 0; studentIndex < studentArray.length; studentIndex++) {
      let student = studentArray[studentIndex];
      // Loop through each lecture the student has taken
      for (let lectureIndex = 0; lectureIndex < student.lectures.length; lectureIndex++) {
          let course = student.lectures[lectureIndex];
          let lecture = course.lecture;

          // Calculate the letter grade for the course
          let letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance);

          // Check if the lecture matches the selected lecture and the student passed
          if (lecture.name === selectedLecture && (letterGrade !== "FF" && letterGrade !=="TT")) {
              // Insert a new row in the table
              let row = tbody.insertRow(tbody.rows.length);
              // Insert cells for each piece of student data
              let cell1 = row.insertCell(0);
              let cell2 = row.insertCell(1);
              let cell3 = row.insertCell(2);
              let cell4 = row.insertCell(3);
              let cell5 = row.insertCell(4);
              let cell6 = row.insertCell(5);
              let cell7 = row.insertCell(6);
              let cell8 = row.insertCell(7);
              let cell9 = row.insertCell(8);
              let cell10 = row.insertCell(9);

              // Populate the cells with student and grade information
              cell1.innerHTML = student.id;
              cell2.innerHTML = student.name;
              cell3.innerHTML = student.surname;
              cell4.innerHTML = student.name + " " + student.surname;
              cell5.innerHTML = course.midtermGrade;
              cell6.innerHTML = course.finalGrade;
              cell7.innerHTML = selectedLecture;

              // Calculate and display additional information such as result score and letter grade
              let resultScore = calculateScore(course.midtermGrade, course.finalGrade);
              cell8.innerHTML = resultScore.toFixed(2);
              cell9.innerHTML = letterGrade;
              let gpa = calculateOverallGPA(student);
              cell10.innerHTML=gpa.toFixed(2);
          }
      }
  }
}

// Function to display students who failed the selected lecture
function failStudents() {
  // Get the table body element
  let tbody = document.getElementById("studentData");
  // Clear the existing table content
  tbody.innerHTML = "";

  // Get the selected lecture from the dropdown
  let selectedLecture = document.getElementById("Lecture").value;

  // Loop through each student in the studentArray
  for (let studentIndex = 0; studentIndex < studentArray.length; studentIndex++) {
      let student = studentArray[studentIndex];
      // Loop through each lecture the student has taken
      for (let lectureIndex = 0; lectureIndex < student.lectures.length; lectureIndex++) {
          let course = student.lectures[lectureIndex];
          let lecture = course.lecture;

          // Calculate the letter grade for the course
          let letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance);
         

          // Check if the lecture matches the selected lecture and the student failed
          if (lecture.name === selectedLecture &&( letterGrade === "FF" || letterGrade==="TT")) {
              // Insert a new row in the table
              let row = tbody.insertRow(tbody.rows.length);
              // Insert cells for each piece of student data
              let cell1 = row.insertCell(0);
              let cell2 = row.insertCell(1);
              let cell3 = row.insertCell(2);
              let cell4 = row.insertCell(3);
              let cell5 = row.insertCell(4);
              let cell6 = row.insertCell(5);
              let cell7 = row.insertCell(6);
              let cell8 = row.insertCell(7);
              let cell9 = row.insertCell(8);
              let cell10 = row.insertCell(9);
              

              // Populate the cells with student and grade information
              cell1.innerHTML = student.id;
              cell2.innerHTML = student.name;
              cell3.innerHTML = student.surname;
              cell4.innerHTML = student.name + " " + student.surname;
              cell5.innerHTML = course.midtermGrade;
              cell6.innerHTML = course.finalGrade;
              cell7.innerHTML = selectedLecture;
          
              // Calculate and display additional information such as result score and letter grade
              let resultScore = calculateScore(course.midtermGrade, course.finalGrade);
              cell8.innerHTML = resultScore.toFixed(2);
              cell9.innerHTML = letterGrade;
              let gpa = calculateOverallGPA(student);
              cell10.innerHTML=gpa.toFixed(2);
          }
      }
  }
}


// Function to show students based on radio button selection
function showStudents() {
  var radioAllStudents = document.getElementById("allStudent");
  var radioPassedStudents = document.getElementById("passed");
  var radioFailedStudents = document.getElementById("failed");


  if (radioAllStudents.checked) {
      updateTable(); // Call function to show all students
  } else if (radioPassedStudents.checked) {
      passStudents(); // Call function to show passed students
  } else if (radioFailedStudents.checked) {
      failStudents(); // Call function to show failed students
  }
}

// Function to show a specific student and their details
function showStudent() {
  let tbody = document.getElementById("studentData");
  tbody.innerHTML = "";
  
  for (let studentIndex = 0; studentIndex < studentArray.length; studentIndex++) {
      var student = studentArray[studentIndex];
      
      for (var lectureIndex = 0; lectureIndex < student.lectures.length; lectureIndex++) {
          let course = student.lectures[lectureIndex];
          let lecture = course.lecture;
          let row = tbody.insertRow(tbody.rows.length);
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          let cell3 = row.insertCell(2);
          let cell4 = row.insertCell(3);
          let cell5 = row.insertCell(4);
          let cell6 = row.insertCell(5);
          let cell7 = row.insertCell(6);
          let cell8 = row.insertCell(7);
          let cell9 = row.insertCell(8);
          let cell10 = row.insertCell(9);
          let cell11 = row.insertCell(10);
          let cell12 = row.insertCell(11);
          let cell13= row.insertCell(12);
          let cell14= row.insertCell(13);
    
          // Fill cells with student and course details
          cell1.innerHTML = student.id;
          cell2.innerHTML = student.name;
          cell3.innerHTML = student.surname;
          cell4.innerHTML = student.name + " " + student.surname;
          cell5.innerHTML = course.midtermGrade;
          cell6.innerHTML = course.finalGrade;
          cell7.innerHTML = lecture.name;

          // Calculate letter grade, result score, and GPA
         
          let letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance);

          let resultScore = calculateScore(course.midtermGrade, course.finalGrade);
          let gpa = calculateOverallGPA(student);

          // Fill cells with calculated values
          cell8.innerHTML = resultScore.toFixed(2);
          cell9.innerHTML = letterGrade;
          cell10.innerHTML = gpa.toFixed(2);

          // Create delete button
          let deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
       
         deleteButton.setAttribute("data-student-id", student.id);
          deleteButton.setAttribute("data-lecture-name", lecture.name);

         deleteButton.onclick = function() {
        
        let studentId = this.getAttribute("data-student-id");
        let lectureName = this.getAttribute("data-lecture-name");
        delet(studentId, lectureName);};

        cell11.appendChild(deleteButton);
            // Create update button
        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        
        updateButton.setAttribute("data-student-id", student.id);
        updateButton.setAttribute("data-lecture-name", course.lecture.name);
        updateButton.onclick = function() {
           
            var studentId = this.getAttribute("data-student-id");
            var lectureName = this.getAttribute("data-lecture-name");
            update(studentId, lectureName);
        };
        cell12.appendChild(updateButton);

            
        // Create update student button
        var updateStudentButton = document.createElement("button");
        updateStudentButton.innerHTML = "Update Student";

        
        updateStudentButton.setAttribute("data-student-id", student.id);

        updateStudentButton.onclick = function() {
           
            var studentId = this.getAttribute("data-student-id");
            updateStudent(studentId);
        };

        cell13.appendChild(updateStudentButton);

        // Create delete student button
        var deleteStudentButton = document.createElement("button");
        deleteStudentButton.innerHTML = "Delete Student";

       
        deleteStudentButton.setAttribute("data-student-id", student.id);

        deleteStudentButton.onclick = function() {
            var studentId = this.getAttribute("data-student-id");
            deleteStudent(studentId);
        };

        cell14.appendChild(deleteStudentButton);

            }
        }
        }
// Function to update student name and surname
function updateStudent(studentId) {
  var index = findStudentIndexById(studentId);
 
  if (index !== -1) {
      var student = studentArray[index];
    
       student.name= prompt("Enter the new name:");
       student.surname= prompt("Enter the new surname:");
      
      showStudent(); // Refresh the student table after updating
  }

}
// Function to delete the student from the system
function deleteStudent(studentId) {
  var index = findStudentIndexById(studentId);
 
  if (index !== -1) {
    studentArray.splice(index, 1);
      
      showStudent(); // Refresh the student table after updating
  }

}
function findLectureIndexByName(lectureName) {
  for (var i = 0; i < lectureArray.length; i++) {
      if (lectureArray[i].name === lectureName) {
          return i;  // Return the index if the lecture is found
      }
  }
  return -1; // Return -1 if the lecture is not found
}


// Function to delete a student from a lecture
function delet(studentId, selectedLecture) {
  var index = findStudentIndexById(studentId);
  var selectedLecture2 = selectedLecture;

  if (index !== -1) {
      var student = studentArray[index];

      for (var j = 0; j < student.lectures.length; j++) {
          var course = student.lectures[j];
          var lecture = course.lecture;

          if (lecture.name === selectedLecture2) {
              student.lectures.splice(j, 1);
              showStudent();
              break;
          }
      }
  }
}

// Function to update student grades and point scale for a lecture
function update(studentId, selectedLecture) {
  var index = findStudentIndexById(studentId);
  var selectedLecture2 = selectedLecture;

  if (index !== -1) {
      var student = studentArray[index];

      for (var j = 0; j < student.lectures.length; j++) {
          var course = student.lectures[j];
          var lecture = course.lecture;


          if (lecture.name === selectedLecture2) {
              // Get the new midterm grade from the user
        const newMidtermGrade = prompt("Enter the new midterm grade:");

        // Get the new final grade from the user
        const newFinalGrade = prompt("Enter the new final grade:");

        // Get the new point scale from the user
        const newPointScale = prompt("New point scale");

        // Convert grades to numbers
        const midtermGradeNumber = parseFloat(newMidtermGrade);
        const finalGradeNumber = parseFloat(newFinalGrade);
        const pointScaleNumber = parseFloat(newPointScale);

        // Check if grades are within the valid range (0 to 100) and point scale is either 7 or 10
        if (
        !isNaN(midtermGradeNumber) &&
        !isNaN(finalGradeNumber) &&
        midtermGradeNumber >= 0 &&
        midtermGradeNumber <= 100 &&
        finalGradeNumber >= 0 &&
        finalGradeNumber <= 100 &&
        (pointScaleNumber === 7 || pointScaleNumber === 10)
        ) {
        // Update the grades and point scale
        course.midtermGrade = midtermGradeNumber;
        course.finalGrade = finalGradeNumber;
        lecture.pointScale = pointScaleNumber;

        alert("Grades and point scale updated successfully.");
        } else {
        // Display an error message if input is invalid
        alert("Invalid input. Please enter valid grades (0-100) and point scale (7 or 10).");
        }
                    
          }
      }
      showStudent(); // Refresh the student table after updating
  }

}

    
        
// Function to find the index of a student in the studentArray by their ID
function findStudentIndexById(studentId) {
  for (var i = 0; i < studentArray.length; i++) {
      if (studentArray[i].id === studentId) {
          return i; // Return the index if the student is found
      }
  }
  return -1; // Return -1 if the student is not found
}

// Function to calculate the overall score based on midterm and final grades
function calculateScore(midterm, final) {
  return (midterm * 0.4 + final * 0.6);
}

// Function to calculate the letter grade based on the overall score and point scale
function calculateLetterGrade(midterm, final, base,nonattendance) {
    if(nonattendance>4){
        return "TT";
    }
  const score = calculateScore(midterm, final);

  if (base == 10) {
      if (score >= 90) {
          return "AA";
      } else if (score >= 80) {
          return "BA";
      } else if (score >= 70) {
          return "BB";
      } else if (score >= 60) {
          return "CB";
      } else if (score >= 50) {
          return "CC";
      } else if (score >= 40) {
          return "DC";
      } else if (score >= 30) {
          return "DD";
      } else {
          return "FF";
      }
  } else if (base == 7) {
      if (score >= 93) {
          return "AA";
      } else if (score >= 85) {
          return "BA";
      } else if (score >= 77) {
          return "BB";
      } else if (score >= 70) {
          return "CB";
      } else if (score >= 60) {
          return "CC";
      } else if (score >= 50) {
          return "DC";
      } else if (score >= 40) {
          return "DD";
      } else {
          return "FF";
      }
  }
}
// Function to calculate GPA from a given letter grade
function calculateGPAFromLetterGrade(letterGrade) {
  // Use a switch statement to match the letter grade and return the corresponding GPA
  switch (letterGrade) {
      case "AA":
          return 4.0;
      case "BA":
          return 3.5;
      case "BB":
          return 3.0;
      case "CB":
          return 2.5;
      case "CC":
          return 2.0;
      case "DC":
          return 1.5;
      case "DD":
          return 1.0;
      case "FF":
          return 0.0;
      case "TT":
            return 0.0;    
      default:
          return 0.0; // Return 0.0 for any unknown letter grade
  }
}
// Function to calculate the overall GPA of a student
function calculateOverallGPA(studentt) {
  var totalCredit = 0;
  var weightedOverallScore = 0;

  for (var j = 0; j < studentt.lectures.length; j++) {
      var course = studentt.lectures[j];
      var lecture = course.lecture;

      var letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance);

      var credit = parseFloat(lecture.credit);
      weightedOverallScore += calculateGPAFromLetterGrade(letterGrade) * credit;
      totalCredit += credit;
  }

  if (totalCredit === 0) {
      console.log("The student has not taken any courses.");
      return 0;
  }

  var overallGPA = weightedOverallScore / totalCredit;
  return overallGPA;
}
// Function to search and display scores of a student by name
function searchStudentScores(studentName) {
  var tbody = document.getElementById("studentData");
  tbody.innerHTML = "";
  if(studentName==""){
    alert("Please fill the blank");
    return
  }

  // Loop through all students in the array
  for (var i = 0; i < studentArray.length; i++) {
      var student = studentArray[i];

      // Loop through all lectures of the student
      for (var j = 0; j < student.lectures.length; j++) {
          var fullName = student.name + " " + student.surname;
          var course = student.lectures[j];
          var lecture = course.lecture;

          // Check if the full name includes the provided student name
          if (fullName.includes(studentName)) {
              var row = tbody.insertRow(tbody.rows.length);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              var cell5 = row.insertCell(4);
              var cell6 = row.insertCell(5);
              var cell7 = row.insertCell(6);
              var cell8 = row.insertCell(7);
              var cell9 = row.insertCell(8);
              var cell10 = row.insertCell(9);

              cell1.innerHTML = student.id;
              cell2.innerHTML = student.name;
              cell3.innerHTML = student.surname;
              cell4.innerHTML = fullName;
              cell5.innerHTML = course.midtermGrade;
              cell6.innerHTML = course.finalGrade;
              cell7.innerHTML = lecture.name;

              var letterGrade = calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance);
              var resultScore = calculateScore(course.midtermGrade, course.finalGrade);
              var gpa = calculateOverallGPA(student);

              cell8.innerHTML = resultScore.toFixed(2);
              cell9.innerHTML = letterGrade;
              cell10.innerHTML = gpa.toFixed(2);
          }
      }
  }
}



// Event listener for a button click to show course statistics
document.getElementById('show2').addEventListener('click', function () {
  showCourseStatistics(document.getElementById('Lecture2').value);
});

// Function to show course statistics
function showCourseStatistics(lectureName) {
  var tbody = document.getElementById("lectureData");
  if (!lectureName) {
   alert("Error: lectureName cannot be empty!");
    return;
}

  tbody.innerHTML = "";

  // Variables to keep track of passed, failed, total score, midterm, and final
  var passedCount = 0;
  var failedCount = 0;
  var totalScore = 0;
  var midterm = 0;
  var final = 0;

  // Loop through all students in the array
  for (var i = 0; i < studentArray.length; i++) {
      var student = studentArray[i];

      // Loop through all lectures of the student
      for (var j = 0; j < student.lectures.length; j++) {
          var course = student.lectures[j];
          var lecture = course.lecture;

          // Check if the lecture name matches the provided lectureName
          if (lecture.name == lectureName) {
              var midtermGrade = parseFloat(course.midtermGrade);
              midterm += midtermGrade;
              var finalGrade = parseFloat(course.finalGrade);
              final += finalGrade;
              var score = calculateScore(midtermGrade, finalGrade);

              // Check if the student passed or failed
              if (calculateLetterGrade(course.midtermGrade, course.finalGrade, lecture.pointScale,course.nonattendance) !== ("FF" || "TT")) {
                  passedCount++;
              } else {
                  failedCount++;
              }

              totalScore += score;
          }
      }
  }

  // Calculate mean scores
  var meanScore =( totalScore / (passedCount + failedCount)).toFixed(2);
  var midtermean =( midterm / (passedCount + failedCount)).toFixed(2);
  var finalmean = (final / (passedCount + failedCount)).toFixed(2);

  // Display statistics in the table
  var row = tbody.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);

  cell1.innerHTML = lectureName;
  cell2.innerHTML = midtermean;
  cell3.innerHTML = finalmean;
  cell4.innerHTML = meanScore;
  cell5.innerHTML = passedCount;
  cell6.innerHTML = failedCount;
  cell7.innerHTML = passedCount + failedCount;
}
// Execute the following code when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Get references to the forms
  var studentForm = document.getElementById("studentForm");
  var searchForm = document.getElementById("searchForm");
  var lectureForm = document.getElementById("lectureForm");
  var lectureForm2 = document.getElementById("lectureForm2");
  var lectureForm3 = document.getElementById("lectureForm3");

  // Initially hide the forms
  studentForm.hidden = true;
  searchForm.hidden = true;
  lectureForm.hidden = true;
  lectureForm2.hidden = true;
  lectureForm3.hidden = true;

  var studentTableContainer = document.getElementById('studentTableContainer');
  var lectureTableContainer = document.getElementById('lectureTableContainer');


      studentTableContainer.style.display = 'none';
      lectureTableContainer.style.display = 'none';
 

  // When "Student Management" side-item is clicked
  document.querySelector(".studentMan").addEventListener("click", function() {
    // Show student-related forms and hide lecture-related forms
    studentForm.hidden = false;
    searchForm.hidden = false;
    lectureForm.hidden = true;
    lectureForm2.hidden = true;
    lectureForm3.hidden = true;
    document.getElementById('studentTableContainer').style.display = 'block';
    document.getElementById('lectureTableContainer').style.display = 'none';
    // Hide additional boxes
    var boxes = document.querySelectorAll('.box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('hidden');
    }
  });

  // When "Lecture Management" side-item is clicked
  document.querySelector(".lectureMan").addEventListener("click", function() {
    // Show lecture-related forms and hide student-related forms
    lectureForm.hidden = false;
    lectureForm2.hidden = false;
    lectureForm3.hidden = false;
    studentForm.hidden = true;
    searchForm.hidden = true;
    document.getElementById('studentTableContainer').style.display = 'block';
    document.getElementById('lectureTableContainer').style.display = 'block';
    // Hide additional boxes
    var boxes = document.querySelectorAll('.box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.add('hidden');
    }
  });

  // When "Home" side-item is clicked
  document.querySelector(".home").addEventListener("click", function() {
    // Show all boxes and hide all forms
    studentForm.hidden = true;
    searchForm.hidden = true;
    lectureForm.hidden = true;
    lectureForm2.hidden = true;
    lectureForm3.hidden = true;
    studentTableContainer.style.display = 'none';
    lectureTableContainer.style.display = 'none';

    var boxes = document.querySelectorAll('.box');
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('hidden');
    }
  });
});

