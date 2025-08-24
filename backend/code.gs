/**
 * Google Apps Script Backend untuk Clasfy
 * Spreadsheet ID: 1HCvUHWAedhj6pwUrizdD7L5eJIqog8nYUgFEmML3hcY
 * 
 * SHEETS STRUCTURE:
 * - Users: id, email, password, role, name, avatar, nip, nisn, kelas
 * - Classes: id, name, level, academicYear, homeroom, totalStudents
 * - Students: id, name, nisn, classId, className, email, phone, address, parentName, parentPhone
 * - Subjects: id, name, code, description, teacherId, teacherName
 * - Assignments: id, classId, title, description, dueDate, points, createdAt
 * - Grades: id, assignmentId, studentId, classId, subjectId, categoryId, assessmentType, score, createdAt, teacherId
 * - Attendance: id, studentId, classId, date, status, notes, createdAt, teacherId
 * - Journals: id, classId, date, topic, activities, notes, createdAt
 * - Gamification: id, classId, studentUsername, points, level, badges, achievements, updatedAt
 */

// Spreadsheet ID - Ganti dengan ID spreadsheet Anda
const SPREADSHEET_ID = '1HCvUHWAedhj6pwUrizdD7L5eJIqog8nYUgFEmML3hcY';

/**
 * Get spreadsheet by ID
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    console.error('Error opening spreadsheet:', error);
    throw new Error('Tidak dapat mengakses spreadsheet. Pastikan ID spreadsheet benar dan Anda memiliki akses.');
  }
}

/**
 * Get or create a sheet
 */
function getOrCreateSheet(sheetName) {
  const ss = getSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    
    // Add headers based on sheet name
    const headers = getSheetHeaders(sheetName);
    if (headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
  }
  
  return sheet;
}

/**
 * Get headers for each sheet type
 */
function getSheetHeaders(sheetName) {
  const headerMap = {
    'Users': ['id', 'email', 'password', 'role', 'name', 'avatar', 'nip', 'nisn', 'kelas'],
    'Classes': ['id', 'name', 'level', 'academicYear', 'homeroom', 'totalStudents'],
    'Students': ['id', 'name', 'nisn', 'classId', 'className', 'email', 'phone', 'address', 'parentName', 'parentPhone'],
    'Subjects': ['id', 'name', 'code', 'description', 'teacherId', 'teacherName'],
    'Assignments': ['id', 'classId', 'title', 'description', 'dueDate', 'points', 'createdAt'],
    'Grades': ['id', 'studentId', 'classId', 'subjectId', 'categoryId', 'assessmentType', 'score', 'createdAt', 'teacherId'],
    'Attendance': ['id', 'studentId', 'classId', 'date', 'status', 'notes', 'createdAt', 'teacherId'],
    'Journals': ['id', 'classId', 'date', 'topic', 'activities', 'notes', 'createdAt'],
    'Gamification': ['id', 'classId', 'studentUsername', 'points', 'level', 'badges', 'achievements', 'updatedAt']
  };
  
  return headerMap[sheetName] || [];
}

/**
 * Main doPost function to handle all requests
 */
