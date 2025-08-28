import React, { useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { gsap } from 'gsap'
import Loader from './Loader'


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

// ========================
// Hero Section
// ========================
export default function Hero() {
  const handleScroll = (e) => {
    e.preventDefault()
    const element = document.querySelector('#about')
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.5 } });

    tl.to('.loader-wrapper', { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.3)' })
      .to('.main-text', { y: 0, opacity: 1, stagger: 0.3 })
      .to('.highlight-text', { y: 0, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.3)' }, '-=1')
      .from('.hero-circle', { scale: 0.5, opacity: 0, duration: 2, ease: 'elastic.out(1, 0.3)' }, '-=1.5')
      .to('.scroll-indicator', { y: 0, opacity: 1, duration: 1 }, '-=1')
  }, [])

  return (
    <Section id="hero">
      <Content>
        <Left>
          <Title>
            <MainText className="main-text">Vamos codar</MainText>
            <HighlightText className="highlight-text">suas</HighlightText>
            <MainText className="main-text">ideias?</MainText>
          </Title>
          <ScrollIndicator href="#about" onClick={handleScroll}>
              <StyledWrapper>
                <button type="button" className="btn">
                    <span>Me conheça melhor</span>
                    <div id="container-stars">
                    <div id="stars" />
                    </div>
                    <div id="glow">
                    <div className="circle" />
                    <div className="circle" />
                    </div>
                </button>
              </StyledWrapper>
          </ScrollIndicator>    
          {/* <ScrollIndicator href="#about" onClick={handleScroll}>
            <span>Me conheça melhor</span>
            <i className="fa-solid fa-arrow-down"></i>
          </ScrollIndicator> */}
        </Left>
        <Right>
          <LoaderWrapper className="loader-wrapper">
            <Loader />
          </LoaderWrapper>
        </Right>
      </Content>

      <Background>
        <BlobsBackground count={16} />
        <Gradient />
      </Background>
    </Section>
  )
}

// ========================
// Styled Components
// ========================
const Section = styled.section`
  min-height: 100vh;
  display: flex;
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
`

const Left = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;
`

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  @media (max-width: 600px) { font-size: 2.5rem; }
`

const MainText = styled.span`
  display: block;
  color: rgba(255,255,255,0.9);
  font-size: 4.5rem;
  line-height: 1.2;
  font-weight: 800;
  opacity: 0;
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
  opacity: 0;
  @media (max-width: 600px) { font-size: 3.5rem; }
`

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  align-items: end;
  position: relative;
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`

const Circle = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(37,99,235,0.15) 0%, rgba(250,139,139,0.05) 100%);
  opacity: 0.8;
  filter: blur(3px);
  animation: ${pulse} 8s ease-in-out infinite;
  @media (max-width: 900px) { width: 400px; height: 400px; }
  @media (max-width: 600px) { width: 300px; height: 300px; }
`

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%) scale(4);
  opacity: 0;
  z-index: 2;
  @media (max-width: 1200px) { left: 60%; }
  @media (max-width: 900px) { left: 50%; transform: translate(-50%, -50%) scale(3); }
  @media (max-width: 600px) { transform: translate(-50%, -50%) scale(2); }
`

const ScrollIndicator = styled.a`
  display: flex;
  flex-direction: column;
  align-items: start;
  borderRadius: 50%;
  gap: 1rem;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  opacity: 0.7;
  transition: opacity 0.2s;
  &:hover { opacity: 1; }
  i { font-size: 1.5rem; animation: bounce 2s infinite; }
  @keyframes bounce {
    0%,20%,50%,80%,100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
`

const Background = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  overflow: hidden;
`

const Gradient = styled.div`
  position: absolute;
  width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0) 50%);
`
const StyledWrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 13rem;
    overflow: hidden;
    height: 3rem;
    background-size: 300% 300%;
    cursor: pointer;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121),
      linear-gradient(
        137.48deg,
        #ffdb3b 10%,
        #fe53bb 45%,
        #8f51ea 67%,
        #0044ff 87%
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
  }

  #container-stars {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
  }

  span {
    z-index: 2;
    font-size: 18px;
    color: #ffffff;
    text-shadow: 0 0 4px white;
  }

  #glow {
    position: absolute;
    display: flex;
    width: 12rem;
  }

  .circle {
    width: 100%;
    height: 30px;
    filter: blur(2rem);
    animation: pulse_3011 4s infinite;
    z-index: -1;
  }

  .circle:nth-of-type(1) {
    background: rgba(254, 83, 186, 0.636);
  }

  .circle:nth-of-type(2) {
    background: rgba(142, 81, 234, 0.704);
  }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    border: double 4px #fe53bb;
    background-origin: border-box;
    background-clip: content-box, border-box;
    animation: none;
  }

  .btn:active .circle {
    background: #fe53bb;
  }

  #stars {
    position: relative;
    background: transparent;
    width: 200rem;
    height: 200rem;
  }

  #stars::after {
    content: "";
    position: absolute;
    top: -10rem;
    left: -100rem;
    width: 100%;
    height: 100%;
    animation: animStarRotate 90s linear infinite;
  }

  #stars::after {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
  }

  #stars::before {
    content: "";
    position: absolute;
    top: 0;
    left: -50%;
    width: 170%;
    height: 500%;
    animation: animStar 60s linear infinite;
  }

  #stars::before {
    background-image: radial-gradient(#ffffff 1px, transparent 1%);
    background-size: 50px 50px;
    opacity: 0.5;
  }

  @keyframes animStar {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-135rem);
    }
  }

  @keyframes animStarRotate {
    from {
      transform: rotate(360deg);
    }

    to {
      transform: rotate(0);
    }
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse_3011 {
    0% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
      transform: scale(0.75);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }`;
