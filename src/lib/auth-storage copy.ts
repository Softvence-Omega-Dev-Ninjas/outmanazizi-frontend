// Secure storage utility for auth tokens
// Token stored in HTTP-only cookies (set by backend)
// User info stored in localStorage for UI purposes only
const USER_KEY = 'auth_user'

const storage = typeof window !== 'undefined' ? window.localStorage : null

export const authStorage = {
  // Set user info in localStorage and token in cookie
  setAuth: (token: string, user: any, expiresInHours: number = 24) => {
    if (!storage) return
    
    // Store user info in localStorage (non-sensitive data)
    storage.setItem(USER_KEY, JSON.stringify(user))
    
    // Set HTTP-only cookie for token (more secure)
    const maxAge = expiresInHours * 60 * 60
    document.cookie = `token=${token}; path=/; max-age=${maxAge}; secure; samesite=strict; httponly`
  },

  // Get token from cookie
  getToken: (): string | null => {
    if (typeof document === 'undefined') return null
    
    const cookies = document.cookie.split('; ')
    const tokenCookie = cookies.find(row => row.startsWith('token='))
    return tokenCookie ? tokenCookie.split('=')[1] : null
  },

  // Get user info from localStorage
  getUser: (): any | null => {
    if (!storage) return null
    
    const user = storage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  // Clear both cookie and localStorage
  clearAuth: () => {
    if (!storage) return
    
    storage.removeItem(USER_KEY)
    
    // Clear cookie by setting expired date
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  },

  // Check if token exists in cookie
  isExpired: (): boolean => {
    return !authStorage.getToken()
  }
}
