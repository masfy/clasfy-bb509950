import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  variant?: "default" | "success" | "warning" | "accent"
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  variant = "default",
  trend 
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-light/30"
      case "warning":
        return "border-warning/20 bg-warning-light/30"
      case "accent":
        return "border-accent/20 bg-accent-light/30"
      default:
        return "border-primary/20 bg-primary-light/20"
    }
  }

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "bg-success text-success-foreground"
      case "warning":
        return "bg-warning text-warning-foreground"
      case "accent":
        return "bg-accent text-accent-foreground"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  return (
    <Card className={`p-6 transition-all duration-200 hover:shadow-card hover:-translate-y-1 ${getVariantStyles()}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-success' : 'text-destructive'}`}>
              <span>{trend.isPositive ? '↗' : '↘'}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
              <span className="ml-1 text-muted-foreground">
                dari bulan lalu
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${getIconStyles()}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}