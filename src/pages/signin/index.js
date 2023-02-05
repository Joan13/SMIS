import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaServer, FaUser } from 'react-icons/fa';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import logo from "./../../../src/assets/yambi_red.png"
// import modalView from '../../includes/modal';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http, online, url_online, year } from '../../global_vars';
import ButtonNormal from '../../components/includes/button_normal';

const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [url_server, setUrl_erver] = useState(url_online);
    const [connection_type, setConnection_type] = useState(0);
    const [is_loading, setIs_loading] = useState(false);
    const [empty_error, setEmpty_error] = useState(false);
    const [see_pass, setSee_pass] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [aide, setAide] = useState(false);
    const [message_user, setMessage_user] = useState("");
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [save_session, setSave_session] = useState(true);
    const data_session = useSelector(state => state.data_session);
    const dispatch = useDispatch();

    const signin = () => {

        if (username === "" || password === "" || url_server === "") {
            setEmpty_error(true);
        } else {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/signin.php";
            setEmpty_error(false);
            setIncorrect(false);
            setIs_loading(true);
            setMessage_user("Identification d'utilisateur en cours...");

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    connection_type: connection_type
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success === "1") {

                        sessionStorage.setItem("yambi_smis_url_server", url_server);
                        sessionStorage.setItem("assemble_user_data", JSON.stringify(response.user_data));

                        dispatch({ type: "SET_USER_CONNECTED", payload: response.user_data });
                        if (save_session) {
                            dispatch({ type: "SET_DATA_SESSION", payload: response.data_session });
                        }
                        dispatch({ type: "SET_URL_SERVER", payload: url_server });

                        setTimeout(() => {
                            setMessage_user("Récupération et compression des données d'utilisateur...");
                        }, 1000);

                        setTimeout(() => {
                            setMessage_user("Initialisation de session...");
                            setMessage1("Compression des données d'utilisateur...");
                        }, 3000);

                        setTimeout(() => {
                            setRedirectToReferrer(true);
                        }, 4500);

                    } else {
                        setEmpty_error(false);
                        setIncorrect(true);
                        setIs_loading(false);
                        setMessage_user("Echec lors de l'identification d'utilisateur...");
                    }
                })
                .catch((error) => {
                    dispatch({
                        type: "SET_MODAL_INFO",
                        payload: {
                            modal_title: "Information erreur",
                            modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                            modal_view: true,
                            is_loading: false,
                        }
                    });
                });
        }
    };

    useEffect(() => {
        console.log(data_session)
    }, []);

    if ((redirectToReferrer && sessionStorage.getItem('assemble_user_data'))) {
        return (<Navigate to={'/'} />);
    } else {
        return (
            <div style={{ marginTop: 40 }}>
                <div style={{ textAlign: 'center' }}>
                    <img src={logo} width='200' height="130" /><br /><br />
                    <div className="title-big">School Managment Information System</div><br />

                    <div style={{ marginBottom: 40 }}>
                        <span onClick={() => setConnection_type(0)} className="header-signin" style={{ fontWeight: connection_type === 0 ? 'bold' : '450' }}>Principal</span>
                        <span onClick={() => setConnection_type(1)} className="header-signin" style={{ fontWeight: connection_type === 1 ? 'bold' : '450' }}>Parent (élève)</span>
                    </div>

                    <div style={{ textAlign: 'left', width: '25%', marginLeft: '37%' }}>
                        Connectez-vous<br />

                        {!online ?
                            <div className="input-div-border-icon">
                                <FaServer style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="URL de connexion au serveur"
                                    style={{ width: '85%', marginLeft: 10 }}
                                    className="input"
                                    value={url_server}
                                    onChange={(text) => setUrl_erver(text.target.value)} />
                            </div>
                            : null}

                        <div className="input-div-border-icon">
                            <FaUser style={{ marginBottom: -3 }} />
                            <input
                                placeholder="Nom d'utilisateur"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                value={username}
                                onChange={(text) => setUsername(text.target.value)} />
                        </div>

                        <div className="input-div-border-icon">
                            <FaLock style={{ marginBottom: -3 }} />

                            <input
                                placeholder="Mot de passe"
                                style={{ width: '77%', marginLeft: 10 }}
                                className="input"
                                type={see_pass ? "text" : "password"}
                                value={password}
                                onChange={(text) => setPassword(text.target.value)} />

                            <button
                                style={{ width: '10%' }}
                                onClick={() => setSee_pass(!see_pass)}
                                className="no-decoration">
                                {see_pass ?
                                    <FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} />
                                    :
                                    <FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} />}
                            </button>

                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div style={{ cursor: 'pointer' }} onClick={() => setSave_session(!save_session)}>
                                {save_session ?
                                    <FiCheckSquare size={17} style={{ color: 'rgb(0,80,180)' }} />
                                    :
                                    <FiSquare size={17} style={{ color: 'gray' }} />}
                            </div>
                            <span style={{ marginLeft: 10, }}>Garder ma session active</span>
                        </div>
                        <br />

                        {message1 !== "" ?
                            <><span style={{ color: 'green', marginBottom: 15, height: 30 }}>
                                <FaCheckCircle color="green" size={11} style={{ marginRight: 5 }} />
                                {message1}
                            </span><br /></> : null}

                        {message2 !== "" ?
                            <><span style={{ color: 'green', marginBottom: 5 }}>
                                <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                {message2}
                            </span><br /><br /></> : null}

                        {is_loading ?
                            <div style={{ textAlign: 'center', marginTop:12 }}>
                                <LinearProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                                <span>{message_user}</span><br /><br />
                            </div> : null}

                        {empty_error ?
                            <div style={{ marginTop: 20, marginBottom: 20, fontWeight: 'bold', alignContent: 'center', color: '#780006' }}>Tous les champs sont obligatoires</div>
                            :
                            null}

                        {incorrect ?
                            <div style={{ marginTop: 20, marginBottom: 20, fontWeight: 'bold', alignContent: 'center', color: '#780006' }}>Coordonées invalides. Réessayez.</div>
                            :
                            null}


                        {!is_loading ?
                            <>
                                <ButtonNormal text="Connexion" style={{ width: '100%' }} onPress={() => signin()} />
                                <div style={{ marginTop: 10, textAlign: 'right', fontSize: 15 }}>Besoin d'aide ?
                                    <span onClick={() => { }}
                                        style={{ color: 'rgba(0, 80, 180)' }} className="pointer"> Cliquez ici.
                                    </span>
                                </div>
                            </>
                            : null}

                        {aide ?
                            <div className="box-border">
                                <div>
                                    Pour les utilisateurs principaux, qui sont les membres directs de l'administration de l'école, leurs noms d'utilisateur se classent de cette manière :<br />
                                    <span className="spann">
                                        - Pour la section Promoteur / Recteur / Préfet :
                                        <strong> principal@yambi.class</strong>
                                    </span><br />
                                    <span className="spann">
                                        - Pour la section Directeur des Études / Proviseur :
                                        <strong> etudes@yambi.class</strong>
                                    </span><br />
                                    <span className="spann">
                                        - Pour la section Directeur de discipline :
                                        <strong> discipline@yambi.class</strong>
                                    </span><br />
                                    <span className="spann">
                                        - Pour la section Directeur des Finances :
                                        <strong> finances@yambi.class</strong>
                                    </span><br />
                                    <span className="spann">
                                        - Pour la section Secrétaire :
                                        <strong> secretaire@yambi.class</strong>
                                    </span><br />
                                    <span className="spann">
                                        - Pour la section Caisse :
                                        <strong> caisse@yambi.class</strong>
                                    </span><br /><br />

                                    Pour les enseignants, leurs noms d'utilisateur leur seront donnés par l'administrateur de leurs comptes, soit le Directeur des études ou le sécrétaire en charge de cette tâche.<br /><br />
                                    Chaque élève possède un identifiant unique qui pourrait lui servir pour se connecter et se rendre compte de sa situation scolaire ou financière sans pour autant s'adresser à l'administration.
                                </div>
                            </div>
                            : null}



                    </div>
                    <div style={{ marginTop: 100 }}><span style={{ color: 'rgba(0, 80, 180)' }}> Contact -</span> Tous droits réservés © Agisha Migani Joan - Yambi, Inc. {year}</div>
                </div><br /><br />

                {/* {this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                        </div>
                    </div> : null} */}
            </div>
        )
    }
}

export default Signin;