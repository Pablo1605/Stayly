import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <div className={styles.container}>
        <h2><img className={styles.logo} src="LogoBlack.svg" alt="LogoBlack"/></h2>
      <div>
        <AiFillGithub aria-label="GitHub" className={styles.reactIcon} onClick={() => window.open("https://github.com/Pablo1605", "_blank", "noopener,noreferrer")} />
        <AiFillLinkedin aria-label="LinkedIn" className={styles.reactIcon} onClick={() => window.open("https://www.linkedin.com/in/pablo-ramirez-22203a377/", "_blank", "noopener,noreferrer")} />
      </div>
    </div>
  )
}