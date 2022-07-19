import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

export default function EditPassword() {
    const [old_password, setOld_password] = useState("");
    const [new_password, setNew_password] = useState("");
    const [see_pass,setSee_pass] = useState(false);

    return(
        <div>
            <h3>Changer votre mot de passe</h3>

            {see_pass ?
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Ancien mot de passe"
                                    style={{ width: '75%', marginLeft: 10 }}
                                    className="input"
                                    type="text"
                                    value={old_password}
                                    onChange={(text) => setOld_password(text.target.value)} />
                                {see_pass ?
                                    <button
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>
                            :
                            <div className="input-div-border-icon" style={{width:'40%'}}>
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Ancien mot de passe"
                                    style={{ width: '75%', marginLeft: 10 }}
                                    className="input"
                                    type="password"
                                    value={old_password}
                                    onChange={(text) => setOld_password(text.target.value)} />
                                {see_pass ?
                                    <button
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                        onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>}<br />
        </div>
    )
}