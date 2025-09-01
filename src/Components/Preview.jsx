// Components
import { SectionPreviewInterventi } from './SectionPreviewInterventi.jsx';
import { SectionPreviewCreateIntervento } from './SectionPreviewCreateIntervento.jsx';
//Styles
import styles from '../Styles/Preview.module.css';

export const Preview = _ => {

    return (
        <>
            <div className={styles.PreviewContainer}>
                <SectionPreviewCreateIntervento />
                <SectionPreviewInterventi />            
            </div>
        </>
    )
}