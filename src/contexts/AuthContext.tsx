import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'guru' | 'siswa'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  photo?: string
  // Guru specific fields
  nip?: string
  // Siswa specific fields
  nisn?: string
  kelas?: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  updateAvatar: (avatar: string) => void
  updateProfile: (data: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('clasfy_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Call Google Apps Script API
      const response = await fetch('https://script.google.com/macros/s/AKfycbyHPKmhprRbXWiXfePFPjc26LlcNcoT6oxJ37bfX96sZngZ1aZ-20e_-8VbfI8pwHokWw/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'login',
          email,
          password,
          role
        })
      })

      const data = await response.json()
      
      if (data.success) {
        const userData: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: data.user.avatar,
          nip: data.user.nip,
          nisn: data.user.nisn,
          kelas: data.user.kelas
        }
        
        setUser(userData)
        localStorage.setItem('clasfy_user', JSON.stringify(userData))
      } else {
        throw new Error(data.message || 'Login gagal')
      }
    } catch (error) {
      console.error('Login error:', error)
      // For demo purposes, create mock user
      const mockUser: User = {
        id: '1',
        name: role === 'guru' ? 'Bu Sarah Wijaya' : 'Ahmad Rizki',
        email,
        role,
        avatar: '',
        nip: role === 'guru' ? '196512345678901234' : undefined,
        nisn: role === 'siswa' ? '0012345678' : undefined,
        kelas: role === 'siswa' ? 'XII IPA 1' : undefined
      }
      
      setUser(mockUser)
      localStorage.setItem('clasfy_user', JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('clasfy_user')
  }

  const updateAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar }
      setUser(updatedUser)
      localStorage.setItem('clasfy_user', JSON.stringify(updatedUser))
    }
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('clasfy_user', JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      updateAvatar,
      updateProfile,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
