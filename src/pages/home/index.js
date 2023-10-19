import { useEffect } from "react";
import { LinearProgress } from "@material-ui/core";
import Footer from "../../includes/footer";
import { FaCircle, FaCheck, FaUserPlus, FaClipboard, FaPaperclip, FaEdit } from "react-icons/fa";
import { FiEdit, FiUser } from "react-icons/fi";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Navigate } from "react-router-dom";
import FicheIdentites from "../../components/classe/fiche_identites";
import FichePointsPupils from "../../components/classe/fiche_points_pupils";
import FichesPointsCourses from "../../components/classe/fiche_points_courses";
import PalmaresPupils from "../../components/classe/palmares_classe";
import NewPupil from "../../components/pupil/new_pupil";
import ListeNomminative from "../../components/classe/liste_nomminative";
import Bulletins from "../../components/classe/bulletins";
import StatistiquesCaisse from "../../components/paiements/stats_caisse";
import FicheE13 from "../../components/classe/fiche_e13";
import Courses from "../../components/classe/courses";
import { http } from "../../global_vars";
import { useDispatch, useSelector } from "react-redux";
import PalmaresFinal from "../../components/classe/palmares_final";
import ViewPupil from "../../components/pupil/view_pupil";
import MenuHome from "./menu_home";
import NewClasseImport from "../../components/classe/new_class_import";
import SettingsBulletins from "../../sub_pages/settings_bulletins";
import GestionPersonnel from "../../components/workers/gestion_personnel";
import AddWorker from "../../components/workers/add_worker";
import EmployeesList from "../../components/workers/list_workers";
import TimetableSettings from "../../components/timetable/timetable_settings";
import CoursesTimetableConfigurator from "../../components/timetable/courses_timetable_config";
import RightClasseMenu from "../../components/classe/right_menu";
import { FcOpenedFolder } from "react-icons/fc";
import PupilsRightMenu from "../../components/classe/pupils_right_menu";
import PaiementCategories from "../../components/caisse/paiement_categories";
import ClassePaiementCategorisation from "../../components/classe/class_paiements/paiement_categorisation";
import Libelles from "../../components/caisse/libelles";
import PaiementsClasse from "../../components/classe/class_paiements";
import FichePointsBrouillon from "../../components/classe/fiches_brouillon/fiche_points";
import FicheSynthesePointsBrouillon from "../../components/classe/fiches_brouillon/fiche_synthese_brouillon";
import BulletinsBrouillon from "../../components/classe/fiches_brouillon/bulletins_brouillon";
import BulletinsType2Brouillon from "../../components/classe/fiches_brouillon/bulletins_type2_brouillon";
import ViewWorker from "../../components/workers/view_worker";
import Conduites from "../../components/classe/conduite";
import ModalFrame from "../../components/modals";
import Classes from "../../includes/classes";
import FichesPoints from "../../components/classe/fiche_points";
import JSONPackageFile from './../../../package.json';
import BulletinsSmall from "../../components/classe/bulletins_small";
import UserOpen from "../../components/includes/user_open";
import axios from "axios";
import vector from "./../../../src/assets/logo.PNG"
import PrintDocument from "../../components/includes/print";
import Migrations from "../../components/classe/migrations";
import TimetableProfs from "../../components/timetable/timetable_profs";
import Timetable from "../../components/timetable/main_timetable";
import ProfsTimetable from "../../components/timetable/main_timetable_profs";

