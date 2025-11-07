import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Mail, Phone, MapPin, Save, Camera, Award, Trophy, Star, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function StudentProfile() {
  const { user, updateProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    nisn: "",
    class: user?.kelas || "",
    parentName: "",
    parentPhone: "",
    bio: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const achievements = [
    { name: "First Assignment", description: "Selesaikan tugas pertama", earned: true, date: "2024-01-05" },
    { name: "Perfect Attendance", description: "Hadir sempurna 1 bulan", earned: true, date: "2024-01-15" },
    { name: "Top 3 Student", description: "Masuk 3 besar di kelas", earned: true, date: "2024-01-20" },
    { name: "Speed Learner", description: "Selesaikan 10 topik dalam seminggu", earned: false, progress: 70 },
    { name: "Perfect Score", description: "Dapatkan nilai 100", earned: false, progress: 0 },
    { name: "Master Scholar", description: "Capai level 15", earned: false, progress: 80 }
  ];

  const stats = {
    level: 12,
    xp: 2840,
    nextLevelXp: 3000,
    totalAchievements: 15,
    earnedAchievements: 8,
    ranking: 3,
    totalStudents: 32,
    averageGrade: 87
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileData);
    toast({ title: "Profil berhasil diperbarui" });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({ 
        title: "Error", 
        description: "Password baru dan konfirmasi password tidak sama",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast({ 
        title: "Error", 
        description: "Password minimal 6 karakter",
        variant: "destructive"
      });
      return;
    }
    
    toast({ title: "Password berhasil diubah" });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ 
          title: "Error", 
          description: "Ukuran file maksimal 5MB",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoUrl = e.target?.result as string;
        updateProfile({ photo: photoUrl });
        toast({ title: "Foto profil berhasil diperbarui" });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profil Siswa</h1>
        <p className="text-muted-foreground">Kelola informasi profil dan pengaturan akun Anda</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Foto Profil</CardTitle>
            <CardDescription>Kelola foto dan status Anda</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user?.photo} />
              <AvatarFallback className="text-2xl">
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'S'}
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center">
              <h3 className="font-bold text-lg">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.kelas}</p>
              <Badge className="mt-2 bg-primary">Level {stats.level}</Badge>
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="photo" className="cursor-pointer">
                <Button variant="outline" className="w-full" asChild>
                  <span>
                    <Camera className="h-4 w-4 mr-2" />
                    Ubah Foto
                  </span>
                </Button>
              </Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground text-center">
                Maksimal 5MB (JPG, PNG)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="liquid-glass liquid-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Level & XP</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold liquid-glass-text liquid-pulse">
                  Level {stats.level}
                </div>
                <Progress value={(stats.xp / stats.nextLevelXp) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.xp} / {stats.nextLevelXp} XP
                </p>
              </CardContent>
            </Card>

            <Card className="liquid-glass liquid-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ranking Kelas</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold liquid-glass-text liquid-pulse">
                  #{stats.ranking}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  dari {stats.totalStudents} siswa
                </p>
              </CardContent>
            </Card>

            <Card className="liquid-glass liquid-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata Nilai</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold liquid-glass-text liquid-pulse text-success">
                  {stats.averageGrade}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  semua mata pelajaran
                </p>
              </CardContent>
            </Card>

            <Card className="liquid-glass liquid-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Achievement</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold liquid-glass-text liquid-pulse">
                  {stats.earnedAchievements}/{stats.totalAchievements}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  pencapaian terbuka
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs for Profile Info and Achievements */}
      <Card>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Informasi Profil</TabsTrigger>
            <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
            <TabsTrigger value="password">Ubah Password</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <CardHeader>
              <CardTitle>Informasi Profil</CardTitle>
              <CardDescription>Perbarui informasi profil dan data diri Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      <User className="h-4 w-4 inline mr-2" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nisn">NISN</Label>
                    <Input
                      id="nisn"
                      value={profileData.nisn}
                      onChange={(e) => setProfileData({ ...profileData, nisn: e.target.value })}
                      placeholder="Nomor Induk Siswa Nasional"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-2" />
                      No. Telepon
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="class">Kelas</Label>
                  <Input
                    id="class"
                    value={profileData.class}
                    onChange={(e) => setProfileData({ ...profileData, class: e.target.value })}
                    disabled
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parentName">Nama Orang Tua/Wali</Label>
                    <Input
                      id="parentName"
                      value={profileData.parentName}
                      onChange={(e) => setProfileData({ ...profileData, parentName: e.target.value })}
                      placeholder="Nama orang tua atau wali"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parentPhone">No. Telepon Orang Tua</Label>
                    <Input
                      id="parentPhone"
                      value={profileData.parentPhone}
                      onChange={(e) => setProfileData({ ...profileData, parentPhone: e.target.value })}
                      placeholder="Nomor telepon orang tua"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Alamat
                  </Label>
                  <Textarea
                    id="address"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    placeholder="Ceritakan tentang diri Anda"
                    rows={4}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Perubahan
                </Button>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="achievements">
            <CardHeader>
              <CardTitle>Pencapaian Saya</CardTitle>
              <CardDescription>
                Daftar pencapaian yang telah dan belum Anda raih
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`p-4 border rounded-lg ${
                    achievement.earned 
                      ? "border-success bg-success/5" 
                      : "border-border bg-muted/20 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {achievement.earned ? (
                        <Award className="h-6 w-6 text-success" />
                      ) : (
                        <Award className="h-6 w-6 text-muted-foreground" />
                      )}
                      <div>
                        <h4 className="font-medium">{achievement.name}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="h-3 w-3" />
                            Diraih pada {achievement.date}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge 
                      variant={achievement.earned ? "default" : "secondary"}
                      className={achievement.earned ? "bg-success text-success-foreground" : ""}
                    >
                      {achievement.earned ? "Terbuka" : "Terkunci"}
                    </Badge>
                  </div>
                  {!achievement.earned && achievement.progress !== undefined && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </TabsContent>
          
          <TabsContent value="password">
            <CardHeader>
              <CardTitle>Ubah Password</CardTitle>
              <CardDescription>Perbarui password untuk keamanan akun</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Password Saat Ini</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Ubah Password
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}