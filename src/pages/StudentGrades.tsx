import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Grade {
  subject: string;
  tugas: number;
  uts: number;
  uas: number;
  finalGrade: number;
  grade: string;
  status: "lulus" | "tidak lulus";
}

interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  score?: number;
  maxScore: number;
}

export default function StudentGrades() {
  const [selectedSemester, setSelectedSemester] = useState("1");
  
  const grades: Grade[] = [
    { subject: "Matematika", tugas: 88, uts: 85, uas: 90, finalGrade: 88, grade: "A", status: "lulus" },
    { subject: "Fisika", tugas: 82, uts: 80, uas: 85, finalGrade: 82, grade: "B", status: "lulus" },
    { subject: "Kimia", tugas: 85, uts: 83, uas: 87, finalGrade: 85, grade: "B", status: "lulus" },
    { subject: "Biologi", tugas: 90, uts: 88, uas: 92, finalGrade: 90, grade: "A", status: "lulus" },
    { subject: "Bahasa Indonesia", tugas: 87, uts: 85, uas: 88, finalGrade: 87, grade: "B", status: "lulus" },
    { subject: "Bahasa Inggris", tugas: 92, uts: 90, uas: 93, finalGrade: 92, grade: "A", status: "lulus" },
  ];

  const assignments: Assignment[] = [
    { 
      id: "1", 
      subject: "Matematika", 
      title: "Tugas Fungsi Kuadrat", 
      dueDate: "2024-01-20", 
      status: "graded", 
      score: 88,
      maxScore: 100 
    },
    { 
      id: "2", 
      subject: "Fisika", 
      title: "Praktikum Hukum Newton", 
      dueDate: "2024-01-22", 
      status: "submitted",
      maxScore: 100 
    },
    { 
      id: "3", 
      subject: "Kimia", 
      title: "Laporan Praktikum Reaksi", 
      dueDate: "2024-01-25", 
      status: "pending",
      maxScore: 100 
    },
    { 
      id: "4", 
      subject: "Biologi", 
      title: "Esai Ekosistem", 
      dueDate: "2024-01-18", 
      status: "graded", 
      score: 92,
      maxScore: 100 
    },
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-success";
    if (grade >= 70) return "text-primary";
    if (grade >= 60) return "text-warning";
    return "text-destructive";
  };

  const getGradeBgColor = (grade: string) => {
    if (grade === "A") return "bg-success text-success-foreground";
    if (grade === "B") return "bg-primary text-primary-foreground";
    if (grade === "C") return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "graded": return "bg-success text-success-foreground";
      case "submitted": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "graded": return "Dinilai";
      case "submitted": return "Dikumpulkan";
      default: return "Belum Dikumpulkan";
    }
  };

  const averageGrade = grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length;
  const completedAssignments = assignments.filter(a => a.status === "graded").length;
  const totalAssignments = assignments.length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nilai & Tugas</h1>
        <p className="text-muted-foreground">Lihat nilai, tugas, dan progress akademik Anda</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold liquid-glass-text liquid-pulse ${getGradeColor(averageGrade)}`}>
              {averageGrade.toFixed(1)}
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">
              {completedAssignments}/{totalAssignments}
            </div>
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mata Pelajaran</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">{grades.length}</div>
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium liquid-glass-text text-success">Lulus Semua</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grades">Nilai Akademik</TabsTrigger>
          <TabsTrigger value="assignments">Tugas & Penilaian</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grades" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Daftar Nilai Semester</CardTitle>
                  <CardDescription>Nilai akhir untuk setiap mata pelajaran</CardDescription>
                </div>
                <div className="w-40">
                  <Label>Semester</Label>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Semester 1</SelectItem>
                      <SelectItem value="2">Semester 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mata Pelajaran</TableHead>
                    <TableHead>Tugas</TableHead>
                    <TableHead>UTS</TableHead>
                    <TableHead>UAS</TableHead>
                    <TableHead>Nilai Akhir</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grades.map((grade, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{grade.subject}</TableCell>
                      <TableCell>{grade.tugas}</TableCell>
                      <TableCell>{grade.uts}</TableCell>
                      <TableCell>{grade.uas}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                          {grade.finalGrade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getGradeBgColor(grade.grade)}>
                          {grade.grade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={grade.status === "lulus" ? "default" : "destructive"}>
                          {grade.status === "lulus" ? "Lulus" : "Tidak Lulus"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Nilai</CardTitle>
              <CardDescription>Distribusi nilai per mata pelajaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {grades.map((grade, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{grade.subject}</span>
                    <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                      {grade.finalGrade} ({grade.grade})
                    </span>
                  </div>
                  <Progress value={grade.finalGrade} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Tugas</CardTitle>
              <CardDescription>Status dan nilai tugas Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.map((assignment) => (
                  <div 
                    key={assignment.id} 
                    className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusText(assignment.status)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <p className="font-medium">{assignment.dueDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Nilai Maks:</span>
                        <p className="font-medium">{assignment.maxScore}</p>
                      </div>
                      {assignment.score !== undefined && (
                        <>
                          <div>
                            <span className="text-muted-foreground">Nilai Anda:</span>
                            <p className={`font-bold ${getGradeColor(assignment.score)}`}>
                              {assignment.score}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Persentase:</span>
                            <p className="font-medium">
                              {((assignment.score / assignment.maxScore) * 100).toFixed(0)}%
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}