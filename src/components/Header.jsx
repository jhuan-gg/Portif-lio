import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    const element = document.querySelector(href)
    if (element) {
      const yOffset = 0
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
      setSidebarOpen(false) // fecha sidebar ao clicar
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <HeaderContainer isScrolled={isScrolled}>
      <Content>
        <Logo href="#hero" onClick={handleClick}>
          <span>&lt;/&gt;</span> DEV
        </Logo>
        <Nav>
          <NavLink href="#about" onClick={handleClick}>Sobre</NavLink>
          <NavLink href="#experience" onClick={handleClick}>Experiência</NavLink>
          <NavLink href="#tecnologies" onClick={handleClick}>Tecnologias</NavLink>
          <NavLink href="#contact" onClick={handleClick}>Contato</NavLink>
        </Nav>
        <MenuButton onClick={() => setSidebarOpen(true)}>
          <span />
          <span />
          <span />
        </MenuButton>
      </Content>
      <Sidebar open={sidebarOpen}>
        <SidebarClose onClick={() => setSidebarOpen(false)}>&times;</SidebarClose>
        <SidebarNav>
          <SidebarLink href="#about" onClick={handleClick}>Sobre</SidebarLink>
          <SidebarLink href="#experience" onClick={handleClick}>Experiência</SidebarLink>
          <SidebarLink href="#tecnologies" onClick={handleClick}>Tecnologias</SidebarLink>
          <SidebarLink href="#contact" onClick={handleClick}>Contato</SidebarLink>
        </SidebarNav>
      </Sidebar>
      {sidebarOpen && <SidebarOverlay onClick={() => setSidebarOpen(false)} />}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: "transparent";
  transition: all 0.3s ease;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem var(--padding-x);
`

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
  color: #757575ff;
  text-decoration: none;
  transition: color 0.2s;

  span {
    color: #757575ff;
  }

  &:hover {
    color: #1d4ed8;
    span {
      color: #2563eb;
    }
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  @media (max-width: 700px) {
    display: none;
  }
`

const NavLink = styled.a`
  color: #757575ff;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`

const MenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  gap: 6px;
  z-index: 101;
  span {
    width: 28px;
    height: 3px;
    background: #2563eb;
    border-radius: 2px;
    transition: 0.3s;
  }
  @media (max-width: 700px) {
    display: flex;
  }
`

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 70vw;
  max-width: 320px;
  height: 100vh;
  background: #18181b;
  box-shadow: -2px 0 16px rgba(0,0,0,0.12);
  z-index: 200;
  display: flex;
  flex-direction: column;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.35s cubic-bezier(0.6,0.4,0,1);
  @media (min-width: 701px) {
    display: none;
  }
`
const SidebarClose = styled.button`
  align-self: flex-end;
  font-size: 2.2rem;
  background: none;
  border: none;
  color: #fff;
  margin: 1rem 1.5rem 0 0;
  cursor: pointer;
`
const SidebarNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 0;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding-top: 3rem;
  padding-right: 0;
`
const SidebarLink = styled.a`
  color: #fff;
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  transition: color 0.2s;
  &:hover {
    color: #2563eb;
  }
`
const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  z-index: 150;
  @media (min-width: 701px) {
    display: none;
  }
`
