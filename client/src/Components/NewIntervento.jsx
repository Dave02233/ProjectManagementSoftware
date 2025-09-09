import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
//Store
import { useDispatch, useSelector } from "react-redux"
import { addData, generateAutoCompleteData } from "../Store/Slices/interventiSlice"
//Styles
import styles from '../Styles/NewIntervento.module.css'
//Components
import { StatusBox } from "./SingleItems/StatusBox"
import { SimpleChart } from "./Charts/SimpleChart"

export const NewIntervento = _ => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const interventi = useSelector(state => state.interventi);
    const requestState = interventi.requests;
    const { clientsNames, authors } = interventi;

    useEffect(_ => {
        dispatch(generateAutoCompleteData());
    }, []);

    // Con new Set rimuovo i duplicati e rimuovo null se presenti    
    // const clienti = [...new Set(interventi.all.map(i => i.clientName))];
    // const autori = [...new Set(interventi.all.map(i => i.author))];
    
    const [ newIntervento, setNewIntervento ] = useState({
        clientName: '',
        author: '',
        description: '',
        data: [{
            date: new Date().toISOString().split('T')[0],
            workingHours: 8,
            travelHours: 2,
            km: 50
        }],
        status: 'In Corso'
    }) 

    const statusColor = newIntervento.status === 'In Corso' ? 'hsla(36, 100%, 50%, 1.0)' : 
                        newIntervento.status === 'Completato' ? 'hsla(131, 100%, 50%, 0.600)' : 
                        newIntervento.status === 'In Sospeso' ? 'hsla(0, 100%, 50%, 0.80)' : 'hsla(0, 2%, 70%, 0.60)';
    
    const handleChangeProperty = (event) => {
        const { name, value } = event.target;
        setNewIntervento(prev => ({
            ...prev, 
            [name]: value
        }))
    };

    const handleClickChangeStatus = _ => {
        const statuses = ['In Corso', 'Completato', 'In Sospeso'];
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

    //Form
    const handleSubmit = event => {
        event.preventDefault();
        dispatch(addData(newIntervento));
    }

    /*ErrorHandling
    useEffect(_ => {
        requestState.add.error ? setTimeout(_=>navigate('/'), 2000) : null
    }, [requestState.add.error])
    */
   
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
                            value={newIntervento.clientName}
                            onChange={handleChangeProperty}
                            list="clienti"
                            required
                        />
                        <datalist id="clienti">
                        {
                            clientsNames.map(cliente => (
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
                            authors.map(autore => (
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
                <SimpleChart intervento={newIntervento.data} />
                <button type="submit" className={styles.SubmitButton}>Invia</button>
            </form>
      
            <StatusBox boxStatus={requestState.add}/>
        </>
    )
}