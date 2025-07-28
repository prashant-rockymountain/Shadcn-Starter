import { AbilityContext } from '@/app/contexts/acl-context'
import { useContext } from 'react'
export const useAbility = () => useContext(AbilityContext)