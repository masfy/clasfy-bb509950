import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 Clasfy</span>
            <span className="hidden sm:inline">•</span>
            <span>Aplikasi Manajemen Kelas</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>untuk pendidikan Indonesia</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
            <span>Sistem Manajemen Kelas Digital</span>
            <span>•</span>
            <span>Gamifikasi Pembelajaran</span>
            <span>•</span>
            <span>Laporan & Analitik</span>
          </div>
        </div>
      </div>
    </footer>
  )
}