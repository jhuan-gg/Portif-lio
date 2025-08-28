import React from 'react'
import styled from 'styled-components'

function Contact() {
  return (
    <Section id="contact">
      <Content>
        <h2>Contato</h2>
        <ContactGrid>
          <ContactItem>
            <i className="fa-solid fa-envelope"></i>
            <h3>E-mail</h3>
            <a href="mailto:gjhuan672@gmail.com">gjhuan672@gmail.com</a>
          </ContactItem>
          
          <ContactItem>
            <i className="fa-solid fa-phone"></i>
            <h3>Telefone</h3>
            <a href="tel:+5595981294351">(95) 98129-4351</a>
          </ContactItem>
          
          <ContactItem>
            <i className="fa-solid fa-location-dot"></i>
            <h3>Localização</h3>
            <p>R. Conrado Erdmann, 418</p>
            <p>Três Rios do Sul - Jaraguá do Sul</p>
          </ContactItem>
          
          <ContactItem>
            <i className="fa-brands fa-github"></i>
            <h3>GitHub</h3>
            <a href="https://github.com/jhuan-gg" target="_blank" rel="noopener noreferrer">
              github.com/jhuan-gg
            </a>
          </ContactItem>
        </ContactGrid>
      </Content>
    </Section>
  )
}

const Section = styled.section`
min-height: 100vh;
  padding: 5rem 0;
  background: #f8fafc;
`

const Content = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--padding-x);
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 3rem;
  }
`

const ContactGrid = styled.div`
  display: grid;
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

export default Contact
