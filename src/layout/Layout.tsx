import styles from '../styles/Layout.module.css'

import {ReactNode} from "react";
import Header from "./Header.tsx";
import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.layout}>
            <Header/>
            <Navbar/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default Layout;