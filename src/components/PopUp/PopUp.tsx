import React, { useEffect } from 'react'

const PopUp = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    return <div className='fixed top-0 left-0 w-full h-dvh overflow-hidden bg-black/70 z-9999' onClick={onClose}>
        {children}
    </div>
}

export default PopUp