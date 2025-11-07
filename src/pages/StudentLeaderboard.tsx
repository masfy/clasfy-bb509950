import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, TrendingUp, Star, Crown } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  studentId: string;
  name: string;
  class: string;
  points: number;
  level: number;
  averageGrade: number;
  badge: string;
  avatar?: string;
  trend: "up" | "down" | "stable";
  rankChange: number;
}

export default function StudentLeaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedClass, setSelectedClass] = useState("all");

  const leaderboard: LeaderboardEntry[] = [
    { 
      rank: 1, 
      studentId: "2023002", 
      name: "Siti Nurhaliza", 
      class: "X IPA 1", 
      points: 2850, 
      level: 12, 
      averageGrade: 92, 
      badge: "Gold Master",
      trend: "stable",
      rankChange: 0
    },
    { 
      rank: 2, 
      studentId: "2023001", 
      name: "Ahmad Fauzi", 
      class: "X IPA 1", 
      points: 2650, 
      level: 11, 
      averageGrade: 88, 
      badge: "Silver Star",
      trend: "up",
      rankChange: 2
    },
    { 
      rank: 3, 
      studentId: "2023005", 
      name: "Anda", 
      class: "X IPA 1", 
      points: 2550, 
      level: 11, 
      averageGrade: 87, 
      badge: "Bronze Hero",
      trend: "up",
      rankChange: 1
    },
    { 
      rank: 4, 
      studentId: "2023003", 
      name: "Budi Santoso", 
      class: "X IPA 2", 
      points: 2450, 
      level: 10, 
      averageGrade: 85, 
      badge: "Rising Star",
      trend: "down",
      rankChange: -2
    },
    { 
      rank: 5, 
      studentId: "2023004", 
      name: "Dewi Sartika", 
      class: "X IPA 1", 
      points: 2250, 
      level: 9, 
      averageGrade: 84, 
      badge: "Achiever",
      trend: "stable",
      rankChange: 0
    },
    { 
      rank: 6, 
      studentId: "2023006", 
      name: "Andi Permana", 
      class: "X IPA 2", 
      points: 2100, 
      level: 9, 
      averageGrade: 82, 
      badge: "Scholar",
      trend: "up",
      rankChange: 1
    },
    { 
      rank: 7, 
      studentId: "2023007", 
      name: "Maya Putri", 
      class: "X IPA 1", 
      points: 1980, 
      level: 8, 
      averageGrade: 81, 
      badge: "Learner",
      trend: "stable",
      rankChange: 0
    },
    { 
      rank: 8, 
      studentId: "2023008", 
      name: "Rudi Hartono", 
      class: "X IPA 2", 
      points: 1850, 
      level: 8, 
      averageGrade: 80, 
      badge: "Student",
      trend: "down",
      rankChange: -1
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-600 font-bold";
      case 2: return "text-gray-600 font-bold";
      case 3: return "text-orange-600 font-bold";
      default: return "text-muted-foreground";
    }
  };

  const getBadgeColor = (badge: string) => {
    if (badge.includes("Gold")) return "bg-yellow-100 text-yellow-800 border-yellow-300";
    if (badge.includes("Silver")) return "bg-gray-100 text-gray-800 border-gray-300";
    if (badge.includes("Bronze")) return "bg-orange-100 text-orange-800 border-orange-300";
    return "bg-primary/10 text-primary border-primary/20";
  };

  const getTrendIcon = (trend: string, rankChange: number) => {
    if (trend === "up" && rankChange > 0) {
      return <TrendingUp className="h-4 w-4 text-success" />;
    }
    if (trend === "down" && rankChange < 0) {
      return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
    }
    return null;
  };

  const currentUserRank = leaderboard.find(entry => entry.name === "Anda");
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Lihat ranking dan kompetisi dengan teman sekelas</p>
      </div>

      {/* Your Position */}
      {currentUserRank && (
        <Card className="liquid-glass liquid-float border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Posisi Anda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white text-2xl font-bold">
                #{currentUserRank.rank}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{currentUserRank.name}</h3>
                <p className="text-sm text-muted-foreground">{currentUserRank.class}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-sm">
                    <strong className="text-primary">{currentUserRank.points}</strong> poin
                  </span>
                  <span className="text-sm">
                    Level <strong className="text-primary">{currentUserRank.level}</strong>
                  </span>
                  <span className="text-sm">
                    Avg <strong className="text-primary">{currentUserRank.averageGrade}</strong>
                  </span>
                </div>
              </div>
              <Badge className={getBadgeColor(currentUserRank.badge)}>
                {currentUserRank.badge}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Leaderboard</CardTitle>
          <CardDescription>Pilih periode dan kelas untuk melihat ranking</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Periode</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Harian</SelectItem>
                <SelectItem value="weekly">Mingguan</SelectItem>
                <SelectItem value="monthly">Bulanan</SelectItem>
                <SelectItem value="semester">Semester</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kelas</Label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                <SelectItem value="X IPA 2">X IPA 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Top 3 Podium */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Top 3 Siswa Terbaik
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topThree.map((entry) => (
              <div 
                key={entry.studentId}
                className={`p-6 rounded-lg text-center border-2 transition-transform hover:scale-105 ${
                  entry.rank === 1 
                    ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900" 
                    : entry.rank === 2
                    ? "border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
                    : "border-orange-400 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900"
                }`}
              >
                <div className="flex justify-center mb-3">
                  {getRankIcon(entry.rank)}
                </div>
                <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-background">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback className="text-lg font-bold">
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold mb-1">{entry.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{entry.class}</p>
                <Badge className={getBadgeColor(entry.badge)} variant="outline">
                  {entry.badge}
                </Badge>
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Poin</p>
                      <p className="font-bold">{entry.points}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Level</p>
                      <p className="font-bold">{entry.level}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Ranking Lengkap</CardTitle>
          <CardDescription>
            Daftar lengkap semua siswa berdasarkan poin dan performa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <div 
                key={entry.studentId}
                className={`p-4 border rounded-lg flex items-center gap-4 transition-all hover:shadow-md ${
                  entry.name === "Anda" ? "border-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12">
                  {entry.rank <= 3 ? (
                    getRankIcon(entry.rank)
                  ) : (
                    <span className={`text-xl font-bold ${getRankColor(entry.rank)}`}>
                      #{entry.rank}
                    </span>
                  )}
                </div>

                <Avatar className="w-12 h-12">
                  <AvatarImage src={entry.avatar} />
                  <AvatarFallback>
                    {entry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium truncate">{entry.name}</h4>
                    {entry.name === "Anda" && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                    {getTrendIcon(entry.trend, entry.rankChange)}
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.class}</p>
                </div>

                <div className="hidden md:flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-muted-foreground">Poin</p>
                    <p className="font-bold text-primary">{entry.points}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Level</p>
                    <p className="font-bold">{entry.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Avg</p>
                    <p className="font-bold">{entry.averageGrade}</p>
                  </div>
                </div>

                <Badge className={getBadgeColor(entry.badge)} variant="outline">
                  {entry.badge}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}