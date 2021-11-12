import React from 'react'
import './style.scss'
import CONFIG from '@/config'

const currentYear = new Date().getFullYear()

const Footer: React.FC = () => {
  return (
    <footer className="global-footer">
      <div>
        Copyright &copy; 2020-{currentYear} {CONFIG.title} -
        <a href="https://github.com/pdsuwwz" target="_blank" rel="noopener noreferrer"> Wisdom</a>
      </div>
    </footer>
  )
}

export default Footer
