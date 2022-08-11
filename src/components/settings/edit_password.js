import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

export default function EditPassword() {
    const [old_password, setOld_password] = useState("");
    const [new_password, setNew_password] = useState("");
    const [see_pass,setSee_pass] = useState(false);
    const [see_pass2,setSee_pass2] = useState(false);

    return(
        <div>
            <h3>Changer le mot de passe du compte</h3><br/><br/>

<label>Ancien mot de passe</label><br/>
            {see_pass ?
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Ancien mot de passe"
                                    style={{ width: '80%', marginLeft: 10 }}
                                    className="input"
                                    type="text"
                                    value={old_password}
                                    onChange={(text) => setOld_password(text.target.value)} />
                                {see_pass ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>
                            :
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Ancien mot de passe"
                                    style={{ width: '80%', marginLeft: 10 }}
                                    className="input"
                                    type="password"
                                    value={old_password}
                                    onChange={(text) => setOld_password(text.target.value)} />
                                {see_pass ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>}<br />



<label>Nouveau mot de passe</label><br/>
            {see_pass2 ?
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Nouveau mot de passe"
                                    style={{ width: '80%', marginLeft: 10 }}
                                    className="input"
                                    type="text"
                                    value={new_password}
                                    onChange={(text) => setNew_password(text.target.value)} />
                                {see_pass2 ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>
                            :
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Nouveau mot de passe"
                                    style={{ width: '80%', marginLeft: 10 }}
                                    className="input"
                                    type="password"
                                    value={new_password}
                                    onChange={(text) => setNew_password(text.target.value)} />
                                {see_pass2 ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>}

                            <button style={{color:'white',backgroundColor:'rgb(0, 80,180)',border:'none',borderRadius:5,cursor:'pointer'}}  className="button-default">
                                Valider le changement
                            </button>
        </div>
    )
}