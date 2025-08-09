export const PreviewIntervento = ({ intervento, isLoading, error }) => {

    const { id, name, description, date, status} = intervento;

    const statusColor = status === 'In Corso' ? 'orange' : 
                status === 'Completato' ? 'green' : 
                status === 'Annullato' ? 'red' : 'gray';

    return (
        <div>
            <h1>{name}</h1>
            <h3>{date}</h3>
            <p>{description}</p>
            <h3 style={{ backgroundColor: statusColor }}>Status: {status}</h3>
        </div>
    );
}