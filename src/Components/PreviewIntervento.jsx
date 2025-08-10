//Styles
import styles from '../Styles/PreviewIntervento.module.css';

export const PreviewIntervento = ({ intervento, isLoading, error }) => {

    const { id, name, description, data, status} = intervento;

    const statusColor = status === 'In Corso' ? 'hsla(44, 100%, 50%, 0.650)' : 
                status === 'Completato' ? 'hsla(131, 100%, 50%, 0.400)' : 
                status === 'Annullato' ? 'hsla(0, 100%, 50%, 0.60)' : 'hsla(0, 2%, 70%, 0.60)';

    
    console.log('Render Intervento')

    return (
        <div className={styles.PreviewInterventoContainer}>
            <h1>{name}</h1>
            <h2>
                {data[0].date}
                { 
                    //Se ho più di un giorno di intervento mostro anche l'ultima data
                    data.length > 1 ? ` => ${data[data.length-1].date}` : null
                }
            </h2>
            <p>{description}</p>
            <h3 style={{ backgroundColor: statusColor }}>Status: {status}</h3>
        </div>
    );
}