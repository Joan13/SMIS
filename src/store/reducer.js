const initialState = {
    user_data: [],
    user_poste: "",
    url_server: "",
    classes: [],
    pupil: [],
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
    class_pupils: [],
    middle_func: 0,
    marks_tab: "",
    class_open: false,
    periode_synthese: '1',
    classes_synthese: [],
    all_pupils: 0,
    nbr_ee: 0,
    nbr_tb: 0,
    nbr_bb1: 0,
    nbr_bb2: 0,
    nbr_me: 0,
    nbr_ma: 0,
    nbr_classes: 0,
    periode_full: "DE LA 1ère PÉRIODE",
    modal_view: false,
    logout_open: false,
    loading_class: false,
    courses_count: 0,
    allow_right_menu: false,
    allow_right_menu_pupils: true,
    fiches_tab: "",
    class_loading: 0,
    pupils_school: [],
    pupils_count: 0,
    fiche_tab:0,
    pupils_count_male: 0,
    pupils_count_female: 0,
    number_pupils_show: false,
    can_load_class: false,
    val: 9,
    reussites: 0,
    doubles: 0,
    echecs: 0,
    abandon: 0,
    pupils_list: [],
    pupils_marks: [],
    courses: [],
    searching_pupil: false,
    pps: [],
    cycles: [],
    can_mount_home: true,
    new_paiement: false,
    all_paiements: true,
    paiements_frais_divers: false,
    libelles: [],
    montant_total: 0,
    pupils_count_paiements: 0,
    loading_footer: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_LOADING_CLASS":
            return { ...state, loading_class: action.payload }
        case "SET_PUPILS_COUNT_PAIEMENTS":
            return { ...state, pupils_count_paiements: action.payload }
        case "SET_MONTANT_TOTAL":
            return { ...state, montant_total: action.payload }
        case "SET_NEW_PAIEMENT":
            return { ...state, new_paiement: action.payload }
        case "SET_ALL_PAIEMENTS":
            return { ...state, all_paiements: action.payload }
        case "SET_PAIEMENTS_FRAIS_DIVERS":
            return { ...state, paiements_frais_divers: action.payload }
        case "SET_LIBELLES":
            return { ...state, libelles: action.payload }
        case "SET_LOADING_FOOTER":
            return { ...state, loading_footer: action.payload }
        case "UNLOAD_CLASS":
            return { ...state, can_load_class: false }
            case "SET_CLASSE_DOMAINS":
            return { ...state, classe: [...state.classe.data.domains, action.payload] }
        case "SET_CLASSE":
            return { ...state, classe: action.payload }
        case "SET_CLASSE_OPEN":
            return { ...state, class_open: action.payload }
        case "SET_CYCLES":
            return { ...state, cycles: action.payload }
        case "SET_SEARCHING_PUPIL":
            return { ...state, searching_pupil: action.payload }
        case "SET_NUMBER_PUPILS_SHOW":
            return { ...state, number_pupils_show: action.payload }
        case "SET_CLASS_PUPILS":
            return { ...state, class_pupils: action.payload }
        case "SET_CLASS_LOADING":
            return { ...state, class_loading: action.payload }
        case "SET_LOADING_HOME":
            return { ...state, is_loading_home: action.payload }
        case "SET_LOADING_MIDDLE":
            return { ...state, loading_middle: action.payload }
        case "SET_COURSES":
            return { ...state, courses: action.payload }
        case "SET_AUTRES":
            return { ...state, autres: action.payload }
        case "SET_CLASSES":
            return { ...state, classes: action.payload }
        case "SET_ALLOW_RIGHT_MENU_PUPILS":
            return { ...state, allow_right_menu_pupils: action.payload }
        case "SET_ALLOW_RIGHT_MENU":
            return { ...state, allow_right_menu: action.payload }
        case "SET_MIDDLE_FUNC":
            return { ...state, middle_func: action.payload }
        case "SET_MARKS_TAB":
            return { ...state, marks_tab: action.payload }
        case "SET_POSTE":
            return { ...state, user_poste: action.payload }
        case "SET_ANNEES":
            return { ...state, annees: action.payload }
        case "SET_CLASS_NUMBERS":
            return { ...state, class_numbers: action.payload }
        case "SET_ORDERS":
            return { ...state, orders: action.payload }
        case "SET_SECTIONS":
            return { ...state, sections: action.payload }
        case "SET_OPTIONS":
            return { ...state, options: action.payload }
        case "SET_ANNEE_SCOLAIRE":
            return { ...state, annee_scolaire: action.payload }
        case "SET_ANNEE":
            return { ...state, annee: action.payload }
        case "SET_SCHOOL_NAME":
            return { ...state, school_name: action.payload }
        case "SET_ATTRIBUTIONS":
            return { ...state, attributions: action.payload }
        case "SET_PUPILS_SCHOOL":
            return { ...state, pupils_school: action.payload }
        case "SET_PPS":
            return { ...state, pps: action.payload }
        case "SET_PUPILS_COUNT":
            return { ...state, pupils_count: action.payload }
        case "SET_TITLE_MAIN":
            return { ...state, title_main: action.payload }
            case "SET_FICHES_TAB":
            return { ...state, fiches_tab: action.payload }
            case "SET_FICHE_TAB":
            return { ...state, fiche_tab: action.payload }
        case "SET_SCHOOL_NAME_ABB":
            return { ...state, school_name_abb: action.payload }
        case "SET_REUSSITES":
            return { ...state, reussites: action.payload }
        case "SET_DOUBLES":
            return { ...state, doubles: action.payload }
        case "SET_ECHECS":
            return { ...state, echecs: action.payload }
        case "SET_ABANDON":
            return { ...state, abandon: action.payload }
        case "SET_AURESS":
            return { ...state, autre: action.payload }
        case "SET_USER_CONNECTED":
            return { ...state, user_data: action.payload }
        case "SET_URL_SERVER":
            return { ...state, url_server: action.payload }
        case "SET_PUPIL":
            return { ...state, pupil: action.payload }
        case "SET_PUPILS":
            return { ...state, pupils_list: action.payload }
        case "SET_COURSES_COUNT":
            return { ...state, courses_count: action.payload }
        case "SET_MOUNT_HOME":
            return { ...state, can_mount_home: action.payload }
            case "SET_CLASSES_SYNTHESE":
            return { ...state, classes_synthese: action.payload }
            case "SET_ALL_PUPILS":
            return { ...state, all_pupils: action.payload }
            case "SET_NBR_EE":
            return { ...state, nbr_ee: action.payload }
            case "SET_NBR_TB":
            return { ...state, nbr_tb: action.payload }
            case "SET_NBR_BB1":
            return { ...state, nbr_bb1: action.payload }
            case "SET_NBR_BB2":
            return { ...state, nbr_bb2: action.payload }
            case "SET_NBR_ME":
            return { ...state, nbr_me: action.payload }
            case "SET_NBR_MA":
            return { ...state, nbr_ma: action.payload }
            case "SET_NBR_CLASSES":
            return { ...state, nbr_classes: action.payload }
            case "SET_PERIODE_FULL":
            return { ...state, periode_full: action.payload }
            case "SET_PERIODE_SYNTHESE":
            return { ...state, periode_full: action.payload }
        default:
            return state;
    }
}

export default reducer;