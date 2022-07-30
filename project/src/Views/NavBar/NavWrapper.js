import React from 'react'
import { Nav } from 'react-bootstrap'
import NavMenu from './Nav'

const NavWrapper = ({children}) => {
  return (
      <>
          <NavMenu />
          {children}
      </>
  )
}

export default NavWrapper