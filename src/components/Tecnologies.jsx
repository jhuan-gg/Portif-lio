import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import CardReact from './CardReact';
import CardCss from './CardCss';
import CardJs from './CardJs';
import CardFirebase from './CardFirebase';
import CardGit from './CardGit';
import CardDocker from './CardDocker';
import CardNode from './CardeNode';
import CardTypescript from './CardTypescript';

function Tecnologies() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const createParticles = () => {
      const total = 500;
      particles = [];
      for (let i = 0; i < total; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3, 
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: 0.3 + Math.random() * 0.7,
        });
      }
    };
    createParticles();

    const animate = () => {
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        if (mouse.x && mouse.y) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += Math.cos(angle) * force * 5;
            p.y += Math.sin(angle) * force * 5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Section id="tecnologies">
      <Canvas ref={canvasRef} />
      <Content>
        <Title>
          <MainText className="main-text">Minha</MainText>
          <HighlightText className="highlight-text">Tool Box</HighlightText>
        </Title>
        <Categories>
          <CardReact />
          <CardCss />
          <CardJs />
          <CardFirebase />
          <CardGit />
          <CardDocker />
          <CardNode />
          <CardTypescript />
        </Categories>
      </Content>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  background: #fff;
  min-height: 100vh;
  overflow: hidden;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%; 
  height: 100%;
  z-index: 0; 
`

const Content = styled.div`
  position: relative; 
  z-index: 1;      
  height: 100vh;  
  width: 100%;
  max-width: var(--max-width, 1200px);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 3rem;
  }
`

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: end;
`

const Category = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 220px;
  flex: 1 1 220px;
`

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const SkillItem = styled.span`
  background: #e0f2fe;
  color: #0284c7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #0284c7;
    color: #fff;
    transform: translateY(-2px);
  }
`
const MainText = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.9);
  font-size: 4.5rem;
  line-height: 1.2;
  font-weight: 800;
  @media (max-width: 600px) { font-size: 2.5rem; }
`

const HighlightText = styled.span`
  display: block;
  background: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  font-size: 6rem;
  margin: 0.5rem 0;
  @media (max-width: 600px) { font-size: 3.5rem; }
`
const Title = styled.h2`
  flex: 1; /* ocupa metade do espaço */
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;

  @media (max-width: 600px) { font-size: 2.5rem; }
`


export default Tecnologies
