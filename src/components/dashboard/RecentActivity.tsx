import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, Users, Award } from "lucide-react"

interface ActivityItem {
  id: string
  type: "nilai" | "kehadiran" | "kelas" | "achievement"
  title: string
  description: string
  time: string
  student?: string
  className?: string
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "nilai",
    title: "Nilai Matematika",
    description: "Input nilai UTS untuk kelas XII IPA 1",
    time: "2 jam lalu",
    className: "XII IPA 1"
  },
  {
    id: "2",
    type: "kehadiran",
    title: "Kehadiran Hari Ini",
    description: "25 siswa hadir, 2 izin, 1 sakit",
    time: "4 jam lalu",
    className: "XI IPA 2"
  },
  {
    id: "3",
    type: "achievement",
    title: "Pencapaian Baru",
    description: "Ahmad Rizki mencapai level 'Master Matematika'",
    time: "1 hari lalu",
    student: "Ahmad Rizki"
  },
  {
    id: "4",
    type: "kelas",
    title: "Kelas Baru",
    description: "Berhasil membuat kelas X IPA 3",
    time: "2 hari lalu",
    className: "X IPA 3"
  }
]

export function RecentActivity() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "nilai":
        return <BookOpen className="w-4 h-4" />
      case "kehadiran":
        return <Users className="w-4 h-4" />
      case "achievement":
        return <Award className="w-4 h-4" />
      case "kelas":
        return <Users className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "nilai":
        return "bg-primary/10 text-primary"
      case "kehadiran":
        return "bg-success/10 text-success"
      case "achievement":
        return "bg-warning/10 text-warning"
      case "kelas":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h3>
      <div className="space-y-4">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
            <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground">{activity.title}</h4>
                {activity.className && (
                  <Badge variant="secondary" className="text-xs">
                    {activity.className}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
              {activity.student && (
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-4 h-4">
                    <AvatarFallback className="text-xs">{activity.student.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">{activity.student}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}