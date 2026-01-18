import React from 'react'
import './App.css'
import HeroSection from './components/herosection.jsx'
import Navbar from './components/navbar.jsx'
import Skills from './components/skills.jsx'
import Projects from './components/project.jsx'
import Contact from './components/contact.jsx'
function App() {
  return (
    <div >
      <Navbar />
      <HeroSection />
      <Skills />
      <Projects />
      <Contact />
    </div>
  )
}

export default App
