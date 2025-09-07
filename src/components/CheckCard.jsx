import React from 'react';
import styled from 'styled-components';
import check from '../assets/check.png';

const CheckCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="icon">
            <img src={check} alt="Check Logo" style={{ width: 56, height: 56, borderRadius: '16px', marginBottom: '0.5em' }} />
        </div>
        <strong> Check! </strong>
        <div className="card__body">App web para gestão e análise de checklists profissionais, com React, Firebase e dashboards interativos</div>
        <span><a href="https://github.com/jhuan-gg/chk-lst.git" target='_blank'>Ver Projeto</a></span>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    --bg: #f7f7f8;
    --hover-bg: #0000007c;
    --hover-text: #5339e4ff;
    background: rgba(0, 0, 0, 0.18); /* azul fosco/transparente */
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 220px;
    height: 220px;
    max-width: none;
    min-width: 220px;
    min-height: 220px;
    /* Mantém o card quadrado independente do conteúdo */
    text-align: center;
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
  }

  .card__body {
    color: #fff;
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

export default CheckCard;
