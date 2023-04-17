import React, { Component } from "react";
import { Button, LinearProgress } from "@material-ui/core";
import Footer from "../../includes/footer";
import { FaCircle, FaCheck, FaHome, FaUserPlus, FaClipboard, FaPaperclip, FaEdit, FaBell, FaCloudUploadAlt, } from "react-icons/fa";
import { RiSettings4Fill } from "react-icons/ri";
import { FiEdit, FiLogOut, FiRefreshCcw, FiUser } from "react-icons/fi";
import modalView from "../../includes/modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, Navigate } from "react-router-dom";
import FicheIdentites from "../../components/classe/fiche_identites";
import FichePointsPupils from "../../components/classe/fiche_points_pupils";
import FichesPointsCourses from "../../components/classe/fiche_points_courses";
import PalmaresPupils from "../../components/classe/palmares_classe";
import FicheObservationPoints from "../../components/classe/fiche_observation";
import NewPupil from "../../components/pupil/new_pupil";
import ListeNomminative from "../../components/classe/liste_nomminative";
import Bulletins from "../../components/classe/bulletins";
import StatistiquesCaisse from "../../components/paiements/stats_caisse";
import FicheE13 from "../../components/classe/fiche_e13";
import FicheE80 from "../../components/classe/fiche_e80";
import Courses from "../../components/classe/courses";
import { home_redirect, http, online, url_online } from "../../global_vars";
import { connect } from "react-redux";
import PalmaresFinal from "../../components/classe/palmares_final";
import ViewPupil from "../../components/pupil/view_pupil";
import { mapStateToProps } from "../../store/state_props";
import MenuHome from "./menu_home";
import NewClasseImport from "../../components/classe/new_class_import";
import SettingsBulletins from "../../sub_pages/settings_bulletins";
import GestionPersonnel from "../../components/workers/gestion_personnel";
import AddWorker from "../../components/workers/add_worker";
import EmployeesList from "../../components/workers/list_workers";
import TimetableSettings from "../../components/timetable/timetable_settings";
import CoursesTimetableConfigurator from "../../components/timetable/courses_timetable_config";
import RightClasseMenu from "../../components/classe/right_menu";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
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
import HeaderMenuLeft from "../../includes/header_menu_left";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_data: [],
            user_poste: "",
            url_server: "",
            classes: [],
            annees: [],
            class_numbers: [],
            orders: [],
            sections: [],
            options: [],
            annee: "",
            school_name: "",
            school_name_abb: "",
            attributions: [],
            is_loading_home: false,
            loading_middle: false,
            annee_scolaire: [],
            title_main: "Année scolaire",
            classe: [],
            autres: [],
            middle_func: 0,
            marks_tab: "",
            class_open: false,
            periode_synthese: "12",
            classes_synthese: [],
            all_pupils: 0,
            nbr_ee: 0,
            nbr_tb: 0,
            nbr_bb1: 0,
            nbr_bb2: 0,
            nbr_me: 0,
            nbr_ma: 0,
            nbr_classes: 0,
            periode_full: "DE FIN D'ANNÉE",
            modal_view: false,
            logout_open: false,
            loading_class: false,
            courses_count: 0,
            allow_right_menu: false,
            allow_right_menu_pupils: true,
            fiches_tab: "",
            class_loading: 0,
            pupils_school: [],
            pupils_list: [],
            pupils_count: 0,
            number_pupils_show: false,
            reussites: 0,
            doubles: 0,
            echecs: 0,
            abandon: 0,
            pupil: [],
            can_load_data: false,
            modal_paiement_categories: false,
        };
    }

    printContent(divName) {
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = http + this.state.url_server + home_redirect;
        window.location.replace(http + this.state.url_server + home_redirect);
    }

    get_general_info(annee) {
        let user = sessionStorage.getItem("assemble_user_data");
        let url_server = sessionStorage.getItem("yambi_smis_url_server");
        user = JSON.parse(user);
        this.setState({ can_load_data: false });

        this.props.dispatch({ type: "SET_USER_CONNECTED", payload: user });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        this.props.dispatch({
            type: "SET_ALLOW_RIGHT_MENU_PUPILS",
            payload: false,
        });
        this.props.dispatch({ type: "SET_CLASS_OPEN", payload: false });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 0 });
        this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: true });
        this.props.dispatch({ type: "SET_LOADING_HOME", payload: true });
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({ type: "SET_MARKS_TAB", payload: "" });
        this.props.dispatch({ type: "SET_URL_SERVER", payload: url_server });
        this.props.dispatch({
            type: "SET_TITLE_MAIN",
            payload: "Chargement des données générales...",
        });

        if (user === null) {
        } else {
            if (parseInt(user.poste) === 0) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Admin" });
            } else if (parseInt(user.poste) === 1) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Promoteur" });
            } else if (parseInt(user.poste) === 2) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Discipline" });
            } else if (parseInt(user.poste) === 3) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Finances" });
            } else if (parseInt(user.poste) === 4) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Secrétaire" });
            } else if (parseInt(user.poste) === 5) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Enseignant" });
            } else if (parseInt(user.poste) === 6) {
                this.props.dispatch({ type: "SET_POSTE", payload: "Caisse" });
            } else if (parseInt(user.poste) === 7) {
                this.props.dispatch({
                    type: "SET_POSTE",
                    payload: "Directeur des études",
                });
            } else {
                alert(
                    "Cet utilisateur est invalide. Vous devez vous reconnecter pour accéder aux services."
                );
                this.logout_session();
            }
        }

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_info_home.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                annee: annee,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                const promise_general_info_home = new Promise((resolve, reject) => {
                    this.props.dispatch({ type: "SET_CLASSES", payload: response.classes, });
                    this.props.dispatch({ type: "SET_PUPILS_COUNT_PAIEMENTS", payload: response.pupils_count_paiements, });
                    this.props.dispatch({ type: "SET_MONTANT_TOTAL", payload: response.montant_paye, });
                    this.props.dispatch({ type: "SET_AUTRES", payload: response.autres });
                    this.props.dispatch({ type: "SET_ANNEES", payload: response.annees });
                    this.props.dispatch({ type: "SET_CLASS_NUMBERS", payload: response.class_numbers, });
                    this.props.dispatch({ type: "SET_ORDERS", payload: response.orders });
                    this.props.dispatch({ type: "SET_CYCLES", payload: response.cycles });
                    this.props.dispatch({ type: "SET_SECTIONS", payload: response.sections, });
                    this.props.dispatch({ type: "SET_OPTIONS", payload: response.options, });
                    this.props.dispatch({ type: "SET_ANNEE_SCOLAIRE", payload: response.annee_scolaire, });
                    this.props.dispatch({ type: "SET_ANNEE", payload: response.annee });
                    this.props.dispatch({ type: "SET_SCHOOL_NAME", payload: response.school_name, });
                    this.props.dispatch({ type: "SET_ATTRIBUTIONS", payload: response.attributions, });
                    this.props.dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count, });
                    this.props.dispatch({ type: "SET_PUPILS_COUNT_MALE", payload: response.pupils_count_male, });
                    this.props.dispatch({ type: "SET_PUPILS_COUNT_FEMALE", payload: response.pupils_count_female, });
                    this.props.dispatch({ type: "SET_SCHOOL_NAME_ABB", payload: response.school_name_abb, });
                    this.props.dispatch({ type: "SET_REUSSITES", payload: response.reussites, });
                    this.props.dispatch({ type: "SET_DOUBLES", payload: response.doubles, });
                    this.props.dispatch({ type: "SET_ECHECS", payload: response.echecs });
                    this.props.dispatch({ type: "SET_ABANDON", payload: response.abandon, });
                    this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true, });
                    this.props.dispatch({ type: "SET_LIBELLES", payload: response.libelles, });
                    this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire", });
                    this.props.dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils, });
                    this.props.dispatch({ type: "SET_PUPILS", payload: response.pupils });
                    this.props.dispatch({ type: "SET_SELECTIONS", payload: response.selections, });
                    this.props.dispatch({ type: "SET_PAIEMENT_CATEGORIES", payload: response.paiement_categories, });
                    resolve();
                }).then(() => { });

                promise_general_info_home.finally(() => {
                    this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                    this.props.dispatch({ type: "SET_LOADING_HOME", payload: false });
                });

                // this.props.dispatch({ type: "SET_PPS", payload: response.pupils });

                // this.setState({can_load_data:true});

                // this.parse_classes(response.classes);

                // this.setState({ modal_title: "Synchronisation des données", modal_main_text: "Pas de pannique ! Après un bon nombre d'enregistrements des informations dans le logiciel, souvenez-vous de les synchroniser au travers du bouton d'upload des données dans la topbar du logiciel.", modal_view: true });
            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_HOME", payload: false });
                this.setState({
                    modal_title: "Information erreur",
                    modal_main_text:
                        "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                    modal_view: true,
                    is_loading_home: false,
                    can_load_data: false,
                    loading_middle: false,
                });
            });
    }

    collect_data() {
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        const data = this.props.annee_scolaire.year_id;
        const url_server = this.props.url_server;
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/collect_data.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                annee: data,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                // setTimeout(() => {
                this.sync_data(response);
                // },2000);
            })
            .catch((error) => {
                this.setState({
                    modal_title: "Information erreur",
                    modal_main_text:
                        "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                    modal_view: true,
                    is_loading_home: false,
                    loading_middle: false,
                });
            });
    }

    sync_data(data) {
        const url_server = url_online;
        const BaseURL = http + url_server + "/yambi_class_SMIS/API/sync_data.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                data: data,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                if (response.success === "1") {
                    this.setState({
                        modal_title: "Opération réussie",
                        modal_main_text:
                            "La synchronisation des données a été effectuée avec succès.",
                        modal_view: true,
                        is_loading_home: false,
                        loading_middle: false,
                    });
                }
            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({
                    modal_title: "Information erreur",
                    modal_main_text:
                        "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                    modal_view: true,
                    is_loading_home: false,
                    loading_middle: false,
                });
            });
    }

    get_synthese_marks(periode) {
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: true });

        let BaseURL =
            http + this.props.url_server + "/yambi_class_SMIS/API/get_synthese.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                annee: this.props.annee,
                periode: periode,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch({
                    type: "SET_CLASSES_SYNTHESE",
                    payload: response.classes,
                });
                this.props.dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                this.props.dispatch({
                    type: "SET_ALL_PUPILS",
                    payload: response.all_pupils,
                });
                this.props.dispatch({ type: "SET_NBR_EE", payload: response.nbr_ee });
                this.props.dispatch({ type: "SET_NBR_TB", payload: response.nbr_tb });
                this.props.dispatch({ type: "SET_NBR_BB1", payload: response.nbr_bb1 });
                this.props.dispatch({ type: "SET_NBR_BB2", payload: response.nbr_bb2 });
                this.props.dispatch({ type: "SET_NBR_ME", payload: response.nbr_me });
                this.props.dispatch({ type: "SET_NBR_MA", payload: response.nbr_ma });
                this.props.dispatch({
                    type: "SET_NBR_CLASSES",
                    payload: response.nbr_classes,
                });
                this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
                this.props.dispatch({
                    type: "SET_ALLOW_RIGHT_MENU_PUPILS",
                    payload: true,
                });
            })
            .catch((error) => {
                // alert(error.toString());
                this.setState({
                    modal_title: "Information erreur",
                    modal_main_text:
                        "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.",
                    modal_view: true,
                    is_loading_home: false,
                    loading_middle: false,
                });
            });
    }

    request_synthese_change(periode) {
        this.props.dispatch({ type: "SET_PERIODE_FULL", payload: periode });
        this.props.dispatch({
            type: "SET_TITLE",
            payload: "Fiche synthèse des résultats / ",
        });
        if (periode === "1") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DE LA 1ère PÉRIODE",
            });
        } else if (periode === "2") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DE LA 2e PÉRIODE",
            });
        } else if (periode === "3") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DE LA 3e PÉRIODE",
            });
        } else if (periode === "4") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DE LA 4e PÉRIODE",
            });
        } else if (periode === "10") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DES EXAMENS DU PREMIER SEMESTRE",
            });
        } else if (periode === "11") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DES EXAMENS DU DEUXIÈME SEMESTRE",
            });
        } else if (periode === "40") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DU PREMIER SEMESTRE",
            });
        } else if (periode === "50") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DU DEUXIÈME SEMESTRE",
            });
        } else if (periode === "12") {
            this.props.dispatch({
                type: "SET_PERIODE_FULL",
                payload: "DE FIN D'ANNÉE",
            });
        }

        this.get_synthese_marks(periode);
    }

    render_synthese() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                <div className="float-menu-right">
                    <select
                        onChange={(val) => this.request_synthese_change(val.target.value)}
                        style={{ color: "rgba(0, 80, 180)" }}
                        value={this.props.periode_syhntese}
                        className="select-no-border"
                    >
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
                    </select>
                </div>

                <div
                    onClick={() => this.printContent("print-synthese")}
                    className="span-blockk"
                >
                    IMPRIMER
                </div>

                <div id="print-synthese">
                    <div>
                        <strong>
                            {(this.props.autres.school_name + "").toUpperCase()}
                        </strong>
                        <br />
                        <strong>{this.props.autres.school_bp}</strong>
                        <br />
                        <strong>Commune: {this.props.autres.school_commune}</strong>
                    </div>

                    <div className="float-right-div">
                        <strong>
                            Année scolaire : {this.props.annee_scolaire.year_name}
                        </strong>
                    </div>
                    <h3>SYNTHÈSE DES RÉSULTATS {this.props.periode_full}</h3>
                    <table className="full-table-liste-markss" style={{ marginTop: 10 }}>
                        <thead>
                            <tr>
                                <th rowSpan="2" style={{ textAlign: "center", width: 20 }}>
                                    No
                                </th>
                                <th rowSpan="2" style={{ textAlign: "center" }}>
                                    CLASSES
                                </th>
                                <th rowSpan="2" style={{ textAlign: "center" }}>
                                    Nbr ÉlÈVES
                                </th>
                                <th style={{ textAlign: "center" }}>80% + </th>
                                <th style={{ textAlign: "center" }}>70 - 79%</th>
                                <th style={{ textAlign: "center" }}>60 - 69%</th>
                                <th style={{ textAlign: "center" }}>50 - 59%</th>
                                <th style={{ textAlign: "center" }}>40 - 49%</th>
                                <th style={{ textAlign: "center" }}>30% -</th>
                                <th rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>
                                    MEILLEURE
                                    <br />
                                    NOTE
                                </th>
                                <th rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>
                                    PLUS BASSE
                                    <br />
                                    NOTE
                                </th>
                                <th rowSpan="2" style={{ textAlign: "center", fontSize: 12 }}>
                                    MOYENNE
                                </th>
                            </tr>
                            <tr>
                                <th style={{ textAlign: "center" }}>E</th>
                                <th style={{ textAlign: "center" }}>TB</th>
                                <th colSpan="2" style={{ textAlign: "center" }}>
                                    B
                                </th>
                                <th style={{ textAlign: "center" }}>Me</th>
                                <th style={{ textAlign: "center" }}>MA</th>
                            </tr>
                        </thead>
                        {this.props.classes_synthese.map((classe, index) => {
                            return (
                                <tbody>
                                    <tr
                                        style={{
                                            backgroundColor:
                                                index % 2 === 0
                                                    ? "rgba(0,0,0,0.015)"
                                                    : "rgba(0,0,0,0.050)",
                                        }}
                                    >
                                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                                        <td style={{ paddingLeft: 10 }}>
                                            {classe.class_id +
                                                " " +
                                                classe.section_id +
                                                " " +
                                                classe.order_id}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.pupils_count}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.ee === "0" ? "" : classe.ee}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.tb === "0" ? "" : classe.tb}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.bb1 === "0" ? "" : classe.bb1}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.bb2 === "0" ? "" : classe.bb2}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.me === "0" ? "" : classe.me}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.ma === "0" ? "" : classe.ma}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.pourcentage_plus}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
                                            {classe.pourcentage_min}
                                        </td>
                                        <td style={{ textAlign: "center" }}>
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
                                <td
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}
                                >
                                    +
                                </td>
                                <td rowSpan="2" style={{ paddingLeft: 10, fontWeight: "bold" }}>
                                    {this.props.nbr_classes}
                                </td>
                                <td
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}
                                >
                                    {this.props.all_pupils}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_ee}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_tb}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_bb1}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_bb2}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_me}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {this.props.nbr_ma}
                                </td>
                                <td
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}
                                ></td>
                                <td
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}
                                ></td>
                                <td
                                    rowSpan="2"
                                    style={{ textAlign: "center", fontWeight: "bold" }}
                                ></td>
                            </tr>
                            <tr style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(this.props.nbr_ee) * 100) / this.props.all_pupils)
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(this.props.nbr_tb) * 100) / this.props.all_pupils)
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {(
                                        (parseInt(this.props.nbr_bb1) * 100) /
                                        this.props.all_pupils
                                    )
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {(
                                        (parseInt(this.props.nbr_bb2) * 100) /
                                        this.props.all_pupils
                                    )
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(this.props.nbr_me) * 100) / this.props.all_pupils)
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                                <td style={{ textAlign: "center", fontWeight: "bold" }}>
                                    {((parseInt(this.props.nbr_ma) * 100) / this.props.all_pupils)
                                        .toString()
                                        .substr(0, 4)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {this.props.periode_synthese === "12" ? (
                    <>
                        <h3>Application</h3>
                        <div style={{ paddingLeft: 25 }}>
                            <FaCheck /> Le taux de réussite est de {this.props.reussites}/
                            {this.props.all_pupils}, soit{" "}
                            {((parseInt(this.props.reussites) * 100) / this.props.all_pupils)
                                .toString()
                                .substr(0, 4)}
                            <br />
                            <FaCheck /> Le taux de redoublement est de {this.props.doubles}/
                            {this.props.all_pupils}, soit{" "}
                            {((parseInt(this.props.doubles) * 100) / this.props.all_pupils)
                                .toString()
                                .substr(0, 4)}
                            <br />
                            <FaCheck /> Le taux d'échec est de {this.props.echecs}/
                            {this.props.all_pupils}, soit{" "}
                            {((parseInt(this.props.echecs) * 100) / this.props.all_pupils)
                                .toString()
                                .substr(0, 4)}
                            <br />
                            <FaCheck /> La déperdition est de {this.props.abandon}/
                            {this.props.all_pupils}, soit{" "}
                            {((parseInt(this.props.abandon) * 100) / this.props.all_pupils)
                                .toString()
                                .substr(0, 4)}
                        </div>
                    </>
                ) : null}
            </div>
        );
    }

    back_home() {
        const classe = { pupils: [] };
        this.props.dispatch({ type: "SET_CLASSE", payload: classe });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire" });
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 0 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    parse_classes(data) {
        setTimeout(() => {
            for (let i in data) {
                this.load_class_data(data[i]);
            }
        }, 3000);
    }

    new_pupil() {
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({
            type: "SET_TITLE_MAIN",
            payload: "Nouvel(le) élève | ",
        });
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 6 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    new_worker() {
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({
            type: "SET_TITLE_MAIN",
            payload: "Ajouter membre du personnel",
        });
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        this.props.dispatch({
            type: "SET_ALLOW_RIGHT_MENU_PUPILS",
            payload: false,
        });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 16 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    timetable_settings() {
        this.props.dispatch({ type: "SET_CLASSE", payload: this.props.classes[0] });
        this.props.dispatch({
            type: "SET_COURSE",
            payload: this.props.classes[0].courses[0],
        });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Horaires" });
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: true });
        this.props.dispatch({
            type: "SET_ALLOW_RIGHT_MENU_PUPILS",
            payload: false,
        });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 22 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
    }

    paiement_categories() {
        if (this.props.modal_paiement_categories === true) {
            this.props.dispatch({
                type: "SET_MODAL_PAIEMENT_CATEGORIES",
                payload: false,
            });
        } else {
            this.props.dispatch({
                type: "SET_MODAL_PAIEMENT_CATEGORIES",
                payload: true,
            });
            this.fetch_paiement_categories();
        }
    }

    open_libelles() {
        if (this.props.modal_libelles === true) {
            this.props.dispatch({ type: "SET_MODAL_LIBELLES", payload: false });
        } else {
            this.props.dispatch({ type: "SET_MODAL_LIBELLES", payload: true });
            this.fetch_libelles();
        }
    }

    fetch_libelles() {
        let BaseURL =
            http + this.props.url_server + "/yambi_class_SMIS/API/libelles.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                school_year: this.props.annee,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch({
                    type: "SET_LIBELLES",
                    payload: response.libelles,
                });
            })
            .catch((error) => { });
    }

    fetch_paiement_categories() {
        let BaseURL =
            http +
            this.props.url_server +
            "/yambi_class_SMIS/API/paiement_categories.php";

        fetch(BaseURL, {
            method: "POST",
            body: JSON.stringify({
                school_year: this.props.annee,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.props.dispatch({
                    type: "SET_PAIEMENT_CATEGORIES",
                    payload: response.paiement_categories,
                });
            })
            .catch((error) => { });
    }

    new_classe_import() {
        // this.setState({
        //     middle_func: 6,
        //     marks_tab: "",
        //     allow_right_menu: false,
        //     allow_right_menu_pupils: true,
        //     class_open: false,
        //     classe: [],
        //     title_main: "Nouvel(le) élève | ",
        // });

        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.props.dispatch({
            type: "SET_TITLE_MAIN",
            payload: "Création de classe par upload de fichier Excel ",
        });
        this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 13 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
    }

    paiements_classe() {
        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Nouvel(le) élève | " });
        // this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 8 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
    }

    fetch_synthese() {
        // this.setState({
        //     middle_func: 4,
        //     marks_tab: "",
        //     title_main: "Fiche synthèse des résultats",
        //     allow_right_menu: false,
        //     classe: [],
        //     allow_right_menu_pupils: false
        // });
        this.props.dispatch({
            type: "SET_TITLE_MAIN",
            payload: "Fiche synthèse des résultats",
        });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 4 });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        this.props.dispatch({
            type: "SET_ALLOW_RIGHT_MENU_PUPILS",
            payload: false,
        });
        this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        this.get_synthese_marks(this.state.periode_synthese);
    }

    logout_session() {
        this.setState({ middle_func: 0, loading_middle: true });

        // if (this.props.middle_func === 0) {
        this.setState({ redirectToReferrer: false, loading_middle: false });
        sessionStorage.removeItem("assemble_user_data");
        sessionStorage.setItem("classeYambiSMIS", []);
        sessionStorage.clear();
        // }
    }

    refresh_window() {
        // let url_server = sessionStorage.getItem('yambi_smis_url_server');
        //     window.location.href = "http://" + this.state.url_server + home_redirect;
        // window.location.replace( "http://" + this.state.url_server + home_redirect);

        // window.location.href = "http://" + url_server + ":3000" + home_redirect;
        // window.location.replace( "http://" + url_server + ":3000" + home_redirect);

        this.get_general_info("");
    }

    componentDidMount() {
        this.get_general_info("");
    }

    render() {
        if (
            this.state.redirectToReferrer ||
            sessionStorage.getItem("assemble_user_data")
        ) {
        } else {
            return <Navigate to={"/signin"} />;
        }

        return (
            <div className={`bg-primary-100 text-text-100 dark:text-text-20 ${JSONPackageFile.platform === "Desktop" ? "rounded-xl" : null} fixed top-0 bottom-0 right-0 left-0`}>
                <div className=" rounded-xl">
                    <div>
                        <div className="top-bar-app bg-background-100 dark:bg-background-20 rounded-xl">
                            {this.props.loadding_header ? <LinearProgress /> : null}
                            <div className="h-5 bg-background-100 dark:bg-background-20"></div>
                            <div className="flex items-center w-full">
                                <div className="flex items-center flex-auto ml-5">
                                    <FcOpenedFolder color="orange" size={30} />
                                    <h2 className="text-2xl ml-5 font-bold">{this.props.school_name_abb.toUpperCase()}</h2>
                                    <div className="ml-5 text-xl text-gray-100"> {" "} / Dossiers / {this.props.annee_scolaire.year_name}{" "}
                                    </div>
                                </div>

                                <div className="float-menu-topbar">
                                    {this.props.loading_footer ? (
                                        <span className="user-home-tools">
                                            <CircularProgress
                                                style={{ color: "rgb(0, 80, 180)" }}
                                                size={17}
                                            />
                                        </span>
                                    ) : null}

                                    <span
                                        title="Revenir au menu principal"
                                        className="user-home-tools"
                                        onClick={() => this.back_home()}>
                                        <FaHome size={20} />
                                    </span>

                                    {!online ? (
                                        <span
                                            title="Synchroniser les données"
                                            onClick={() => this.collect_data()}
                                            className="user-home-tools">
                                            <FaCloudUploadAlt size={22} />
                                        </span>
                                    ) : null}

                                    <span title="Notifications" className="user-home-tools">
                                        <FaBell size={20} />
                                    </span>

                                    {/* <span title="Notifications"
                                onClick={() => this.props.dispatch({ type: "SET_MODAL_SELECTIONS", payload: true })}
                                className="user-home-tools">
                                <FaBell color="black" size={20} />
                            </span> */}

                                    <span
                                        title="Rafraîchir les données"
                                        onClick={() => this.refresh_window()}
                                        className="user-home-tools">
                                        <FiRefreshCcw size={20} />
                                    </span>

                                    <Link
                                        title="Configurations"
                                        className="user-home-tools"
                                        to={"/settings"}>
                                        <RiSettings4Fill size={22} />
                                    </Link>

                                    {/* {this.state.logout_open ? (
                                <span
                                    title="Déconnexion"
                                    onClick={() => this.logout_session()}
                                    className="user-home-tools"
                                    style={{ fontSize: 15 }}>
                                    <div className="deconnexion">
                                        <FiLogOut
                                            color="white"
                                            size={12}
                                            style={{ marginRight: 10 }}
                                        />
                                        Quitter wfhgirhiuewhgiuhreuighweiughiurehgiuerhiu
                                    </div>
                                </span>
                            ) : null} */}
                                    <span onClick={() => this.state.logout_open ? this.setState({ logout_open: false }) : this.setState({ logout_open: true })}
                                        style={{
                                            display: "inline-block",
                                            textAlign: "right",
                                            marginRight: 10,
                                        }}>
                                        <strong style={{ fontSize: 13 }}>
                                            {this.props.user_poste.toUpperCase()}
                                        </strong>
                                        <br />
                                        <span className="text-gray-100">
                                            {this.props.user_data.user_name}
                                        </span>
                                    </span>
                                    <span
                                        onClick={() =>
                                            this.state.logout_open
                                                ? this.setState({ logout_open: false })
                                                : this.setState({ logout_open: true })
                                        }
                                        className="user-home">
                                        <FiUser color="black" size={15} />
                                    </span>
                                    <FaCircle
                                        style={{ marginLeft: -13, marginBottom: -13, paddingTop: 20 }}
                                        size={13}
                                        color="rgb(0, 180, 0)"
                                    />
                                </div>
                            </div>

                            <div className="menu-top-middlerere flex items-baseline ml-5 mr-5 mt-2">
                                <div className="flex items-bottom flex-auto">
                                    <div className="font-bold text-lg">
                                        {this.props.title_main}{" "}
                                        {this.props.middle_func === 4 ? " " + this.state.periode_full.toLocaleLowerCase() + " / " : null}{" "}
                                        {this.props.annee_scolaire.year_name}
                                    </div>
                                    <div style={{ marginLeft: 20 }} className="select-no-border flex items-center text-text-50">
                                        <FaEdit />
                                        <select
                                            onChange={(val) => this.get_general_info(val.target.value)}
                                            className="nodrag select-no-border-select bg-background-100 dark:bg-background-20 ml-2">
                                            <option value={this.props.annee}>Modifier année</option>
                                            {this.props.annees.map((annee, index) => (
                                                <option key={index} value={annee.year_id}>
                                                    {annee.year_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    </div>

                                        <div className="topbar-menu-float-righttt  text-text-50  flex items-center">
                                            {this.props.middle_func === 15 ? (
                                                <span
                                                    onClick={() => this.new_worker()}
                                                    className={`nodrag select-no-border ${this.props.middle_func === 6 ? "select-no-border-bold"  : ""} flex items-center`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Nouveau membre
                                                </span>
                                            ) : this.props.middle_func === 23 ? (
                                                <span
                                                    onClick={() => this.timetable_settings()}
                                                    className={`nodrag select-no-border ${this.props.middle_func === 22
                                                        ? "select-no-border-bold"
                                                        : ""
                                                        }`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Configuration des horaires
                                                </span>
                                            ) : this.props.middle_func === 12 ? (
                                                <>
                                                    {/* <span
                                    // onClick={() => this.gestion_depenses()}
                                    style={{ color: 'rgba(0, 80, 180)' }}
                                    className={`select-no-border ${this.props.middle_func === 22 ? "select-no-border-bold" : ""}`}>
                                    <FaUserPlus style={{ marginRight: 5 }} />
                                    Gestion des dépenses</span> */}
                                                    <span
                                                        onClick={() => this.paiement_categories()}
                                                        className={`nodrag select-no-border ${this.props.middle_func === 22 ? "select-no-border-bold"  : "" } flex items-center`}>
                                                        <FaUserPlus style={{ marginRight: 5 }} />
                                                        Catégories de paiement
                                                    </span>
                                                </>
                                            ) : (
                                                <div
                                                    onClick={() => this.new_pupil()}
                                                    className={`nodrag select-no-border ${this.props.middle_func === 6 ? "select-no-border-bold"  : "" } flex items-center`}>
                                                    <FaUserPlus style={{ marginRight: 5 }} />
                                                    Nouveau
                                                </div>
                                            )}

                                            {this.props.middle_func === 12 ? (
                                                <span
                                                    onClick={() => this.open_libelles()}
                                                    className={`nodrag select-no-border ${this.props.middle_func === 13 ? "select-no-border-bold"  : ""  } flex items-center`}>
                                                    <span className="divider-menu-topbar"></span>
                                                    <FiEdit style={{ size: 17, marginRight: 5 }} />
                                                    Libéllés
                                                </span>
                                            ) : (
                                                <span
                                                    onClick={() => this.new_classe_import()}
                                                    className={`nodrag select-no-border ${this.props.middle_func === 13 ? "select-no-border-bold" : ""  } flex items-center`}>
                                                    <span className="divider-menu-topbar"></span>
                                                    <FaClipboard style={{ size: 17, marginRight: 5 }} />
                                                    Uploader une classe
                                                </span>
                                            )}

                                            <span
                                                onClick={() => this.fetch_synthese()}
                                                className={`nodrag select-no-border ${this.props.middle_func === 4 ? "select-no-border-bold" : "" } flex items-center`}>
                                                <span className="divider-menu-topbar"></span>
                                                <FaPaperclip style={{ size: 12 }} />
                                                Synthèse des résultats
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="main-menu-left rounded-xl">
                                    <Classes type={1} />
                                </div>

                                <div className="main-middle-page">
                                    <div className="sub-div-main">
                                        {this.props.loading_middle ? (
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

                                                {this.props.middle_func === 22 ? (
                                                    <div className="menu-right">
                                                        <CoursesTimetableConfigurator />
                                                    </div>
                                                ) : null}

                                                {this.props.allow_right_menu && this.props.class_open ? (
                                                    <RightClasseMenu />
                                                ) : null}

                                                {this.props.allow_right_menu_pupils ? (
                                                    <PupilsRightMenu />
                                                ) : null}

                                                <div className="center-fixed">
                                                    <div style={{ paddingLeft: 20, paddingRight: 10 }}>
                                                        {this.props.middle_func === 1 ? (
                                                            <div id="liste-nomminative">
                                                                <ListeNomminative />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 11 ? (
                                                            <div id="view_pupil">
                                                                <ViewPupil />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 12 ? (
                                                            <div id="stats_caisse">
                                                                <StatistiquesCaisse />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 13 ? (
                                                            <div id="class-import">
                                                                <NewClasseImport />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 15 ? (
                                                            <div id="gestion-personnel">
                                                                <GestionPersonnel />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 16 ? (
                                                            <div id="add-worker">
                                                                <AddWorker />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 22 ? (
                                                            <div id="timetable-settings">
                                                                <TimetableSettings />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 24 ? (
                                                            <div id="paiement-categorisation">
                                                                <ClassePaiementCategorisation />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 14 ? (
                                                            <div id="settings-bulletins">
                                                                <SettingsBulletins />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 26 ? (
                                                            <div id="fiche-points-b">
                                                                <FichePointsBrouillon />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 27 ? (
                                                            <div id="fiche-synthese-points-b">
                                                                <FicheSynthesePointsBrouillon />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 28 ? (
                                                            <div id="fiche-synthese-points-b">
                                                                <BulletinsBrouillon />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 29 ? (
                                                            <div id="fiche-synthese-points-b">
                                                                <BulletinsType2Brouillon />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 30 ? (
                                                            <div id="view_worker">
                                                                <ViewWorker />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 31 ? (
                                                            <div id="view_worker">
                                                                <Conduites />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 32 ? (
                                                            <div id="view_worker">
                                                                <FichesPoints />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 5 ? (
                                                            <div id="fiches">
                                                                {this.props.fiches_tab === "FI" ? (
                                                                    <div id="fiche-identity">{<FicheIdentites />}</div>
                                                                ) : null}

                                                                {this.props.fiches_tab === "FO" ? (
                                                                    <div id="fiche-observation">
                                                                        {/* {<FicheObservationPoints />} */}
                                                                    </div>
                                                                ) : null}

                                                                {this.props.fiches_tab === "E13" ? (
                                                                    <div id="fiche-e133">
                                                                        <FicheE13 />
                                                                    </div>
                                                                ) : null}

                                                                {this.props.fiches_tab === "E80" ? (
                                                                    <div id="fiche-e800">{/* {<FicheE80 />} */}</div>
                                                                ) : null}
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 9 ? (
                                                            <div>
                                                                <Courses />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 8 ? (
                                                            <div>
                                                                <PaiementsClasse />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 0 ? (
                                                            <div>
                                                                <MenuHome />
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 2 ? (
                                                            <div>
                                                                {this.props.marks_tab === "FPE" ? (
                                                                    <FichePointsPupils />
                                                                ) : null}

                                                                {this.props.marks_tab === "FPC" ? (
                                                                    <FichesPointsCourses />
                                                                ) : null}
                                                            </div>
                                                        ) : null}

                                                        {this.props.middle_func === 3 ? <PalmaresPupils /> : null}

                                                        {this.props.middle_func === 10 ? <PalmaresFinal /> : null}

                                                        {this.props.middle_func === 4
                                                            ? this.render_synthese()
                                                            : null}

                                                        {this.props.middle_func === 6 ? <NewPupil /> : null}

                                                        {this.props.middle_func === 7 ? (
                                                            <div id="liste-bulletins">
                                                                <Bulletins />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <Footer />
                                {this.props.modal_paiement_categories ? <PaiementCategories /> : null}

                                {this.props.modal_libelles ? <Libelles /> : null}

                                {this.props.modal_selections ? <ModalFrame type={1} /> : null}

                                {/* {this.state.modal_view ?
                        <div className="main-div-modal">
                            {ModalView(this.state.modal_title, this.state.modal_main_text)}
                            <div className="sub-div-modal">
                                <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                            </div>
                        </div> : null} */}
                            </div>
                        </div>
                    </div>
                    );
    }
}

                    export default connect(mapStateToProps)(Home);
