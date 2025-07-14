import { 
  BookOpen, 
  Users, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  Calendar, 
  Award, 
  Settings, 
  Home,
  ClipboardList,
  Target,
  BookMarked
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar"

const teacherMenuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Kelas", url: "/kelas", icon: Users },
  { title: "Data Siswa", url: "/siswa", icon: GraduationCap },
  { title: "Mata Pelajaran", url: "/mata-pelajaran", icon: BookOpen },
  { title: "Kategori Penilaian", url: "/kategori-penilaian", icon: Target },
  { title: "Bobot Penilaian", url: "/bobot-penilaian", icon: BarChart3 },
  { title: "Input Nilai", url: "/input-nilai", icon: ClipboardList },
  { title: "Input Kehadiran", url: "/input-kehadiran", icon: Calendar },
  { title: "Jurnal Harian", url: "/jurnal-harian", icon: FileText },
  { title: "Rekap Nilai", url: "/rekap-nilai", icon: BookMarked },
  { title: "Rekap Kehadiran", url: "/rekap-kehadiran", icon: BarChart3 },
  { title: "Gamifikasi", url: "/gamifikasi", icon: Award },
  { title: "Profil", url: "/profil", icon: Settings }
]

const studentMenuItems = [
  { title: "Dashboard", url: "/siswa/dashboard", icon: Home },
  { title: "Nilai & Tugas", url: "/siswa/nilai", icon: BookMarked },
  { title: "Progress", url: "/siswa/progress", icon: BarChart3 },
  { title: "Leaderboard", url: "/siswa/leaderboard", icon: Award },
  { title: "Profil", url: "/siswa/profil", icon: Settings }
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  // Get user role from auth context
  const { user } = useAuth()
  const menuItems = user?.role === 'siswa' ? studentMenuItems : teacherMenuItems

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground shadow-soft" 
        : "hover:bg-primary-light hover:text-primary-foreground"
    }`

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-primary">Clasfy</h1>
              <p className="text-xs text-muted-foreground">
                {user?.role === 'siswa' ? "Portal Siswa" : "Portal Guru"}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : "block"}>
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarTrigger className="w-full justify-center bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200" />
      </SidebarFooter>
    </Sidebar>
  )
}