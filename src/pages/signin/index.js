import React, { Component } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaServer, FaUser } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import logo from "./../../../src/assets/yambi_red.png"
import modalView from '../../includes/modal';
import { Button, TextField, MenuItem, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { year } from '../../global_vars';
import ButtonNormal from '../../components/includes/button_normal';
// import {ipcRenderer} from 'electron';

class Signin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            see_pass: false,
            is_loading: false,
            empty_error: false,
            incorrect: false,
            redirectToReferrer: false,
            url_server: "cselite.net",
            connection_type: 1,
            aide: false,
            message_user: "",
            message1: "",
            message2: ""
        }

        this.signin = this.signin.bind(this); 
        this.get_general_info = this.get_general_info.bind(this);
    }

    get_general_info(annee) {
        let user = sessionStorage.getItem('assemble_user_data');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        user = JSON.parse(user);

        this.props.dispatch({ type: "SET_USER_CONNECTED", payload: user });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        this.props.dispatch({ type: "SET_CLASS_OPEN", payload: false });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 0 });
        this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: true });
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({ type: "SET_MARKS_TAB", payload: "" });
        this.props.dispatch({ type: "SET_URL_SERVER", payload: url_server });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Chargement des données générales..." });

        this.setState({
            is_loading: true,
            message_user: "Préparation du bureau...", 
            message2: "Initialisation de session"
        });

        if (user.poste === "1") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Promoteur" });
        } else if (user.poste === "2") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Discipline" });
        } else if (user.poste === "3") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Finances" });
        } else if (user.poste === "4") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Secrétaire" });
        } else if (user.poste === "5") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Enseignant" });
        } else if (user.poste === "6") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Caisse" });
        } else if (user.poste === "7") {
            this.props.dispatch({ type: "SET_POSTE", payload: "Directeur des études" });
        } else {
            alert("Cet utilisateur est invalide. Vous devez vous reconnecter pour accéder aux services.");
        }

        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_info_home.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                // this.props.dispatch({ type: "SET_CLASSES", payload: response.classes });
                // this.props.dispatch({ type: "SET_AUTRES", payload: response.autres });
                // this.props.dispatch({ type: "SET_ANNEES", payload: response.annees });
                // this.props.dispatch({ type: "SET_CLASS_NUMBERS", payload: response.class_numbers });
                // this.props.dispatch({ type: "SET_ORDERS", payload: response.orders });
                // this.props.dispatch({ type: "SET_CYCLES", payload: response.cycles });
                // this.props.dispatch({ type: "SET_SECTIONS", payload: response.sections });
                // this.props.dispatch({ type: "SET_OPTIONS", payload: response.options });
                // this.props.dispatch({ type: "SET_ANNEE_SCOLAIRE", payload: response.annee_scolaire });
                // this.props.dispatch({ type: "SET_ANNEE", payload: response.annee });
                // this.props.dispatch({ type: "SET_SCHOOL_NAME", payload: response.school_name });
                // this.props.dispatch({ type: "SET_ATTRIBUTIONS", payload: response.attributions });
                // this.props.dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils });
                // this.props.dispatch({ type: "SET_PPS", payload: response.pupils });
                // this.props.dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count });
                // this.props.dispatch({ type: "SET_PUPILS_COUNT_MALE", payload: response.pupils_count_male });
                // this.props.dispatch({ type: "SET_PUPILS_COUNT_FEMALE", payload: response.pupils_count_female });
                // this.props.dispatch({ type: "SET_SCHOOL_NAME_ABB", payload: response.school_name_abb });
                // this.props.dispatch({ type: "SET_REUSSITES", payload: response.reussites });
                // this.props.dispatch({ type: "SET_DOUBLES", payload: response.doubles });
                // this.props.dispatch({ type: "SET_ECHECS", payload: response.echecs });
                // this.props.dispatch({ type: "SET_ABANDON", payload: response.abandon });
                // this.props.dispatch({ type: "SET_LOADING_HOME", payload: false });
                // this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
                // this.props.dispatch({ type: "SET_MOUNT_HOME", payload: false });
                // this.props.dispatch({ type: "SET_LIBELLES", payload: response.libelles });
                // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire" });

            
                this.props.dispatch({ type: "SET_CLASSES", payload: response.classes });
                this.props.dispatch({ type: "SET_AUTRES", payload: response.autres });
                this.props.dispatch({ type: "SET_ANNEES", payload: response.annees });
                this.props.dispatch({ type: "SET_CLASS_NUMBERS", payload: response.class_numbers });
                this.props.dispatch({ type: "SET_ORDERS", payload: response.orders });
                this.props.dispatch({ type: "SET_CYCLES", payload: response.cycles });
                this.props.dispatch({ type: "SET_SECTIONS", payload: response.sections });
                this.props.dispatch({ type: "SET_OPTIONS", payload: response.options });
                this.props.dispatch({ type: "SET_ANNEE_SCOLAIRE", payload: response.annee_scolaire });
                this.props.dispatch({ type: "SET_ANNEE", payload: response.annee });
                this.props.dispatch({ type: "SET_SCHOOL_NAME", payload: response.school_name });
                this.props.dispatch({ type: "SET_ATTRIBUTIONS", payload: response.attributions });
                this.props.dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count });
                this.props.dispatch({ type: "SET_PUPILS_COUNT_MALE", payload: response.pupils_count_male });
                this.props.dispatch({ type: "SET_PUPILS_COUNT_FEMALE", payload: response.pupils_count_female });
                this.props.dispatch({ type: "SET_SCHOOL_NAME_ABB", payload: response.school_name_abb });
                this.props.dispatch({ type: "SET_REUSSITES", payload: response.reussites });
                this.props.dispatch({ type: "SET_DOUBLES", payload: response.doubles });
                this.props.dispatch({ type: "SET_ECHECS", payload: response.echecs });
                this.props.dispatch({ type: "SET_ABANDON", payload: response.abandon });
                this.props.dispatch({ type: "SET_LOADING_HOME", payload: false });
                this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
                this.props.dispatch({ type: "SET_MOUNT_HOME", payload: false });
                this.props.dispatch({ type: "SET_LIBELLES", payload: response.libelles });
                this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire" });
                this.props.dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils });
                // this.props.dispatch({ type: "SET_PPS", payload: response.pupils });
                this.props.dispatch({ type: "SET_PUPILS_COUNT_PAIEMENTS", payload: response.pupils_count_paiements });
                this.props.dispatch({ type: "SET_MONTANT_TOTAL", payload: response.montant_paye });
                this.props.dispatch({type:"SET_PAIEMENT_CATEGORIES", payload:response.paiement_categories});

                // this.parse_classes(response.classes);

