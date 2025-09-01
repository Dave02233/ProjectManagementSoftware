import { useState, useEffect } from 'react';
//Store
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../Store/Slices/interventiSlice.js';
// Components
import { PreviewIntervento } from './PreviewIntervento.jsx';
// Styles
import styles from '../Styles/SectionPreviewInterventi.module.css';



export const SectionPreviewInterventi = _ => {

    // Store setup
    const dispatch = useDispatch();
    const interventi = useSelector((state) => state.interventi.filteredData);

    const { isLoading, errorLoading } = interventi; // Per ora non servono, ma utili con richieste API

    // Filter state
    const [filter, setFilter] = useState('');
    const handleChangeFilter = ({ target }) => {
        setFilter(prev => prev = target.value);
        setMaxReducedNumber(5);
    }

    // Dispatch change filter
    useEffect( _ => {
        dispatch(setFilteredData(filter));
    }, [filter])


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
        <div className={styles.MainContainer}>
            <div className={styles.UtilitiesContainer}>
                <input className={styles.Filtro} type='text' name='Filtro' placeholder='Filtro Interventi' onChange={handleChangeFilter} value={filter} />
            </div>
            <div className={styles.DisplayContainer}>
                {
                    interventi.length === 0
                    ? <h2 className={styles.NotFound}>Nessun intervento trovato</h2>
                    : reducedData?.map((intervento, index) => (
                        // ATTENZIONE - sul primo render non essendo ancora stato effettuato lo slice viene effettuato il render di tutti i 1000 elementi
                        // quindi lascio qui un tetto massimo variabile solo per il preview
                        index < maxReducedNumber
                        ? <PreviewIntervento key={index} intervento={intervento} error={false}/>
                        : null))
                }
            </div>
            {   isReduced 
                ? <button className={styles.AddReducedData} name='Mostra' onClick={handleClickAddMaxReducedNumber}>{ `Mostra di più (${maxReducedNumber})` }</button> 
                : null }
        </div>
    );
}