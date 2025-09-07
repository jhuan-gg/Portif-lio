import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { ImGithub } from "react-icons/im";
import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";

export default function About() {
  const titleRef = useRef(null)
  const canvasRef = useRef(null)
  const isMobile = window.innerWidth <= 600;

  // animação de digitação
  useEffect(() => {
    const section = document.querySelector('#about');

    const startTypingAnimation = () => {
      const beforeName = "Olá, eu sou ";
      const name = "Jhuan Gabriel";
      const afterName = ".";

      let currentBefore = "";
      let currentName = "";
      let currentAfter = "";

      // Limpa o título
      titleRef.current.innerHTML = `<span class="before"></span><span class="name"></span><span class="after"></span>`;

      const beforeSpan = titleRef.current.querySelector(".before");
      const nameSpan = titleRef.current.querySelector(".name");
      const afterSpan = titleRef.current.querySelector(".after");

      // Digitar antes do nome
      beforeName.split("").forEach((char, index) => {
        gsap.to({}, {
          duration: 0.05,
          delay: index * 0.1,
          onStart: () => {
            currentBefore += char;
            beforeSpan.textContent = currentBefore;
          }
        });
      });

      // Digitar o nome
      name.split("").forEach((char, index) => {
        gsap.to({}, {
          duration: 0.05,
          delay: beforeName.length * 0.1 + index * 0.1,
          onStart: () => {
            currentName += char;
            nameSpan.textContent = currentName;
          }
        });
      });

      // Digitar o ponto final
      afterName.split("").forEach((char, index) => {
        gsap.to({}, {
          duration: 0.05,
          delay: (beforeName.length + name.length) * 0.1 + index * 0.1,
          onStart: () => {
            currentAfter += char;
            afterSpan.textContent = currentAfter;
          }
        });
      });
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startTypingAnimation();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // fundo de partículas
  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
    <Section id="about">
      {!isMobile && <Canvas ref={canvasRef} />}
      <Content>
        <Left>
          <Title>
            <span ref={titleRef}></span>
            <Cursor>|</Cursor>
          </Title>
          <Social>
            <a href="https://github.com/jhuan-gg" target="_blank" rel="noopener noreferrer"><ImGithub /></a>
            <a href="https://www.linkedin.com/in/jhuan-gabriel-nascimento-rocha"><FaLinkedin /></a>
            <a href="https://www.instagram.com/jhuan.zin"><FaInstagramSquare /></a>
          </Social>
          <StyledWrapper>
            <div className="card">
              <div className="tools">
                <div className="circle"><span className="red box" /></div>
                <div className="circle"><span className="yellow box" /></div>
                <div className="circle"><span className="green box" /></div>
              </div>
              <div className="card__content">
                <Subtitle className={isMobile ? 'mobile' : ''}>
                  Desenvolvedor <span>Full Stack</span>
                </Subtitle>
                <Description className={isMobile ? 'mobile' : ''}>
                  <p>
                    Desenvolvedor Front-end especializado em React, com forte experiência em componentização de UI, estilização com Styled-Components e integração de bibliotecas de design como Material-UI (MUI). Hábil na construção de interfaces responsivas, componentes reutilizáveis, gerenciamento de estado e otimização de performance em aplicações SPA, aplicando boas práticas de desenvolvimento moderno e design modular.                  
                  </p>
                </Description>
              </div>
            </div>
          </StyledWrapper>
        </Left>
        <Right>
          <Avatar>
            <img src="./eu.png" alt="eu"  />
          </Avatar>
        </Right>
      </Content>
    </Section>
  )
}


const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #fff;
  color: #1a1a1a;
  position: relative;
  overflow: hidden;
`

const Canvas = styled.canvas`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem var(--padding-x);
  gap: 2rem;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 3rem;
    padding: 2rem 1rem;
  }
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    gap: 2rem;
  }
`

const Left = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
  width: 100%;
  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
  }
  @media (max-width: 600px) {
    gap: 0.5rem;
  }
`

const Title = styled.span`
  font-size: 3.3rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  white-space: nowrap; /* evita quebra do card */
  span.before {
    color: #1a1a1a;
  }
  span.name {
    color: #2563eb;
    font-weight: 900;
  }
  span.after {
    color: #1a1a1a;
  }
  @media (max-width: 600px) {
    font-size: 2rem;
  }
`

const Cursor = styled.span`
  color: #2563eb;
  font-weight: 400;
  animation: blink 1s steps(1) infinite;
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
`

const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-family: 'Fira Mono', monospace;
  font-weight: 400;
  color: #fff;
  margin-bottom: 1.5rem;
  span {
    color: #3b82f6;
    font-weight: 600;
    margin-left: 0.3rem;
  }
  &.mobile {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

const Description = styled.p`
  font-family: 'Fira Mono', monospace;
  font-size: 1rem;
  text-align: justify;
  line-height: 1.6;
  color: #fff;
  max-width: 600px;

  p {
  text-align: justify;
  margin: 0.5rem;
  }
  @media (max-width: 900px) {
    text-align: start;
    margin: 0 auto;
  }
  &.mobile {
    font-size: 0.85rem;
    line-height: 1.4;
    margin: 0.5rem 0 0 0;
    max-width: 98vw;
  }
`

const Social = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  a {
    color: #1a1a1a;
    font-size: 2rem;
    transition: color 0.2s;
    &:hover {
      color: #2563eb;
    }
  }
`

const Right = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: 900px) {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
  }
  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`

const Avatar = styled.div`
  border-radius: 50%;
  border: 4px solid transparent;
  padding: 6px;
  background: linear-gradient(135deg, #2563eb 60%, #a78bfa 100%);
  img {
    border-radius: 50%;
    width: 350px;
    height: 350px;
    object-fit: cover;
    background: #fff;
    display: block;
    @media (max-width: 900px) {
      width: 200px;
      height: 200px;
    }
    @media (max-width: 600px) {
      width: 120px;
      height: 120px;
    }
  }
`

const StyledWrapper = styled.div`
  .card {
    width: 600px;
    height: 300px;
    background: #3e3e3e;
    border-radius: 8px;
    z-index: 1;
    margin: 0 auto;
    @media (max-width: 900px) {
      width: 90vw;
      height: 220px;
    }
    @media (max-width: 600px) {
      width: 98vw;
      height: auto;
      min-height: 180px;
      padding: 1rem 0.5rem;
      margin: 1rem auto 0 auto;
      box-sizing: border-box;
    }
  }
  .card__content {
    @media (max-width: 600px) {
      padding: 0.5rem 0.2rem;
    }
  }
  .tools {
    display: flex;
    align-items: center;
  }

  .circle {
    padding: 0 4px;
  }

  .box {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .red { background-color: #ff605c; }
  .yellow { background-color: #ffbd44; }
  .green { background-color: #00ca4e; }
`