function doPost(e) {
  // Enable CORS
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  try {
    // Parse request data
    let requestData;
    if (e.postData && e.postData.contents) {
      requestData = JSON.parse(e.postData.contents);
    } else {
      return output.setContent(JSON.stringify(createResponse(false, 'No data received')));
    }
    
    console.log('Received request:', requestData);
    
    const action = requestData.action;
    
    // Route to appropriate handler
    switch (action) {
      // Authentication
      case 'login':
        return output.setContent(JSON.stringify(handleLogin(requestData)));
      case 'getUserData':
        return output.setContent(JSON.stringify(getUserData(requestData)));
      
      // Classes
      case 'getClasses':
        return output.setContent(JSON.stringify(getClasses()));
      case 'addClass':
        return output.setContent(JSON.stringify(handleAddClass(requestData)));
      case 'updateClass':
        return output.setContent(JSON.stringify(handleUpdateClass(requestData)));
      case 'deleteClass':
        return output.setContent(JSON.stringify(handleDeleteClass(requestData)));
      
      // Students
      case 'getStudents':
        return output.setContent(JSON.stringify(getStudents(requestData)));
      case 'addStudent':
        return output.setContent(JSON.stringify(handleAddStudent(requestData)));
      case 'updateStudent':
        return output.setContent(JSON.stringify(handleUpdateStudent(requestData)));
      case 'deleteStudent':
        return output.setContent(JSON.stringify(handleDeleteStudent(requestData)));
      
      // Subjects
      case 'getSubjects':
        return output.setContent(JSON.stringify(getSubjects()));
      
      // Assignments
      case 'getAssignments':
        return output.setContent(JSON.stringify(handleGetAssignments(requestData)));
      case 'addAssignment':
        return output.setContent(JSON.stringify(handleAddAssignment(requestData)));
      case 'updateAssignment':
        return output.setContent(JSON.stringify(handleUpdateAssignment(requestData)));
      case 'deleteAssignment':
        return output.setContent(JSON.stringify(handleDeleteAssignment(requestData)));
      
      // Grades
      case 'getGrades':
        return output.setContent(JSON.stringify(getGrades(requestData)));
      case 'saveGrades':
        return output.setContent(JSON.stringify(saveGrades(requestData)));
      case 'addGrade':
        return output.setContent(JSON.stringify(handleAddGrade(requestData)));
      case 'updateGrade':
        return output.setContent(JSON.stringify(handleUpdateGrade(requestData)));
      case 'deleteGrade':
        return output.setContent(JSON.stringify(handleDeleteGrade(requestData)));
      case 'getGradesByStudent':
        return output.setContent(JSON.stringify(handleGetGradesByStudent(requestData)));
      
      // Attendance
      case 'getAttendance':
        return output.setContent(JSON.stringify(getAttendance(requestData)));
      case 'saveAttendance':
        return output.setContent(JSON.stringify(saveAttendance(requestData)));
      case 'addAttendance':
        return output.setContent(JSON.stringify(handleAddAttendance(requestData)));
      case 'updateAttendance':
        return output.setContent(JSON.stringify(handleUpdateAttendance(requestData)));
      case 'deleteAttendance':
        return output.setContent(JSON.stringify(handleDeleteAttendance(requestData)));
      
      // Journals
      case 'getJournals':
        return output.setContent(JSON.stringify(handleGetJournals(requestData)));
      case 'addJournal':
        return output.setContent(JSON.stringify(handleAddJournal(requestData)));
      case 'updateJournal':
        return output.setContent(JSON.stringify(handleUpdateJournal(requestData)));
      case 'deleteJournal':
        return output.setContent(JSON.stringify(handleDeleteJournal(requestData)));
      
      // Gamification
      case 'getGamification':
        return output.setContent(JSON.stringify(handleGetGamification(requestData)));
      case 'awardPoints':
        return output.setContent(JSON.stringify(handleAwardPoints(requestData)));
      case 'updateGamification':
        return output.setContent(JSON.stringify(handleUpdateGamification(requestData)));
      case 'initializeGamification':
        return output.setContent(JSON.stringify(handleInitializeGamification(requestData)));
      
      // Test endpoint
      case 'test':
        return output.setContent(JSON.stringify(createResponse(true, 'API connection successful', { timestamp: new Date().toISOString() })));
      
      default:
        return output.setContent(JSON.stringify(createResponse(false, `Unknown action: ${action}`)));
    }
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return output.setContent(JSON.stringify(createResponse(false, `Server error: ${error.message}`)));
  }
}

function handleLogin(data) {
  const { email, password, role } = data;
  
  if (!email || !password || !role) {
    return createResponse(false, 'Email, password, dan role harus diisi');
  }
  
  try {
    const ss = getSpreadsheet();
    const usersSheet = ss.getSheetByName('Users') || getOrCreateSheet('Users');
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
        
        return createResponse(true, 'Login berhasil', user);
      }
    }
    
    return createResponse(false, 'Email, password, atau role tidak valid');
  } catch (error) {
    console.error('Login error:', error);
    return createResponse(false, 'Login failed: ' + error.message);
  }
}

function getUserData(data) {
  try {
    const ss = getSpreadsheet();
    const usersSheet = ss.getSheetByName('Users') || getOrCreateSheet('Users');
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
        
        return createResponse(true, 'User data retrieved', user);
      }
    }
    
    return createResponse(false, 'User not found');
  } catch (error) {
    return createResponse(false, 'Error retrieving user data: ' + error.message);
  }
}

