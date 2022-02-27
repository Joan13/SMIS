import React, { Component } from 'react';
import { FaArrowDown, FaChevronDown, FaPrint } from 'react-icons/fa';
import { connect } from 'react-redux';
import { find_date, home_redirect } from '../global_vars';
import { mapStateToProps } from '../store/state_props';
import logo from "./../../src/logo_elite.png";

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

    printContent(divName) {

        this.props.dispatch({ type: "SET_MOUNT_HOME", payload: false });
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = "http://" + this.props.url_server + home_redirect;
        window.location.replace("http://" + this.props.url_server + home_redirect);
    }


    render() {
        return (
            <div style={{width:'100%'}}>
                {this.props.pupil.paiements.map((paiement, index) => {

                    if (paiement.paiement_validated === "1") {
                    return (
                        <div key={index} style={{ margin:0, padding:0, marginBottom: 20 }}>

                            <div id={`recu ${paiement.paiement_id}`}>
                                <div className="div-recu">
                                    <div className="sub-div-recu">
                                        <table style={{ width: "100%", padding: 10, paddingTop: 0, paddingBottom: 0 }}>
                                            <tbody>
                                                <tr>
                                                    <td className="td-border-right-recu" style={{ width: "50%", fontSize: 12 }}>
                                                        <strong className="div-title-recu">{(this.props.autres.school_name).toUpperCase()}</strong><br />
                                                        <strong className="sub-title-div-recu">{this.props.autres.school_bp}</strong>
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
                                                                <tr style={{ padding: 20 }}>
                                                                    <td colSpan={2}><strong>REÇU DES FRAIS SCOLAIRES</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td>DATE : <strong>{find_date(paiement.date_creation)}</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>REÇU No : <strong>{paiement.paiement_id}</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="td-border-right-top" colSpan={2}>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td>ÉLÈVE : <strong>{this.props.pupil.pupil.first_name.toUpperCase()} {this.props.pupil.pupil.second_name.toUpperCase()} {this.props.pupil.pupil.last_name}</strong>
                                                                    </td>
                                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }}>Montant payé : <strong>{paiement.montant_paye} dollars USD</strong>
                                                                    </td>
                                                                    <td>Montant En toutes lettres : <strong>{paiement.montant_text} dollars Américains</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }} valign="top">Solde année : <strong>{this.props.pupil.soldes.solde} dollars USD</strong>
                                                                    </td>
                                                                    <td>Solde par trimestre    <FaArrowDown size={10} style={{ marginLeft: 5 }} /><br />
                                                                        <div style={{ marginTop: 5, paddingTop: 2 }} className="td-border-left-top dispp">
                                                                            <span>T1 : <strong>{this.props.pupil.soldes.solde1}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                            <span>T2 : <strong>{this.props.pupil.soldes.solde2}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                            <span>T3 : <strong>{this.props.pupil.soldes.solde3}</strong></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }}>Motif du paiement : <strong>{this.find_libelle(paiement.libelle)}</strong>
                                                                    </td>
                                                                    <td></td>
                                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                <tr>
                                                    <td style={{ width: "100%", textAlign: 'center' }} colSpan={2}>
                                                        Signature et sceau de l'école
                                                    </td>
                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'left', marginTop:5 }}>
                                <span>
                                    <FaChevronDown color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span
                                        // onClick={() => this.printContent("nomminative")} 
                                        className="add-minus">
                                        EFFACER CE REÇU
                                    </span>
                                </span>

                                <span>
                                    <span className="divider-menu-topbar"></span>
                                    <FaPrint color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span onClick={() => this.printContent(`recu ${paiement.paiement_id}`)} className="add-minus">
                                        IMPRIMER CE REÇU
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                })}
            </div>
        )
    }
}

export default connect(mapStateToProps)(AllPupilPaiements);


