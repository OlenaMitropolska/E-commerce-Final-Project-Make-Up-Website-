import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'

function FavoritesPage() {
  const {LoggedinOrNotFavPage} = useAppContext ()
  useEffect(() => {
    LoggedinOrNotFavPage ()
  }, [])
  return (
    <div className='main'>FavoritesPage</div>
  )
}

export default FavoritesPage