function getClasses() {
  try {
    const ss = getSpreadsheet();
    const classesSheet = ss.getSheetByName('Classes') || getOrCreateSheet('Classes');
    const classData = classesSheet.getDataRange().getValues();
    
    const classes = [];
    for (let i = 1; i < classData.length; i++) {
      const row = classData[i];
      if (row[0]) { // Check if ID exists
        classes.push({
          id: row[0],
          name: row[1],
          level: row[2],
          academicYear: row[3],
          homeroom: row[4],
          totalStudents: row[5] || 0,
          description: row[1], // Use name as description for compatibility
          teacherUsername: 'guru@clasfy.edu' // Default teacher
        });
      }
    }
    
    return createResponse(true, 'Classes retrieved successfully', classes);
  } catch (error) {
    return createResponse(false, 'Error retrieving classes: ' + error.message);
  }
}

function getStudents(data) {
  try {
    const ss = getSpreadsheet();
    const studentsSheet = ss.getSheetByName('Students') || getOrCreateSheet('Students');
    const studentData = studentsSheet.getDataRange().getValues();
    
    const students = [];
    for (let i = 1; i < studentData.length; i++) {
      const row = studentData[i];
      if (row[0] && (!data.classId || row[3] === data.classId)) {
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
          parentPhone: row[9],
          username: row[5] // Use email as username
        });
      }
    }
    
    return createResponse(true, 'Students retrieved successfully', students);
  } catch (error) {
    return createResponse(false, 'Error retrieving students: ' + error.message);
  }
}

function getSubjects() {
  try {
    const ss = getSpreadsheet();
    const subjectsSheet = ss.getSheetByName('Subjects') || getOrCreateSheet('Subjects');
    const subjectData = subjectsSheet.getDataRange().getValues();
    
    const subjects = [];
    for (let i = 1; i < subjectData.length; i++) {
      const row = subjectData[i];
      if (row[0]) {
        subjects.push({
          id: row[0],
          name: row[1],
          code: row[2],
          description: row[3],
          teacherId: row[4],
          teacherName: row[5]
        });
      }
    }
    
    return createResponse(true, 'Subjects retrieved successfully', subjects);
  } catch (error) {
    return createResponse(false, 'Error retrieving subjects: ' + error.message);
  }
}

