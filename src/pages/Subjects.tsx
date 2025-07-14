import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
}

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", code: "MAT", name: "Matematika", description: "Matematika Wajib", credits: 4 },
    { id: "2", code: "BIO", name: "Biologi", description: "Ilmu Biologi", credits: 3 },
    { id: "3", code: "FIS", name: "Fisika", description: "Ilmu Fisika", credits: 3 },
    { id: "4", code: "KIM", name: "Kimia", description: "Ilmu Kimia", credits: 3 },
    { id: "5", code: "BIN", name: "Bahasa Indonesia", description: "Bahasa Indonesia Wajib", credits: 4 }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({ code: "", name: "", description: "", credits: 0 });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSubject) {
      setSubjects(subjects.map(subject => 
        subject.id === editingSubject.id 
          ? { ...subject, ...formData }
          : subject
      ));
      toast({ title: "Mata pelajaran berhasil diperbarui" });
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        ...formData
      };
      setSubjects([...subjects, newSubject]);
      toast({ title: "Mata pelajaran berhasil ditambahkan" });
    }
    
    setIsDialogOpen(false);
    setFormData({ code: "", name: "", description: "", credits: 0 });
    setEditingSubject(null);
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({ 
      code: subject.code, 
      name: subject.name, 
      description: subject.description, 
      credits: subject.credits 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
    toast({ title: "Mata pelajaran berhasil dihapus" });
  };

  const openAddDialog = () => {
    setEditingSubject(null);
    setFormData({ code: "", name: "", description: "", credits: 0 });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Mata Pelajaran</h1>
          <p className="text-muted-foreground">Kelola daftar mata pelajaran dan kurikulum</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Mata Pelajaran
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSubject ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran Baru"}</DialogTitle>
              <DialogDescription>
                {editingSubject ? "Perbarui informasi mata pelajaran" : "Masukkan informasi mata pelajaran baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="code">Kode Mata Pelajaran</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="Contoh: MAT, BIO, FIS"
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Nama Mata Pelajaran</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama mata pelajaran"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi mata pelajaran"
                />
              </div>
              <div>
                <Label htmlFor="credits">Jam Pelajaran/Minggu</Label>
                <Input
                  id="credits"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                  placeholder="Jumlah jam pelajaran per minggu"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingSubject ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mata Pelajaran</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jam/Minggu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.reduce((sum, subject) => sum + subject.credits, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Jam</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subjects.length > 0 ? (subjects.reduce((sum, subject) => sum + subject.credits, 0) / subjects.length).toFixed(1) : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Mata Pelajaran</CardTitle>
          <CardDescription>
            Kelola mata pelajaran yang diajarkan di sekolah
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kode</TableHead>
                <TableHead>Nama Mata Pelajaran</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Jam/Minggu</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.code}</TableCell>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.description}</TableCell>
                  <TableCell>{subject.credits} jam</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(subject)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(subject.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}