import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/auth/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "@/components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import Subjects from "./pages/Subjects";
import GradeInput from "./pages/GradeInput";
import DailyJournal from "./pages/DailyJournal";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <Footer />
        </div>
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
        <AuthProvider>
          <ProtectedLayout>
            <Routes>
              <Route path="/" element={<DashboardRouter />} />
              
              {/* Teacher Routes */}
              <Route path="/kelas" element={<TeacherRoute><Classes /></TeacherRoute>} />
              <Route path="/siswa" element={<TeacherRoute><Students /></TeacherRoute>} />
              <Route path="/mata-pelajaran" element={<TeacherRoute><Subjects /></TeacherRoute>} />
              <Route path="/kategori-penilaian" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Kategori Penilaian</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/bobot-penilaian" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Bobot Penilaian</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/input-nilai" element={<TeacherRoute><GradeInput /></TeacherRoute>} />
              <Route path="/input-kehadiran" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Input Kehadiran</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/jurnal-harian" element={<TeacherRoute><DailyJournal /></TeacherRoute>} />
              <Route path="/rekap-nilai" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Rekap Nilai</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/rekap-kehadiran" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Rekap Kehadiran</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/gamifikasi" element={<TeacherRoute><div className="p-6"><h1 className="text-2xl font-bold">Sistem Gamifikasi</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></TeacherRoute>} />
              <Route path="/profil" element={<Profile />} />
              
              {/* Student Routes */}
              <Route path="/siswa/dashboard" element={<StudentRoute><StudentDashboard /></StudentRoute>} />
              <Route path="/siswa/nilai" element={<StudentRoute><div className="p-6"><h1 className="text-2xl font-bold">Nilai & Tugas</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></StudentRoute>} />
              <Route path="/siswa/progress" element={<StudentRoute><div className="p-6"><h1 className="text-2xl font-bold">Progress Belajar</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></StudentRoute>} />
              <Route path="/siswa/leaderboard" element={<StudentRoute><div className="p-6"><h1 className="text-2xl font-bold">Leaderboard</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></StudentRoute>} />
              <Route path="/siswa/profil" element={<StudentRoute><div className="p-6"><h1 className="text-2xl font-bold">Profil Siswa</h1><p className="text-muted-foreground">Halaman ini akan segera hadir</p></div></StudentRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ProtectedLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Component to route to appropriate dashboard based on user role
function DashboardRouter() {
  const { user } = useAuth();
  
  if (user?.role === 'siswa') {
    return <StudentDashboard />;
  }
  
  return <Dashboard />;
}

// Route protection components
function TeacherRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (user?.role !== 'guru') {
    return <NotFound />;
  }
  
  return <>{children}</>;
}

function StudentRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (user?.role !== 'siswa') {
    return <NotFound />;
  }
  
  return <>{children}</>;
}

export default App;
