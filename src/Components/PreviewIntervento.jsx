//Styles
import styles from '../Styles/PreviewIntervento.module.css';

export const PreviewIntervento = ({ intervento, isLoading, error }) => {

    const { id, name, description, date, status} = intervento;

    const statusColor = status === 'In Corso' ? 'hsla(44, 100%, 50%, 0.650)' : 
                status === 'Completato' ? 'hsla(131, 100%, 50%, 0.400)' : 
                status === 'Annullato' ? 'hsla(0, 100%, 50%, 0.60)' : 'hsla(0, 2%, 70%, 0.60)';

    return (
        <div className={styles.PreviewInterventoContainer}>
            <h1>{name}</h1>
            <h2>{date}</h2>
            <p>{description}</p>
            <h3 style={{ backgroundColor: statusColor }}>Status: {status}</h3>
        </div>
    );
}