import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
//Styles
import styles from '../Styles/Intervento.module.css'

export const Intervento = _ => {
    
    const { id } = useParams()

    const intervento = useSelector(store => {
        const all = store.interventi.all;
        return all ? all.find(intervento => intervento.id.toString() === id.toString()) : null;
    })
    
    if (!intervento) {
        return <div>Intervento non trovato</div>;
    }

    const [hovering, setHovering] = useState(false);

    const { name, author, description, data, status } = intervento;

    const baseColor = status === 'In Corso' ? 'Orange' :
                    status === 'Completato' ? 'Green' :
                    status === 'Annullato' ? 'Red' : 'Grey';

    const statusColor = hovering ? baseColor + 'Active' : baseColor;

    const handleMouseHoverIn = () => setHovering(true);
    const handleMouseHoverOut = () => setHovering(false);


    return (
        <div className={styles.DataContainer} onMouseEnter={handleMouseHoverIn} onMouseLeave={handleMouseHoverOut}>
            <h4>Intervento con ID: {id}</h4>
            <h1>Cliente: <span>{name}</span></h1>
            <h2>Autore: <span>{author}</span></h2>
            {
                data.length > 1 
                ?(
                <>
                    <h2>Data di inzio: <span>{data[0].date}</span></h2>
                    <h2>Data di fine: <span>{data[data.length - 1].date}</span></h2>
                </>
                )
                : <h2>Data: {data[0].date}</h2>
            }
            <hr />
            <h2>Descrizione:</h2>
            <p>{description}</p>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Working Hours</th>
                        <th>Travel Hours</th>
                        <th>Km</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.date}</td>
                            <td>{item.workingHours}</td>
                            <td>{item.travelHours}</td>
                            <td>{item.km}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className={styles[statusColor]}>Status: {status}</h3>
        </div>
    )
}