function saveGrades(data) {
  try {
    const ss = getSpreadsheet();
    const gradesSheet = ss.getSheetByName('Grades') || getOrCreateSheet('Grades');
    
    const { classId, subjectId, categoryId, assessmentType, grades } = data;
    
    grades.forEach(grade => {
      const newRow = [
        generateId(),
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
    const ss = getSpreadsheet();
    const attendanceSheet = ss.getSheetByName('Attendance') || getOrCreateSheet('Attendance');
    
    const { classId, date, attendanceData } = data;
    
    attendanceData.forEach(attendance => {
      const newRow = [
        generateId(),
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
    const ss = getSpreadsheet();
    const gradesSheet = ss.getSheetByName('Grades') || getOrCreateSheet('Grades');
    const gradeData = gradesSheet.getDataRange().getValues();
    
    const grades = [];
    for (let i = 1; i < gradeData.length; i++) {
      const row = gradeData[i];
      if (row[0] && (!data.classId || row[2] === data.classId) && (!data.subjectId || row[3] === data.subjectId)) {
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
    
    return createResponse(true, 'Grades retrieved successfully', grades);
  } catch (error) {
    return createResponse(false, 'Error retrieving grades: ' + error.message);
  }
}

function getAttendance(data) {
  try {
    const ss = getSpreadsheet();
    const attendanceSheet = ss.getSheetByName('Attendance') || getOrCreateSheet('Attendance');
    const attendanceData = attendanceSheet.getDataRange().getValues();
    
    const attendance = [];
    for (let i = 1; i < attendanceData.length; i++) {
      const row = attendanceData[i];
      if (row[0] && (!data.classId || row[2] === data.classId)) {
        attendance.push({
          id: row[0],
          studentId: row[1],
          classId: row[2],
          date: row[3],
          status: row[4],
          notes: row[5],
          createdAt: row[6],
          teacherId: row[7],
          studentUsername: row[1] // For compatibility
        });
      }
    }
    
    return createResponse(true, 'Attendance retrieved successfully', attendance);
  } catch (error) {
    return createResponse(false, 'Error retrieving attendance: ' + error.message);
  }
}

// Add handlers for new operations
function handleAddClass(data) {
  try {
    const { className, description } = data;
    
    if (!className) {
      return createResponse(false, 'Nama kelas harus diisi');
    }
    
    const sheet = getOrCreateSheet('Classes');
    const id = generateId();
    
    sheet.appendRow([id, className, '', '', '', 0]); // Basic class structure
    
    return createResponse(true, 'Kelas berhasil ditambahkan', {
      id: id,
      name: className,
      description: description,
      level: '',
      academicYear: '',
      homeroom: '',
      totalStudents: 0
    });
    
  } catch (error) {
    console.error('Error in handleAddClass:', error);
    return createResponse(false, `Error adding class: ${error.message}`);
  }
}

function handleAddStudent(data) {
  try {
    const { classId, studentUsername, fullName, studentPassword } = data;
    
    if (!classId || !studentUsername || !fullName) {
      return createResponse(false, 'Class ID, username, dan nama lengkap harus diisi');
    }
    
    const sheet = getOrCreateSheet('Students');
    const id = generateId();
    const email = studentUsername.includes('@') ? studentUsername : `${studentUsername}@student.edu`;
    
    sheet.appendRow([id, fullName, '', classId, '', email, '', '', '', '']);
    
    return createResponse(true, 'Siswa berhasil ditambahkan', {
      id: id,
      name: fullName,
      email: email,
      classId: classId,
      username: studentUsername
    });
    
  } catch (error) {
    console.error('Error in handleAddStudent:', error);
    return createResponse(false, `Error adding student: ${error.message}`);
  }
}

function handleGetAssignments(data) {
  try {
    const { classId } = data;
    const sheet = getOrCreateSheet('Assignments');
    const values = sheet.getDataRange().getValues();
    const assignments = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[0] && (!classId || row[1] === classId)) {
        assignments.push({
          id: row[0],
          classId: row[1],
          title: row[2],
          description: row[3],
          dueDate: row[4],
          points: row[5],
          createdAt: row[6]
        });
      }
    }
    
    return createResponse(true, 'Assignments retrieved successfully', assignments);
    
  } catch (error) {
    console.error('Error in handleGetAssignments:', error);
    return createResponse(false, `Error getting assignments: ${error.message}`);
  }
}

function handleAddAssignment(data) {
  try {
    const { classId, title, description, dueDate, points } = data;
    
    if (!classId || !title) {
      return createResponse(false, 'Class ID dan judul tugas harus diisi');
    }
    
    const sheet = getOrCreateSheet('Assignments');
    const id = generateId();
    const createdAt = new Date().toISOString();
    
    sheet.appendRow([id, classId, title, description || '', dueDate || '', points || 100, createdAt]);
    
    return createResponse(true, 'Tugas berhasil ditambahkan', {
      id: id,
      classId: classId,
      title: title,
      description: description,
      dueDate: dueDate,
      points: points,
      createdAt: createdAt
    });
    
  } catch (error) {
    console.error('Error in handleAddAssignment:', error);
    return createResponse(false, `Error adding assignment: ${error.message}`);
  }
}

function handleAddGrade(data) {
  try {
    const { assignmentId, studentUsername, score, feedback } = data;
    
    if (!assignmentId || !studentUsername || score === undefined) {
      return createResponse(false, 'Assignment ID, username siswa, dan nilai harus diisi');
    }
    
    const sheet = getOrCreateSheet('Grades');
    const id = generateId();
    const createdAt = new Date().toISOString();
    
    sheet.appendRow([id, studentUsername, '', '', '', '', score, createdAt, '']);
    
    return createResponse(true, 'Nilai berhasil ditambahkan', {
      id: id,
      assignmentId: assignmentId,
      studentUsername: studentUsername,
      score: score,
      feedback: feedback,
      createdAt: createdAt
    });
    
  } catch (error) {
    console.error('Error in handleAddGrade:', error);
    return createResponse(false, `Error adding grade: ${error.message}`);
  }
}

function handleAddAttendance(data) {
  try {
    const { classId, studentUsername, date, status, notes } = data;
    
    if (!classId || !studentUsername || !date || !status) {
      return createResponse(false, 'Class ID, username siswa, tanggal, dan status harus diisi');
    }
    
    const sheet = getOrCreateSheet('Attendance');
    const id = generateId();
    const createdAt = new Date().toISOString();
    
    sheet.appendRow([id, studentUsername, classId, date, status, notes || '', createdAt, '']);
    
    return createResponse(true, 'Presensi berhasil ditambahkan', {
      id: id,
      classId: classId,
      studentUsername: studentUsername,
      date: date,
      status: status,
      notes: notes,
      createdAt: createdAt
    });
    
  } catch (error) {
    console.error('Error in handleAddAttendance:', error);
    return createResponse(false, `Error adding attendance: ${error.message}`);
  }
}

function handleGetJournals(data) {
  try {
    const { classId } = data;
    const sheet = getOrCreateSheet('Journals');
    const values = sheet.getDataRange().getValues();
    const journals = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[0] && (!classId || row[1] === classId)) {
        journals.push({
          id: row[0],
          classId: row[1],
          date: row[2],
          topic: row[3],
          activities: row[4],
          notes: row[5],
          createdAt: row[6]
        });
      }
    }
    
    return createResponse(true, 'Journals retrieved successfully', journals);
    
  } catch (error) {
    console.error('Error in handleGetJournals:', error);
    return createResponse(false, `Error getting journals: ${error.message}`);
  }
}

function handleAddJournal(data) {
  try {
    const { classId, date, topic, activities, notes } = data;
    
    if (!classId || !date || !topic) {
      return createResponse(false, 'Class ID, tanggal, dan topik harus diisi');
    }
    
    const sheet = getOrCreateSheet('Journals');
    const id = generateId();
    const createdAt = new Date().toISOString();
    
    sheet.appendRow([id, classId, date, topic, activities || '', notes || '', createdAt]);
    
    return createResponse(true, 'Jurnal berhasil ditambahkan', {
      id: id,
      classId: classId,
      date: date,
      topic: topic,
      activities: activities,
      notes: notes,
      createdAt: createdAt
    });
    
  } catch (error) {
    console.error('Error in handleAddJournal:', error);
    return createResponse(false, `Error adding journal: ${error.message}`);
  }
}

function handleGetGamification(data) {
  try {
    const { classId, studentUsername } = data;
    const sheet = getOrCreateSheet('Gamification');
    const values = sheet.getDataRange().getValues();
    const gamification = [];
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[0]) {
        const record = {
          id: row[0],
          classId: row[1],
          studentUsername: row[2],
          points: row[3] || 0,
          level: row[4] || 1,
          badges: row[5] || '',
          achievements: row[6] || '',
          updatedAt: row[7]
        };
        
        let include = true;
        if (classId && record.classId !== classId) include = false;
        if (studentUsername && record.studentUsername !== studentUsername) include = false;
        
        if (include) {
          gamification.push(record);
        }
      }
    }
    
    return createResponse(true, 'Gamification data retrieved successfully', gamification);
    
  } catch (error) {
    console.error('Error in handleGetGamification:', error);
    return createResponse(false, `Error getting gamification data: ${error.message}`);
  }
}

function handleAwardPoints(data) {
  try {
    const { classId, studentUsername, points, reason } = data;
    
    if (!classId || !studentUsername || !points) {
      return createResponse(false, 'Class ID, username siswa, dan poin harus diisi');
    }
    
    const sheet = getOrCreateSheet('Gamification');
    const values = sheet.getDataRange().getValues();
    let found = false;
    
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row[1] === classId && row[2] === studentUsername) {
        const currentPoints = parseInt(row[3]) || 0;
        const newPoints = currentPoints + parseInt(points);
        const updatedAt = new Date().toISOString();
        
        sheet.getRange(i + 1, 4).setValue(newPoints);
        sheet.getRange(i + 1, 8).setValue(updatedAt);
        
        found = true;
        break;
      }
    }
    
    if (!found) {
      const id = generateId();
      const updatedAt = new Date().toISOString();
      sheet.appendRow([id, classId, studentUsername, points, 1, '', '', updatedAt]);
    }
    
    return createResponse(true, `${points} poin berhasil diberikan kepada ${studentUsername}`, {
      classId: classId,
      studentUsername: studentUsername,
      pointsAwarded: points,
      reason: reason
    });
    
  } catch (error) {
    console.error('Error in handleAwardPoints:', error);
    return createResponse(false, `Error awarding points: ${error.message}`);
  }
}

