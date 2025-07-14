# Struktur Google Spreadsheet untuk Clasfy

## Cara Setup:

1. **Buat Google Spreadsheet baru** dengan nama "Clasfy Database"
2. **Buat 8 sheet** dengan nama dan struktur berikut:
3. **Copy Apps Script code** dari file `code.gs`
4. **Deploy sebagai Web App**

---

## Sheet 1: Users
**Kolom:**
- A: ID (text) - Unique identifier
- B: Email (text)
- C: Password (text)
- D: Role (text) - "guru" atau "siswa"
- E: Name (text)
- F: Avatar (text) - URL foto profil
- G: NIP (text) - Untuk guru
- H: NISN (text) - Untuk siswa  
- I: Kelas (text) - Untuk siswa

**Sample Data:**
```
ID                    Email              Password    Role    Name            Avatar  NIP                 NISN        Kelas
guru001              guru@clasfy.edu    guru123     guru    Bu Sarah Wijaya         196512345678901234              
siswa001             siswa@clasfy.edu   siswa123    siswa   Ahmad Rizki                                 0012345678  XII IPA 1
guru002              guru2@clasfy.edu   guru123     guru    Pak Budi Santoso        196612345678901235              
siswa002             siswa2@clasfy.edu  siswa123    siswa   Siti Nurhaliza                              0012345679  XII IPA 1
```

---

## Sheet 2: Classes
**Kolom:**
- A: ID (text)
- B: Name (text) - Nama kelas
- C: Level (text) - Tingkat (X, XI, XII)
- D: Academic Year (text) - Tahun ajaran
- E: Homeroom (text) - Wali kelas
- F: Total Students (number)

**Sample Data:**
```
ID        Name        Level   Academic Year   Homeroom          Total Students
class001  XII IPA 1   XII     2024/2025      Bu Sarah Wijaya   32
class002  XII IPA 2   XII     2024/2025      Pak Budi Santoso  30
class003  XI IPA 1    XI      2024/2025      Bu Ani Kartika    28
```

---

## Sheet 3: Students
**Kolom:**
- A: ID (text)
- B: Name (text)
- C: NISN (text)
- D: Class ID (text)
- E: Class Name (text)
- F: Email (text)
- G: Phone (text)
- H: Address (text)
- I: Parent Name (text)
- J: Parent Phone (text)

**Sample Data:**
```
ID          Name              NISN        Class ID   Class Name   Email                Phone          Address                    Parent Name      Parent Phone
student001  Ahmad Rizki       0012345678  class001   XII IPA 1    ahmad@clasfy.edu     081234567890   Jl. Merdeka No. 1         Bapak Ahmad      081234567891
student002  Siti Nurhaliza    0012345679  class001   XII IPA 1    siti@clasfy.edu      081234567892   Jl. Sudirman No. 2        Ibu Siti         081234567893
```

---

## Sheet 4: Subjects
**Kolom:**
- A: ID (text)
- B: Name (text)
- C: Code (text)
- D: Description (text)
- E: Teacher ID (text)
- F: Teacher Name (text)

**Sample Data:**
```
ID         Name           Code    Description              Teacher ID   Teacher Name
subject001 Matematika     MAT     Matematika Wajib         guru001      Bu Sarah Wijaya
subject002 Fisika         FIS     Fisika Peminatan IPA     guru002      Pak Budi Santoso
subject003 Kimia          KIM     Kimia Peminatan IPA      guru001      Bu Sarah Wijaya
```

---

## Sheet 5: Grades
**Kolom:**
- A: ID (text)
- B: Student ID (text)
- C: Class ID (text)
- D: Subject ID (text)
- E: Category ID (text)
- F: Assessment Type (text)
- G: Score (number)
- H: Created At (datetime)
- I: Teacher ID (text)

**Sample Data:**
```
ID         Student ID   Class ID   Subject ID   Category ID   Assessment Type   Score   Created At           Teacher ID
grade001   student001   class001   subject001   cat001        Ulangan Harian 1  85      2024-01-15 10:30:00  guru001
grade002   student002   class001   subject001   cat001        Ulangan Harian 1  92      2024-01-15 10:30:00  guru001
```

---

## Sheet 6: Attendance
**Kolom:**
- A: ID (text)
- B: Student ID (text)
- C: Class ID (text)
- D: Date (date)
- E: Status (text) - "Hadir", "Sakit", "Izin", "Alfa"
- F: Notes (text)
- G: Created At (datetime)
- H: Teacher ID (text)

**Sample Data:**
```
ID           Student ID   Class ID   Date        Status   Notes      Created At           Teacher ID
attend001    student001   class001   2024-01-15  Hadir               2024-01-15 07:30:00  guru001
attend002    student002   class001   2024-01-15  Sakit    Demam      2024-01-15 07:30:00  guru001
```

---

## Sheet 7: Categories
**Kolom:**
- A: ID (text)
- B: Name (text)
- C: Description (text)
- D: Weight (number) - Bobot dalam persen
- E: Subject ID (text)

**Sample Data:**
```
ID       Name             Description                    Weight   Subject ID
cat001   Tugas Harian     Tugas dan PR sehari-hari      20       subject001
cat002   Ulangan Harian   Ulangan tengah materi         30       subject001
cat003   UTS              Ujian Tengah Semester         25       subject001
cat004   UAS              Ujian Akhir Semester          25       subject001
```

---

## Sheet 8: Journal
**Kolom:**
- A: ID (text)
- B: Date (date)
- C: Class ID (text)
- D: Subject ID (text)
- E: Material (text)
- F: Method (text)
- G: Students Present (number)
- H: Notes (text)
- I: Teacher ID (text)
- J: Created At (datetime)

**Sample Data:**
```
ID         Date        Class ID   Subject ID   Material                Method     Students Present   Notes                      Teacher ID   Created At
journal001 2024-01-15  class001   subject001   Fungsi Kuadrat          Ceramah    30                Siswa aktif bertanya       guru001      2024-01-15 14:00:00
journal002 2024-01-16  class001   subject002   Gerak Lurus             Praktek    32                Lab eksperimen sukses      guru002      2024-01-16 10:00:00
```

---

## Cara Deploy Apps Script:

1. Buka Google Apps Script (script.google.com)
2. Buat project baru dengan nama "Clasfy Backend"
3. Copy paste code dari `code.gs`
4. Ganti `YOUR_SPREADSHEET_ID_HERE` dengan ID spreadsheet Anda
5. Deploy → New deployment → Type: Web app
6. Execute as: Me
7. Who has access: Anyone
8. Deploy dan copy URL web app
9. Update URL di `src/contexts/AuthContext.tsx`

## Testing:
Gunakan function `testLogin()` untuk test koneksi ke spreadsheet.