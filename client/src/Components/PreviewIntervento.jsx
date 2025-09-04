import { NavLink } from 'react-router-dom';
//Styles
import styles from '../Styles/PreviewIntervento.module.css';

export const PreviewIntervento = ({ intervento, isLoading, error }) => {

    const { id, clientName, description, data, status} = intervento;

    const statusColor = status === 'In Corso' ? 'hsla(36, 100%, 50%, 1.0)' : 
                status === 'Completato' ? 'hsla(131, 100%, 50%, 0.600)' : 
                status === 'Annullato' ? 'hsla(0, 100%, 50%, 0.80)' : 'hsla(0, 2%, 70%, 0.60)';

    return (
        <NavLink to={`/Interventi/${id}`}>
            <div className={styles.PreviewInterventoContainer}>
                <h1>{clientName}</h1>
                <h2>
                    {data[0].date}
                    { 
                        //Se ho più di un giorno di intervento mostro anche l'ultima data
                        data.length > 1 ? ` || ${data[data.length-1].date}` : null
                    }
                </h2>
                <p>{description}</p>
                <h3 style={{ backgroundColor: statusColor }}>{status}</h3>
            </div>
        </NavLink>
    );
}