function handleInitializeGamification(data) {
  try {
    const { classId, studentUsername } = data;
    
    if (!classId || !studentUsername) {
      return createResponse(false, 'Class ID dan username siswa harus diisi');
    }
    
    const sheet = getOrCreateSheet('Gamification');
    const id = generateId();
    const updatedAt = new Date().toISOString();
    
    sheet.appendRow([id, classId, studentUsername, 0, 1, '', '', updatedAt]);
    
    return createResponse(true, 'Gamification initialized for student', {
      id: id,
      classId: classId,
      studentUsername: studentUsername,
      points: 0,
      level: 1,
      badges: '',
      achievements: '',
      updatedAt: updatedAt
    });
    
  } catch (error) {
    console.error('Error in handleInitializeGamification:', error);
    return createResponse(false, `Error initializing gamification: ${error.message}`);
  }
}

// Placeholder handlers for update operations
function handleUpdateClass(data) { return createResponse(true, 'Update class not implemented yet'); }
function handleDeleteClass(data) { return createResponse(true, 'Delete class not implemented yet'); }
function handleUpdateStudent(data) { return createResponse(true, 'Update student not implemented yet'); }
function handleDeleteStudent(data) { return createResponse(true, 'Delete student not implemented yet'); }
function handleUpdateAssignment(data) { return createResponse(true, 'Update assignment not implemented yet'); }
function handleDeleteAssignment(data) { return createResponse(true, 'Delete assignment not implemented yet'); }
function handleGetGradesByStudent(data) { return getGrades({ studentUsername: data.studentUsername }); }
function handleUpdateGrade(data) { return createResponse(true, 'Update grade not implemented yet'); }
function handleDeleteGrade(data) { return createResponse(true, 'Delete grade not implemented yet'); }
function handleUpdateAttendance(data) { return createResponse(true, 'Update attendance not implemented yet'); }
function handleDeleteAttendance(data) { return createResponse(true, 'Delete attendance not implemented yet'); }
function handleUpdateJournal(data) { return createResponse(true, 'Update journal not implemented yet'); }
function handleDeleteJournal(data) { return createResponse(true, 'Delete journal not implemented yet'); }
function handleUpdateGamification(data) { return createResponse(true, 'Update gamification not implemented yet'); }

