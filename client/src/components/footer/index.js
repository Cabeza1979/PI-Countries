import React from 'react'
import github from '../../img/github.png'
import linkedin from '../../img/linkedin.png'
import mail from '../../img/mail.png'
import s from './footer.module.css'

const Footer= ()=> {
    return (
        <footer className={s.footer}>
            <div className={s.footer_social}>
            <a rel="noreferrer" target="_blank" href="https://github.com/cabeza1979">  <img alt="logo github" src={github} />   </a>
            
            <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in//">  <img alt="logo linkedin" src={linkedin} />  </a>
            <a rel="noreferrer"  target="_blank" href="mailto:lautaroJ95@gmail.com">   <img alt="logo mail" src={mail} />  </a>
            </div>
            <p className={s.footer_copy}><b> Made by Christian J. Tronconi&copy; 2022</b></p>
        </footer>
    )
}

export default Footer;
