"use client"
import React, { useEffect } from 'react'

const Seo = ({ title }:any) => {
  useEffect(() => {
    document.title = `VSC ONE - ${title}`
  }, [])
  
  return (
    <>
    </>
  )
}

export default Seo;