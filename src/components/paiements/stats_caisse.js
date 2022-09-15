import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { connect } from 'react-redux';
import { format_date, find_date, find_date2 } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';
import GeneralStatsCaisse from './general_stats';
import PaiementsDay from './paiements_day';

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
            stats_tab:0,
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
        this.props.dispatch({ type: "SET_DAY", payload: date });

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

                this.setState({ 
                    makuta_day: response.paiements_day, 
                    paiements: response.paiements,
                frais_divers: response.frais_divers });

                this.props.dispatch({ type: "SET_PAIEMENTS_DAY", payload: response.paiements });
                this.props.dispatch({ type: "SET_FRAIS_DIVERS_DAY", payload: response.frais_divers });
            })
            .catch((error) => { });
    }

    componentDidMount() {
        let date = new Date();
        let day = "";
        let month = "";
        if ((date.getDate() + "").length === 1) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }

        if ((date.getMonth() + "").length === 1) {
            month = "0" + parseInt(date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }
        this.generate_day_stats(date.getFullYear() + "/" + month + "/" + day);
    }

    render() {
        return (
            <div style={{marginRight:10, marginBottom:30}}><br/>
                <div>
                    <div>
                    {this.state.stats_tab !== 1 ?
                        <div 
                    onClick={() => this.setState({stats_tab:1})} 
                    style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronRight /> État général de caisse</span>
            </div>
            :
            <div 
                    onClick={() => this.setState({stats_tab:0})} 
                    style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronLeft /> État Journalier de paiement</span>
            </div>}

            {this.state.stats_tab === 0 ?
            <div>
                <div style={{ marginBottom: 10, float:'right', marginRight: 20, marginTop:-15  }}>
                                            Sélectionner une date<br />
                                            <input type="date" className='input-normall' style={{paddingRight: 15}} onChange={(text) => this.generate_day_stats(text.target.value)} />
                                        </div><br/><br/>
                                        <div style={{ marginTop: 70, marginBottom: 70, textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>
                        Montant total perçu dans la journée du {find_date2(this.props.day)}<br />
                        <strong style={{ color: "rgb(0, 80, 180)", fontSize: 22 }}>{this.state.makuta_day} dollars Américains</strong><br/><br/>
                    </div>
            </div>:null}
                    </div>

{this.state.stats_tab === 0 ? <PaiementsDay /> : <GeneralStatsCaisse />}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(StatistiquesCaisse);
