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
    const interventi = useSelector((state) => state.interventi.filteredData);
    const requestStatus = useSelector((state) => state.interventi.requests.fetch);
    const totalInterventi = useSelector((state) => state.interventi.total)


    // Preview component for a small section
    const [reducedData, setReducedData] = useState([]);
    const [isReduced, setIsReduced] = useState(false);
    const [maxReducedNumber, setMaxReducedNumber] = useState(10);

    const handleClickAddMaxReducedNumber = _ => {
        setMaxReducedNumber(prev => prev + 10)
    }

    useEffect(() => {
        if(totalInterventi) {
            setReducedData(interventi.slice(0, maxReducedNumber));
         
            interventi.length > maxReducedNumber 
            ? setIsReduced(true) : setIsReduced(false);
        }
        console.log(interventi, filter)
    }, [interventi]);

// Filter state
    const [filter, setFilter] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const handleChangeFilter = ({ target }) => {
        setFilter(prev => prev = target.value);
        setMaxReducedNumber(10);
    }

    useEffect( _ => {

        if (timeoutId) clearTimeout(timeoutId);

        const id = setTimeout(() => {
            dispatch(fetchData({ maxReducedNumber, filter }));
        }, 250); 
        setTimeoutId(id);

    }, [filter, maxReducedNumber])

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
                    interventi.length === 0 || interventi.length === undefined
                    ? <h2 className={styles.NotFound}>Nessun intervento trovato</h2>
                    : reducedData.map((intervento, index) => (
                        index < maxReducedNumber
                        ? <PreviewIntervento key={index} intervento={intervento} error={false}/>
                        : null
                    ))
                }
            </div>
            {   isReduced 
                ? <button className={styles.AddReducedData} name='Mostra' onClick={handleClickAddMaxReducedNumber}>{ `Mostra di più (${totalInterventi - reducedData.length} ancora da mostrare)` }</button> 
                : null }

            <StatusBox boxStatus={requestStatus}/>
        </div>
    );
}