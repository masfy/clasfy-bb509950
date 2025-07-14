import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import { ProfileMenu } from "./ProfileMenu"

export function Header() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200" />
        <div className="hidden md:block">
          <h2 className="font-semibold text-foreground">
            {user.role === 'guru' ? 'Dashboard Guru' : 'Dashboard Siswa'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Selamat datang, {user.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-foreground">{user.name}</p>
          <p className="text-xs text-muted-foreground">
            {user.role === 'guru' 
              ? `NIP: ${user.nip}` 
              : `${user.kelas} • NISN: ${user.nisn}`
            }
          </p>
        </div>

        <ProfileMenu />
      </div>
    </header>
  )
}