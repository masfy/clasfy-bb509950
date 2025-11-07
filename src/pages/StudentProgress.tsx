import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Award, 
  Calendar,
  BookOpen,
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

interface SubjectProgress {
  subject: string;
  progress: number;
  completed: number;
  total: number;
  lastActivity: string;
  trend: "up" | "down" | "stable";
}

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  deadline: string;
  status: "active" | "completed" | "pending";
}

export default function StudentProgress() {
  const subjectProgress: SubjectProgress[] = [
    { subject: "Matematika", progress: 88, completed: 22, total: 25, lastActivity: "2 jam lalu", trend: "up" },
    { subject: "Fisika", progress: 82, completed: 20, total: 25, lastActivity: "1 hari lalu", trend: "stable" },
    { subject: "Kimia", progress: 85, completed: 21, total: 25, lastActivity: "3 jam lalu", trend: "up" },
    { subject: "Biologi", progress: 90, completed: 23, total: 25, lastActivity: "5 jam lalu", trend: "up" },
    { subject: "Bahasa Indonesia", progress: 87, completed: 22, total: 25, lastActivity: "1 hari lalu", trend: "stable" },
    { subject: "Bahasa Inggris", progress: 92, completed: 24, total: 25, lastActivity: "30 menit lalu", trend: "up" },
  ];

  const learningGoals: LearningGoal[] = [
    {
      id: "1",
      title: "Kuasai Kalkulus",
      description: "Menyelesaikan semua bab kalkulus dengan nilai minimal B",
      progress: 75,
      deadline: "2024-02-15",
      status: "active"
    },
    {
      id: "2",
      title: "Nilai A di Fisika",
      description: "Mencapai nilai A untuk mata pelajaran fisika semester ini",
      progress: 82,
      deadline: "2024-03-01",
      status: "active"
    },
    {
      id: "3",
      title: "Top 3 Kelas",
      description: "Masuk ranking 3 besar di kelas",
      progress: 60,
      deadline: "2024-06-30",
      status: "active"
    },
    {
      id: "4",
      title: "Perfect Attendance",
      description: "Hadir penuh selama 1 bulan",
      progress: 100,
      deadline: "2024-01-31",
      status: "completed"
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    return <Clock className="h-4 w-4 text-muted-foreground" />;
  };

  const overallProgress = Math.round(
    subjectProgress.reduce((sum, s) => sum + s.progress, 0) / subjectProgress.length
  );

  const activeGoals = learningGoals.filter(g => g.status === "active").length;
  const completedGoals = learningGoals.filter(g => g.status === "completed").length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Progress Belajar</h1>
        <p className="text-muted-foreground">Pantau kemajuan dan pencapaian belajar Anda</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress Keseluruhan</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">{overallProgress}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Aktif</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">{activeGoals}</div>
            <p className="text-xs text-muted-foreground mt-1">target sedang dikerjakan</p>
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Target Selesai</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse text-success">{completedGoals}</div>
            <p className="text-xs text-muted-foreground mt-1">target tercapai</p>
          </CardContent>
        </Card>

        <Card className="liquid-glass liquid-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktivitas Belajar</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold liquid-glass-text liquid-pulse">156</div>
            <p className="text-xs text-muted-foreground mt-1">aktivitas bulan ini</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Progress per Mata Pelajaran
          </CardTitle>
          <CardDescription>
            Kemajuan belajar untuk setiap mata pelajaran
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {subjectProgress.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{subject.subject}</h4>
                  {getTrendIcon(subject.trend)}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {subject.completed}/{subject.total} topik
                  </span>
                  <span className="font-bold text-primary">{subject.progress}%</span>
                </div>
              </div>
              <Progress value={subject.progress} className="h-3" />
              <p className="text-xs text-muted-foreground">
                Aktivitas terakhir: {subject.lastActivity}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Target Belajar
          </CardTitle>
          <CardDescription>
            Target yang sedang Anda kerjakan
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {learningGoals.map((goal) => (
            <div 
              key={goal.id} 
              className={`p-4 border rounded-lg transition-all ${
                goal.status === "completed" 
                  ? "border-success bg-success/5" 
                  : "border-border hover:bg-muted/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{goal.title}</h4>
                    {goal.status === "completed" && (
                      <CheckCircle className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{goal.description}</p>
                </div>
                <Badge 
                  variant={goal.status === "completed" ? "default" : "secondary"}
                  className={goal.status === "completed" ? "bg-success text-success-foreground" : ""}
                >
                  {goal.status === "completed" ? "Selesai" : "Aktif"}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress: {goal.progress}%</span>
                  <span className="text-muted-foreground">Deadline: {goal.deadline}</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Aktivitas Mingguan
            </CardTitle>
            <CardDescription>
              Ringkasan aktivitas belajar minggu ini
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span>Tugas Diselesaikan</span>
                <span className="font-bold text-success">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span>Materi Dipelajari</span>
                <span className="font-bold text-primary">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span>Quiz Diikuti</span>
                <span className="font-bold text-warning">5</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span>Jam Belajar</span>
                <span className="font-bold text-accent">24</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Pencapaian Bulan Ini
            </CardTitle>
            <CardDescription>
              Prestasi yang telah Anda raih
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Perfect Score</p>
                  <p className="text-xs text-muted-foreground">Mendapat nilai 100 di Biologi</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">All Tasks Completed</p>
                  <p className="text-xs text-muted-foreground">Selesaikan semua tugas tepat waktu</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-medium">Speed Learner</p>
                  <p className="text-xs text-muted-foreground">Selesaikan 10 topik dalam seminggu</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}