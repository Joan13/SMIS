import { CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { format_date, find_date, find_date2, http } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';
import GeneralStatsCaisse from './general_stats';
import PaiementsDay from './paiements_day';
import Calendar from 'react-calendar';

const StatistiquesCaisse = () => {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         t1: 0,
    //         t2: 0,
    //         t3: 0,
    //         montant: 0,
    //         date: new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate(),
    //         makuta_day: 0,
    //         stats_tab: 0,
    //         loading_stats_day: false,
    //     }

    //     this.set_stats = this.set_stats.bind(this);
    // }

    const dispatch = useDispatch();
    const [montant_paye, setMontant_paye] = useState(0);
    const [makuta_day, setMakuta_day] = useState(0);
    const [stats_tab, setStats_tab] = useState(0);
    const [montant, setMontant] = useState(0);
    const [date, setDate] = useState(new Date().getFullYear() + "-" + parseInt(new Date().getMonth() + 1) + "-" + new Date().getDate());
    const [loading_stats_day, setLoading_stats_day] = useState(false);
    const [paiements, setPaiements] = useState([]);
    const [frais_divers, setFrais_divers] = useState([]);
    const [t1, setT1] = useState(0);
    const [t2, setT2] = useState(0);
    const [t3, setT3] = useState(0);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const pupils_count_paiements = useSelector(state => state.pupils_count_paiements);
    const url_server = useSelector(state => state.url_server);
    const [tab, setTab] = useState(0);

    // const paiement_vew = (tab) => {
    //     setStats_tab(0);
    //     setTab(tab);
    // }

    // const set_stats=(montant_par_eleve_par_an)=> {

    //     let montant_paye = montant_total;
    //     // this.setState({ montant: montant_par_eleve_par_an });
    //     setMontant(montant_par_eleve_par_an);
    //     let pupils = pupils_count_paiements;
    //     let montant_total = parseInt(montant_par_eleve_par_an) * pupils;

    //     let t1 = montant_total / 3;
    //     let t2 = t1 * 2;
    //     let t3 = t1 * 3;

    //     if (montant_paye <= t1) {
    //         // this.setState({ t1: montant_paye, t2: 0, t3: 0 });
    //         setT1(montant_paye);
    //         // setT2(0);
    //         // setT3(0);
    //     } else if (montant_paye > t1 && montant_paye >= t2) {
    //         // this.setState({ t1: t1, t2: montant_paye - t1, t3: 0 });
    //         // setT1(montant_paye);
    //         setT2(montant_paye - t1);
    //         // setT3(0);
    //     } else if (montant_paye > t2 && montant_paye <= t3) {
    //         // this.setState({ t1: t1, t2: t2, t3: montant_paye - t2 });
    //         setT3(montant_paye - t2);
    //     } else if (parseInt(montant_par_eleve_par_an) === 0) {
    //         // this.setState({ t1: 0, t2: 0, t3: 0 });
    //     } else {
    //         // this.setState({ t1: 0, t2: 0, t3: 0 });
    //     }
    // }

    const generate_day_stats = (date) => {
        // this.setState({ date: date, loading_stats_day: true });
        setDate(date);
        // dispatch({ type: "SET_TODAY", date });
        setLoading_stats_day(true);
        dispatch({ type: "SET_DAY", payload: date });

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/stats_caisse.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee_scolaire.year_id,
                date: format_date(date),
            })
        })
            .then((response) => response.json())
            .then((response) => {

                // this.setState({
                //     makuta_day: response.paiements_day,
                //     paiements: response.paiements,
                //     frais_divers: response.frais_divers,
                //     loading_stats_day: false
                // });

                setMakuta_day(response.paiements_day);
                // setPaiements(response.paiements);
                // setFrais_divers(response.frais_divers);

                setLoading_stats_day(false);

                dispatch({ type: "SET_PAIEMENTS_DAY", payload: response.paiements });
                dispatch({ type: "SET_MAKUTA_DAY", payload: response.paiements_day });
                // dispatch({ type: "SET_MAKUTA_DAY", payload: response.paiements_day });
                dispatch({ type: "SET_FRAIS_DIVERS_DAY", payload: response.frais_divers });
                dispatch({ type: "SET_PAIEMENTS_DAY_DELETED", payload: response.paiements_deleted });
                dispatch({ type: "SET_FRAIS_DIVERS_DAY_DELETED", payload: response.frais_divers_deleted });
            })
            .catch((error) => {
                setLoading_stats_day(false);
            });
    }

    useEffect(() => {
        let date = new Date();
        let day = "";
        let month = "";
        if ((date.getDate().toString()).length === 1) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }

        if ((parseInt(date.getMonth() + 1).toString()).length === 1) {
            month = "0" + parseInt(date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }
        generate_day_stats(date.getFullYear() + "/" + month + "/" + day);
    }, []);

    return (
        <div style={{ marginRight: 10, marginBottom: 30 }}><br />
            <div className='flex items-center border-b border-gray-50 dark:border-gray-20'>
                {stats_tab !== 1 ?
                    <div
                        onClick={() => {
                            dispatch({ type: "SET_TITLE_MAIN", payload: "État général de caisse" });
                            setStats_tab(1);
                        }}
                        style={{ fontWeight: 'bold' }} className="flex text-text-50 mr-10">
                        <FiChevronRight /> <span className={`${stats_tab === 1 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> État général de caisse</span>
                    </div> :

                <div
                    onClick={() => setStats_tab(0)}
                    style={{ fontWeight: 'bold' }} className="flex text-text-50 ">
                    {stats_tab === 0 ? <FiChevronRight /> : <FiChevronLeft />} <span className={`${stats_tab === 0 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> État Journalier de paiement</span>
                </div>}
            </div>

            {stats_tab === 0 ? <PaiementsDay /> :
                <GeneralStatsCaisse tab={tab} />}
        </div>
    )
}

export default StatistiquesCaisse;
