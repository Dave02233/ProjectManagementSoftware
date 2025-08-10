import { useState, useEffect } from 'react';
// Components
import { PreviewIntervento } from './PreviewIntervento.jsx';
// Styles
import styles from '../Styles/SectionPreviewInterventi.module.css';


export const SectionPreviewInterventi = ({ interventi }) => {

    // Preview component for a small section
    const [reducedData, setReducedData] = useState(interventi);
    const [isReduced, setIsReduced] = useState(false);
    const [maxReducedNumber, setMaxReducedNumber] = useState(5);

    const handleClickAddMaxReducedNumber = _ => {
        setMaxReducedNumber(prev => prev + 5)
    }

    useEffect(() => {
        setReducedData(interventi.slice(0, maxReducedNumber));
        interventi.length > maxReducedNumber ? setIsReduced(true) : setIsReduced(false);
    }, [interventi, maxReducedNumber]);


    return(
        <div className={styles.PreviewInterventiContainer}>
            {
                interventi.length === 0
                ? <h2 className={styles.NotFound}>Nessun intervento trovato</h2>
                : reducedData.map((intervento, index) => (
                    // ATTENZIONE - sul primo render non essendo ancora stato effettuato lo slice viene effettuato il render di tutti i 1000 elementi
                    // quindi lascio qui un tetto massimo variabile solo per il preview
                    index < maxReducedNumber
                    ? <PreviewIntervento key={index} intervento={intervento} isLoading={false} error={false}/>
                    : null))
            }
            {   isReduced 
                ? <button className={styles.AddReducedData} name='Mostra' onClick={handleClickAddMaxReducedNumber}>Mostra di più - Attuale {maxReducedNumber}</button> 
                : null }
        </div>
    );
}