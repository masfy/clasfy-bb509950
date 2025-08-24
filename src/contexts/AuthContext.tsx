import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi, initializeSession } from '@/lib/api'

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
    const loadUser = () => {
      setIsLoading(true);
      initializeSession();
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    };
    loadUser();
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      const response = await authApi.login(email, password, role)
      if (response.success) {
        setUser(response.user)
        // authApi.login already saves to localStorage
      } else {
        throw new Error(response.error || 'Login gagal')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    authApi.logout()
    setUser(null)
  }

  const updateAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
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
