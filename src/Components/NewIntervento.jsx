import { useState, useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
//Store
import { useDispatch, useSelector } from "react-redux"
import { addData } from "../Store/Slices/interventiSlice"
//Styles
import styles from '../Styles/NewIntervento.module.css'

export const NewIntervento = _ => {
    const navigate = useNavigate()

    const dispatch = useDispatch();
    const interventi = useSelector(state => state.interventi);
    const requestState = useSelector(state => state.interventi.requests);

    useEffect(_ => console.log(requestState), [requestState]);

    // Con new Set rimuovo i duplicati e rimuovo null se presenti
    const clienti = [...new Set(interventi.all.map(i => i.clientName))];
    const autori = [...new Set(interventi.all.map(i => i.author))];

    const [ newIntervento, setNewIntervento ] = useState({
        clientName: '',
        author: '',
        description: '',
        data: [],
        status: 'In Attesa'
    }) 

    const statusColor = newIntervento.status === 'In Corso' ? 'hsla(44, 100%, 50%, 0.65)' : 
                        newIntervento.status === 'Completato' ? 'hsla(131, 100%, 50%, 0.400)' : 
                        newIntervento.status === 'Annullato' ? 'hsla(0, 100%, 50%, 0.60)' : 'hsla(0, 2%, 70%, 0.60)';
    
    const handleChangeProperty = (event) => {
        const { name, value } = event.target;
        setNewIntervento(prev => ({
            ...prev, 
            [name]: value
        }))
    };

    //useEffect((() => console.log(newIntervento)), [newIntervento]);

    const handleClickChangeStatus = _ => {
        const statuses = ['In Corso', 'Completato', 'Annullato', 'In Attesa'];
        const currentIndex = statuses.indexOf(newIntervento.status);
        const nextIndex = (currentIndex + 1) % statuses.length; //Current + 1 Mod Length
        setNewIntervento(prev => ({
            ...prev,
            status: statuses[nextIndex]
        }));
    }

    const handleAddNewData = _ => {
        setNewIntervento(prev => ({
            ...prev,
            data: [...prev.data, { date: '', workingHours: 0, travelHours: 0, km: 0}]
        }))
    }

    const handleChangeDate = (event, index) => {
        const { value, name } = event.target;
        
        if (name === 'date' || name === 'workingHours' || name === 'travelHours' || name === 'km') {
            setNewIntervento(prev => {
                const updatedData = [...prev.data];
                updatedData[index] = {
                    ...updatedData[index],
                    [name]: value
                };
                return {
                    ...prev,
                    data: updatedData
                };
            });
        } else {
            setNewIntervento(prev => ({
                ...prev,
                [name]: value // aggiorna direttamente la chiave corrispondente
            }));
        }
    };

    const handleCheckDelete = (event, index) => {
        setNewIntervento(prev => {
            const updatedData = prev.data.filter((_, i) => i !== index);
            return {
                ...prev,
                data: updatedData
            };
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(addData(event.target));
    }

    //ErrorHandling
    useEffect(_ => {
        requestState.add.error ? setTimeout(_=>navigate('/'), 2000) : null
    }, [requestState.add.error])

    return (
        <>
            <form className={styles.DataContainer} onSubmit={handleSubmit}>
            
                    <div className={styles.TitleInputContainer}>
                        <h1>
                            Cliente: 
                        </h1>
                        <input
                            name="clientName"
                            className={styles.MainInput}
                            maxLength={20}
                            value={newIntervento.name}
                            onChange={handleChangeProperty}
                            list="clienti"
                            required
                        />
                        <datalist id="clienti">
                        {
                            clienti.map(cliente => (
                                <option key={cliente} value={cliente} />
                            ))
                        }
                        </datalist>
                    </div>

                    <div className={styles.TitleInputContainer}>
                        <h1>
                            Autore:
                        </h1>
                        <input name="author" className={styles.MainInput} maxLength={20} value={newIntervento.author} onChange={handleChangeProperty} list="author"  required />
                        <datalist id="author">
                        {
                            autori.map(autore => (
                                <option key={autore} id={autore}>{autore}</option>
                            ))
                                    
                        }
                        </datalist>
                    </div>
                
                    <hr />
                
                    <div className={styles.TitleParagraphContainer}>
                        <h3>
                            Descrizione:
                        </h3>
                        <textarea name="description" className={styles.MainInput} maxLength={150} value={newIntervento.description} onChange={handleChangeProperty} required />
                    </div>
            
        
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Working Hours</th>
                            <th>Travel Hours</th>
                            <th>Km</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {newIntervento.data.map((item, index) => (
                            <tr key={index}>
                                <td><input type="date" name="date" value={item.date} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} required/></td>
                                <td><input type="number" name="workingHours" value={item.workingHours} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} required/></td>
                                <td><input type="number" name="travelHours" value={item.travelHours} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} /></td>
                                <td><input type="number" name="km" value={item.km} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} /></td>
                                <td onClick={(e) => handleCheckDelete(e, index)}>
                                    <div className={styles.DeleteButtonContainer}>
                                        <img src="/Images/Delete.svg" className={styles.DeleteButton} alt="Delete" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td  onClick={handleAddNewData} >
                                <img src="/Images/Add.svg" alt="AddNewLine" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" className={styles.StatusButton} style={{backgroundColor: statusColor}} onClick={handleClickChangeStatus}>Status: {newIntervento.status}</button>
                <button type="submit">Invia</button>
            </form>
            <div className={styles.InfoBox}>
                {
                    requestState.add?.error 
                    ? <h3>Error</h3>
                    : requestState.add?.pending 
                    ? <h3>Pending</h3> 
                    : requestState.add?.fulfilled 
                    ? <h3>Fulfilled</h3>
                    : <h4>No operation</h4>
                }
            </div>
        </>
    )
}