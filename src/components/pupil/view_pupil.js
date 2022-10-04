import React from 'react';
import { FaArrowDown, FaChevronDown, FaChevronUp, FaEdit, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWave, FaMoneyCheck, FaParagraph, FaPrint } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { connect } from 'react-redux';
import { home_redirect } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';
import NewPaiements from '../paiements/new_paiements';
import AllPaiementPupils from '../paiements/all_paiements_pupil';
import FraisDiversPupil from '../paiements/frais_divers_pupil';
import { CircularProgress } from '@material-ui/core';
import EditPupil from './edit_pupil';


class ViewPupil extends React.Component {

    intervalID = 0;

    constructor(props) {
        super(props);

        this.state = {
            classe: [],
            autres: [],
            pupils: [],
            can_mount: 0,
            edit_pupil:false,
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

    find_cycle(cycle) {

        let return_value = "";
        for (let i in this.props.cycles) {
            if (this.props.cycles[i].cycle_id === cycle) {
                return_value = this.props.cycles[i].cycle_name;
            }
        }

        return return_value;
    }

    find_section(section) {

        let return_value = "";
        for (let i in this.props.sections) {
            if (this.props.sections[i].section_id === section) {
                return_value = this.props.sections[i].section_name;
            }
        }

        return return_value;
    }

    newPaiement() {
        if (this.props.new_paiement) {
            this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        } else {
            this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: true });
            this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
            this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: false });
        }
    }

    allPaiements() {
        if (this.props.allPaiements) {
            this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: false });
        } else {
            this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
            this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
            this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        }
    }

    fraisDiversPaiements() {
        if (this.props.paiements_frais_divers) {
            this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        } else {
            this.props.dispatch({ type: "SET_ALL_PAIEMENTS", payload: false });
            this.props.dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
            this.props.dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: true });
        }
    }

    find_date(date) {
        let year = date.substr(0, 4);
        let month = date.substr(5, 2);
        let day = date.substr(8, 2);

        if (month === "1" || month === "01") {
            month = "Janvier";
        } else if (month === "2" || month === "02") {
            month = "Février";
        } else if (month === "3" || month === "03") {
            month = "Mars";
        } else if (month === "4" || month === "04") {
            month = "Avril";
        } else if (month === "5" || month === "05") {
            month = "Mai";
        } else if (month === "6" || month === "06") {
            month = "Juin";
        } else if (month === "7" || month === "07") {
            month = "Juillet";
        } else if (month === "8" || month === "08") {
            month = "Août";
        } else if (month === "9" || month === "09") {
            month = "Septembre";
        } else if (month === "10") {
            month = "Octobre";
        } else if (month === "11") {
            month = "Novembre";
        } else if (month === "12") {
            month = "Décembre";
        }
        else {
            month = "Non défini";
        }

        let fullDate = day + " " + month + " " + year;

        return fullDate;
    }

    printContent(divName) {

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
            <div>
{!this.props.loading_footer ?
    <div style={{ marginBottom: 50, paddingTop: 0,marginLeft:0, marginRight: 10 }}>
                <div className="div-div">
                    <div style={{fontWeight: 'bold', fontSize: 15, marginTop: 10, marginBottom: 5}}>Identité de l'élève</div>
                    <div id="nomminative" style={{ marginBottom: 5, marginLeft: 0 }}>

                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: "33.3%" }}>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Sexe  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.gender === "1" ? "Masculin (M)" : "Féminin (F)"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                <td>Nationalité  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.nationality !== "" ? this.props.pupil.pupil.nationality : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Date de naissance  </td>
                                                    <td>
                                                        <strong> : {this.find_date(this.props.pupil.pupil.birth_date)}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Lieu de naissance  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.birth_place !== "" ? this.props.pupil.pupil.birth_place : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                    <td style={{ width: "33.3%" }} valign="top">
                                        <table>
                                            <tbody>
                                                <tr>
                                                <td>Classe  </td>
                                                    <td>
                                                        <strong> : {this.find_class_number(this.props.pupil.pupil.class_school)} {this.find_cycle(this.props.pupil.pupil.cycle_school)} {this.find_section(this.props.pupil.pupil.class_section)} {this.find_class_order(this.props.pupil.pupil.class_order)}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Noms du père  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.father_names !== "" ? this.props.pupil.pupil.father_names : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Noms de la mère  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.mother_names !== "" ? this.props.pupil.pupil.mother_names : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>

                                    <td style={{ width: "33.3%" }} valign="top">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Adresse  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.physical_address !== "" ? this.props.pupil.pupil.physical_address : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Email  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.email_address !== "" ? this.props.pupil.pupil.email_address : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Téléphone  </td>
                                                    <td>
                                                        <strong> : {this.props.pupil.pupil.contact_phone_1 !== "" ? this.props.pupil.pupil.contact_phone_1 : "Non défini"}</strong>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    {this.props.pupil.pupil.contact_phone_2 !== "" ?
                                                        <td>
                                                            <strong> : {this.props.pupil.pupil.contact_phone_2}</strong>
                                                        </td> : null}
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    {this.props.pupil.pupil.contact_phone_3 !== "" ?
                                                        <td>
                                                            <strong> : {this.props.pupil.pupil.contact_phone_3}</strong>
                                                        </td> : null}
                                                </tr>
                                                <tr>
                                                    <td> </td>
                                                    {this.props.pupil.pupil.contact_phone_4 !== "" ?
                                                        <td>
                                                            <strong> : {this.props.pupil.pupil.contact_phone_4}</strong>
                                                        </td> : null}
                                                </tr>

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {this.props.edit_pupil ? <EditPupil />:null}

                    <div style={{textAlign: 'left', marginTop: 20}}>
                    {/* <span>
                    <FaChevronDown color="rgb(0, 80, 180)" style={{marginRight: 5}} />
                        <span 
                        className="add-minus">
                            AFFICHER L'IDENTITÉ COMPLÈTE
                        </span>
                    </span> */}

                    <span>
                    {this.props.edit_pupil ? <FaChevronUp color="rgb(0, 80, 180)" style={{marginRight: 5}} /> : <FaChevronDown color="rgb(0, 80, 180)" style={{marginRight: 5}} />}
                        <span 
                        onClick={()=>this.props.dispatch({type:"SET_EDIT_PUPIL", payload:!this.props.edit_pupil})}
                        className="add-minus">
                            MODIFIER l'ÉLÈVE
                        </span>
                    </span>

                    <span>
                    <span className="divider-menu-topbar"></span>
                    <FaPrint color="rgb(0, 80, 180)" style={{marginRight: 5}} />
                        <span onClick={() => this.printContent("nomminative")} className="add-minus">
                            IMPRIMER LA FICHE DE L'ÉLÈVE
                        </span>
                    </span>
                    </div>
                </div>

                <div className="div-div" style={{ paddingBottom: 0}}>
                    <h3>Paiements de l'élève</h3>
                    <span onClick={() => this.newPaiement()} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${this.props.new_paiement ? "select-no-border-bold" : ""}`}>
                        <span className="divider-menu-topbar"></span>
                        <FaEdit style={{ size: 17, marginRight: 5 }} />
                        Nouveaux paiements</span>

                    <span onClick={() => this.allPaiements()} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${this.props.all_paiements ? "select-no-border-bold" : ""}`}>
                        <span className="divider-menu-topbar"></span>
                        <FaMoneyCheck style={{ size: 17, marginRight: 5 }} />
                        Paiements scolaires</span>

                    <span onClick={() => this.fraisDiversPaiements()} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${this.props.paiements_frais_divers ? "select-no-border-bold" : ""}`}>
                        <span className="divider-menu-topbar"></span>
                        <FaMoneyBillWave style={{ size: 17, marginRight: 5 }} />
                        Paiements frais divers</span>

                    {this.props.new_paiement ?
                        <NewPaiements /> : null}

                    {this.props.all_paiements ?
                        <AllPaiementPupils /> : null}

                    {this.props.paiements_frais_divers ?
                        <FraisDiversPupil /> : null}
                </div>
            </div>
:
<div className="progress-center-progress">
                                <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                                Chargement de la page élève...
                            </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ViewPupil);