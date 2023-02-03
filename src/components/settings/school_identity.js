import React, {useState} from 'react';
import { FaCalendar, FaCode, FaUser } from 'react-icons/fa';

export default function BaseSchoolIdentity() {
    const [name_rector, setName_rector] = useState("");
    const [code_school,setCode_school] = useState("");
    const [date_fin, setDate_fin] = useState("");


    return(
        <div>
<h3>Modifier les informations de base de l'école</h3>  <span style={{color:'gray'}}>(À apparaître sur les bulletins)</span><br/>

<label>Le nom complet du Chef de l'établissement</label>
<div className="input-div-border-icon" style={{width:'40%'}}>
                            <FaUser style={{ marginBottom: -3 }} />
                            <input
                                placeholder="Chef de l'établissement"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                value={name_rector}
                                onChange={(text) => setName_rector(text.target.value)} />
                        </div><br/>


<label>Code de l'école</label>
<div className="input-div-border-icon" style={{width:'40%'}}>
                            <FaCode style={{ marginBottom: -3 }} />
                            <input
                                placeholder="code école"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                value={code_school}
                                onChange={(text) => setCode_school(text.target.value)} />
                        </div><br/>

                        <label>Date de proclammation des résultats<br/>
                        <span style={{color:'gray'}}>(Vous pouvez changer de date en fonction de la proclammation si vous le voulez)</span>
                        </label>
<div className="input-div-border-icon" style={{width:'40%'}}>
                            <FaCalendar style={{ marginBottom: -3 }} />
                            <input
                                type="date"
                                style={{ width: '95%', marginLeft: 10 }}
                                className="input"
                                value={date_fin}
                                onChange={(text) => setDate_fin(text.target.value)} />
                        </div>
                        <button style={{color:'white',backgroundColor:'rgb(0, 80,180)',border:'none',borderRadius:5,cursor:'pointer'}}  className="button-default">
                                Valider le changement
                            </button>
                            <br/><br/>
        </div>
    )
}
