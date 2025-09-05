import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedAuth = localStorage.getItem('jharkhand_auth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setIsAuthenticated(true)
      setUser(authData.user)
    }
  }, [])

  const login = (email, password) => {
    // Dummy login validation
    if (email === 'jharkhand.muncipal@gmail.com' && password === '12345') {
      const userData = {
        email: email,
        name: 'Jharkhand Municipal Admin',
        role: 'Municipal Administrator'
      }
      
      setIsAuthenticated(true)
      setUser(userData)
      
      // Save to localStorage
      localStorage.setItem('jharkhand_auth', JSON.stringify({
        user: userData,
        timestamp: Date.now()
      }))
      
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    localStorage.removeItem('jharkhand_auth')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
