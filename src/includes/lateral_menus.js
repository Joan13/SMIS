import { FaCloudDownloadAlt, FaHome, FaMoon } from 'react-icons/fa';
import { FiBell, FiList, FiMoon, FiRefreshCcw, FiSun } from 'react-icons/fi';
import { RiSettings4Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { http, url_online } from '../global_vars';
import axios from 'axios';

const LateralMenus = () => {
    const theme = useSelector(state => state.theme);
    const user = useSelector(state => state.user_data);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const modal_selections = useSelector(state => state.modal_selections);
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme : dark)");
    const dispatch = useDispatch();

    const get_general_info = () => {
        dispatch({ type: "SET_LOADING_MIDDLE", payload: true });
        dispatch({ type: "SET_LOADING_HOME", payload: true });
        dispatch({ type: "SET_COURSE_TIMETABLE_CONFIG", payload: null });
        dispatch({ type: "SET_EMPLOYEE_TIMETABLE_CONFIG", payload: null });
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
                alert("Cet utilisateur est invalide. Vous devez vous reconnecter pour accéder aux services.");
                this.logout_session();
            }
        }

        let data = new FormData();
        data.append('annee', annee_scolaire.year_id);

        axios.post(http + url_server + "/yambi_class_SMIS/API/get_info_home.php", data)
            .then(rsp => {
                const response = rsp.data;
                const promise_general_info_home = new Promise((resolve, reject) => {
                    dispatch({ type: "SET_CLASSES", payload: response.classes, });
                    dispatch({ type: "SET_PUPILS_COUNT_PAIEMENTS", payload: response.pupils_count_paiements, });
                    dispatch({ type: "SET_MONTANT_TOTAL", payload: response.montant_paye, });
                    dispatch({ type: "SET_AUTRES", payload: response.autres });
                    dispatch({ type: "SET_ANNEES", payload: response.annees });
                    dispatch({ type: "SET_CLASS_NUMBERS", payload: response.class_numbers, });
                    dispatch({ type: "SET_ORDERS", payload: response.orders });
                    dispatch({ type: "SET_CYCLES", payload: response.cycles });
                    dispatch({ type: "SET_SECTIONS", payload: response.sections, });
                    dispatch({ type: "SET_OPTIONS", payload: response.options, });
                    dispatch({ type: "SET_ANNEE_SCOLAIRE", payload: response.annee_scolaire, });
                    dispatch({ type: "SET_ANNEE", payload: response.annee });
                    dispatch({ type: "SET_SCHOOL_NAME", payload: response.school_name, });
                    dispatch({ type: "SET_ATTRIBUTIONS", payload: response.attributions, });
                    dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count, });
                    dispatch({ type: "SET_PUPILS_COUNT_MALE", payload: response.pupils_count_male, });
                    dispatch({ type: "SET_PUPILS_COUNT_FEMALE", payload: response.pupils_count_female, });
                    dispatch({ type: "SET_SCHOOL_NAME_ABB", payload: response.school_name_abb, });
                    dispatch({ type: "SET_REUSSITES", payload: response.reussites, });
                    dispatch({ type: "SET_DOUBLES", payload: response.doubles, });
                    dispatch({ type: "SET_ECHECS", payload: response.echecs });
                    dispatch({ type: "SET_ABANDON", payload: response.abandon, });
                    dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true, });
                    dispatch({ type: "SET_LIBELLES", payload: response.libelles, });
                    dispatch({ type: "SET_TITLE_MAIN", payload: "Écriture des données...", });
                    dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils, });
                    dispatch({ type: "SET_PUPILS", payload: response.pupils });
                    dispatch({ type: "SET_SELECTIONS", payload: response.selections, });
                    dispatch({ type: "SET_PAIEMENT_CATEGORIES", payload: response.paiement_categories, });
                    dispatch({ type: "SET_MODAL_SELECTIONS", payload: false });
                    dispatch({ type: "SET_CLASSES_SELECTED", payload: [] });
                    resolve();
                }).then(() => { });

                promise_general_info_home.finally(() => {
                    setTimeout(() => {
                        dispatch({ type: "SET_LOADING_MIDDLE", payload: false });
                        dispatch({ type: "SET_LOADING_HOME", payload: false });
                        dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire", });
                    }, 2000);
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: "SET_LOADING_HOME", payload: false });
            });
    }

    const collect_data = () => {
        dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        const data = annee_scolaire.year_id;
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
                sync_data(response);
                // },2000);
            })
            .catch((error) => {
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

    const sync_data = (data) => {
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
                dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                // if (response.success === "1") {
                //     this.setState({
                //         modal_title: "Opération réussie",
                //         modal_main_text: "La synchronisation des données a été effectuée avec succès.",
                //         modal_view: true,
                //         is_loading_home: false,
                //         loading_middle: false,
                //     });
                // }
            })
            .catch((error) => {
                // console.log(error.toString());
                // dispatch({ type: "SET_LOADING_FOOTER", payload: false });
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

    const back_home = () => {
        const classe = { pupils: [] };
        dispatch({ type: "SET_CLASSE", payload: classe });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Année scolaire" });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 0 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        dispatch({ type: "SET_MODAL_SELECTIONS", payload: false });
        dispatch({ type: "SET_CLASSES_SELECTED", payload: [] });
    }

    const setTheme = () => {
        if (theme === 'light') {
            element.classList.add('dark');
            dispatch({ type: 'SET_THEME', payload: 'dark' });
        } else {
            element.classList.remove('dark');
            dispatch({ type: 'SET_THEME', payload: 'light' });
        }
    }

    function onWindowMatch() {
        if (theme === 'dark' || !darkQuery.matches) {
            element.classList.add("dark");
        } else {
            element.classList.remove('dark');
        }

        if (theme === 'light') {
            element.classList.remove('dark');
        }
    }

    onWindowMatch();

    return (
        <>
            <div className='mb-5 pb-7 border-b border-gray-50 dark:border-gray-20'>
                <div
                    title={theme === 'dark' ? "Thème clair" : "Thème sombre"}
                    className="active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20  w-11 h-11 cursor-pointer rounded-full mt-5"
                    onClick={setTheme}>
                    {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                </div>

                <div
                    title="Revenir au menu principal"
                    className="active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20  w-11 h-11 cursor-pointer rounded-full mt-7"
                    onClick={back_home}>
                    <FaHome size={20} />
                </div>

                <div
                    title="Rafraîchir les données"
                    className="active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20 cursor-pointer rounded-full mt-7 w-11 h-11"
                    onClick={get_general_info}>
                    <FiRefreshCcw size={20} />
                </div>

                <div
                    title="Synchroniser les données"
                    className="active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20  w-11 h-11 cursor-pointer rounded-full mt-7"
                    onClick={() => { }}>
                    <FaCloudDownloadAlt size={20} />
                </div>

                <div
                    title="Notifications"
                    className=" active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20  w-11 h-11 cursor-pointer rounded-full mt-7"
                    onClick={() => { }}>
                    <FiBell size={18} />
                </div>

                <Link
                    title="Paramètres"
                    to={"/settings"}
                    className="active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20 cursor-pointer rounded-full mt-7 w-11 h-11">
                    <RiSettings4Fill size={18} />
                </Link>
            </div>
            <div
                title="Sélections"
                className=" active:scale-90 duration-300 flex items-center justify-center bg-background-30 dark:bg-gray-20 border border-gray-20  w-11 h-11 cursor-pointer rounded-full mt-7"
                onClick={() => dispatch({ type: "SET_MODAL_SELECTIONS", payload: !modal_selections })}>
                <FiList size={18} />
            </div>
        </>
    )
}

export default LateralMenus;