/**
 * Generate unique ID
 */
function generateId() {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Create standardized response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data !== null) {
    if (Array.isArray(data)) {
      // For arrays, use plural keys
      if (data.length > 0) {
        const firstItem = data[0];
        if (firstItem.teacherUsername !== undefined || firstItem.homeroom !== undefined) response.classes = data;
        else if (firstItem.studentUsername !== undefined || firstItem.username !== undefined || firstItem.nisn !== undefined) response.students = data;
        else if (firstItem.assignmentId !== undefined || firstItem.title !== undefined) response.assignments = data;
        else if (firstItem.score !== undefined) response.grades = data;
        else if (firstItem.status !== undefined) response.attendance = data;
        else if (firstItem.topic !== undefined) response.journals = data;
        else if (firstItem.points !== undefined) response.gamification = data;
        else if (firstItem.teacherId !== undefined) response.subjects = data;
        else response.data = data;
      } else {
        response.data = data;
      }
    } else {
      // For single objects, add as user, class, student, etc.
      if (data.role !== undefined) response.user = data;
      else if (data.teacherUsername !== undefined || data.homeroom !== undefined) response.class = data;
      else if (data.username !== undefined || data.studentUsername !== undefined || data.nisn !== undefined) response.student = data;
      else if (data.assignmentId !== undefined || data.title !== undefined) response.assignment = data;
      else if (data.score !== undefined) response.grade = data;
      else if (data.status !== undefined) response.attendance = data;
      else if (data.topic !== undefined) response.journal = data;
      else if (data.points !== undefined) response.gamification = data;
      else response.data = data;
    }
  }
  
  return response;
}

/**
 * doGet function for basic web access (optional)
 */
function doGet(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  
  return output.setContent(JSON.stringify({
    success: true,
    message: 'Clasfy API is running',
    timestamp: new Date().toISOString(),
    spreadsheetId: SPREADSHEET_ID,
    endpoints: [
      'login', 'getUserData',
      'getClasses', 'addClass', 'updateClass', 'deleteClass',
      'getStudents', 'addStudent', 'updateStudent', 'deleteStudent',
      'getSubjects',
      'getAssignments', 'addAssignment', 'updateAssignment', 'deleteAssignment',
      'getGrades', 'saveGrades', 'addGrade', 'updateGrade', 'deleteGrade', 'getGradesByStudent',
      'getAttendance', 'saveAttendance', 'addAttendance', 'updateAttendance', 'deleteAttendance',
      'getJournals', 'addJournal', 'updateJournal', 'deleteJournal',
      'getGamification', 'awardPoints', 'updateGamification', 'initializeGamification'
    ]
  }));
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
  console.log(result);
}