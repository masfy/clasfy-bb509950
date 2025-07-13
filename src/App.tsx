import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Teacher Routes */}
            <Route path="/kelas" element={<div className="p-6"><h1 className="text-2xl font-bold">Manajemen Kelas</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/siswa" element={<div className="p-6"><h1 className="text-2xl font-bold">Data Siswa</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/mata-pelajaran" element={<div className="p-6"><h1 className="text-2xl font-bold">Mata Pelajaran</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/kategori-penilaian" element={<div className="p-6"><h1 className="text-2xl font-bold">Kategori Penilaian</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/bobot-penilaian" element={<div className="p-6"><h1 className="text-2xl font-bold">Bobot Penilaian</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/input-nilai" element={<div className="p-6"><h1 className="text-2xl font-bold">Input Nilai</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/input-kehadiran" element={<div className="p-6"><h1 className="text-2xl font-bold">Input Kehadiran</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/jurnal-harian" element={<div className="p-6"><h1 className="text-2xl font-bold">Jurnal Harian</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/rekap-nilai" element={<div className="p-6"><h1 className="text-2xl font-bold">Rekap Nilai</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/rekap-kehadiran" element={<div className="p-6"><h1 className="text-2xl font-bold">Rekap Kehadiran</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/gamifikasi" element={<div className="p-6"><h1 className="text-2xl font-bold">Sistem Gamifikasi</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/profil" element={<div className="p-6"><h1 className="text-2xl font-bold">Profil Guru</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            
            {/* Student Routes */}
            <Route path="/siswa/dashboard" element={<div className="p-6"><h1 className="text-2xl font-bold">Dashboard Siswa</h1><p className="text-muted-foreground">Portal RPG siswa akan segera hadir</p></div>} />
            <Route path="/siswa/nilai" element={<div className="p-6"><h1 className="text-2xl font-bold">Nilai & Tugas</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/siswa/progress" element={<div className="p-6"><h1 className="text-2xl font-bold">Progress Belajar</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/siswa/leaderboard" element={<div className="p-6"><h1 className="text-2xl font-bold">Leaderboard</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            <Route path="/siswa/profil" element={<div className="p-6"><h1 className="text-2xl font-bold">Profil Siswa</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
