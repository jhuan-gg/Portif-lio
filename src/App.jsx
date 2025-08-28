import { useEffect } from "react"
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Lenis from "@studio-freight/lenis"

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0, // controla a suavidade (quanto maior, mais lento)
      smoothWheel: false, // suaviza o scroll do mouse/trackpad
      smoothTouch: false, // pode ativar se quiser suavizar no celular
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="w-full">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Contact />
      </main>
    </div>
  )
}

export default App
