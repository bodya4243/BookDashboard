import styles from '../styles/Navbar.module.css'

import {Link} from "react-router-dom";

function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <Link to={'/'}>
                    MainPage
                </Link>
                <Link to={'/create-book'}>
                    Create/Update Book
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;