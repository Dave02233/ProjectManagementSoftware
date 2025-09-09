import { useEffect, useState } from "react";
//Functions
import { checkMultipleTruth } from "../../Functions/checkMultipleTruth";
//Styles
import styles from '../../Styles/SingleItems/StatusBox.module.css';

export const StatusBox = ({ boxStatus }) => {
    const dataCheckFailed = !boxStatus || boxStatus.pending === undefined || boxStatus.fulfilled === undefined || boxStatus.error === undefined;
    if(dataCheckFailed) return <h3>Status Data Error</h3>

    const { pending, fulfilled, error } = boxStatus;
    const [ visibility, setVisibility] = useState(false)

    const [ color, setColor ] = useState('linear-gradient(270deg, red, orange)');

    useEffect(_=>{
        let timeout = undefined;
        const statusCheck = checkMultipleTruth([pending, fulfilled, error]);

        if (statusCheck) {
            setVisibility(true);       
            timeout = setTimeout(_=>{
                setVisibility(false)
            }, 5000)
        }  

        if (pending) {
            setColor('linear-gradient(270deg, orange, var(--primary-darkest))');
        } else if (fulfilled) {
            setColor('linear-gradient(270deg, green, var(--primary-darkest))');
        } else if (error) {
            setColor('linear-gradient(270deg, red, var(--primary-darkest))');
        } else {
            setColor('linear-gradient(270deg, purple, var(--primary-darkest))');
        }

        return _ => timeout ? clearTimeout(timeout) : null

    }, [pending, fulfilled, error]);

    return (
        <div className={`${styles.MainContainer} ${visibility ? styles.Visible : styles.NotVisible}`}>
            <div className={styles.StatusTextContainer}>
                <h4>Request Status</h4>
                <p>{
                    pending
                    ? 'Action in progress'
                    : fulfilled
                    ? 'Action completed successfully'
                    : error
                    ? 'Action aborted, general error'   
                    : 'unknown'                 
                }</p>
            </div>
            <div className={styles.ProgressBar} style={{
                backgroundImage: color
            }}/>   
        </div>

    )
}