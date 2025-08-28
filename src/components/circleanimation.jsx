import styled, { keyframes } from 'styled-components';

// animação de flutuação aleatória
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

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
  position: relative;
`;

export default function App() {
  const blobs = Array.from({ length: 16 }).map(() => ({
    size: 250 + Math.random() * 350, // 250px a 600px
    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, 0.5)`,
    speed: 20 + Math.random() * 25, // 20s a 45s
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
    <Wrapper>
      {blobs.map((b, index) => (
        <Blob key={index} {...b} />
      ))}
    </Wrapper>
  );
}
