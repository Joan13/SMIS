import React, { Component } from 'react';
import { FaArrowDown, FaChevronDown, FaPrint } from 'react-icons/fa';
import { connect } from 'react-redux';
import { find_date, home_redirect } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';
class AllPupilPaiements extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    find_class_number(class_id) {

        let return_value = "";
        let suffixe = "";

        for (let i in this.props.class_numbers) {
            if (this.props.class_numbers[i].class_id === class_id) {
                return_value = this.props.class_numbers[i].class_number;
                if (return_value === "1") {
                    suffixe = "ère";
                } else {
                    suffixe = "ème";
                }
            }
        }

        return return_value + "" + suffixe;
    }

    find_class_order(order) {

        let return_value = "";
        for (let i in this.props.orders) {
            if (this.props.orders[i].order_id === order) {
                return_value = this.props.orders[i].order_name;
            }
        }

        return return_value;
    }

    find_libelle(libelle) {

        let return_value = "";
        for (let i in this.props.libelles) {
            if (this.props.libelles[i].libelle_id == libelle) {
                return_value = this.props.libelles[i].description_libelle;
            }
        }

        return return_value;
    }

    find_cycle(cycle) {

        let return_value = "";
        for (let i in this.props.cycles) {
            if (this.props.cycles[i].cycle_id === cycle) {
                return_value = this.props.cycles[i].cycle_name;
            }
        }

        return return_value;
    }

    find_pupil() {
        console.log(this.props.pupil);
        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: this.props.pupil.pupil.pupil_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => { });
    };

    printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = "http://" + this.props.url_server + home_redirect;
        window.location.replace("http://" + this.props.url_server + home_redirect);
    }

    delete_recu(recu_id) {

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/delete_recu_frais_divers.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                frais_divers_id: recu_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.find_pupil();
            })
            .catch((error) => {
                // alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, is_loading_home: false, loading_middle: false });
            });
    };


    render() {
        return (
            <div>

                <div className="div-recu-recu">
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td className="td-border-right-recu" style={{ width: "50%", fontSize: 12 }}>
                                    <strong className="div-title-recu">{(this.props.autres.school_name).toUpperCase()}</strong><br />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>EMAIL <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                <td>: <strong>{this.props.autres.email_school}</strong></td>
                                            </tr>
                                            <tr>
                                                <td>TÉLÉPHONES <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                <td>: <strong>{this.props.autres.phone_1}</strong></td>
                                            </tr>
                                            <tr>
                                                <td> </td>
                                                <td><span style={{ color: 'transparent' }}>:</span> <strong>{this.props.autres.phone_2}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style={{ width: "50%", fontSize: 12, paddingLeft: 10 }}>
                                    <table>
                                        <tbody>
                                            <tr style={{ padding: 20 }}>
                                                <td colSpan={2}><strong>REÇU DES FRAIS DIVERS</strong></td>
                                            </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                            <tr>
                                                <td>ÉLÈVE : <strong>{this.props.pupil.pupil.first_name.toUpperCase()} {this.props.pupil.pupil.second_name.toUpperCase()} {this.props.pupil.pupil.last_name}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>CLASSE : <strong>{this.find_class_number(this.props.pupil.pupil.class_school)} {this.find_cycle(this.props.pupil.pupil.cycle_school)} {this.find_class_order(this.props.pupil.pupil.class_order)}</strong>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>ANNÉE SCOLAIRE : <strong>{this.props.annee_scolaire.year_name}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {this.props.pupil.frais_divers.map((frais, index) => {
                    return (
                        <div key={index} style={{ marginBottom: 20 }}>
                            <div>
                                <div className="div-recu-recuu">
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <td colSpan={2}>
                                                    <table style={{ width: "100%" }}>
                                                        <thead>
                                                            <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                                                                <th>Date</th>
                                                                <th style={{ textAlign: 'left' }}>Raison du paiement</th>
                                                                <th>Montant</th>
                                                                <th>Année scolaire</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td style={{ textAlign: 'center' }}>{find_date(frais.date_entry)}</td>
                                                                <td style={{}}>{this.find_libelle(frais.libelle)}</td>
                                                                <td style={{ textAlign: 'center' }}>{frais.montant}</td>
                                                                <td style={{ textAlign: 'center' }}>{this.props.annee_scolaire.year_name}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div style={{ textAlign: 'left', marginTop: 5 }}>
                                <span>
                                    <FaChevronDown color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span
                                        onClick={() => this.delete_recu(frais.frais_divers_id)}
                                        className="add-minus">
                                        EFFACER CE REÇU
                                    </span>
                                </span>

                                <span>
                                    <FaPrint color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span onClick={() => this.printContent("recu")} className="add-minus">
                                        IMPRIMER CE REÇU
                                    </span>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AllPupilPaiements);