setTimeout(() => {
    this.setState({ redirectToReferrer: true });
                }, 4000);                
            })
            .catch((error) => {

                console.log(error)
                this.props.dispatch({ type: "SET_LOADING_HOME", payload: false });
                this.setState({
                    modal_title: "Information erreur",
                    modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                    modal_view: true,
                    is_loading_home: false,
                    loading_middle: false
                });

                this.props.dispatch({ type: "SET_MOUNT_HOME", payload: true });
            });
    }

    close_application() {
        // const ipcRenderer = require('electron');
        // ipcRenderer.send('close-yambi'); 

        // const { ipcRenderer } = require('electron')

// ipcRenderer.send('close-yambi');
    }

    signin() {

        let username = this.state.username;
        let password = this.state.password;
        let url_server = this.state.url_server;
        let connection_type = this.state.connection_type;

        if (username === "" || password === "" || url_server === "") {
            this.setState({ empty_error: true });
        } else {
            let BaseURL = "http://" + this.state.url_server + "/yambi_class_SMIS/API/signin.php";
            this.setState({ empty_error: false, incorrect: false, is_loading: true, message_user: "Identification d'utilisateur en cours..." });


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

                        sessionStorage.setItem("yambi_smis_url_server", this.state.url_server);
                        sessionStorage.setItem("assemble_user_data", JSON.stringify(response.user_data));

                        setTimeout(() => {
                            this.setState({ message_user: "Récupération et compression des données d'utilisateur..." });
                        }, 3000);

                        setTimeout(() => {
                            this.setState({ message_user: "Initialisation de session...", message1: "Compression des données d'utilisateur" });
                            this.get_general_info("");
                        }, 5000);

                        this.get_general_info("");

                    } else {
                        this.setState({ empty_error: false, incorrect: true, is_loading: false, message_user: "Identification d'utilisateur en cours..." });
                    }
                })
                .catch((error) => {
                    // alert(error.toString());
                    this.setState({
                        modal_title: "Information erreur",
                        modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                        modal_view: true,
                        is_loading: false
                    });
                });
        }
    };
    
    load_class_data(classe) {
        // sessionStorage.setItem("classeYambiSMIS", JSON.stringify(classe));
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: classe});
        // console.log(this.props)


        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id });
        // this.props.dispatch({ type: "SET_CLASS_LOADING", payload: classe.id_classes });
        // this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: true });
        // this.props.dispatch({ type: "SET_LOADING_CLASS", payload: true });
        //         // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });



        // if (this.props.middle_func === 4 || this.props.middle_func === 6) {
        //     // this.setState({ middle_func: 1, allow_right_menu_pupils: false, allow_right_menu: true });
        //     this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
        // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        //     this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/get_class_info.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                cycle_id: classe.cycle,
                class_id: classe.class,
                order_id: classe.order,
                section_id: classe.section,
                option_id: classe.option,
                school_year: classe.school_year,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
        //         // this.props.dispatch({ type: "SET_LOADING_CLASS", payload: false});
        //         // this.props.dispatch({ type: "SET_COURSES", payload: response.courses });
        //         // this.props.dispatch({ type: "SET_AUTRES", payload: response.autres });
        //         // this.props.dispatch({ type: "SET_COURSES_COUNT", payload: response.courses_count });

                // this.setState({can_load_data:false});

                for(let i in this.props.classes) {
if (this.props.classes[i].id_classes === classe.id_classes) {
    this.props.classes[i].data = response;
    // console.log(this.props.classes[i])
}
                }

        // if (this.props.middle_func === 4 || this.props.middle_func === 6 || this.props.middle_func === 11 || this.props.middle_func === 12) {
            // this.setState({ middle_func: 1, allow_right_menu: true, });
            // this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
            // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
            // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        // if (this.props.middle_func === 0 || this.props.middle_func === 6 || this.props.middle_func === 11) {
            // this.setState({ middle_func: 1, allow_right_menu: true, });
        //     this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
        //     this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        //         console.log(this.props)
            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({ can_load_data:false,modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }

    parse_classes(data) {
        setTimeout(() => {
            for(let i in data) {
                this.load_class_data(data[i]);
            }
        }, 3000);
    }

    render() {

        if (this.state.redirectToReferrer && sessionStorage.getItem('assemble_user_data')) {
            return (<Navigate to={'/'} />);
        }
        // else {
        //     return (<Redirect to={'/'}/>);
        // }

        return (
            <div style={{ marginTop: 40 }}>

                <div style={{ textAlign: 'center' }}>
                    <img src={logo} width='200' height="130" /><br /><br />
                    <div className="title-big">School Managment Information System</div><br />

                    <div style={{ marginBottom: 40 }}>
                        {/* {this.state.connection_type === 0 ?
                            <span onClick={() => this.setState({ connection_type: 0 })} className="header-signin" style={{ fontWeight: 'bold' }}>Enseignant</span>
                            :
                            <span onClick={() => this.setState({ connection_type: 0 })} className="header-signin">Enseignant</span>} */}

                        {this.state.connection_type === 0 ?
                            <span onClick={() => this.setState({ connection_type: 0 })} className="header-signin" style={{ fontWeight: 'bold' }}>Principal</span>
                            :
                            <span onClick={() => this.setState({ connection_type: 0 })} className="header-signin">Principal</span>}

                        {this.state.connection_type === 1 ?
                            <span onClick={() => this.setState({ connection_type: 1 })} className="header-signin" style={{ fontWeight: 'bold' }}>Parent (élève)</span>
                            :
                            <span onClick={() => this.setState({ connection_type: 1 })} className="header-signin">Parent (élève)</span>}
                    </div>


                    <div style={{ textAlign: 'left', width: '25%', marginLeft: '37%' }}>
                        Connectez-vous<br />

                        <div className="input-div-border-icon">
                            <FaServer style={{ marginBottom: -3 }} />
                            <input
                                placeholder="URL de connexion au serveur"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                onChange={(text) => this.setState({ url_server: text.target.value })} />
                        </div>

                        <div className="input-div-border-icon">
                            <FaUser style={{ marginBottom: -3 }} />
                            <input
                                placeholder="Nom d'utilisateur"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                onChange={(text) => this.setState({ username: text.target.value })} />
                        </div>

                        {this.state.see_pass ?
                            <div className="input-div-border-icon">
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Mot de passe"
                                    style={{ width: '77%', marginLeft: 10 }}
                                    className="input"
                                    type="text"
                                    value={this.state.password}
                                    onChange={(text) => this.setState({ password: text.target.value })} />
                                {this.state.see_pass ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>
                            :
                            <div className="input-div-border-icon">
                                <FaLock style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="Mot de passe"
                                    style={{ width: '77%', marginLeft: 10 }}
                                    className="input"
                                    type="password"
                                    value={this.state.password}
                                    onChange={(text) => this.setState({ password: text.target.value })} />
                                {this.state.see_pass ?
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                        className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                    :
                                    <button
                                    style={{width:'10%'}}
                                        onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                        className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                            </div>}<br />

                        {this.state.message1 !== "" ?
                            <><span style={{ color: 'green', marginBottom: 15, height: 30 }}>
                                <FaCheckCircle color="green" size={11} style={{ marginRight: 5 }} />
                                {this.state.message1}
                            </span><br /></> : null}

                        {this.state.message2 !== "" ?
                            <><span style={{ color: 'green', marginBottom: 5 }}>
                                <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                {this.state.message2}
                            </span><br /><br /></> : null}

                        {this.state.is_loading ?
                            <div style={{ textAlign: 'center' }}>
                                <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                                <span>{this.state.message_user}</span><br /><br />
                            </div> : null}

                        {this.state.empty_error ?
                            <div style={{ marginTop: 20, marginBottom: 20, fontWeight: 'bold', alignContent: 'center', color: '#780006' }}>Tous les champs sont obligatoires</div>
                            :
                            null}

                        {this.state.incorrect ?
                            <div style={{ marginTop: 20, marginBottom: 20, fontWeight: 'bold', alignContent: 'center', color: '#780006' }}>Coordonées invalides. Réessayez.</div>
                            :
                            null}


                        {!this.state.is_loading ?
                        <>
                            <ButtonNormal text="Connexion"  style={{ width: '100%' }}  onPress={() => this.signin()}/>
                            <div style={{ marginTop: 10, textAlign: 'right', fontSize: 15 }}>Besoin d'aide ? <span onClick={() => this.state.aide ? this.setState({ aide: false }) : this.setState({ aide: true })} style={{ color: 'rgba(0, 80, 180)' }} className="pointer">Cliquez ici.</span></div>
                        </>
                                : null  }

                                {/* <div>
                                <button className="button-primary" style={{ width: '100%', color: 'transparent', backgroundColor: 'transparent', cursor: 'progress' }}>Connexion</button>
                                
                                </div> */}
                            

                        {this.state.aide ?
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

                {this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Signin);