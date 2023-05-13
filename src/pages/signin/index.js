import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaServer, FaUser } from 'react-icons/fa';
import { FiCheckSquare, FiSquare, FiX } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import vector from "./../../../src/assets/8401.jpg"
import logo from "./../../../src/assets/logo.PNG"
// import modalView from '../../includes/modal';
import { CircularProgress, LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http, online, url_online, year } from '../../global_vars';
import ButtonNormal from '../../components/includes/button_normal';
import JSONPackageFile from './../../../package.json';

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user_data = useSelector(state => state.user_data);
    const url = useSelector(state => state.url_server);
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
            setMessage_user("Identification de l'utilisateur en cours...");

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
                            setMessage_user("Récupération et compression des données...");
                        }, 1000);

                        setTimeout(() => {
                            setMessage_user("Initialisation de session...");
                            setMessage1("Compression des données de l'utilisateur...");
                        }, 3000);

                        setTimeout(() => {
                            setRedirectToReferrer(true);
                        }, 4500);

                    } else {
                        setEmpty_error(false);
                        setIncorrect(true);
                        setIs_loading(false);
                        setMessage_user("Echec lors de l'identification de l'utilisateur...");
                    }
                })
                .catch((error) => {
                    setEmpty_error(false);
                    setIncorrect(false);
                    setIs_loading(false);
                    dispatch({
                        type: "SET_MODAL_VIEW",
                        payload: {
                            modal_title: "Erreur de connexion",
                            modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                            modal_view: true,
                        }
                    });
                });
        }
    };

    useEffect(() => {
        console.log(user_data)
    }, []);


    // if(user_data.length !== 0) {

    //     const promise = new Promise((resolve, reject) => {
    //         sessionStorage.setItem("yambi_smis_url_server", url);
    //                     sessionStorage.setItem("assemble_user_data", JSON.stringify(user_data));
    //                     dispatch({ type: "SET_USER_CONNECTED", payload: user_data });
    //                     dispatch({ type: "SET_URL_SERVER", payload: url });

    //                     resolve();
    //     })

    //     promise.finally(()=>{
    //         return (<Navigate to={'/'} />);
    //     });

    // } else 
    if ((redirectToReferrer && sessionStorage.getItem('assemble_user_data'))) {
        return (<Navigate to={'/'} />);
    } else {
        return (
            <div className="bg-background-100 rounded-xl draggg">
                <div className="bgimagesignin rounded-xl">
                    <section className='bg-transparent-50 rounded-xl backdrop-blur-md min-h-screen flex items-center justify-center backdropfilter'>

                        <div className="bg-background-50 flex rounded-2xl shadow-lg max-w-3xlg p-5">
                            <div className='md:w-1/2 px-16'>
                                <div className='block mt-10 2xl:hidden xl:hidden lg:hidden md:hidden w-full place-items-center bg-background-100 py-8 rounded-xl'>
                                    <img className='rounded-2xl w-40 mx-auto' src={logo} alt='vector' />
                                </div>
                                <h2 className="font-bold text-2xl text-text-100 mt-10 mb-10">Connectez-vous</h2>

                                {/* <div style={{ marginBottom: 40 }}>
                        <span onClick={() => setConnection_type(0)} className="header-signin" style={{ fontWeight: connection_type === 0 ? 'bold' : '450' }}>Principal</span>
                        <span onClick={() => setConnection_type(1)} className="header-signin" style={{ fontWeight: connection_type === 1 ? 'bold' : '450' }}>Parent (élève)</span>
                    </div> */}

                                <div className='flex flex-col gap-4 border-b border-gray-50 mb-5 pb-5'>
                                    {!online ?
                                        <div className='nodrag flex items-center bg-background-100 w-full align-center p-3 pl-5 rounded-xl border border-gray-50'>
                                            <FaServer className='text-gray-100' />
                                            <input
                                                placeholder="URL de connexion au serveur"
                                                className="w-full h-full ml-5 outline-none"
                                                value={url_server}
                                                onChange={(text) => setUrl_erver(text.target.value)} />
                                        </div>
                                        : null}

                                    <div className="nodrag flex items-center bg-background-100 w-full align-center p-3  pl-5 rounded-xl border border-gray-50">
                                        <FaUser className='text-gray-100' />
                                        <input
                                            placeholder="Nom d'utilisateur"
                                            style={{ width: '85%', marginLeft: 10 }}
                                            className="w-full h-full ml-5 outline-none"
                                            value={username}
                                            onChange={(text) => setUsername(text.target.value)} />
                                    </div>

                                    <div className="nodrag flex items-center bg-background-100 w-full align-center p-3  pl-5 rounded-xl border border-gray-50">
                                        <FaLock className='text-gray-100' />

                                        <input
                                            placeholder="Mot de passe"
                                            style={{
                                                // fontSize: !see_pass && password !== "" ? 20 : 13,
                                                // height: !see_pass && password !== "" ? '' : 25,
                                                // letterSpacing: !see_pass && password !== "" ? 1 : null,
                                            }}
                                            className="w-full h-full ml-5 outline-none"
                                            type={see_pass ? "text" : "password"}
                                            value={password}
                                            onChange={(text) => setPassword(text.target.value)} />

                                        <button
                                            style={{ width: '10%' }}
                                            onClick={() => setSee_pass(!see_pass)}
                                            className="no-decoration">
                                            {see_pass ?
                                                <FaEye className='text-text-100' />
                                                :
                                                <FaEyeSlash className='text-text-100' />}
                                        </button>

                                    </div>

                                    <div className='cursor-pointer nodrag flex items-center' onClick={() => setSave_session(!save_session)}>
                                        <div>
                                            {save_session ?
                                                <FiCheckSquare size={17} style={{ color: 'rgb(0,80,180)' }} />
                                                :
                                                <FiSquare size={17} style={{ color: 'gray' }} />}
                                        </div>
                                        <span style={{ marginLeft: 10, }}>Garder ma session active</span>
                                    </div>
                                    <br />

                                    {message1 !== "" ?
                                        <><span className='w-80 flex items-center text-success  truncate ...'>
                                            <FaCheckCircle color="green" size={11} className='mr-3' />
                                            {message1}
                                        </span><br /></> : null}

                                    {message2 !== "" ?
                                        <><div className='w-80 flex items-center text-success truncate ...'>
                                            <FaCheckCircle color="green" size={11} className='mr-3' />
                                            {message2}
                                        </div><br /><br /></> : null}

                                    {is_loading ?
                                        <div className='text-gray-100 w-full truncate ... '>
                                            <LinearProgress /><br />
                                            <span>{message_user}</span><br /><br />
                                        </div> : null}

                                    {empty_error ?
                                        <div className='flex items-center text-error'>Tous les champs sont obligatoires</div>
                                        :
                                        null}

                                    {incorrect ?
                                        <div className='flex items-center text-error'>Coordonées invalides. Réessayez.</div>
                                        :
                                        null}


                                    {!is_loading ?
                                        <>
                                            {/* <ButtonNormal text="Connexion" style={{ width: '100%' }} onPress={() => signin()} /> */}

                                            <button onClick={() => signin()} className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                                                    Connexion
                                                </button>
                                            <div style={{ marginTop: 10, textAlign: 'right', fontSize: 15 }}>Besoin d'aide ?
                                                <span
                                                    style={{ color: 'rgba(0, 80, 180)' }} className="pointer"> Cliquez ici.
                                                </span>
                                            </div>
                                        </>
                                        : null}
                                </div>
                                <div><span style={{ color: 'rgba(0, 80, 180)' }}> </span> Tous droits réservés © <br /> Agisha Migani Joan - Yambi, Inc. {year}</div>
                            </div>

                            <div className='md:block hidden w-1/2'>
                                <img className='rounded-2xl' src={vector} alt='vector' />
                            </div>
                        </div>
                    </section>
                </div>
                {JSONPackageFile.platform === "Desktop" ?
                    <div className="bg-transparent-50 fixed top-2 right-2 rounded-xl  border border-gray-50 shadow-sm">
                        <button onClick={() => {
                            const { ipcRenderer } = window.require("electron");
                            const ipc = ipcRenderer;
                            ipc.send('closeApp');}}
                            className='nodrag p-3 pl-5 pr-5 flex items-center justify-center bg-background-100 active:scale-100 duration-300 rounded-xl text-text-100 hover:text-text-20 hover:bg-error'>
                            <div className='mr-2 bg-errror text-background-100 rounded-full p-1'>
                                <FiX />
                            </div>
                            Fermer
                        </button>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Signin;