const Home = () => {

    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const middle_func = useSelector(state => state.middle_func);
    const user_data = useSelector(state => state.user_data);
    const loading_middle = useSelector(state => state.loading_middle);
    const loading_footer = useSelector(state => state.loading_footer);
    const loading_class = useSelector(state => state.loading_class);
    const loadding_header = useSelector(state => state.loadding_header);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const user_poste = useSelector(state => state.user_poste);
    const marks_tab = useSelector(state => state.marks_tab);
    const allow_right_menu = useSelector(state => state.allow_right_menu);
    const allow_right_menu_pupils = useSelector(state => state.allow_right_menu_pupils);
    const classe = useSelector(state => state.classe);
    const class_open = useSelector(state => state.class_open);
    const title_main = useSelector(state => state.title_main);
    const cycles = useSelector(state => state.cycles);
    const classes = useSelector(state => state.classes);
    const orders = useSelector(state => state.orders);
    const sections = useSelector(state => state.sections);
    const options = useSelector(state => state.options);
    const annees = useSelector(state => state.annees);
    const class_numbers = useSelector(state => state.class_numbers);
    const pupils = useSelector(state => state.pupils);
    const periode_full = useSelector(state => state.periode_full);
    const annee = useSelector(state => state.annee);
    const modal_paiement_categories = useSelector(state => state.modal_paiement_categories);
    const modal_libelles = useSelector(state => state.modal_libelles);
    const load_class_data = useSelector(state => state.load_class_data);
    const periode_synthese = useSelector(state => state.periode_synthese);
    const redirectToReferrer = useSelector(state => state.redirectToReferrer);
    const is_loading_home = useSelector(state => state.is_loading_home);
    const school_name_abb = useSelector(state => state.school_name_abb);
    const user_action = useSelector(state => state.user_action);
    const fiches_tab = useSelector(state => state.fiches_tab);
    const user_open = useSelector(state => state.user_open);
    const modal_selections = useSelector(state => state.modal_selections);
    const nbr_ee = useSelector(state => state.nbr_ee);
    const nbr_classes = useSelector(state => state.nbr_classes);
    const nbr_tb = useSelector(state => state.nbr_tb);
    const all_pupils = useSelector(state => state.all_pupils);
    const nbr_bb1 = useSelector(state => state.nbr_bb1);
    const nbr_bb2 = useSelector(state => state.nbr_bb2);
    const nbr_me = useSelector(state => state.nbr_me);
    const nbr_ma = useSelector(state => state.nbr_ma);
    const autres = useSelector(state => state.autres);
    const reussites = useSelector(state => state.reussites);
    const doubles = useSelector(state => state.doubles);
    const abandon = useSelector(state => state.abandon);
    const echecs = useSelector(state => state.echecs);
    const classes_synthese = useSelector(state => state.classes_synthese);

    const get_general_info = (annee) => {
        dispatch({ type: "SET_LOADING_MIDDLE", payload: true });
        dispatch({ type: "SET_LOADING_HOME", payload: true });

        let user = user_data;

        dispatch({ type: "SET_USER_CONNECTED", payload: user });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_CLASS_OPEN", payload: false });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 0 });
        dispatch({ type: "SET_LOADING_MIDDLE", payload: true });
        dispatch({ type: "SET_LOADING_HOME", payload: true });
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_MARKS_TAB", payload: "" });
        dispatch({ type: "SET_URL_SERVER", payload: url_server });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Chargement des données générales...", });

        if (user === null) {
            this.logout_session();
        } else {
            if (parseInt(user.poste) === 0) {
                dispatch({ type: "SET_POSTE", payload: "Admin" });
            } else if (parseInt(user.poste) === 1) {
                dispatch({ type: "SET_POSTE", payload: "Promoteur" });
            } else if (parseInt(user.poste) === 2) {
                dispatch({ type: "SET_POSTE", payload: "Discipline" });
            } else if (parseInt(user.poste) === 3) {
                dispatch({ type: "SET_POSTE", payload: "Finances" });
            } else if (parseInt(user.poste) === 4) {
                dispatch({ type: "SET_POSTE", payload: "Secrétaire" });
            } else if (parseInt(user.poste) === 5) {
                dispatch({ type: "SET_POSTE", payload: "Enseignant" });
            } else if (parseInt(user.poste) === 6) {
                dispatch({ type: "SET_POSTE", payload: "Caisse" });
            } else if (parseInt(user.poste) === 7) {
                dispatch({ type: "SET_POSTE", payload: "Directeur des études", });
            } else {
                // alert("Cet utilisateur est invalide. Vous devez vous reconnecter pour accéder aux services.");
                logout_session();
            }
        }

        let data = new FormData();
        data.append('annee', annee);

        axios.post(http + url_server + "/yambi_class_SMIS/API/get_info_home.php", data)
            .then(rsp => {
                const response = rsp.data;
                const promise_general_info_home = new Promise((resolve, reject) => {
                    dispatch({ type: "SET_CLASSES", payload: response.classes });
                    dispatch({ type: "SET_PUPILS_COUNT_PAIEMENTS", payload: response.pupils_count_paiements });
                    dispatch({ type: "SET_MONTANT_TOTAL", payload: response.montant_paye });
                    dispatch({ type: "SET_AUTRES", payload: response.autres });
                    dispatch({ type: "SET_ANNEES", payload: response.annees });
                    dispatch({ type: "SET_CLASS_NUMBERS", payload: response.class_numbers });
                    dispatch({ type: "SET_ORDERS", payload: response.orders });
                    dispatch({ type: "SET_CYCLES", payload: response.cycles });
                    dispatch({ type: "SET_SECTIONS", payload: response.sections });
                    dispatch({ type: "SET_OPTIONS", payload: response.options });
                    dispatch({ type: "SET_ANNEE_SCOLAIRE", payload: response.annee_scolaire });
                    dispatch({ type: "SET_ANNEE", payload: parseInt(response.annee) });
                    dispatch({ type: "SET_SCHOOL_NAME", payload: response.school_name });
                    dispatch({ type: "SET_ATTRIBUTIONS", payload: response.attributions });
                    dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count });
                    dispatch({ type: "SET_PUPILS_COUNT_MALE", payload: response.pupils_count_male });
                    dispatch({ type: "SET_PUPILS_COUNT_FEMALE", payload: response.pupils_count_female });
                    dispatch({ type: "SET_SCHOOL_NAME_ABB", payload: response.school_name_abb });
                    dispatch({ type: "SET_REUSSITES", payload: response.reussites });
                    dispatch({ type: "SET_DOUBLES", payload: response.doubles });
                    dispatch({ type: "SET_ECHECS", payload: response.echecs });
                    dispatch({ type: "SET_ABANDON", payload: response.abandon });
                    dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
                    dispatch({ type: "SET_LIBELLES", payload: response.libelles });
                    dispatch({ type: "SET_TITLE_MAIN", payload: "Écriture des données..." });
                    dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils });
                    dispatch({ type: "SET_PUPILS", payload: response.pupils });
                    dispatch({ type: "SET_SELECTIONS", payload: response.selections });
                    dispatch({ type: "SET_PAIEMENT_CATEGORIES", payload: response.paiement_categories });
                    dispatch({ type: "SET_MODAL_SELECTIONS", payload: false });
                    dispatch({ type: "SET_CLASSES_SELECTED", payload: [] });
                    resolve();
                }).then(() => { });

                promise_general_info_home.finally(() => {
                    setTimeout(() => {
                        dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire" });
                        dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                        dispatch({ type: "SET_LOADING_HOME", payload: false });
                    }, 1000);
                });
            })
            .catch((error) => {
                // console.log(error);
                dispatch({ type: "SET_LOADING_HOME", payload: false });
            });
    }

    // collect_data() {
    //     dispatch({ type: "SET_LOADING_FOOTER", payload: true });
    //     const data = annee_scolaire.year_id;
    //     const url_server = url_server;
    //     let BaseURL = http + url_server + "/yambi_class_SMIS/API/collect_data.php";

    //     fetch(BaseURL, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             annee: data,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             // setTimeout(() => {
    //             this.sync_data(response);
    //             // },2000);
    //         })
    //         .catch((error) => {
    //             this.setState({
    //                 modal_title: "Information erreur",
    //                 modal_main_text:
    //                     "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
    //                 modal_view: true,
    //                 is_loading_home: false,
    //                 loading_middle: false,
    //             });
    //         });
    // }

    // sync_data(data) {
    //     const url_server = url_online;
    //     const BaseURL = http + url_server + "/yambi_class_SMIS/API/sync_data.php";

    //     fetch(BaseURL, {
    //         method: "POST",
    //         body: JSON.stringify({
    //             data: data,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             dispatch({ type: "SET_LOADING_FOOTER", payload: false });
    //             if (response.success === "1") {
    //                 this.setState({
    //                     modal_title: "Opération réussie",
    //                     modal_main_text:
    //                         "La synchronisation des données a été effectuée avec succès.",
    //                     modal_view: true,
    //                     is_loading_home: false,
    //                     loading_middle: false,
    //                 });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error.toString());
    //             dispatch({ type: "SET_LOADING_FOOTER", payload: false });
    //             this.setState({
    //                 modal_title: "Information erreur",
    //                 modal_main_text:
    //                     "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
    //                 modal_view: true,
    //                 is_loading_home: false,
    //                 loading_middle: false,
    //             });
    //         });
    // }

    const get_synthese_marks = (periode) => {
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_LOADING_MIDDLE", payload: true });

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_synthese.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                annee: annee,
                periode: periode,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_CLASSES_SYNTHESE", payload: response.classes });
                dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                dispatch({ type: "SET_ALL_PUPILS", payload: response.all_pupils });
                dispatch({ type: "SET_NBR_EE", payload: response.nbr_ee });
                dispatch({ type: "SET_NBR_TB", payload: response.nbr_tb });
                dispatch({ type: "SET_NBR_BB1", payload: response.nbr_bb1 });
                dispatch({ type: "SET_NBR_BB2", payload: response.nbr_bb2 });
                dispatch({ type: "SET_NBR_ME", payload: response.nbr_me });
                dispatch({ type: "SET_NBR_MA", payload: response.nbr_ma });
                dispatch({ type: "SET_NBR_CLASSES", payload: response.nbr_classes });
                dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
                dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
            })
            .catch((error) => {
                // alert(error.toString());
                // this.setState({
                //     modal_title: "Information erreur",
                //     modal_main_text:
                //         "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                //     modal_view: true,
                //     is_loading_home: false,
                //     loading_middle: false,
                // });
            });
    }

    const request_synthese_change = (periode) => {
        dispatch({ type: "SET_PERIODE_FULL", payload: periode });
        dispatch({ type: "SET_TITLE", payload: "Fiche synthèse des résultats / " });

        if (periode === "1") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DE LA 1ère PÉRIODE" });
        } else if (periode === "2") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DE LA 2e PÉRIODE" });
        } else if (periode === "3") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DE LA 3e PÉRIODE" });
        } else if (periode === "4") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DE LA 4e PÉRIODE" });
        } else if (periode === "10") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DES EXAMENS DU PREMIER SEMESTRE" });
        } else if (periode === "11") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DES EXAMENS DU DEUXIÈME SEMESTRE" });
        } else if (periode === "40") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DU PREMIER SEMESTRE" });
        } else if (periode === "50") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DU DEUXIÈME SEMESTRE" });
        } else if (periode === "12") {
            dispatch({ type: "SET_PERIODE_FULL", payload: "DE FIN D'ANNÉE" });
        }

        get_synthese_marks(periode);
    }

    const render_synthese = () => {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                <div className="float-menu-right text-text-md" style={{
                    fontSize: 13
                }}>
                    <select
                        onChange={(val) => request_synthese_change(val.target.value)}
                        // value={periode_synthese}
                        className="bg-background-100 dark:bg-background-20">
                        <option value="12">Synthèse des résultats de fin d'année</option>
                        <option>- - - - - - - - - - - -</option>
                        <option value="1">Première période</option>
                        <option value="2">Deuxième période</option>
                        <option value="3">Troisième période</option>
                        <option value="4">Quatrième période</option>
                        <option>- - - - - - - - - - - -</option>
                        <option value="10">Examen premier semestre</option>
                        <option value="11">Examen deuxième semestre</option>
                        <option>- - - - - - - - - - - -</option>
                        <option value="40">Premier semestre</option>
                        <option value="50">Deuxième semestre</option>
                    </select><br />
                    <PrintDocument div="print-synthese" />
                </div><br />



                <div id="print-synthese">
                    <div>
                        <strong>
                            {(autres.school_name + "").toUpperCase()}
                        </strong>
                        <br />
                        <strong>{autres.school_bp}</strong>
                        {/* <br /> */}
                        {/* <strong>Commune: {autres.school_commune}</strong> */}
                    </div>

                    <div className="float-right-div">
                        <strong>
                            Année scolaire : {annee_scolaire.year_name}
                        </strong>
                    </div>
                    <h3 className="font-bold">SYNTHÈSE DES RÉSULTATS {periode_full}</h3>
                    <table className="w-full" style={{ marginTop: 10 }}>
                        <thead>
                            <tr className="bg-background-50 dark:bg-background-20">
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center", width: 35 }}>No</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center" }}>CLASSES</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center" }}>Nbr ÉlÈVES</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>80% + </th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>70 - 79%</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>60 - 69%</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>50 - 59%</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>40 - 49%</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>30% -</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>MEILLEURE<br />NOTE</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>PLUS BASSE <br />NOTE </th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>MOYENNE</th>
                            </tr>
                            <tr className="bg-background-50 dark:bg-background-20">
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>E</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>TB</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" colSpan="2" style={{ textAlign: "center" }}> B</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>Me</th>
                                <th className="pt-2 pb-2 border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>MA</th>
                            </tr>
                        </thead>
                        {classes_synthese.map((classe, index) => {
                            return (
                                <tbody>
                                    <tr
                                        style={{
                                            backgroundColor:
                                                index % 2 === 0
                                                    ? "rgba(0,0,0,0.015)"
                                                    : "rgba(0,0,0,0.050)",
                                        }}>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>{index + 1}</td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ paddingLeft: 10 }}>
                                            {classe.class_id + " " + classe.section_id + " " + classe.order_id}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.pupils_count}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.ee === "0" ? "" : classe.ee}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.tb === "0" ? "" : classe.tb}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.bb1 === "0" ? "" : classe.bb1}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.bb2 === "0" ? "" : classe.bb2}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.me === "0" ? "" : classe.me}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.ma === "0" ? "" : classe.ma}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.pourcentage_plus}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {classe.pourcentage_min}
                                        </td>
                                        <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center" }}>
                                            {(
                                                parseInt(classe.pre_moyennes) /
                                                parseInt(classe.pupils_count)
                                            )
                                                .toString()
                                                .substr(0, 4)}
                                        </td>
                                    </tr>
                                </tbody>
                            );
                        })}
                        <tfoot>
                            <tr style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    +
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" rowSpan="2" style={{ paddingLeft: 10, fontWeight: "bold" }}>
                                    {nbr_classes}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {all_pupils}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_ee}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_tb}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_bb1}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_bb2}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_me}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {nbr_ma}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}></td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}></td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}></td>
                            </tr>
                            <tr style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_ee) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_tb) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_bb1) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_bb2) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_me) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                                <td className="border border-gray-50 dark:border-gray-20"
                                    style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(nbr_ma) * 100) / all_pupils).toString().substr(0, 4)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {periode_synthese === "12" ? (
                    <>
                        <h3>Application</h3>
                        <div style={{ paddingLeft: 25 }}>
                            <FaCheck /> Le taux de réussite est de {reussites}/
                            {all_pupils}, soit{" "}
                            {((parseInt(reussites) * 100) / all_pupils).toString().substr(0, 4)}
                            <br />
                            <FaCheck /> Le taux de redoublement est de {doubles}/
                            {all_pupils}, soit{" "}
                            {((parseInt(doubles) * 100) / all_pupils).toString().substr(0, 4)}
                            <br />
                            <FaCheck /> Le taux d'échec est de {echecs}/
                            {all_pupils}, soit{" "}
                            {((parseInt(echecs) * 100) / all_pupils).toString().substr(0, 4)}
                            <br />
                            <FaCheck /> La déperdition est de {abandon}/
                            {all_pupils}, soit{" "}
                            {((parseInt(abandon) * 100) / all_pupils).toString().substr(0, 4)}
                        </div>
                    </>
                ) : null}
            </div>
        );
    }

    const new_pupil = () => {
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Nouvel(le) élève | " });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 6 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    const new_worker = () => {
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Ajouter membre du personnel" });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false, });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 16 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    const timetable_settings = () => {
        dispatch({ type: "SET_CLASSE", payload: classes[0] });
        dispatch({ type: "SET_COURSE", payload: classes[0].courses[0] });
        dispatch({ type: "SET_CLASSE_OPEN", payload: true });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 22 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Configration des horaires" });
    }

    const paiement_categories = () => {
        if (modal_paiement_categories === true) {
            dispatch({ type: "SET_MODAL_PAIEMENT_CATEGORIES", payload: false });
        } else {
            dispatch({ type: "SET_MODAL_PAIEMENT_CATEGORIES", payload: true });
            fetch_paiement_categories();
        }
    }

    const open_libelles = () => {
        if (modal_libelles === true) {
            dispatch({ type: "SET_MODAL_LIBELLES", payload: false });
        } else {
            dispatch({ type: "SET_MODAL_LIBELLES", payload: true });
            fetch_libelles();
        }
    }

    const fetch_libelles = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/libelles.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                school_year: annee,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_LIBELLES", payload: response.libelles });
            })
            .catch((error) => { });
    }

    const fetch_paiement_categories = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/paiement_categories.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                school_year: annee,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_PAIEMENT_CATEGORIES", payload: response.paiement_categories });
            })
            .catch((error) => { });
    }

    const new_classe_import = () => {
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Création de classe par upload de fichier Excel " });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 13 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    const fetch_synthese = () => {
        dispatch({ type: "SET_TITLE_MAIN", payload: "Fiche synthèse des résultats" });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 4 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_CLASSE", payload: [] });
        get_synthese_marks(periode_synthese);
    }

    const logout_session = () => {
        dispatch({ type: "SET_REDIRECTTOREFERRER", payload: false });
        dispatch({ type: "SET_USER_OPEN", payload: false });
        sessionStorage.removeItem("assemble_user_data");
        sessionStorage.setItem("classeYambiSMIS", []);
        sessionStorage.clear();
    }

    useEffect(() => {
        get_general_info("");
    }, [])

    if (redirectToReferrer || sessionStorage.getItem("assemble_user_data")) {
        return (
            <div>
                {!is_loading_home ?
                    <div className={`bg-background-100 text-text-100 rounded-lg dark:text-text-20 ${JSONPackageFile.platform === "Desktop" ? "rounded-lg" : null} fixed top-0 bottom-0 right-0 left-0 border border-gray-50 dark:border-gray-20`}>
                        <div className="rounded-lg">
                            <div>
                                <div className="top-bar-app bg-background-100 dark:bg-background-20 rounded-tr-lg shadow-md">
                                    {loadding_header ? <LinearProgress /> : null}
                                    <div className="h-5 bg-background-100 dark:bg-background-20 rounded-tr-lg"></div>
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center flex-auto ml-5">
                                            <FcOpenedFolder color="orange" size={30} />
                                            <h2 className="text-2xl ml-5 font-bold">{school_name_abb.toUpperCase()}</h2>
                                            <div className="ml-5 text-lg text-gray-100"> {" "} / Dossiers / {annee_scolaire.year_name}{" "}
                                            </div>
                                        </div>

                                        <div className="float-menu-topbarrrr flex items-center cursor-pointer">
                                            {loading_footer ? (
                                                <span className="user-home-tools">
                                                    <CircularProgress style={{ color: "rgb(51 143 255)" }} size={20} />
                                                </span>
                                            ) : null}
                                            <div
                                                onClick={() => dispatch({ type: "SET_USER_OPEN", payload: !user_action })}
                                                className="flex items-center h-full text-right pr-5 nodrag">
                                                <span>
                                                    <strong style={{ fontSize: 13 }}>
                                                        {user_poste.toUpperCase()}
                                                    </strong>
                                                    <br />
                                                    <span className="text-gray-100">
                                                        {user_data.user_name}
                                                    </span>
                                                </span>
                                                <button
                                                    onClick={() => { }}
                                                    className="border border-gray-50 dark:border-gray-20 ml-4 rounded-full h-12 w-12 flex  justify-center items-center">
                                                    <FiUser className=" text-text-100 dark:text-background-100" size={15} />
                                                </button>
                                                <FaCircle
                                                    style={{ marginLeft: -13, marginBottom: -13, paddingTop: 20 }}
                                                    size={13}
                                                    color="rgb(0, 180, 0)"
                                                />
                                            </div>
                                        </div>
                                        {/* 
                                <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">

                                </div> */}
                                    </div>

                                    <div className="menu-top-middlerere flex items-baseline ml-5  mt-2 mr-5 pb-1 border-b border-gray-50 dark:border-gray-20">
                                        <div className="flex items-bottom flex-auto">
                                            <div className="font-bold text-lg">
                                                {title_main}{" "}
                                                {middle_func === 4 ? " " + periode_full.toLocaleLowerCase() + " / " : null}{" "}
                                                {annee_scolaire.year_name}
                                            </div>
                                            <div style={{ marginLeft: 20 }} className="select-no-border flex items-center text-text-50">
                                                <FaEdit />
                                                <select
                                                    onChange={(val) => get_general_info(val.target.value)}
                                                    className="nodrag select-no-border-select bg-background-100 dark:bg-background-20 ml-2">
                                                    <option value={annee}>Modifier année</option>
                                                    {annees.map((annee, index) => (
                                                        <option key={index} value={annee.year_id}>
                                                            {annee.year_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="topbar-menu-float-righttt  text-text-50  flex items-center">
                                            {middle_func === 15 ? (
                                                <span
                                                    onClick={new_worker}
                                                    className={`nodrag select-no-border ${middle_func === 6 ? "select-no-border-bold" : ""} flex items-center`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Nouveau membre
                                                </span>
                                            ) : middle_func === 23 ? (
                                                <div
                                                    onClick={timetable_settings}
                                                    className={`nodrag select-no-border ${middle_func === 22 ? "select-no-border-bold" : ""}flex items-center`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Configuration des horaires
                                                </div>
                                            ) : middle_func === 12 ? (
                                                <>
                                                    {/* <span
                                    // onClick={() => this.gestion_depenses()}
                                    style={{ color: 'rgba(0, 80, 180)' }}
                                    className={`select-no-border ${middle_func === 22 ? "select-no-border-bold" : ""}`}>
                                    <FaUserPlus style={{ marginRight: 5 }} />
                                    Gestion des dépenses</span> */}
                                                    <span
                                                        onClick={paiement_categories}
                                                        className={`nodrag select-no-border ${middle_func === 22 ? "" : ""} flex items-center`}>
                                                        <FaUserPlus style={{ marginRight: 5 }} />
                                                        Catégories de paiement
                                                    </span>
                                                </>
                                            ) : (
                                                <div
                                                    onClick={new_pupil}
                                                    className={`nodrag select-no-border ${middle_func === 6 ? "select-no-border-bold" : ""} flex items-center`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Nouveau
                                                </div>
                                            )}

                                            {middle_func === 12 ? (
                                                <span
                                                    onClick={open_libelles}
                                                    className={`nodrag select-no-border ${middle_func === 13 ? "select-no-border-bold" : ""} flex items-center`}>
                                                    <span className="divider-menu-topbar"></span>
                                                    <FiEdit style={{ size: 17, marginRight: 5 }} />
                                                    Libéllés
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={new_classe_import}
                                                    className={`nodrag select-no-border ${middle_func === 13 ? "select-no-border-bold" : ""} flex items-center`}>
                                                    <span className="divider-menu-topbar"></span>
                                                    <FaClipboard style={{ size: 17, marginRight: 5 }} />
                                                    Uploader une classe
                                                </span>
                                            )}

                                            <span
                                                onClick={fetch_synthese}
                                                className={`nodrag select-no-border ${middle_func === 4 ? "select-no-border-bold" : ""} flex items-center`}>
                                                <span className="divider-menu-topbar"></span>
                                                <FaPaperclip style={{ size: 12 }} />
                                                Synthèse des résultats
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="main-menu-left bg-background-50 dark:bg-background-20 border-r border-gray-50 dark:border-gray-20 rounded-l-xl">
                                    <Classes type={1} />
                                </div>

                                <div className="main-middle-page bg-background-100 dark:bg-background-20">
                                    <div className="sub-div-main">
                                        {loading_middle ? (
                                            <div
                                                className="progress-center-main"
                                                style={{ alignItems: "center" }}>
                                                <CircularProgress style={{ color: "rgb(0, 80, 180)" }} />
                                                <br />
                                                Chargement des données...
                                            </div>
                                        ) : (
                                            <div>
                                                <EmployeesList />

                                                {/* {middle_func === 22 ? (
                                                    <div className="menu-right">
                                                        <CoursesTimetableConfigurator />
                                                    </div>
                                                ) : null} */}

                                                {allow_right_menu && class_open ? (<RightClasseMenu />) : null}

                                                {allow_right_menu_pupils ? (<PupilsRightMenu />) : null}

                                                <div className="center-fixed border-r border-gray-50 dark:border-gray-20">
                                                    <div style={{ paddingLeft: 20, paddingRight: 10 }}>
                                                        {middle_func === 1 ? (<ListeNomminative />) : null}

                                                        {middle_func === 0 ? (<div><MenuHome /></div>) : null}

                                                        {middle_func === 2 ? (<div>
                                                            {marks_tab === "FPE" ? (<FichePointsPupils />) : null}

                                                            {marks_tab === "FPC" ? (<FichesPointsCourses />) : null}
                                                        </div>) : null}

                                                        {middle_func === 3 ? <PalmaresPupils /> : null}

                                                        {middle_func === 10 ? <PalmaresFinal /> : null}

                                                        {middle_func === 4 ? render_synthese() : null}

                                                        {middle_func === 5 ? (
                                                            <div id="fiches">
                                                                {fiches_tab === "FI" ? (<div id="fiche-identity">{<FicheIdentites />}</div>) : null}

                                                                {fiches_tab === "FO" ? (<div id="fiche-observation"> {/* {<FicheObservationPoints />} */} </div>) : null}

                                                                {fiches_tab === "E13" ? (<div id="fiche-e133"> <FicheE13 /> </div>) : null}

                                                                {fiches_tab === "E80" ? (<div id="fiche-e800">{/* {<FicheE80 />} */}</div>) : null}
                                                            </div>
                                                        ) : null}

                                                        {middle_func === 6 ? <NewPupil /> : null}

                                                        {middle_func === 7 ? (<Bulletins />) : null}

                                                        {middle_func === 8 ? (<div><PaiementsClasse /></div>) : null}

                                                        {middle_func === 9 ? (<div> <Courses /> </div>) : null}

                                                        {middle_func === 11 ? (<ViewPupil />) : null}

                                                        {middle_func === 12 ? (<StatistiquesCaisse />) : null}

                                                        {middle_func === 13 ? (<NewClasseImport />) : null}

                                                        {middle_func === 15 ? (<GestionPersonnel />) : null}

                                                        {middle_func === 16 ? (<AddWorker />) : null}

                                                        {middle_func === 22 ? (<TimetableSettings />) : null}

                                                        {middle_func === 23 ? (<ProfsTimetable />) : null}

                                                        {middle_func === 24 ? (<ClassePaiementCategorisation />) : null}

                                                        {middle_func === 14 ? (<SettingsBulletins />) : null}

                                                        {middle_func === 26 ? (<FichePointsBrouillon />) : null}

                                                        {middle_func === 27 ? (<FicheSynthesePointsBrouillon />) : null}

                                                        {middle_func === 28 ? (<BulletinsBrouillon />) : null}

                                                        {middle_func === 29 ? (<BulletinsType2Brouillon />) : null}

                                                        {middle_func === 30 ? (<ViewWorker />) : null}

                                                        {middle_func === 31 ? (<Conduites />) : null}

                                                        {middle_func === 32 ? (<FichesPoints />) : null}

                                                        {middle_func === 33 ? (<BulletinsSmall />) : null}

                                                        {middle_func === 34 ? (<Migrations />) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {middle_func === 22 ? (
                                    <CoursesTimetableConfigurator />
                                ) : null}

                                <Footer />
                                {modal_paiement_categories ? <PaiementCategories /> : null}

                                {user_open ? <UserOpen /> : null}

                                {modal_libelles ? <Libelles /> : null}

                                {modal_selections ? <ModalFrame type={1} /> : null}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-background-100 dark:bg-background-20 flex items-center justify-center rounded-lg">
                        <div className="text-center">
                            <img src={vector} width="400" alt='Yambi Class SMIS' />
                            <div className="mt-5 text-gray-100">{title_main}</div>
                            <CircularProgress className="mt-3" style={{ color: "rgb(51 143 255)" }} size={25} />
                        </div>
                    </div>
                }
            </div>
        );
    } else {
        return <Navigate to={"/signin"} />;
    }
}

export default Home;
