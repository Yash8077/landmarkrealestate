'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type WishlistContextType = {
  wishlist: (string | number)[]
  addToWishlist: (propertyId: string | number) => void
  removeFromWishlist: (propertyId: string | number) => void
  isInWishlist: (propertyId: string | number) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<(string | number)[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const addToWishlist = (propertyId: string | number) => {
    setWishlist(prev => [...prev, propertyId])
  }

  const removeFromWishlist = (propertyId: string | number) => {
    setWishlist(prev => prev.filter(id => id !== propertyId))
  }

  const isInWishlist = (propertyId: string | number) => {
    return wishlist.includes(propertyId)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    return{
        wishlist:null,
        addToWishlist: () => {},
        removeFromWishlist: () => {},
        isInWishlist: () => {}
    }
  }
  return context
}