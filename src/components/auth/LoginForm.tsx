import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, User, Loader2, Eye, EyeOff } from "lucide-react"
import { useAuth, UserRole } from "@/contexts/AuthContext"
import { toast } from "@/hooks/use-toast"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeRole, setActiveRole] = useState<UserRole>("guru")
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email dan password harus diisi",
        variant: "destructive"
      })
      return
    }

    try {
      await login(email, password, activeRole)
      toast({
        title: "Login Berhasil",
        description: `Selamat datang di Clasfy!`,
      })
    } catch (error) {
      const errorMessage = (error as Error).message || "Terjadi kesalahan yang tidak diketahui.";
      toast({
        title: "Login Gagal",
        description: errorMessage,
        variant: "destructive"
      })
    }
  }

  const demoCredentials = {
    guru: { email: "guru@clasfy.edu", password: "guru123" },
    siswa: { email: "siswa@clasfy.edu", password: "siswa123" }
  }

  const fillDemoCredentials = () => {
    setEmail(demoCredentials[activeRole].email)
    setPassword(demoCredentials[activeRole].password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md shadow-glow">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Clasfy</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sistem Manajemen Kelas Modern
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="guru" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Guru
              </TabsTrigger>
              <TabsTrigger value="siswa" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Siswa
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guru">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">Portal Guru</h3>
                  <p className="text-sm text-muted-foreground">
                    Akses dashboard dan kelola pembelajaran
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="siswa">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-foreground">Portal Siswa</h3>
                  <p className="text-sm text-muted-foreground">
                    Lihat nilai, tugas, dan progress belajar
                  </p>
                </div>
              </div>
            </TabsContent>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={`Masukkan email ${activeRole}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Masuk...
                  </>
                ) : (
                  `Masuk sebagai ${activeRole === 'guru' ? 'Guru' : 'Siswa'}`
                )}
              </Button>

              {/* Demo Credentials Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={fillDemoCredentials}
                disabled={isLoading}
              >
                Isi Kredensial Demo
              </Button>

              <div className="text-center text-xs text-muted-foreground">
                <p>Demo Credentials:</p>
                <p>Guru: guru@clasfy.edu / guru123</p>
                <p>Siswa: siswa@clasfy.edu / siswa123</p>
              </div>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}