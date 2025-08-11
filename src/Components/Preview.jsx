import { useState, useEffect } from 'react';
//Store
import { setFilteredData } from '../Store/Slices/interventiSlice.js';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { SectionPreviewInterventi } from './SectionPreviewInterventi.jsx';
import { SectionPreviewCreateIntervento } from './SectionPreviewCreateIntervento.jsx';
//Styles
import styles from '../Styles/Preview.module.css';

export const Preview = _ => {

    // Store setup
    const dispatch = useDispatch();
    const interventi = useSelector((state) => state.interventi);
    const { isLoading, errorLoading } = interventi; // Per ora non servono, ma utili con richieste API

    // Filter state
    const [filter, setFilter] = useState('');
    const handleChangeFilter = ({ target }) => {
        setFilter(prev => prev = target.value)
    }

    // Dispatch change filter
    useEffect( _ => {
    dispatch(setFilteredData(filter));
    }, [filter])

    return (
        <>
        <div className={styles.UtilitiesContainer}>
            <input className={styles.Filtro} type='text' name='Filtro' placeholder='Filtro Interventi' onChange={handleChangeFilter} value={filter} />
        </div>
        <div className={styles.PreviewContainer}>
            <div>
                <SectionPreviewInterventi interventi={interventi.filteredData}/>
            </div>
            <div>
                <SectionPreviewCreateIntervento />
            </div>
        </div>
        </>
    )
}