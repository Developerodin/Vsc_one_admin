"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token')
        
        if (!token) {
            
            router.push('/')
        }
    }, [router])

    return <>{children}</>
}

export default ProtectedRoute 