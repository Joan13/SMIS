import { Button } from '@material-ui/core';
import React from 'react';
import { FiPrinter } from 'react-icons/fi';
import { connect } from 'react-redux';
import { home_redirect, http } from '../../global_vars';
import modalView from '../../includes/modal';
import { mapStateToProps } from '../../store/state_props';

class ListeNomminative extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modal_view: false,
            loading_middle: false,
            modal_main_text: "",
            modal_title: "",
        }
    }

    find_pupil(pupil) {

        this.props.dispatch({ type: "SET_SEARCHING_PUPIL", payload: true });
        this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
        this.props.dispatch({ type: "SET_PUPIL", payload: pupil });
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 11 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: (pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name).toUpperCase() });

        let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil.pupil.pupil_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_SEARCHING_PUPIL", payload: false });
                this.props.dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => {
                // alert(error.toString());
                console.log(error)
                this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, is_loading_home: false, loading_middle: false, searching_pupil: false });
            });
    };

    printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + this.props.url_server + home_redirect;
        window.location.replace(http + this.props.url_server + home_redirect);
    }

    view_pupil(pupil) {
        this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
        this.props.dispatch({ type: "SET_PUPIL", payload: pupil });
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 11 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: (pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name).toUpperCase() });
    }

    delete_class() {

        let class_id = this.props.classe.id_classes;
        let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/delete_class.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    class_id: class_id,
                })
            })
            .then((response) => response.json())
            .then((response) => {

                this.setState({
                    modal_title: "Information succès",
                    modal_main_text: "La classe a été effacée avec succès. Si vous voulez voir de changements immédiats, appuyez sur le boutton de rafraichissement de la page en rechargeant les données.",
                    modal_view: true,
                    loading_middle: false
                });

            })
            .catch((error) => {
                console.log(error);
            });

    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 0, marginRight:10 }}>

                {this.props.classe.pupils_count !== 0 ?
                    <div onClick={() => this.printContent("nomminative")} style={{ display: 'block', fontWeight: 'bold', float: 'right', marginBottom: -50, paddingTop: 3 }}>
                        <span className="add-minus" style={{ marginRight: 3 }}><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div> :
                    <>
                        <br /><br />

                        <div>
                            Cette classe est vide, elle ne contient pas d'élèves. Vous pouvez l'effacer si vous l'avez entrée par erreur.
                        </div>

                        <br /><br />
                        <span
                            onClick={() => this.delete_class()}
                            className="add-minus" style={{ fontWeight: 'bold', color: 'red' }}>
                            EFFACER CETTE CLASSE
                        </span><br /><br />
                    </>}

                <div id="nomminative" style={{ marginTop: 0 }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <div>
                                        <strong>{(this.props.autres.school_name).toUpperCase()}</strong><br />
                                        <strong>{this.props.autres.school_bp}</strong><br />
                                        <strong>Année scolaire : {this.props.annee_scolaire.year_name}</strong>
                                    </div>
                                    <table className="full-table-liste">
                                        <caption>
                                            <h4>
                                                LISTE NOMMINATIVE<br />
                                                {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id + " " + this.props.classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }}>Nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }}>Post-nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }}>Prénom</th>
                                                <th style={{ width: 50, textAlign: 'center' }}>Sexe</th>
                                            </tr>
                                        </thead>
                                        {this.props.classe.pupils.map((pupil, index) => (
                                            <tbody key={index}>
                                                <tr onClick={() => this.find_pupil(pupil)}>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                    <td style={{ width: 50, textAlign: 'center' }}>{pupil.pupil.gender === "0" ? "F" : "M"} </td>
                                                </tr>
                                            </tbody>
                                        )
                                        )}
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

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

export default connect(mapStateToProps)(ListeNomminative);