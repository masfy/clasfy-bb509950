import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ClipboardList, Calendar, PlusCircle, BarChart3 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function QuickActions() {
  const navigate = useNavigate()

  const actions = [
    {
      title: "Input Nilai",
      description: "Input nilai siswa dengan cepat",
      icon: ClipboardList,
      variant: "primary" as const,
      action: () => navigate("/input-nilai")
    },
    {
      title: "Input Kehadiran",
      description: "Catat kehadiran siswa hari ini",
      icon: Calendar,
      variant: "success" as const,
      action: () => navigate("/input-kehadiran")
    },
    {
      title: "Tambah Kelas",
      description: "Buat kelas baru",
      icon: PlusCircle,
      variant: "accent" as const,
      action: () => navigate("/kelas")
    },
    {
      title: "Lihat Rekap",
      description: "Akses laporan dan rekap data",
      icon: BarChart3,
      variant: "warning" as const,
      action: () => navigate("/rekap-nilai")
    }
  ]

  const getButtonVariant = (variant: string) => {
    switch (variant) {
      case "success":
        return "bg-success hover:bg-success/90 text-success-foreground"
      case "warning":
        return "bg-warning hover:bg-warning/90 text-warning-foreground"
      case "accent":
        return "bg-accent hover:bg-accent/90 text-accent-foreground"
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground"
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Aksi Cepat</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            onClick={action.action}
            className={`${getButtonVariant(action.variant)} h-auto p-4 flex-col items-start text-left transition-all duration-200 hover:shadow-card hover:-translate-y-0.5`}
          >
            <div className="flex items-center gap-3 w-full mb-2">
              <action.icon className="w-5 h-5" />
              <span className="font-semibold">{action.title}</span>
            </div>
            <span className="text-sm opacity-90">{action.description}</span>
          </Button>
        ))}
      </div>
    </Card>
  )
}