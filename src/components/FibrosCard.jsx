import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="icon">
        </div>
        <strong> Fibros </strong>
        <div className="card__body">Sistema web-mobile para gestão de Caixas de Terminação Óptica e mapas de fibra, com React, Firebase e TypeScript, focado em provedores de internet.</div>
        <span>Ver Projeto</span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --bg: #f7f7f8;
    --hover-bg: #a7aff6ff;
    --hover-text: #e50087;
    max-width: 23ch;
    text-align: center;
    background: var(--bg);
    padding: 1.5em;
    padding-block: 1.8em;
    border-radius: 5px;
    position: relative;
    overflow: hidden;
    transition:
      0.3s cubic-bezier(0.6, 0.4, 0, 1),
      transform 0.15s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    color: black;
  }

  .card__body {
    color: #464853;
    line-height: 1.5em;
    font-size: 1em;
  }

  .card > :not(span) {
    transition: 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  }

  .card > strong {
    display: block;
    font-size: 1.4rem;
    letter-spacing: -0.035em;
  }

  .card span {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--hover-text);
    border-radius: 5px;
    font-weight: bold;
    top: 100%;
    transition: all 0.3s cubic-bezier(0.6, 0.4, 0, 1);
  }

  .card:hover span {
    top: 0;
    font-size: 1.2em;
  }

  .card:hover {
    background: var(--hover-bg);
  }

  .card:hover > div,
  .card:hover > strong {
    opacity: 0;
  }`;

export default Card;
