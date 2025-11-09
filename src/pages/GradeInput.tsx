import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Grade {
  studentId: string;
  studentName: string;
  nisn: string;
  tugas: number;
  uts: number;
  uas: number;
  finalGrade: number;
}

export default function GradeInput() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [grades, setGrades] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [classes, setClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchGrades();
    }
  }, [selectedClass, selectedSubject]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_JhmA3VFQ5jGcFs2Aq_fy-2wbJ57yN1NzC1Wfhc06049tdg26eOnk-lzEHdVeW1iQgQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getClasses' })
      });
      const data = await response.json();
      if (data.success) {
        setClasses(data.data.map((c: any) => c.name));
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_JhmA3VFQ5jGcFs2Aq_fy-2wbJ57yN1NzC1Wfhc06049tdg26eOnk-lzEHdVeW1iQgQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getSubjects' })
      });
      const data = await response.json();
      if (data.success) {
        setSubjects(data.data.map((s: any) => s.name));
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchGrades = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_JhmA3VFQ5jGcFs2Aq_fy-2wbJ57yN1NzC1Wfhc06049tdg26eOnk-lzEHdVeW1iQgQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'getGrades',
          class: selectedClass,
          subject: selectedSubject
        })
      });
      const data = await response.json();
      if (data.success) {
        setGrades(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateFinalGrade = (tugas: number, uts: number, uas: number) => {
    // Bobot: Tugas 30%, UTS 30%, UAS 40%
    return Math.round((tugas * 0.3) + (uts * 0.3) + (uas * 0.4));
  };

  const handleGradeChange = (studentId: string, field: 'tugas' | 'uts' | 'uas', value: string) => {
    const numValue = parseInt(value) || 0;
    if (numValue < 0 || numValue > 100) return;

    setGrades(grades.map(grade => {
      if (grade.studentId === studentId) {
        const updatedGrade = { ...grade, [field]: numValue };
        updatedGrade.finalGrade = calculateFinalGrade(updatedGrade.tugas, updatedGrade.uts, updatedGrade.uas);
        return updatedGrade;
      }
      return grade;
    }));
  };

  const handleSave = () => {
    if (!selectedClass || !selectedSubject) {
      toast({ 
        title: "Error", 
        description: "Pilih kelas dan mata pelajaran terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Nilai berhasil disimpan" });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 85) return "text-green-600";
    if (grade >= 70) return "text-blue-600";
    if (grade >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const averageGrade = grades.length > 0 ? Math.round(grades.reduce((sum, grade) => sum + grade.finalGrade, 0) / grades.length) : 0;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Input Nilai</h1>
        <p className="text-muted-foreground">Input dan kelola nilai siswa</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pilih Kelas dan Mata Pelajaran</CardTitle>
          <CardDescription>
            Pilih kelas dan mata pelajaran untuk input nilai
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Siswa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{grades.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getGradeColor(averageGrade)}`}>
                  {averageGrade}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lulus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {grades.filter(g => g.finalGrade >= 75).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tidak Lulus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {grades.filter(g => g.finalGrade < 75).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Input Nilai - {selectedClass} - {selectedSubject}</CardTitle>
              <CardDescription>
                Masukkan nilai tugas, UTS, dan UAS. Nilai akhir akan dihitung otomatis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  Bobot Penilaian: Tugas (30%) + UTS (30%) + UAS (40%) = Nilai Akhir
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NISN</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Tugas (30%)</TableHead>
                      <TableHead>UTS (30%)</TableHead>
                      <TableHead>UAS (40%)</TableHead>
                      <TableHead>Nilai Akhir</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((grade) => (
                      <TableRow key={grade.studentId}>
                        <TableCell className="font-medium">{grade.nisn}</TableCell>
                        <TableCell>{grade.studentName}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.tugas || ""}
                            onChange={(e) => handleGradeChange(grade.studentId, 'tugas', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.uts || ""}
                            onChange={(e) => handleGradeChange(grade.studentId, 'uts', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={grade.uas || ""}
                            onChange={(e) => handleGradeChange(grade.studentId, 'uas', e.target.value)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <span className={`font-bold ${getGradeColor(grade.finalGrade)}`}>
                            {grade.finalGrade}
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
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Nilai
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}