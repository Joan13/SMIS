import React from 'react';
import { connect } from 'react-redux';
import { format_date, find_date, find_date2 } from '../global_vars';
import { mapStateToProps } from '../store/state_props';

class StatistiquesCaisse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            t1: 0,
            t2: 0,
            t3: 0,
            montant: 0,
            date: new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate(),
            makuta_day: 0,
        }

        this.set_stats = this.set_stats.bind(this);
    }

    set_stats(montant_par_eleve_par_an) {

        let montant_paye = this.props.montant_total;
        this.setState({ montant: montant_par_eleve_par_an });
        let pupils = this.props.pupils_count_paiements;
        let montant_total = parseInt(montant_par_eleve_par_an) * pupils;

        let t1 = montant_total / 3;
        let t2 = t1 * 2;
        let t3 = t1 * 3;

        if (montant_paye <= t1) {
            this.setState({ t1: montant_paye, t2: 0, t3: 0 });
        } else if (montant_paye > t1 && montant_paye >= t2) {
            this.setState({ t1: t1, t2: montant_paye - t1, t3: 0 });
        } else if (montant_paye > t2 && montant_paye <= t3) {
            this.setState({ t1: t1, t2: t2, t3: montant_paye - t2 });
        } else if (parseInt(montant_par_eleve_par_an) === 0) {
            this.setState({ t1: 0, t2: 0, t3: 0 });
        } else {
            this.setState({ t1: 0, t2: 0, t3: 0 });
        }
    }

    generate_day_stats(date) {
        this.setState({ date: date });

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/stats_caisse.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    school_year: this.props.annee_scolaire.year_id,
                    date: format_date(date)
                })
            })
            .then((response) => response.json())
            .then((response) => {

                this.setState({ makuta_day: response.paiements_day });
                // alert(response.paiements_day);
            })
            .catch((error) => {
                // Alert.alert(strings.error, strings.connection_failed);
                // alert(error.toString())
                this.setState({ loading_class: false, pupils_see: false });
            });
    }

    componentDidMount() {
        this.generate_day_stats(new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate());
    }

    render() {
        return (
            <div>

                <div>
                    <div className="border-bottom-blue">
                        <div style={{ marginBottom: 10, fontWeight: 'bold', marginTop: 10 }}>Paramètres de l'état de caisse</div>

                        <table style={{ width: "100%" }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: "50%" }}>
                                        <div style={{ marginBottom: 10 }}>
                                            Montant initial de base par an par élève<br />
                                            <input type="number" onChange={(text) => this.set_stats(text.target.value)} placeholder="Ex.: 420" />
                                        </div>
                                    </td>
                                    <td style={{ width: "50%" }}>
                                        <div style={{ marginBottom: 10 }}>
                                            Sélectionner une date<br />
                                            <input type="date" onChange={(text) => this.generate_day_stats(text.target.value)} placeholder="Ex.: 420" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div style={{ marginTop: 70, marginBottom: 70, textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>
                        Montant total perçu dans la journée du {find_date2(this.state.date)}<br />
                        <strong style={{ color: "rgb(0, 80, 180)", fontSize: 22 }}>{this.state.makuta_day} dollars Américains</strong>
                    </div>


                </div>

                <table style={{ width: "100%" }} className="table-border">
                    <thead>
                        <tr>
                            <td style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center', color: "rgba(0,80,180)", fontSize: 17 }} colSpan="3">
                                <strong>{this.props.title_main} {this.props.annee_scolaire.year_name}</strong> (Paiements scolaires et frais divers)
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Premier Trimestre</th>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Deuxième trimestre</th>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Troisième Trimestre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                Payé     <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{this.state.t1}</strong>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{this.state.t2}</strong>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{this.state.t3}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                Sur      {(((this.props.pupils_count_paiements) * this.state.montant) / 3).toString().substr(0, 9)}
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                {(((this.props.pupils_count_paiements) * this.state.montant) / 3).toString().substr(0, 9)}
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                {(((this.props.pupils_count_paiements) * this.state.montant) / 3).toString().substr(0, 9)}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} colSpan="3"><strong style={{ color: 'rgb(0, 80, 180)', fontSize: 16 }}>Montant à totaliser {(this.props.pupils_count_paiements) * this.state.montant} dollars Américains</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps)(StatistiquesCaisse);