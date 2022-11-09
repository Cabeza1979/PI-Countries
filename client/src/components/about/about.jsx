import React from 'react'
import github from '../../img/github.png'
import linkedin from '../../img/linkedin.png'
import mail from '../../img/mail.png'
//import s from './about.module.css'

function About() {
    return (
        <footer>
            <a rel="noreferrer" target="_blank" href="https://github.com/cabeza1979"><img alt="logo github" src={github} /></a>
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/"><img alt="logo linkedin" src={linkedin} /></a>
            <a rel="noreferrer" target="_blank" href="mailto:chtronconi@gmail.com"><img alt="logo mail" src={mail} /></a>
        </footer>
    )
}

export default About;
