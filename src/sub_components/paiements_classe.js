import React from 'react';
import { connect } from 'react-redux';
import { home_redirect } from '../global_vars';
import { mapStateToProps } from '../store/state_props';

let paye = 0;

class PaiementsClasse extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            total: 0
        }
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

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 0 }}>
                <div className="border-bottom-blue">
                    <div style={{ marginBottom: 10, fontWeight: 'bold', marginTop: 10 }}>Paramètres de l'état de caisse</div>

                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div style={{ marginBottom: 10 }}>
                                        Montant initial de base par an par élève<br />
                                        <input type="number" onChange={(text) => this.setState({ total: text.target.value })} placeholder="Ex.: 420" />
                                    </div>
                                </td>
                                <td style={{ width: "50%" }}>
                                    <span onClick={() => this.printContent("nomminative")} className="add-minus" style={{ fontWeight: 'bold' }}>
                                        IMPRIMER LA FICHE
                                    </span><br /><br />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div id="nomminative">
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
                                                FICHE DES PAIEMENTS<br />
                                                {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id + " " + this.props.classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Post-nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th>
                                                <th style={{ textAlign: 'center' }} colSpan={3}>Soldes</th>
                                            </tr>
                                            <tr>
                                                <th style={{ width: 50, textAlign: 'center' }}>T1</th>
                                                <th style={{ width: 50, textAlign: 'center' }}>T2</th>
                                                <th style={{ width: 50, textAlign: 'center' }}>T3</th>
                                            </tr>
                                        </thead>
                                        {this.props.classe.pupils.map((pupil, index) => {

                                            paye = parseInt(paye + pupil.soldes.montant_paye);
                                            return (
                                                <tbody key={index}>
                                                    <tr onClick={() => this.view_pupil(pupil)}>
                                                        <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes.solde1 == "0" ? parseInt((this.state.total) / 3) : pupil.soldes.solde1 === "OK" ? "0" : pupil.soldes.solde1} </td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes.solde2 == "0" ? parseInt((this.state.total) / 3) : pupil.soldes.solde2 === "OK" ? "0" : pupil.soldes.solde2}</td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes.solde3 == "0" ? parseInt((this.state.total) / 3) : pupil.soldes.solde3 === "OK" ? "0" : pupil.soldes.solde3}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                        <tfoot>
                                            <tr>
                                                <td colSpan={7} style={{ paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'right', paddingRight: 20 }}>Montant total payé <strong style={{ color: 'rgb(0,80,180)', fontSize: 20 }}>{this.props.classe.paye}</strong> sur <strong style={{ color: 'rgb(0,80,180)', fontSize: 20 }}>{parseInt((this.state.total) * (this.props.classe.pupils_count))}</strong></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(PaiementsClasse);