import React, { useState } from 'react'
import Projects from '../Projects'
import classes from './index.module.scss'
import constate from 'constate'

export const [AppProvider, useApp] = constate(() => {
  const [projects, setProjects] = useState([])
  return {
    projects,
    setProjects,
  }
})

function App() {
  return (
    <AppProvider>
      <div className={classes.app}>
        <header className={classes.header}>
          <h1>Simple todo lists</h1>
          <h2>from ruby garage</h2>
        </header>
        <main className={classes.main}>
          <Projects />
        </main>
        <footer className={classes.footer}>&copy; Ruby Garage</footer>
      </div>
    </AppProvider>
  )
}

export default App
