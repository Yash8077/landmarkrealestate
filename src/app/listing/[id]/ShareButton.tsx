"use client"

import React, { useState } from 'react'
import { Share2 } from 'lucide-react'

interface ShareButtonProps {
    url: string
    title: string
}

const ShareButton: React.FC<ShareButtonProps> = ({ url, title }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleShare = async () => {
            try {
                await navigator.share({ url, title })
            } catch (error) {
                console.error('Error sharing:', error)
            }
    }

    return (
        <div className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors cursor-pointer z-10">
            <button 
                onClick={handleShare} 
                className="flex items-center rounded text-sm hover:bg-gray-100"
            >
                <Share2 className="h-5 w-5" />
            </button>
        </div>
    )
}

export default ShareButton
