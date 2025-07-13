import { StatCard } from "@/components/dashboard/StatCard"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BookOpen, 
  Target, 
  Award, 
  TrendingUp,
  Star,
  Zap,
  Trophy,
  Clock,
  CheckCircle
} from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export default function StudentDashboard() {
  const { user } = useAuth()

  const achievements = [
    { name: "First Assignment", icon: Star, unlocked: true },
    { name: "Perfect Attendance", icon: Target, unlocked: true },
    { name: "Top Student", icon: Trophy, unlocked: false },
    { name: "Speed Learner", icon: Zap, unlocked: false }
  ]

  const assignments = [
    { 
      title: "Tugas Matematika Bab 5", 
      subject: "Matematika", 
      dueDate: "2024-01-20", 
      status: "pending",
      progress: 60 
    },
    { 
      title: "Esai Sejarah Indonesia", 
      subject: "Sejarah", 
      dueDate: "2024-01-22", 
      status: "completed",
      score: 85 
    },
    { 
      title: "Praktikum Kimia", 
      subject: "Kimia", 
      dueDate: "2024-01-25", 
      status: "pending",
      progress: 20 
    }
  ]

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-primary-light/20 to-accent-light/20 min-h-screen">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-3 p-4 bg-gradient-primary text-white rounded-2xl shadow-glow">
          <Award className="w-8 h-8" />
          <div>
            <h1 className="text-2xl font-bold">Selamat datang, {user?.name}!</h1>
            <p className="opacity-90">Level 12 • Kelas {user?.kelas}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Nilai"
          value="85.2"
          description="Rata-rata semua mata pelajaran"
          icon={BookOpen}
          variant="default"
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Tugas Selesai"
          value="24/28"
          description="4 tugas tersisa"
          icon={CheckCircle}
          variant="success"
        />
        <StatCard
          title="Kehadiran"
          value="96%"
          description="Bulan ini"
          icon={Clock}
          variant="accent"
        />
        <StatCard
          title="Ranking Kelas"
          value="3"
          description="Dari 32 siswa"
          icon={Trophy}
          variant="warning"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress & Level */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Progress Belajar
          </h3>
          
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary text-white text-2xl font-bold mb-2">
                12
              </div>
              <p className="font-semibold">Level Scholar</p>
              <p className="text-sm text-muted-foreground">2,840 / 3,000 XP</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress ke Level 13</span>
                <span>95%</span>
              </div>
              <Progress value={95} className="h-3" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">2,840</div>
                <div className="text-xs text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">15</div>
                <div className="text-xs text-muted-foreground">Badges</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">7</div>
                <div className="text-xs text-muted-foreground">Streak Hari</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Assignments */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Tugas & Penilaian
          </h3>
          
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <Badge 
                    variant={assignment.status === 'completed' ? 'default' : 'secondary'}
                    className={assignment.status === 'completed' ? 'bg-success text-success-foreground' : ''}
                  >
                    {assignment.status === 'completed' ? 'Selesai' : 'Pending'}
                  </Badge>
                </div>
                
                {assignment.status === 'completed' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Nilai:</span>
                    <span className="font-semibold text-success">{assignment.score}</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress: {assignment.progress}%</span>
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <Progress value={assignment.progress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Prestasi & Badge
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-lg text-center transition-all duration-200 hover:shadow-card ${
                achievement.unlocked 
                  ? 'border-success bg-success-light/20 hover:-translate-y-1' 
                  : 'border-border bg-muted/20 opacity-50'
              }`}
            >
              <achievement.icon 
                className={`w-8 h-8 mx-auto mb-2 ${
                  achievement.unlocked ? 'text-success' : 'text-muted-foreground'
                }`} 
              />
              <p className="text-sm font-medium">{achievement.name}</p>
              {achievement.unlocked && (
                <Badge variant="default" className="mt-2 bg-success text-success-foreground">
                  Terbuka
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions for Students */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-auto p-4 flex-col bg-primary hover:bg-primary/90">
            <BookOpen className="w-6 h-6 mb-2" />
            <span>Lihat Semua Tugas</span>
          </Button>
          <Button className="h-auto p-4 flex-col bg-success hover:bg-success/90 text-success-foreground">
            <TrendingUp className="w-6 h-6 mb-2" />
            <span>Progress Detail</span>
          </Button>
          <Button className="h-auto p-4 flex-col bg-warning hover:bg-warning/90 text-warning-foreground">
            <Trophy className="w-6 h-6 mb-2" />
            <span>Leaderboard</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}