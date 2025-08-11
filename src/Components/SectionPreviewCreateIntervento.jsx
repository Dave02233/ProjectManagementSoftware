import { NavLink } from 'react-router-dom'
//Styles
import styles from '../Styles/SectionPreviewCreateIntervento.module.css'

export const SectionPreviewCreateIntervento = () => {

    const handleClick = _ => {
        alert('Funzione non ancora aggiunta')
    }

    return (    
        <>
            <NavLink to={'/Interventi/Creazione'}>
                <div className={styles.MainContainer}>
                    <img src="/Images/Add.svg" alt="Creazione Nuovo Intervento" />
                    <h2>Crea un nuovo intervento</h2>
                </div>
            </NavLink>
        </>
    )
}