import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentGrade {
  studentId: string;
  studentName: string;
  nisn: string;
  tugas: number;
  uts: number;
  uas: number;
  finalGrade: number;
  rank: number;
}

export default function GradeReport() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grades, setGrades] = useState<StudentGrade[]>([
    { studentId: "1", studentName: "Ahmad Fauzi", nisn: "2023001", tugas: 85, uts: 80, uas: 88, finalGrade: 84, rank: 2 },
    { studentId: "2", studentName: "Siti Nurhaliza", nisn: "2023002", tugas: 90, uts: 85, uas: 92, finalGrade: 89, rank: 1 },
    { studentId: "3", studentName: "Budi Santoso", nisn: "2023003", tugas: 78, uts: 75, uas: 80, finalGrade: 78, rank: 3 }
  ]);
  const { toast } = useToast();

  const classes = ["X IPA 1", "X IPA 2", "XI IPA 1", "XI IPA 2"];
  const subjects = ["Matematika", "Biologi", "Fisika", "Kimia", "Bahasa Indonesia"];

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-green-600";
    if (grade >= 70) return "text-blue-600";
    if (grade >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradeLetter = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "E";
  };

  const stats = {
    totalStudents: grades.length,
    averageGrade: grades.length > 0 ? Math.round(grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length) : 0,
    highestGrade: grades.length > 0 ? Math.max(...grades.map(g => g.finalGrade)) : 0,
    lowestGrade: grades.length > 0 ? Math.min(...grades.map(g => g.finalGrade)) : 0,
    passedStudents: grades.filter(g => g.finalGrade >= 75).length
  };

  const handleExport = () => {
    if (!selectedClass || !selectedSubject) {
      toast({ 
        title: "Error", 
        description: "Pilih kelas dan mata pelajaran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Laporan berhasil diekspor" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Rekap Nilai</h1>
          <p className="text-muted-foreground">Laporan dan analisis nilai siswa</p>
        </div>
        
        <Button onClick={handleExport} disabled={!selectedClass || !selectedSubject}>
          <Download className="h-4 w-4 mr-2" />
          Ekspor Laporan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Laporan</CardTitle>
          <CardDescription>
            Pilih kelas dan mata pelajaran untuk melihat rekap nilai
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Kelas</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kelas" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Mata Pelajaran</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mata pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && selectedSubject && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getGradeColor(stats.averageGrade)}`}>
                  {stats.averageGrade}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tertinggi</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.highestGrade}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Terendah</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.lowestGrade}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lulus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.passedStudents}/{stats.totalStudents}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rekap Nilai - {selectedClass} - {selectedSubject}</CardTitle>
              <CardDescription>
                Daftar lengkap nilai siswa dengan ranking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>NISN</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Tugas</TableHead>
                    <TableHead>UTS</TableHead>
                    <TableHead>UAS</TableHead>
                    <TableHead>Nilai Akhir</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades
                    .sort((a, b) => a.rank - b.rank)
                    .map((grade) => (
                    <TableRow key={grade.studentId}>
                      <TableCell className="font-medium">#{grade.rank}</TableCell>
                      <TableCell>{grade.nisn}</TableCell>
                      <TableCell>{grade.studentName}</TableCell>
                      <TableCell>{grade.tugas}</TableCell>
                      <TableCell>{grade.uts}</TableCell>
                      <TableCell>{grade.uas}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                          {grade.finalGrade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                          {getGradeLetter(grade.finalGrade)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          grade.finalGrade >= 75 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {grade.finalGrade >= 75 ? 'Lulus' : 'Tidak Lulus'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}