import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import { Header } from "../ui/Header/Header"
import { Footer } from "../ui/Footer/Footer"

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <div className={styles.header}>
                <Header/>
            </div>
            <div className={styles.main}>  
                <Outlet/>
            </div>
            <div className={styles.footer}>
                <Footer/>
            </div>
        </div>
    )
}