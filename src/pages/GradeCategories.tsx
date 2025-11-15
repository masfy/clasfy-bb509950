import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Loader2, AlertCircle, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
  const isWeightValid = totalWeight === 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="liquid-glass p-8 rounded-2xl border border-border/50 shadow-elegant">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold liquid-glass-text">Kategori Penilaian</h1>
              <p className="text-muted-foreground text-lg">Kelola kategori dan bobot penilaian untuk sistem evaluasi pembelajaran</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={openAddDialog} 
                  size="lg"
                  className="liquid-glass hover:scale-105 transition-all shadow-lg"
                >
                  <Plus className="h-5 w-5" />
                  Tambah Kategori
                </Button>
              </DialogTrigger>
              <DialogContent className="liquid-glass border-border/50 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl liquid-glass-text">
                    {editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingCategory ? "Perbarui informasi kategori penilaian" : "Buat kategori penilaian baru dengan bobot yang sesuai"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base">Nama Kategori</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Contoh: Tugas Harian"
                        required
                        className="liquid-glass border-border/50 h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-base">Deskripsi</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Jelaskan tujuan dan kriteria kategori ini"
                        required
                        className="liquid-glass border-border/50 min-h-[100px] text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="text-base">Bobot (%)</Label>
                      <div className="relative">
                        <Input
                          id="weight"
                          type="number"
                          value={formData.weight}
                          onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                          placeholder="0"
                          min="0"
                          max="100"
                          required
                          className="liquid-glass border-border/50 h-12 text-base pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Total bobot harus 100%</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 h-12 liquid-glass"
                    >
                      {editingCategory ? "Perbarui" : "Tambahkan"}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1 h-12 liquid-glass"
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="liquid-glass border-border/50 shadow-elegant liquid-float hover:scale-105 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Total Kategori
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold liquid-glass-text liquid-pulse">
                {categories.length}
              </div>
              <p className="text-sm text-muted-foreground mt-2">Kategori penilaian aktif</p>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-border/50 shadow-elegant liquid-float hover:scale-105 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Bobot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-4xl font-bold liquid-pulse ${
                totalWeight === 100 ? 'text-success liquid-glass-text' : 
                totalWeight > 100 ? 'text-destructive' : 'text-warning'
              }`}>
                {totalWeight}%
              </div>
              <p className="text-sm text-muted-foreground mt-2">Dari total 100%</p>
            </CardContent>
          </Card>

          <Card className="liquid-glass border-border/50 shadow-elegant liquid-float hover:scale-105 transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                {isWeightValid ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                variant={isWeightValid ? "default" : "destructive"} 
                className="text-lg px-4 py-2 liquid-pulse"
              >
                {isWeightValid ? "Valid" : "Tidak Valid"}
              </Badge>
              <p className="text-sm text-muted-foreground mt-3">
                {isWeightValid 
                  ? "Bobot sudah sesuai" 
                  : totalWeight > 100 
                    ? "Bobot melebihi 100%" 
                    : "Bobot kurang dari 100%"
                }
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card className="liquid-glass border-border/50 shadow-elegant overflow-hidden">
          <CardHeader className="border-b border-border/50 bg-muted/30">
            <CardTitle className="text-xl liquid-glass-text">Daftar Kategori</CardTitle>
            <CardDescription>Kelola dan atur bobot setiap kategori penilaian</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-20">
                <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Belum Ada Kategori</h3>
                <p className="text-muted-foreground mb-6">Mulai dengan menambahkan kategori penilaian pertama</p>
                <Button onClick={openAddDialog} className="liquid-glass">
                  <Plus className="h-5 w-5" />
                  Tambah Kategori
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow className="border-b border-border/50">
                      <TableHead className="font-semibold text-base">Nama Kategori</TableHead>
                      <TableHead className="font-semibold text-base">Deskripsi</TableHead>
                      <TableHead className="font-semibold text-base text-center">Bobot</TableHead>
                      <TableHead className="font-semibold text-base text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category, index) => (
                      <TableRow 
                        key={category.id} 
                        className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell className="font-medium text-base py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center liquid-glass">
                              <span className="text-primary font-bold">{index + 1}</span>
                            </div>
                            {category.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-md">
                          {category.description}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className="liquid-glass text-base px-4 py-2 font-semibold"
                          >
                            {category.weight}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(category)}
                              className="hover:bg-primary/10 hover:text-primary transition-all"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(category.id)}
                              className="hover:bg-destructive/10 hover:text-destructive transition-all"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weight Summary Footer */}
        {categories.length > 0 && (
          <Card className={`liquid-glass border-2 shadow-elegant ${
            isWeightValid ? 'border-success/50 bg-success/5' : 'border-destructive/50 bg-destructive/5'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {isWeightValid ? (
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {isWeightValid ? "Bobot Penilaian Valid" : "Bobot Penilaian Tidak Valid"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isWeightValid 
                        ? "Total bobot sudah mencapai 100% dan siap digunakan"
                        : `Total bobot saat ini ${totalWeight}% - ${totalWeight > 100 ? 'kurangi' : 'tambahkan'} ${Math.abs(100 - totalWeight)}% lagi`
                      }
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold liquid-glass-text">{totalWeight}%</div>
                  <div className="text-sm text-muted-foreground">dari 100%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
