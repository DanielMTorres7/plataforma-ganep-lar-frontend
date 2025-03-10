
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number; // Timestamp de expiração do token
  [key: string]: any; // Outras propriedades do token
}

export function useAuth() {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');

    if (!token) {
      return false
    }

    try {
      // Decodifica o token
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000; 

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token'); 
        return false
      } else {
        return true
      }
    } catch {
      localStorage.removeItem('token'); 
      return false
    }
  }
  return false

}