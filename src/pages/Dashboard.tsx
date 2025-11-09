import { useState, useEffect } from "react"
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
import { classApi, studentApi } from "@/lib/api"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClasses: 0,
    activeClasses: 0,
    totalStudents: 0,
    totalSubjects: 0,
    averageGrade: 0,
    attendance: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch classes
      const classesResponse = await classApi.getAll()
      const classes = classesResponse.success ? (classesResponse.data || []) : []
      
      // Fetch students
      const studentsResponse = await studentApi.getAll()
      const students = studentsResponse.success ? (studentsResponse.data || []) : []
      
      setStats({
        totalClasses: classes.length,
        activeClasses: classes.length,
        totalStudents: students.length,
        totalSubjects: 8,
        averageGrade: 82.5,
        attendance: 96
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with Liquid Glass */}
      <div className="space-y-2 liquid-glass p-8 rounded-2xl">
        <h1 className="text-4xl font-bold text-foreground liquid-glass-text">Dashboard Guru</h1>
        <p className="text-muted-foreground text-lg">
          Selamat datang kembali! Berikut ringkasan aktivitas pembelajaran hari ini.
        </p>
      </div>

      {/* Statistics Cards with Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="liquid-float">
          <StatCard
            title="Total Kelas"
            value={isLoading ? "..." : stats.totalClasses}
            description={`${stats.activeClasses} kelas aktif`}
            icon={Users}
            variant="default"
            trend={{ value: 8.2, isPositive: true }}
          />
        </div>
        <div className="liquid-float">
          <StatCard
            title="Total Siswa"
            value={isLoading ? "..." : stats.totalStudents}
            description={`${stats.attendance}% kehadiran hari ini`}
            icon={GraduationCap}
            variant="success"
            trend={{ value: 5.1, isPositive: true }}
          />
        </div>
        <div className="liquid-float">
          <StatCard
            title="Mata Pelajaran"
            value={stats.totalSubjects}
            description="3 jadwal hari ini"
            icon={BookOpen}
            variant="accent"
          />
        </div>
        <div className="liquid-float">
          <StatCard
            title="Rata-rata Nilai"
            value={stats.averageGrade}
            description="Meningkat dari bulan lalu"
            icon={TrendingUp}
            variant="warning"
            trend={{ value: 2.3, isPositive: true }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="liquid-float">
          <QuickActions />
        </div>
        <div className="liquid-float">
          <RecentActivity />
        </div>
      </div>

      {/* Additional Stats with Liquid Glass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="liquid-float">
          <StatCard
            title="Tugas Terkumpul"
            value="156"
            description="Dari 180 total tugas"
            icon={Calendar}
            variant="success"
          />
        </div>
        <div className="liquid-float">
          <StatCard
            title="Nilai Tertinggi"
            value="98"
            description="Siti Nurhaliza - Matematika"
            icon={Award}
            variant="warning"
          />
        </div>
        <div className="liquid-float">
          <StatCard
            title="Kehadiran Hari Ini"
            value={`${stats.attendance}%`}
            description={`${Math.round(stats.totalStudents * stats.attendance / 100)} dari ${stats.totalStudents} siswa hadir`}
            icon={Users}
            variant="default"
          />
        </div>
      </div>
    </div>
  )
}
