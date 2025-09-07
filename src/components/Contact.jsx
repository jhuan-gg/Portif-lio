import styled, { createGlobalStyle } from 'styled-components';
import React, { useEffect } from 'react'
import './ContactForm.css'
import { keyframes } from 'styled-components'
import { gsap } from 'gsap'
import Loader from './Loader'
import {  useInView } from 'react-intersection-observer';



const float = keyframes`
  0% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(var(--x1), var(--y1)) scale(var(--s1)); }
  50% { transform: translate(var(--x2), var(--y2)) scale(var(--s2)); }
  75% { transform: translate(var(--x3), var(--y3)) scale(var(--s3)); }
  100% { transform: translate(0, 0) scale(1); }
`;

const Blob = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background: ${(props) => props.color};
  filter: blur(120px);
  opacity: 0.5;
  animation: ${float} ${(props) => props.speed}s ease-in-out infinite;

  --x1: ${(props) => props.x1}px;
  --y1: ${(props) => props.y1}px;
  --s1: ${(props) => props.s1};
  --x2: ${(props) => props.x2}px;
  --y2: ${(props) => props.y2}px;
  --s2: ${(props) => props.s2};
  --x3: ${(props) => props.x3}px;
  --y3: ${(props) => props.y3}px;
  --s3: ${(props) => props.s3};

  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
`;

function BlobsBackground({ count = 8 }) {
  const blobs = Array.from({ length: count }).map(() => ({
    size: 250 + Math.random() * 350,
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.3)`,
    speed: 20 + Math.random() * 25,
    top: Math.random() * 100,
    left: Math.random() * 100,
    x1: -250 + Math.random() * 500,
    y1: -250 + Math.random() * 500,
    s1: 0.8 + Math.random() * 0.4,
    x2: -250 + Math.random() * 500,
    y2: -250 + Math.random() * 500,
    s2: 0.8 + Math.random() * 0.4,
    x3: -250 + Math.random() * 500,
    y3: -250 + Math.random() * 500,
    s3: 0.8 + Math.random() * 0.4,
  }));

  return (
    <>
      {blobs.map((b, i) => (
        <Blob key={i} {...b} />
      ))}
    </>
  )
}




function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
  })

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  useEffect(() => {
    if (inView) {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } })

      tl.to('.loader-wrapper', {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
        .to('.main-text', { y: 0, opacity: 1, stagger: 0.3 })
        .to('.highlight-text', {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.3)',
        }, '-=1')
        .from('.hero-circle', {
          scale: 0.5,
          opacity: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.3)',
        }, '-=1.5')
        .to('.scroll-indicator', { y: 0, opacity: 1, duration: 1 }, '-=1')
    }
  }, [inView])
  return (
    <Section ref={ref} id="contact">
      <Content>
        <h2>Contato</h2>
        
      </Content>
      <Background>
        <ContactScopedStyle />
          <div className="background">
            <div className="containero">
              <div className="screen">
                <div className="screen-header">
                  <div className="screen-header-left">
                    <div className="screen-header-button close"></div>
                    <div className="screen-header-button maximize"></div>
                    <div className="screen-header-button minimize"></div>
                  </div>
                  <div className="screen-header-right">
                    <div className="screen-header-ellipsis"></div>
                    <div className="screen-header-ellipsis"></div>
                    <div className="screen-header-ellipsis"></div>
                  </div>
                </div>
                <div className="screen-body">
                  <div className="screen-body-item left">
                    <div className="app-title">
                      <span> É um prazer te ver aqui, estou ansioso para receber sua mensagem.</span>
                    </div>
                    {/* <div className="app-contact">INFORMAÇÃO DE CONTATO : +55 95 98129-4351</div> */}
                  </div>
                  <div className="screen-body-item">
                    <div className="app-form">
                      <div className="app-form-group app-form-control">
                        JHUAN GABRIEL
                        {/* <input className="app-form-control" placeholder="NOME" /> */}
                      </div>
                      <div className="app-form-group app-form-control">
                        gjhuan672@gmail.com
                        {/* <input className="app-form-control" placeholder="EMAIL" /> */}
                      </div>
                      <div className="app-form-group app-form-control">
                        +55 95 98129-4351
                        {/* <input className="app-form-control" placeholder="NUMERO PARA CONTATO" /> */}
                      </div>
                      {/* <div className="app-form-group message app-form-control">
                        <input className="app-form-control" placeholder="MENSAGEM" />
                      </div> */}
                      {/* <div className="app-form-group buttons">
                        <button className="app-form-button">CANCELAR</button>
                        <button className="app-form-button">ENVIAR</button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {!isMobile && inView && <BlobsBackground count={16} />}
        <Gradient />
      </Background>
    </Section>
  )
}




const Background = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  padding-top: 5%;
  overflow: hidden;
`

const Gradient = styled.div`
  position: absolute;
  width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0) 50%);
`
const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #000000ff;
  color: #fff;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 4rem var(--padding-x);
  gap: 2rem;
  position: relative;
  z-index: 2;
  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    gap: 3rem;
  }

  h2 {
    font-size: 5rem;
    Margin-top: 5%;
    font-weight: 700;
    color: #ffffffff;
    margin-bottom: 3rem;
  }
`

const ContactGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const ContactItem = styled.div`
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 250px;
  text-align: center;
  height: 250px;

  &:hover {
    transform: translateY(-5px);
  }

  i {
    font-size: 2rem;
    color: #2563eb;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  a {
    color: #4b5563;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #2563eb;
    }
  }
`

const ContactScopedStyle = createGlobalStyle`
  .background *, .background *:before, .background *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default Contact
