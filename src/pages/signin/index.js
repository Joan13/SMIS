import React, { Component } from 'react';
import { FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaServer, FaUser } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import logo from "./../../../src/assets/yambi_red.png"
import modalView from '../../includes/modal';
import { Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { http, online, url_online, year } from '../../global_vars';
import ButtonNormal from '../../components/includes/button_normal';

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
            url_server: url_online,
            connection_type: 0,
            aide: false,
            message_user: "",
            message1: "",
            message2: ""
        }

        this.signin = this.signin.bind(this);
    }

    signin() {

        let username = this.state.username;
        let password = this.state.password;
        let url_server = this.state.url_server;
        let connection_type = this.state.connection_type;

        if (username === "" || password === "" || url_server === "") {
            this.setState({ empty_error: true });
        } else {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/signin.php";
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

                        this.props.dispatch({type:"SET_USER_CONNECTED", payload:response.user_data});
                        this.props.dispatch({type:"SET_URL_SERVER", payload:this.state.url_server});

                        setTimeout(() => {
                            this.setState({ message_user: "Récupération et compression des données d'utilisateur..." });
                        }, 1000);

                        setTimeout(() => {
                            this.setState({ message_user: "Initialisation de session...", message1: "Compression des données d'utilisateur" });
                            // this.get_general_info("");
                        }, 3000);

                        // this.get_general_info("");
                        setTimeout(() => {
                            this.setState({ redirectToReferrer: true });
                        }, 4500);

                    } else {
                        this.setState({ empty_error: false, incorrect: true, is_loading: false, message_user: "Echec lors de l'identification d'utilisateur..." });
                    }
                })
                .catch((error) => {
                    // alert(error.toString());
                    this.setState({
                        modal_title: "Information erreur",
                        modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                        modal_view: true,
                        is_loading: false,
                    });
                });
        }
    };

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

                        {!online ?
                            <div className="input-div-border-icon">
                                <FaServer style={{ marginBottom: -3 }} />
                                <input
                                    placeholder="URL de connexion au serveur"
                                    style={{ width: '85%', marginLeft: 10 }}
                                    className="input"
                                    value={this.state.url_server}
                                    onChange={(text) => this.setState({ url_server: text.target.value })} />
                            </div>
                            : null}

                        <div className="input-div-border-icon">
                            <FaUser style={{ marginBottom: -3 }} />
                            <input
                                placeholder="Nom d'utilisateur"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                value={this.state.username}
                                onChange={(text) => this.setState({ username: text.target.value })} />
                        </div>

                        <div className="input-div-border-icon">
                            <FaLock style={{ marginBottom: -3 }} />

                            {this.state.see_pass ?
                                <input
                                    placeholder="Mot de passe"
                                    style={{ width: '77%', marginLeft: 10 }}
                                    className="input"
                                    type="text"
                                    value={this.state.password}
                                    onChange={(text) => this.setState({ password: text.target.value })} />
                                :
                                <input
                                    placeholder="Mot de passe"
                                    style={{ width: '77%', marginLeft: 10 }}
                                    className="input"
                                    type="password"
                                    value={this.state.password}
                                    onChange={(text) => this.setState({ password: text.target.value })} />}


                            {this.state.see_pass ?
                                <button
                                    style={{ width: '10%' }}
                                    onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                    className="no-decoration"><FaEye style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>
                                :
                                <button
                                    style={{ width: '10%' }}
                                    onClick={() => this.state.see_pass ? this.setState({ see_pass: false }) : this.setState({ see_pass: true })}
                                    className="no-decoration"><FaEyeSlash style={{ marginBottom: -3, marginLeft: 10 }} size={15} /></button>}
                        </div><br />

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
                                <ButtonNormal text="Connexion" style={{ width: '100%' }} onPress={() => this.signin()} />
                                <div style={{ marginTop: 10, textAlign: 'right', fontSize: 15 }}>Besoin d'aide ? <span onClick={() => this.state.aide ? this.setState({ aide: false }) : this.setState({ aide: true })} style={{ color: 'rgba(0, 80, 180)' }} className="pointer">Cliquez ici.</span></div>
                            </>
                            : null}

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