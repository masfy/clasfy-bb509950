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

interface GradeCategory {
  id: string;
  name: string;
  description: string;
  weight: number;
}

export default function GradeCategories() {
  const [categories, setCategories] = useState<GradeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<GradeCategory | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "", weight: 0 });
  const { toast } = useToast();

  const API_URL = 'https://script.google.com/macros/s/AKfycbyHPKmhprRbXWiXfePFPjc26LlcNcoT6oxJ37bfX96sZngZ1aZ-20e_-8VbfI8pwHokWw/exec';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      // Untuk demo, gunakan data static sampai API siap
      const demoData = [
        { id: "1", name: "Tugas Harian", description: "Tugas yang diberikan setiap hari", weight: 30 },
        { id: "2", name: "Ujian Tengah Semester", description: "UTS untuk evaluasi tengah semester", weight: 30 },
        { id: "3", name: "Ujian Akhir Semester", description: "UAS untuk evaluasi akhir semester", weight: 40 }
      ];
      setCategories(demoData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({ 
        title: "Error", 
        description: "Gagal memuat data kategori penilaian",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
      toast({ title: "Kategori berhasil diperbarui" });
    } else {
      const newCategory: GradeCategory = {
        id: Date.now().toString(),
        ...formData
      };
      setCategories([...categories, newCategory]);
      toast({ title: "Kategori berhasil ditambahkan" });
    }
    
    setIsDialogOpen(false);
    setFormData({ name: "", description: "", weight: 0 });
    setEditingCategory(null);
  };

  const handleEdit = (category: GradeCategory) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description, weight: category.weight });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({ title: "Kategori berhasil dihapus" });
  };

  const openAddDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", weight: 0 });
    setIsDialogOpen(true);
  };

  const totalWeight = categories.reduce((sum, cat) => sum + cat.weight, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Kategori Penilaian</h1>
          <p className="text-muted-foreground">Kelola kategori dan bobot penilaian</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Kategori
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
              <DialogDescription>
                {editingCategory ? "Perbarui informasi kategori" : "Masukkan informasi kategori baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nama Kategori</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Tugas Harian"
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Deskripsi kategori"
                />
              </div>
              <div>
                <Label htmlFor="weight">Bobot (%)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.weight || ""}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                  placeholder="Bobot dalam persen"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingCategory ? "Perbarui" : "Tambah"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">{categories.length}</div>
          </CardContent>
        </Card>
        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bobot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold liquid-glass-text liquid-pulse ${totalWeight === 100 ? 'text-success' : 'text-warning'}`}>
              {totalWeight}%
            </div>
          </CardContent>
        </Card>
        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-sm font-medium liquid-glass-text ${totalWeight === 100 ? 'text-success' : 'text-warning'}`}>
              {totalWeight === 100 ? 'Valid' : 'Perlu Penyesuaian'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kategori Penilaian</CardTitle>
          <CardDescription>
            Total bobot harus 100% untuk validasi yang benar
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Memuat data kategori...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Bobot</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Belum ada kategori penilaian. Tambahkan kategori baru untuk memulai.
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>{category.weight}%</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(category)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(category.id)}>
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