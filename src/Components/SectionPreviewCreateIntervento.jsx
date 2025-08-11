import styles from '../Styles/SectionPreviewCreateIntervento.module.css'

export const SectionPreviewCreateIntervento = () => {

    const handleClick = _ => {
        alert('Funzione non ancora aggiunta')
    }

    return (    
        <>
            <div className={styles.MainContainer} onClick={handleClick}>
                <img src="src\Images\Add.svg" alt="Creazione Nuovo Intervento" />
                <h2>Crea un nuovo intervento</h2>
            </div>
        </>
    )
}