import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Download, Calendar, UserCheck, UserX, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentAttendance {
  studentId: string;
  studentName: string;
  nisn: string;
  hadir: number;
  sakit: number;
  izin: number;
  alpha: number;
  totalDays: number;
  percentage: number;
}

export default function AttendanceReport() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [attendance, setAttendance] = useState<StudentAttendance[]>([
    { studentId: "1", studentName: "Ahmad Fauzi", nisn: "2023001", hadir: 18, sakit: 1, izin: 1, alpha: 0, totalDays: 20, percentage: 90 },
    { studentId: "2", studentName: "Siti Nurhaliza", nisn: "2023002", hadir: 20, sakit: 0, izin: 0, alpha: 0, totalDays: 20, percentage: 100 },
    { studentId: "3", studentName: "Budi Santoso", nisn: "2023003", hadir: 16, sakit: 2, izin: 0, alpha: 2, totalDays: 20, percentage: 80 }
  ]);
  const { toast } = useToast();

  const classes = ["X IPA 1", "X IPA 2", "XI IPA 1", "XI IPA 2"];
  const months = [
    { value: "0", label: "Januari" },
    { value: "1", label: "Februari" },
    { value: "2", label: "Maret" },
    { value: "3", label: "April" },
    { value: "4", label: "Mei" },
    { value: "5", label: "Juni" },
    { value: "6", label: "Juli" },
    { value: "7", label: "Agustus" },
    { value: "8", label: "September" },
    { value: "9", label: "Oktober" },
    { value: "10", label: "November" },
    { value: "11", label: "Desember" }
  ];
  
  const years = ["2024", "2023", "2022"];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 80) return "text-blue-600";
    if (percentage >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const stats = {
    totalStudents: attendance.length,
    averageAttendance: attendance.length > 0 ? Math.round(attendance.reduce((sum, a) => sum + a.percentage, 0) / attendance.length) : 0,
    perfectAttendance: attendance.filter(a => a.percentage === 100).length,
    lowAttendance: attendance.filter(a => a.percentage < 80).length
  };

  const handleExport = () => {
    if (!selectedClass) {
      toast({ 
        title: "Error", 
        description: "Pilih kelas terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Laporan kehadiran berhasil diekspor" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Rekap Kehadiran</h1>
          <p className="text-muted-foreground">Laporan dan analisis kehadiran siswa</p>
        </div>
        
        <Button onClick={handleExport} disabled={!selectedClass}>
          <Download className="h-4 w-4 mr-2" />
          Ekspor Laporan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Laporan</CardTitle>
          <CardDescription>
            Pilih kelas dan periode untuk melihat rekap kehadiran
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              <Label>Bulan</Label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bulan" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tahun</Label>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Siswa</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalStudents}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Kehadiran</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getAttendanceColor(stats.averageAttendance)}`}>
                  {stats.averageAttendance}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kehadiran Sempurna</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.perfectAttendance}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kehadiran Rendah</CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.lowAttendance}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Rekap Kehadiran - {selectedClass}</CardTitle>
              <CardDescription>
                Periode: {months[parseInt(selectedMonth)].label} {selectedYear}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>NISN</TableHead>
                    <TableHead>Nama Siswa</TableHead>
                    <TableHead>Hadir</TableHead>
                    <TableHead>Sakit</TableHead>
                    <TableHead>Izin</TableHead>
                    <TableHead>Alpha</TableHead>
                    <TableHead>Total Hari</TableHead>
                    <TableHead>Persentase</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance
                    .sort((a, b) => b.percentage - a.percentage)
                    .map((student) => (
                    <TableRow key={student.studentId}>
                      <TableCell className="font-medium">{student.nisn}</TableCell>
                      <TableCell>{student.studentName}</TableCell>
                      <TableCell>
                        <span className="text-green-600 font-medium">{student.hadir}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-600 font-medium">{student.sakit}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-blue-600 font-medium">{student.izin}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-red-600 font-medium">{student.alpha}</span>
                      </TableCell>
                      <TableCell>{student.totalDays}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${getAttendanceColor(student.percentage)}`}>
                          {student.percentage}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          student.percentage >= 80 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.percentage >= 80 ? 'Baik' : 'Perlu Perhatian'}
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