import { NavLink } from 'react-router-dom'
//Styles
import styles from '../Styles/SectionPreviewCreateIntervento.module.css'

export const SectionPreviewCreateIntervento = () => {

    return (    
        <>
            <NavLink to={'/Interventi/Creazione'} className={styles.Link}>
                <div className={styles.MainContainer}>
                    <h2>Crea un nuovo intervento</h2>
                    <img src="/Images/Add.svg" alt="Creazione Nuovo Intervento" />
                </div>
            </NavLink>
        </>
    )
}