import { StatCard } from "@/components/dashboard/StatCard"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar,
  TrendingUp,
  Award
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Guru</h1>
        <p className="text-muted-foreground">
          Selamat datang kembali! Berikut ringkasan aktivitas pembelajaran hari ini.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Kelas"
          value="12"
          description="5 kelas aktif"
          icon={Users}
          variant="default"
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Total Siswa"
          value="384"
          description="96% kehadiran hari ini"
          icon={GraduationCap}
          variant="success"
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Mata Pelajaran"
          value="8"
          description="3 jadwal hari ini"
          icon={BookOpen}
          variant="accent"
        />
        <StatCard
          title="Rata-rata Nilai"
          value="82.5"
          description="Meningkat dari bulan lalu"
          icon={TrendingUp}
          variant="warning"
          trend={{ value: 2.3, isPositive: true }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <QuickActions />

        {/* Recent Activity */}
        <RecentActivity />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Tugas Terkumpul"
          value="156"
          description="Dari 180 total tugas"
          icon={Calendar}
          variant="success"
        />
        <StatCard
          title="Nilai Tertinggi"
          value="98"
          description="Siti Nurhaliza - Matematika"
          icon={Award}
          variant="warning"
        />
        <StatCard
          title="Kehadiran Hari Ini"
          value="96%"
          description="368 dari 384 siswa hadir"
          icon={Users}
          variant="default"
        />
      </div>
    </div>
  )
}