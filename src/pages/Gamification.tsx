import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Medal, Award, Target, Zap } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

interface StudentRank {
  rank: number;
  studentName: string;
  points: number;
  level: number;
  badge: string;
}

export default function Gamification() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "Perfect Attendance",
      description: "Hadir 30 hari berturut-turut",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      earned: true,
      progress: 30,
      maxProgress: 30
    },
    {
      id: "2",
      title: "Grade Master",
      description: "Mendapat nilai A di 5 mata pelajaran",
      icon: <Trophy className="h-6 w-6 text-blue-500" />,
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: "3",
      title: "Homework Hero",
      description: "Mengumpulkan 20 tugas tepat waktu",
      icon: <Medal className="h-6 w-6 text-green-500" />,
      earned: false,
      progress: 15,
      maxProgress: 20
    },
    {
      id: "4",
      title: "Class Leader",
      description: "Menjadi top 3 di kelas selama 3 bulan",
      icon: <Award className="h-6 w-6 text-purple-500" />,
      earned: false,
      progress: 2,
      maxProgress: 3
    }
  ]);

  const [leaderboard] = useState<StudentRank[]>([
    { rank: 1, studentName: "Siti Nurhaliza", points: 2850, level: 12, badge: "Gold Master" },
    { rank: 2, studentName: "Ahmad Fauzi", points: 2650, level: 11, badge: "Silver Star" },
    { rank: 3, studentName: "Budi Santoso", points: 2450, level: 10, badge: "Bronze Hero" },
    { rank: 4, studentName: "Dewi Sartika", points: 2250, level: 9, badge: "Rising Star" },
    { rank: 5, studentName: "Andi Permana", points: 2100, level: 9, badge: "Achiever" }
  ]);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-600";
      case 2: return "text-gray-600";
      case 3: return "text-orange-600";
      default: return "text-muted-foreground";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-600" />;
      case 2: return <Medal className="h-5 w-5 text-gray-600" />;
      case 3: return <Award className="h-5 w-5 text-orange-600" />;
      default: return <Target className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Gold Master": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "Silver Star": return "bg-gray-100 text-gray-800 border-gray-300";
      case "Bronze Hero": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gamifikasi</h1>
        <p className="text-muted-foreground">Sistem poin, achievement, dan leaderboard siswa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Achievement</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}</div>
            <p className="text-xs text-muted-foreground">
              dari {achievements.length} achievement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Siswa Aktif</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaderboard.length}</div>
            <p className="text-xs text-muted-foreground">
              dalam sistem gamifikasi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Poin</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(leaderboard.reduce((sum, s) => sum + s.points, 0) / leaderboard.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              poin per siswa
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Achievement System</CardTitle>
            <CardDescription>
              Daftar pencapaian yang dapat diraih siswa
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  {achievement.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{achievement.title}</h3>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Earned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>
              Ranking siswa berdasarkan poin yang dikumpulkan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboard.map((student) => (
                <div key={`${student.rank}-${student.studentName}`} className="flex items-center space-x-4 p-3 rounded-lg border">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(student.rank)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{student.studentName}</h3>
                      <Badge className={getBadgeColor(student.badge)}>
                        {student.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Level {student.level}</span>
                      <span className={`font-medium ${getRankColor(student.rank)}`}>
                        {student.points.toLocaleString()} poin
                      </span>
                    </div>
                  </div>
                  <div className={`text-lg font-bold ${getRankColor(student.rank)}`}>
                    #{student.rank}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sistem Poin</CardTitle>
          <CardDescription>
            Cara mendapatkan poin dalam sistem gamifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg border">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-medium">Kehadiran</h3>
              <p className="text-2xl font-bold text-yellow-600">+10</p>
              <p className="text-sm text-muted-foreground">per hari hadir</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <Trophy className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-medium">Nilai A</h3>
              <p className="text-2xl font-bold text-blue-600">+50</p>
              <p className="text-sm text-muted-foreground">per mata pelajaran</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <Medal className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-medium">Tugas Tepat Waktu</h3>
              <p className="text-2xl font-bold text-green-600">+25</p>
              <p className="text-sm text-muted-foreground">per tugas</p>
            </div>
            <div className="text-center p-4 rounded-lg border">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-medium">Achievement</h3>
              <p className="text-2xl font-bold text-purple-600">+100</p>
              <p className="text-sm text-muted-foreground">per pencapaian</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}