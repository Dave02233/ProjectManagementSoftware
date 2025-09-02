import { useState, useEffect } from "react"
//Store
import { useSelector } from "react-redux"
//Styles
import styles from '../Styles/NewIntervento.module.css'

export const NewIntervento = _ => {

    const interventi = useSelector(state => state.interventi);
    const clienti = interventi.all.map(i => i.name);
    const autori = interventi.all.map(i => i.author);

    const [ newIntervento, setNewIntervento ] = useState({
        name: '',
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

    useEffect((() => console.log(newIntervento)), [newIntervento]);

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



    return (
        <div className={styles.DataContainer}>
         
                <div className={styles.TitleInputContainer}>
                    <h1>
                        Cliente: 
                    </h1>
                    <input
                        name="name"
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
                        autori.map(autori => {
                            autori.include()
                        })
                                  
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
                            <td><input type="date" name="date" value={item.date} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} /></td>
                            <td><input type="number" name="workingHours" value={item.workingHours} className={styles.TableInput} onChange={(e) => handleChangeDate(e, index)} /></td>
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
            <button className={styles.StatusButton} style={{backgroundColor: statusColor}} onClick={handleClickChangeStatus}>Status: {newIntervento.status}</button>
        </div>
    )
}