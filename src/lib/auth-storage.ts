// Secure storage utility for auth tokens
const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'
const EXPIRY_KEY = 'auth_expiry'

// Use sessionStorage for better security (cleared on tab close)
// Falls back to localStorage if sessionStorage unavailable
const storage = typeof window !== 'undefined' 
  ? (window.sessionStorage || window.localStorage)
  : null

export const authStorage = {
  setAuth: (token: string, user: any, expiresInHours: number = 24) => {
    if (!storage) return
    
    const expiryTime = Date.now() + (expiresInHours * 60 * 60 * 1000)
    
    storage.setItem(TOKEN_KEY, token)
    storage.setItem(USER_KEY, JSON.stringify(user))
    storage.setItem(EXPIRY_KEY, expiryTime.toString())
  },

  getToken: (): string | null => {
    if (!storage) return null
    
    const expiry = storage.getItem(EXPIRY_KEY)
    if (expiry && Date.now() > parseInt(expiry)) {
      authStorage.clearAuth()
      return null
    }
    
    return storage.getItem(TOKEN_KEY)
  },

  getUser: (): any | null => {
    if (!storage) return null
    
    const expiry = storage.getItem(EXPIRY_KEY)
    if (expiry && Date.now() > parseInt(expiry)) {
      authStorage.clearAuth()
      return null
    }
    
    const user = storage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  clearAuth: () => {
    if (!storage) return
    
    storage.removeItem(TOKEN_KEY)
    storage.removeItem(USER_KEY)
    storage.removeItem(EXPIRY_KEY)
  },

  isExpired: (): boolean => {
    if (!storage) return true
    
    const expiry = storage.getItem(EXPIRY_KEY)
    return expiry ? Date.now() > parseInt(expiry) : true
  }
}
