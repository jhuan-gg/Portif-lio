import React from 'react'
import Card from './FibrosCard'
import RotaCard from './RotaCard'
import CheckCard from './CheckCard'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import UtilsManagerCard from './UtilsManagerCard'
import gsap from 'gsap';
import './styles.css';
import styled, { keyframes } from 'styled-components'


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



function Experience() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  return (
    <Section id="experience">
      <Content>
        <Title>
          <MainText className="main-text">Cada projeto</MainText>
          <HighlightText className="highlight-text">uma nova</HighlightText>
          <MainText className="main-text">conquista!</MainText>
        </Title>
        <ExperienceItem>
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={false}
              mousewheel={true}
              keyboard={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="mySwiper"
            >
              <SwiperSlide><Card /></SwiperSlide>
              <SwiperSlide><RotaCard /></SwiperSlide>
              <SwiperSlide><CheckCard /></SwiperSlide>
              <SwiperSlide><UtilsManagerCard /></SwiperSlide>
            </Swiper>
        </ExperienceItem>
      </Content>
      <Background>
        {!isMobile && <BlobsBackground count={16} />}
        <Gradient />
      </Background>
    </Section>
  )
}

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`

const Background = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #000000ff;  
  z-index: -1;
  overflow: hidden;
`

const Gradient = styled.div`
  position: absolute;
  width: 100%; height: 100%;
  background: radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0) 50%);
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;   /* agora lado a lado */
  justify-content: space-between;
  align-items: center;
  text-align: left;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-x);
  gap: 2rem;   /* espaço entre texto e swiper */

  @media (max-width: 900px) {
    flex-direction: column;   /* em telas menores volta a coluna */
    text-align: center;
  }
`


const ExperienceItem = styled.div`
  flex: 1;
  min-width: 500px;   /* garante largura mínima */
  max-width: 1000px;   /* evita estourar */
  margin-bottom: 2rem;

  .swiper {
    width: 100%;
    height: 450px;
  }

  @media (max-width: 900px) {
    width: 100%;
    max-width: 100%;  /* no mobile ocupa toda a largura */
  }
`


const ProjectsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const Project = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  p {
    margin: 1rem 0;
  }
`

const Title = styled.h2`
  flex: 1; /* ocupa metade do espaço */
  font-size: 4.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 2rem;

  @media (max-width: 600px) { font-size: 2.5rem; }
`


const MainText = styled.span`
  display: block;
  color: rgba(255,255,255,0.9);
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



const ProjectTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2563eb;
`

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4b5563;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;

  &:hover {
    color: #2563eb;
  }

  i {
    font-size: 1.1rem;
  }
`

export default Experience
