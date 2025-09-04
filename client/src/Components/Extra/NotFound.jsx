import { NavLink } from "react-router-dom"

import styles from '../../Styles/NotFound.module.css'

export const NotFound = () => {
    return (
        <div className={styles.NotFoundContainer}>
            <h1>Pagina Non Trovata</h1>
            <img src="src\Images\NotFound.jpg" alt="NotFound" />
            <NavLink to="/">Torna alla Pagina Principale</NavLink>
        </div>
    )
}