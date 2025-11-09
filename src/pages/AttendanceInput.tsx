import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar, Save, UserCheck, UserX, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  nisn: string;
  name: string;
  status: 'hadir' | 'sakit' | 'izin' | 'alpha';
}

export default function AttendanceInput() {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [classes, setClasses] = useState<string[]>([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents();
    }
  }, [selectedClass]);

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

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_JhmA3VFQ5jGcFs2Aq_fy-2wbJ57yN1NzC1Wfhc06049tdg26eOnk-lzEHdVeW1iQgQ/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'getStudents',
          class: selectedClass
        })
      });
      const data = await response.json();
      if (data.success) {
        setStudents(data.data.map((s: any) => ({ ...s, status: 'hadir' as const })) || []);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const statusOptions = [
    { value: 'hadir', label: 'Hadir', color: 'text-green-600' },
    { value: 'sakit', label: 'Sakit', color: 'text-yellow-600' },
    { value: 'izin', label: 'Izin', color: 'text-blue-600' },
    { value: 'alpha', label: 'Alpha', color: 'text-red-600' }
  ];

  const handleStatusChange = (studentId: string, status: 'hadir' | 'sakit' | 'izin' | 'alpha') => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const handleSave = () => {
    if (!selectedClass) {
      toast({ 
        title: "Error", 
        description: "Pilih kelas terlebih dahulu",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Kehadiran berhasil disimpan" });
  };

  const stats = {
    hadir: students.filter(s => s.status === 'hadir').length,
    sakit: students.filter(s => s.status === 'sakit').length,
    izin: students.filter(s => s.status === 'izin').length,
    alpha: students.filter(s => s.status === 'alpha').length
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Input Kehadiran</h1>
        <p className="text-muted-foreground">Catat kehadiran siswa harian</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pilih Kelas dan Tanggal</CardTitle>
          <CardDescription>
            Pilih kelas dan tanggal untuk input kehadiran
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
              <Label>Tanggal</Label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedClass && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hadir</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.hadir}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sakit</CardTitle>
                <UserX className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.sakit}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Izin</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.izin}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alpha</CardTitle>
                <UserX className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.alpha}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daftar Kehadiran - {selectedClass}</CardTitle>
              <CardDescription>
                Tanggal: {new Date(selectedDate).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NISN</TableHead>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>Status Kehadiran</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.nisn}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <Select 
                            value={student.status} 
                            onValueChange={(value: 'hadir' | 'sakit' | 'izin' | 'alpha') => 
                              handleStatusChange(student.id, value)
                            }
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <span className={option.color}>{option.label}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="flex justify-end">
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Kehadiran
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