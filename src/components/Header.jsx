import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  // função unificada usando scrollIntoView
  const handleClick = (e) => {
    e.preventDefault()
    const href = e.currentTarget.getAttribute('href')
    const element = document.querySelector(href)
    if (element) {
      // adiciona offset de 80px para o header fixo
      const yOffset = 0
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
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
          <NavLink href="#education" onClick={handleClick}>Educação</NavLink>
          <NavLink href="#contact" onClick={handleClick}>Contato</NavLink>
        </Nav>
      </Content>
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
  
  @media (max-width: 600px) {
    gap: 1rem;
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
