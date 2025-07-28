import { AuthContext } from '@/app/contexts/auth-context'
import { useContext } from 'react'


export const useAuth = () => useContext(AuthContext)
