import { useState, useEffect } from 'react';
// Components
import { PreviewIntervento } from './PreviewIntervento.jsx';

export const SectionPreviewInterventi = ({ interventi }) => {

    // Preview component for a small section
    const [reducedData, setReducedData] = useState(interventi);
    const [isReduced, setIsReduced] = useState(false);

    useEffect(() => {
        setReducedData(interventi.slice(0, 5));
        interventi.length > 5 ? setIsReduced(true) : setIsReduced(false);
    }, [interventi]);

    return(
        <>
            {
                interventi.length === 0
                ? <h2>Nessun intervento trovato</h2>
                : reducedData.map((intervento, index) => (
                    <PreviewIntervento key={index} intervento={intervento} isLoading={false} error={false}/>))
            }
            { isReduced ? <h2>...</h2> : null }
        </>
    );
}