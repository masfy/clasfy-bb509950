import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Class {
  id: string;
  name: string;
  description: string;
  studentCount: number;
}

export default function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const { toast } = useToast();

  const API_URL = 'https://script.google.com/macros/s/AKfycbyHPKmhprRbXWiXfePFPjc26LlcNcoT6oxJ37bfX96sZngZ1aZ-20e_-8VbfI8pwHokWw/exec';

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getClasses' })
      });
      const data = await response.json();
      if (data.success) {
        setClasses(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast({ 
        title: "Error", 
        description: "Gagal memuat data kelas",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingClass) {
      setClasses(classes.map(cls => 
        cls.id === editingClass.id 
          ? { ...cls, ...formData }
          : cls
      ));
      toast({ title: "Kelas berhasil diperbarui" });
    } else {
      const newClass: Class = {
        id: Date.now().toString(),
        ...formData,
        studentCount: 0
      };
      setClasses([...classes, newClass]);
      toast({ title: "Kelas berhasil ditambahkan" });
    }
    
    setIsDialogOpen(false);
    setFormData({ name: "", description: "" });
    setEditingClass(null);
  };

  const handleEdit = (cls: Class) => {
    setEditingClass(cls);
    setFormData({ name: cls.name, description: cls.description });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter(cls => cls.id !== id));
    toast({ title: "Kelas berhasil dihapus" });
  };

  const openAddDialog = () => {
    setEditingClass(null);
    setFormData({ name: "", description: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Kelas</h1>
          <p className="text-muted-foreground">Kelola data kelas dan siswa</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kelas
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingClass ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle>
              <DialogDescription>
                {editingClass ? "Perbarui informasi kelas" : "Masukkan informasi kelas baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Kelas</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: X IPA 1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi kelas"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingClass ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kelas</CardTitle>
          <CardDescription>
            Total {classes.length} kelas terdaftar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Memuat data kelas...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kelas</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Jumlah Siswa</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Belum ada data kelas. Tambahkan kelas baru untuk memulai.
                    </TableCell>
                  </TableRow>
                ) : (
                  classes.map((cls) => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{cls.description}</TableCell>
                      <TableCell>{cls.studentCount} siswa</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(cls)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(cls.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}