import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

function Education() {
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
    <Section id="education">
      <Canvas ref={canvasRef} />
      <Content>
        <h2>Educação</h2>
        <EducationItem>
          <h3>Análise e Desenvolvimento de Sistemas</h3>
          <span>ESTÁCIO - POLO EAD ALVORADA | 2021 - 2023</span>
          <p>Formação em desenvolvimento de software, com foco em tecnologias web modernas e práticas de desenvolvimento seguro.</p>
        </EducationItem>
        
        <SkillsSection>
          <h3>Habilidades Técnicas</h3>
          <SkillsList>
            <SkillItem>React & React Native</SkillItem>
            <SkillItem>JavaScript (ES6+)</SkillItem>
            <SkillItem>Firebase (Auth + Firestore)</SkillItem>
            <SkillItem>TypeScript</SkillItem>
            <SkillItem>Node.js</SkillItem>
            <SkillItem>HTML5 & CSS3</SkillItem>
            <SkillItem>Git & GitHub</SkillItem>
            <SkillItem>Material UI</SkillItem>
            <SkillItem>Docker</SkillItem>
          </SkillsList>
          
          <h3>Idiomas</h3>
          <SkillsList>
            <SkillItem>Inglês - Intermediário</SkillItem>
            <SkillItem>Português - Nativo</SkillItem>
          </SkillsList>
        </SkillsSection>
      </Content>
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  padding: 5rem 0;
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
  z-index: 0; // atrás do Content
`

const Content = styled.div`
  position: relative; // adiciona
  z-index: 1;         // fica acima do canvas
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-x);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2rem;
  }
`

const EducationItem = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
  }

  span {
    display: block;
    color: #2563eb;
    margin: 0.5rem 0;
  }

  p {
    color: #4b5563;
    line-height: 1.6;
  }
`

const SkillsSection = styled.div`
  margin-top: 4rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 2rem 0 1rem;
  }
`

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0 2rem;
`

const SkillItem = styled.span`
  background: #f0f9ff;
  color: #2563eb;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #2563eb;
    color: #fff;
    transform: translateY(-2px);
  }
`

export default Education
