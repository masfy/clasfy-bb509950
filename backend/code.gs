// Clasfy Backend - Google Apps Script
// Spreadsheet ID - Ganti dengan ID spreadsheet Anda
const SPREADSHEET_ID = '1HCvUHWAedhj6pwUrizdD7L5eJIqog8nYUgFEmML3hcY';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'login':
        return handleLogin(data);
      case 'getUserData':
        return getUserData(data);
      case 'getClasses':
        return getClasses();
      case 'getStudents':
        return getStudents(data);
      case 'getSubjects':
        return getSubjects();
      case 'saveGrades':
        return saveGrades(data);
      case 'saveAttendance':
        return saveAttendance(data);
      case 'getGrades':
        return getGrades(data);
      case 'getAttendance':
        return getAttendance(data);
      default:
        return createResponse(false, 'Invalid action');
    }
  } catch (error) {
    console.error('Error:', error);
    return createResponse(false, 'Server error: ' + error.message);
  }
}

function handleLogin(data) {
  const { email, password, role } = data;
  
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const usersSheet = ss.getSheetByName('Users');
    const userData = usersSheet.getDataRange().getValues();
    
    // Skip header row
    for (let i = 1; i < userData.length; i++) {
      const row = userData[i];
      if (row[1] === email && row[2] === password && row[3] === role) {
        const user = {
          id: row[0],
          email: row[1],
          name: row[4],
          role: row[3],
          avatar: row[5] || '',
          nip: role === 'guru' ? row[6] : undefined,
          nisn: role === 'siswa' ? row[7] : undefined,
          kelas: role === 'siswa' ? row[8] : undefined
        };
        
        return createResponse(true, 'Login successful', { user });
      }
    }
    
    return createResponse(false, 'Invalid credentials');
  } catch (error) {
    console.error('Login error:', error);
    return createResponse(false, 'Login failed: ' + error.message);
  }
}

function getUserData(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const usersSheet = ss.getSheetByName('Users');
    const userData = usersSheet.getDataRange().getValues();
    
    for (let i = 1; i < userData.length; i++) {
      const row = userData[i];
      if (row[0] === data.userId) {
        const user = {
          id: row[0],
          email: row[1],
          name: row[4],
          role: row[3],
          avatar: row[5] || '',
          nip: row[3] === 'guru' ? row[6] : undefined,
          nisn: row[3] === 'siswa' ? row[7] : undefined,
          kelas: row[3] === 'siswa' ? row[8] : undefined
        };
        
        return createResponse(true, 'User data retrieved', { user });
      }
    }
    
    return createResponse(false, 'User not found');
  } catch (error) {
    return createResponse(false, 'Error retrieving user data: ' + error.message);
  }
}

function getClasses() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const classesSheet = ss.getSheetByName('Classes');
    const classData = classesSheet.getDataRange().getValues();
    
    const classes = [];
    for (let i = 1; i < classData.length; i++) {
      const row = classData[i];
      classes.push({
        id: row[0],
        name: row[1],
        level: row[2],
        academicYear: row[3],
        homeroom: row[4],
        totalStudents: row[5] || 0
      });
    }
    
    return createResponse(true, 'Classes retrieved', { classes });
  } catch (error) {
    return createResponse(false, 'Error retrieving classes: ' + error.message);
  }
}

function getStudents(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const studentsSheet = ss.getSheetByName('Students');
    const studentData = studentsSheet.getDataRange().getValues();
    
    const students = [];
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      if (!data.classId || row[3] === data.classId) {
        students.push({
          id: row[0],
          name: row[1],
          nisn: row[2],
          classId: row[3],
          className: row[4],
          email: row[5],
          phone: row[6],
          address: row[7],
          parentName: row[8],
          parentPhone: row[9]
        });
      }
    }
    
    return createResponse(true, 'Students retrieved', { students });
  } catch (error) {
    return createResponse(false, 'Error retrieving students: ' + error.message);
  }
}

function getSubjects() {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const subjectsSheet = ss.getSheetByName('Subjects');
    const subjectData = subjectsSheet.getDataRange().getValues();
    
    const subjects = [];
    for (let i = 1; i < subjectData.length; i++) {
      const row = subjectData[i];
      subjects.push({
        id: row[0],
        name: row[1],
        code: row[2],
        description: row[3],
        teacherId: row[4],
        teacherName: row[5]
      });
    }
    
    return createResponse(true, 'Subjects retrieved', { subjects });
  } catch (error) {
    return createResponse(false, 'Error retrieving subjects: ' + error.message);
  }
}

function saveGrades(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const gradesSheet = ss.getSheetByName('Grades');
    
    const { classId, subjectId, categoryId, assessmentType, grades } = data;
    
    grades.forEach(grade => {
      const newRow = [
        Utilities.getUuid(),
        grade.studentId,
        classId,
        subjectId,
        categoryId,
        assessmentType,
        grade.score,
        new Date(),
        data.teacherId
      ];
      
      gradesSheet.appendRow(newRow);
    });
    
    return createResponse(true, 'Grades saved successfully');
  } catch (error) {
    return createResponse(false, 'Error saving grades: ' + error.message);
  }
}

function saveAttendance(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const attendanceSheet = ss.getSheetByName('Attendance');
    
    const { classId, date, attendanceData } = data;
    
    attendanceData.forEach(attendance => {
      const newRow = [
        Utilities.getUuid(),
        attendance.studentId,
        classId,
        date,
        attendance.status,
        attendance.notes || '',
        new Date(),
        data.teacherId
      ];
      
      attendanceSheet.appendRow(newRow);
    });
    
    return createResponse(true, 'Attendance saved successfully');
  } catch (error) {
    return createResponse(false, 'Error saving attendance: ' + error.message);
  }
}

function getGrades(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const gradesSheet = ss.getSheetByName('Grades');
    const gradeData = gradesSheet.getDataRange().getValues();
    
    const grades = [];
    for (let i = 1; i < gradeData.length; i++) {
      const row = gradeData[i];
      if (row[2] === data.classId && row[3] === data.subjectId) {
        grades.push({
          id: row[0],
          studentId: row[1],
          classId: row[2],
          subjectId: row[3],
          categoryId: row[4],
          assessmentType: row[5],
          score: row[6],
          createdAt: row[7],
          teacherId: row[8]
        });
      }
    }
    
    return createResponse(true, 'Grades retrieved', { grades });
  } catch (error) {
    return createResponse(false, 'Error retrieving grades: ' + error.message);
  }
}

function getAttendance(data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const attendanceSheet = ss.getSheetByName('Attendance');
    const attendanceData = attendanceSheet.getDataRange().getValues();
    
    const attendance = [];
    for (let i = 1; i < attendanceData.length; i++) {
      const row = attendanceData[i];
      if (row[2] === data.classId) {
        attendance.push({
          id: row[0],
          studentId: row[1],
          classId: row[2],
          date: row[3],
          status: row[4],
          notes: row[5],
          createdAt: row[6],
          teacherId: row[7]
        });
      }
    }
    
    return createResponse(true, 'Attendance retrieved', { attendance });
  } catch (error) {
    return createResponse(false, 'Error retrieving attendance: ' + error.message);
  }
}

function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    Object.assign(response, data);
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function untuk testing
function testLogin() {
  const testData = {
    action: 'login',
    email: 'guru@clasfy.edu',
    password: 'guru123',
    role: 'guru'
  };
  
  const result = handleLogin(testData);
  console.log(result.getContent());
}