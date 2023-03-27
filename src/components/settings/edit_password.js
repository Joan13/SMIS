import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { http } from '../../global_vars';
import sha1 from 'sha1';

const EditPassword = () => {
    const [old_password, setOld_password] = useState("");
    const [new_password, setNew_password] = useState("");
    const [see_pass, setSee_pass] = useState(false);
    const [see_pass2, setSee_pass2] = useState(false);
    const url_server = useSelector(state => state.url_server);
    const user_data = useSelector(state => state.user_data);

    const change_password = () => {
        if (old_password !== "" && new_password !== "") {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_worker_info.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    worker_id: user_data.worker_id,
                    page_index: 1,
                    password: new_password,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    alert("Le mot de passe a été modifié avec succès");
                })
                .catch((error) => { });
        } else {
            alert("Tous les champs sont obligatoires avant la validation");
        }
    };

    const can_proceed = () => {
        if (sha1(old_password) === user_data.user_password && (new_password).length >= 6) {
            return true;
        }

        return false;
    };

    return (
        <div>
            <h3>Changer le mot de passe du compte</h3><br /><br />

            <label>Ancien mot de passe</label><br />
            {see_pass ?
                <div className="input-div-border-icon" style={{ width: '40%' }}>
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
                            style={{ width: '10%' }}
                            onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                            className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                        :
                        <button
                            style={{ width: '10%' }}
                            onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                            className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                </div>
                :
                <div className="input-div-border-icon" style={{ width: '40%' }}>
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
                            style={{ width: '10%' }}
                            onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                            className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                        :
                        <button
                            style={{ width: '10%' }}
                            onClick={() => see_pass ? setSee_pass(false) : setSee_pass(true)}
                            className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                </div>}<br />



            <label>Nouveau mot de passe</label><br />
            {see_pass2 ?
                <div className="input-div-border-icon" style={{ width: '40%' }}>
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
                            style={{ width: '10%' }}
                            onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                            className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                        :
                        <button
                            style={{ width: '10%' }}
                            onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                            className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                </div>
                :
                <div className="input-div-border-icon" style={{ width: '40%' }}>
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
                            style={{ width: '10%' }}
                            onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                            className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                        :
                        <button
                            style={{ width: '10%' }}
                            onClick={() => see_pass2 ? setSee_pass2(false) : setSee_pass2(true)}
                            className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                </div>}

            {can_proceed() ?
                <button
                    onClick={change_password}
                    style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                    Valider le changement
                </button>
                :
                <button style={{ color: 'white', backgroundColor: 'gray', border: 'none', borderRadius: 5, cursor: 'not-allowed' }} className="button-default">
                    Valider le changement
                </button>}
        </div>
    )
}

export default EditPassword;
