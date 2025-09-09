import { useState, useEffect } from 'react';
//Store
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData, fetchData } from '../Store/Slices/interventiSlice.js';
// Components
import { PreviewIntervento } from './PreviewIntervento.jsx';
import { StatusBox } from './SingleItems/StatusBox.jsx'
// Styles
import styles from '../Styles/SectionPreviewInterventi.module.css';



export const SectionPreviewInterventi = _ => {

    // Store setup
    const dispatch = useDispatch();
    const interventi = useSelector( state => state.interventi);
    const filteredData = interventi.filteredData;
    const requestStatus = interventi.requests.fetch;
    const totalInterventi = interventi.total;
    const totalFilteredInterventi = interventi.filteredTotal;


    // Preview component for a small section
    const [reducedData, setReducedData] = useState([]);
    const [isReduced, setIsReduced] = useState(false);
    const [maxReducedNumber, setMaxReducedNumber] = useState(10);

    const handleClickAddMaxReducedNumber = _ => {
        setMaxReducedNumber(prev => prev + 10)
    }

    useEffect(() => {
        if(totalInterventi) {
            setReducedData(filteredData.slice(0, maxReducedNumber));
         
            filteredData.length > maxReducedNumber 
            ? setIsReduced(true) : setIsReduced(false);
        }
    }, [filteredData]);

// Filter state
    const [filter, setFilter] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);
    const [maxDataSize, setMaxDataSize] = useState(20);

    const handleChangeFilter = ({ target }) => {
        setFilter(prev => prev = target.value);
        setMaxReducedNumber(10);
    }

    useEffect( _ => {

        if (timeoutId) clearTimeout(timeoutId);

        const id = setTimeout(() => {
            dispatch(fetchData({ limit: maxReducedNumber, filter }));
        }, 250); 
        setTimeoutId(id);



    }, [filter, maxReducedNumber])

    useEffect( _ => {
        if(filter.length > 0) {
            setMaxDataSize(totalFilteredInterventi - maxReducedNumber);
        }else{
            setMaxDataSize(totalInterventi - maxReducedNumber);
        }
     
    }, [maxReducedNumber, totalFilteredInterventi])

    return(
        <div className={styles.MainContainer}>
            <div className={styles.UtilitiesContainer}>
                <input className={styles.Filtro} 
                type='text' name='Filtro' placeholder='Filtro Interventi' 
                onChange={handleChangeFilter}
                value={filter} />
            </div>
            <div className={styles.DisplayContainer}>
                {
                    filteredData.length === 0 || filteredData.length === undefined
                    ? <h2 className={styles.NotFound}>Nessun intervento trovato</h2>
                    : reducedData.map((intervento, index) => (
                        index < maxReducedNumber
                        ? <PreviewIntervento key={index} intervento={intervento} error={false}/>
                        : null
                    ))
                }
            </div>
            {   isReduced && filteredData.length - maxReducedNumber > 0
                ? <button className={styles.AddReducedData} 
                name='Mostra' 
                onClick={handleClickAddMaxReducedNumber}>
                    { 
                     `Mostra di più (${filter.length > 0 ? `${maxDataSize} ancora da mostrare / ${totalFilteredInterventi} filtrati / `: `${ maxDataSize} ancora da mostrare / `}${totalInterventi} interventi totali)` 
                    }
                </button> 
                : null }

            <StatusBox boxStatus={requestStatus}/>
        </div>
    );
}