import React from 'react';
import logo_rdc from './../../../src/assets/flag_drc.jpg';
import logo_armoiries from './../../../src/assets/armoirie_rdc.png';
import { home_redirect, http } from "../../global_vars";
import { FiCheck, FiCircle } from 'react-icons/fi';
import { FaCheck, FaCircle } from 'react-icons/fa';
import { mapStateToProps } from '../../store/state_props';
import { connect } from 'react-redux';

let max = 0;
let can_show = false;
let show_domain = false;
let show_sub_domain = false;
let ddomain = 0;
let sdomain = 0;

class BulletinsType2 extends React.Component {

    intervalID = 0;

    constructor(props) {
        super(props);

        this.state = {
            classe: [],
            autres: [],
            pupils: [],
            pupils_marks: [],
            can_mount: 0,
            array_places_1: [],
            array_places_2: [],
            array_places_10: [],
            array_places_tot1: [],
            array_places_3: [],
            array_places_4: [],
            array_places_11: [],
            array_places_tot2: [],
            array_places_tott: [],
            valeur_colonne: 0,
            bulletins_show: 1,
            increment_val: 0,
            code_centre: "",
            conseils: [],
        }
    }

    // componentDidMount(){
    // console.log(this.props.autres)
    // }

    open_class() {

        if (this.state.can_mount < 5) {

            this.setState({ bulletins_show: 1 });
            // this.setState({ can_mount: this.state.can_mount + 1 });

            let classe = sessionStorage.getItem('classeYambiSMIS');
            let url_server = sessionStorage.getItem('yambi_smis_url_server');
            classe = JSON.parse(classe);
            this.setState({
                classe: classe,
                title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
                loading_middle: true,
                url_server: url_server
            });

            // if (this.state.can_mount < 5) {

            //     console.log("can mount");

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_class_info.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    cycle_id: classe.cycle,
                    class_id: classe.class,
                    order_id: classe.order,
                    section_id: classe.section,
                    option_id: classe.option,
                    school_year: classe.school_year,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        courses: response.courses,
                        pupils: response.pupils,
                        autres: response.autres,
                        loading_middle: false,
                        pupils_marks: response.pupils_marks,
                        array_places_1: response.array_places_1,
                        array_places_2: response.array_places_2,
                        array_places_10: response.array_places_10,
                        array_places_tot1: response.array_places_tot1,
                        array_places_3: response.array_places_3,
                        array_places_4: response.array_places_4,
                        array_places_11: response.array_places_11,
                        array_places_tot2: response.array_places_tot2,
                        array_places_tott: response.array_places_tott,
                        valeur_colonne: response.valeur_colonne,
                        conduites: response.conduites,
                        conseils: response.conseils
                    })
                })
                .catch((error) => {
                    // alert(error.toString());
                    // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        }
    }

    render_period_marks(pupil_id, course_id, periode) {
        let return_value = "0";

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        if (return_value === "0") {
            return_value = "";
        }

        return return_value;
    }

    findConseil(pupil_id) {

        let conseil = "";
        for (let i in this.props.classe.data.conseil_deliberation) {
            if (this.props.classe.data.conseil_deliberation[i].pupil_id == pupil_id) {
                conseil = this.props.classe.data.conseil_deliberation[i].main_conseil;
            }
        }

        return conseil;
    }

    render_courses_repechage(pupil_id) {
        let return_value = "";

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == "15" && this.props.classe.data.pupils_marks[i].main_marks != 0) {
                for (let l in this.props.classe.data.courses) {
                    if (this.props.classe.data.courses[l].course_id === this.props.classe.data.pupils_marks[i].course) {
                        return_value = return_value + " . . . " + this.props.classe.data.courses[l].course_name.toUpperCase();
                    }
                }
            }
        }

        return return_value;
    }

    render_period_marks_rep(pupil_id, course_id, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        if (return_value === 0) {
            return "";
        } else {
            return return_value;
        }
    }

    render_semester_marks(pupil_id, course_id, periode1, periode2, periode3) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && (this.props.classe.data.pupils_marks[i].school_period == periode1 || this.props.classe.data.pupils_marks[i].school_period == periode2 || this.props.classe.data.pupils_marks[i].school_period == periode3)) {
                return_value = return_value + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_sub_domain_period_marks(pupil_id, sub_domain, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if ((this.props.classe.data.pupils_marks[i].pupil == pupil_id) &&
                (
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_1 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_2 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_3 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_4 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_5 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_6 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_7 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_8 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_9 ||
                    this.props.classe.data.pupils_marks[i].course == sub_domain.course_10) && (this.props.classe.data.pupils_marks[i].school_period == periode)) {
                return_value = return_value + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_sub_domain_semester_marks(pupil_id, sub_domain, periode1, periode2, periode3) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if ((this.props.classe.data.pupils_marks[i].pupil == pupil_id) && (this.props.classe.data.pupils_marks[i].course == sub_domain.course_1 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_2 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_3 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_4 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_5 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_6 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_7 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_8 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_9 || this.props.classe.data.pupils_marks[i].course == sub_domain.course_10) && (this.props.classe.data.pupils_marks[i].school_period == periode1 || this.props.classe.data.pupils_marks[i].school_period == periode2 || this.props.classe.data.pupils_marks[i].school_period == periode3)) {
                return_value = return_value + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_period_pourcentage(pupil_id, periode) {
        // let pourcentage = 0;
        // let main_marks = 0;
        // let total_marks = 0;

        // for (let i in this.props.classe.data.pupils_marks) {
        //     if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
        //         main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
        //         total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
        //     }
        // }

        // if (main_marks != 0) {
        //     pourcentage = (main_marks * 100) / total_marks;
        //     return (pourcentage).toString().substr(0, 4);
        // } else {
        //     return "";
        // }

        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                main_marks = main_marks + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseFloat(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / this.maxima(periode);
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }
    }

    render_semester_pourcentage(pupil_id, periode1, periode2, periode3) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && (this.props.classe.data.pupils_marks[i].school_period == periode1 || this.props.classe.data.pupils_marks[i].school_period == periode2 || this.props.classe.data.pupils_marks[i].school_period == periode3)) {
                main_marks = main_marks + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseFloat(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / this.maxima(50);
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }

    }

    maxima(period) {
        let total = 0;
        let considered = 0;
        let moins = 0;

        for (let i in this.props.classe.data.courses) {
            total = total + parseInt(this.props.classe.data.courses[i].total_marks);

            if (parseInt(this.props.classe.data.courses[i].considered) === 5) {
                considered = parseInt(this.props.classe.data.courses[i].considered);
                moins = parseInt(this.props.classe.data.courses[i].total_marks) * 2;
            }
        }

        if (period === 40 || period === 50 || period === 60) {
            if (considered === 5) {
                total = (total * 4) - moins;
            } else {
                total = (total * 4) - moins;
            }
        }

        if (parseInt(period) === 10 || parseInt(period) === 11 || parseInt(period) === 12) {
            if (considered === 5) {
                total = (total * 2) - moins;
            } else {
                total = (total * 2) - moins;
            }
        }

        return total;
    }

    render_total_pourcentage(pupil_id) {
        let pourcentage = 0;
        let main_marks = parseFloat(this.totaux_generaux(pupil_id, 1)) + parseFloat(this.totaux_generaux(pupil_id, 2)) + parseFloat(this.totaux_generaux(pupil_id, 10)) + parseFloat(this.totaux_generaux(pupil_id, 3)) + parseFloat(this.totaux_generaux(pupil_id, 4)) + parseFloat(this.totaux_generaux(pupil_id, 11)) + parseFloat(this.totaux_generaux(pupil_id, 5)) + parseFloat(this.totaux_generaux(pupil_id, 6)) + parseFloat(this.totaux_generaux(pupil_id, 12));

        let total_marks = this.props.autres.is_primaire ? parseInt(this.maxima_generaux(pupil_id, 1)) + parseInt(this.maxima_generaux(pupil_id, 2)) + parseInt(this.maxima_generaux(pupil_id, 10)) + parseInt(this.maxima_generaux(pupil_id, 3)) + parseInt(this.maxima_generaux(pupil_id, 4)) + parseInt(this.maxima_generaux(pupil_id, 11)) + parseInt(this.maxima_generaux(pupil_id, 5)) + parseInt(this.maxima_generaux(pupil_id, 6)) + parseInt(this.maxima_generaux(pupil_id, 12)) : parseInt(this.maxima_generaux(pupil_id, 1)) + parseInt(this.maxima_generaux(pupil_id, 2)) + parseInt(this.maxima_generaux(pupil_id, 10)) + parseInt(this.maxima_generaux(pupil_id, 3)) + parseInt(this.maxima_generaux(pupil_id, 4)) + parseInt(this.maxima_generaux(pupil_id, 11));

        // for (let i in this.props.classe.data.pupils_marks) {
        //     if (this.props.classe.data.pupils_marks[i].pupil === pupil_id && parseInt(this.props.classe.data.pupils_marks[i].school_period) !== 15) {
        //         main_marks = main_marks + this.props.classe.data.pupils_marks[i].main_marks;
        //         // total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
        //     }
        // }

        if (main_marks !== 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }
    }

    render_period_conduite(pupil_id, periode) {
        let main_conduite = "";

        for (let i in this.props.classe.data.conduites) {
            if (this.props.classe.data.conduites[i].pupil_id == pupil_id && this.props.classe.data.conduites[i].periode == periode) {
                main_conduite = this.props.classe.data.conduites[i].main_conduite;
            }
        }

        if (main_conduite === "") {
            return "-";
        } else if (parseInt(main_conduite) === 1) {
            return "E";
        } else if (parseInt(main_conduite) === 2) {
            return "TB";
        } else if (parseInt(main_conduite) === 3) {
            return "B";
        } else if (parseInt(main_conduite) === 4) {
            return "AB";
        } else if (parseInt(main_conduite) === 5) {
            return "M";
        } else if (parseInt(main_conduite) === 6) {
            return "MA";
        } else {
            return "-";
        }
    }

    render_color(pourcentage) {

        if (pourcentage >= 80) {
            return 'yellow';
        } else if (pourcentage < 80 && pourcentage >= 70) {
            return "blue";
        } else if (pourcentage < 70 && pourcentage >= 50) {
            return 'green';
        } else if (pourcentage < 50 && pourcentage >= 40) {
            return 'black';
        } else {
            return 'red';
        }
    }

    render_application_periode(pupil_id, periode) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (parseInt(this.props.classe.data.pupils_marks[i].pupil) === parseInt(pupil_id) && parseInt(this.props.classe.data.pupils_marks[i].school_period) === parseInt(periode)) {
                main_marks = main_marks + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseFloat(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / this.maxima(periode);

            if (parseInt(pourcentage) >= 80) {
                return "E";
            } else if (parseInt(pourcentage) >= 70 && parseInt(pourcentage) <= 79) {
                return "TB";
            } else if (parseInt(pourcentage) >= 55 && parseInt(pourcentage) <= 69) {
                return "B";
            } else if (parseInt(pourcentage) >= 45 && parseInt(pourcentage) <= 55) {
                return "AB";
            } else {
                return "M";
            }
        } else {
            return "";
        }
    }

    maxima_generaux(pupil_id, periode) {
        // let return_value = 0;

        // for (let i in this.props.classe.data.pupils_marks) {
        //     if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
        //         return_value = parseInt(return_value) + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
        //     }
        // }

        // return return_value;
        let total = 0;
        let considered = 0;
        let moins = 0;

        for (let i in this.props.classe.data.courses) {
            total = total + parseInt(this.props.classe.data.courses[i].total_marks);

            if (parseInt(this.props.classe.data.courses[i].considered) === 5) {
                considered = parseInt(this.props.classe.data.courses[i].considered);
                moins = parseInt(this.props.classe.data.courses[i].total_marks) * 2;
            }
        }

        if (parseInt(periode) === 40 || parseInt(periode) === 50 || parseInt(periode) === 60) {
            if (considered === 5) {
                total = (total * 4) - moins;
            } else {
                total = (total * 4) - moins;
            }
        }

        if (parseInt(periode) === 10 || parseInt(periode) === 11 || parseInt(periode) === 12) {
            if (considered === 5) {
                total = (total * 2) - moins;
            } else {
                total = (total * 2) - moins;
            }
        }

        return total;
    }

    totaux_generaux(pupil_id, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseFloat(return_value) + parseFloat(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    maxima_gen(periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.courses) {
            if (this.props.classe.data.courses[i].considered !== "5" && periode !== 2) {
                return_value = return_value + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }

            if (this.props.classe.data.courses[i].considered !== "5" && periode === 2) {
                return_value = return_value + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }

            if (this.props.classe.data.courses[i].considered === "5" && periode === 2) {
                return_value = return_value;
            }

            if (this.props.classe.data.courses[i].considered === "5" && periode !== 2) {
                return_value = return_value + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        return return_value * periode;
    }

    componentDidMount() {

        // console.log(this.props.classe);

        // if (this.state.can_mount < 5) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);

        //         if (classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //             console.log("Can mount marks");
        //         }
        //     }, 500);
        // }
        // console.log(this.props.autres.is_primaire);

        // console.log(this.props.classe.data.sub_domains)
    }

    // componentWillUnmount() {
    //     clearInterval(this.intervalID);
    // }

    find_date(date) {
        date = date.toString();
        let year = date.substr(0, 4);
        let month = date.substr(5, 2);
        let day = date.substr(8, 2);

        // let hour = date.substr(11, 2);
        // let minutes = date.substr(14, 2);

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
        } else {
            month = "";
        }

        let fullTime = day + " " + month + " " + year;

        return fullTime;
    }

    select_bulletins_type(type) {
        if (type === "1") {
            this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 14 });
            this.props.dispatch({ type: "SET_FICHES_TAB", payload: "" });
            this.props.dispatch({ type: "SET_MARKS_TAB", payload: "" });
            this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        }
    }

    class_name() {

        if (this.props.classe.cycle_id.toUpperCase() === "MATERNELLE" || this.props.classe.cycle_id.toUpperCase() === "MATERNEL") {
            return "BULLETIN DE L'ENFANT DE L'ÉCOLE MATERNELLE ";
        }

        if (this.props.classe.cycle_id.toUpperCase() === "PRIMAIRE") {
            if (this.props.classe.class_id === '3 ème' || this.props.classe.class_id === '4 ème') {
                return "BULLETIN DE L'ÉLÈVE : DÉGRÉ MOYEN (" + this.props.classe.class_id + " ANNÉE PRIMAIRE)";
            } else if (this.props.classe.class_id === '5 ème' || this.props.classe.class_id === '6 ème') {
                return "BULLETIN DE L'ÉLÈVE : DÉGRÉ TERMINAL (" + this.props.classe.class_id + " ANNÉE PRIMAIRE)";
            } else {
                return "BULLETIN DE L'ÉLÈVE : DÉGRÉ ÉLÉMENTAIRE (" + this.props.classe.class_id + " ANNÉE PRIMAIRE)";
            }
        }

        else {
            if (this.props.classe.class_id === '7 ème' || this.props.classe.class_id === '8 ème') {
                return 'BULLETIN DE LA ' + this.props.classe.class_id + " ANNÉE CYCLE TERMINAL DE L'ÉDUCATION DE BASE (CTEB) " + this.props.classe.section_id.toUpperCase();
            }

            return 'BULLETIN DE LA ' + this.props.classe.class_id + ' ANNÉE HUMANITÉ ' + this.props.classe.section_id.toUpperCase();
        }
    }

    is_2e_secondaire() {
        if (this.props.classe.cycle_id.toUpperCase() === "SECONDAIRE" && this.props.classe.class_id === '8 ème') {
            return true;
        }

        return false;
    }

    is_6e_primaire() {
        if (this.props.classe.cycle_id.toUpperCase() === "PRIMAIRE" && this.props.classe.class_id === '6 ème') {
            return true;
        }

        return false;
    }

    is_primaire() {
        // if (this.props.classe.cycle_id.toUpperCase() === "PRIMAIRE") {
        //     return true;
        // }

        if (this.props.autres.is_primaire) {
            return true;
        }

        return false;
    }

    is_secondaire() {
        if (this.props.classe.cycle_id.toUpperCase() === "SECONDAIRE") {
            return true;
        }

        return false;
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                {parseInt(this.props.classe.class) === 6 ?
                    <>
                        {/* <div>
                            Augmenter/diminuer la valeur de la colone Exétat (si elle ne correspond pas correctement); <br />Valeur courante : {this.state.valeur_colonne}<br />
                            <span onClick={() => this.setState({ valeur_colonne: this.state.valeur_colonne - 1 })} className="add-minus">Diminuer</span>
                            <span onClick={() => this.setState({ valeur_colonne: parseInt(this.state.valeur_colonne) + 1 })} className="add-minus">Augmenter</span><br /><br /><br />
                        </div> */}


                        <div><br/>
                            Renseignez le code du centre avant l'impression des bulletins. Ceci peut varier d'une année à une autre.<br />
                            <input
                                type="number"
                                style={{ width: 150 }}
                                maxLength="5"
                                placeholder='Code centre'
                                value={this.state.code_centre}
                                onChange={(text) => this.setState({ code_centre: text.target.value })}
                            />
                        </div><br /><br />
                    </>

                    : null}

                <div className="float-right-div">
                    Pour assurer la rapidité du script lors du rendu des bulletins, nous ne vous en affichons que deux à l'initialisation de la page. Procéder à l'impression après que vous vous soyez rassuré que vous en avez fini avec les configurations d'impression par rapport aux deux bulletins affichés. La configuration sera identique pour la suite. NB. Utiliser la fiche des points par élève ou lal fiche des points par classe pour la bonne visualisation des points et la modification.<br />
                    Valeur courante :
                    <input
                        type="number"
                        style={{ width: 50 }}
                        onChange={(text) => this.setState({ increment_val: text.target.value })}
                    />
                    <span style={{ marginLeft: 20 }} onClick={() => this.setState({ bulletins_show: this.state.increment_val })} className="add-minus">Valider</span>
                    <span onClick={() => this.setState({ bulletins_show: 1 })} className="add-minus">Retourner à la valeur initiale</span><br />

                    <br />
                </div>

                {/* <div className="float-right-div">
                    <select
                        onChange={(val) => this.select_bulletins_type(val.target.value)}
                        style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                        <option value="0">Bulletins (type par défaut)</option>
                        <option value="1">Bulletins (type 2)</option>
                    </select><br /><br />
                </div>

                <span onClick={() => this.printContent("bulletins-p")} className="add-minus" style={{ fontWeight: 'bold' }}>
                    IMPRIMER LES BULLETINS
                </span><br /><br /> */}

                <div id="bulletins-p">
                    {this.props.classe.pupils.map((pupil, index) => {

                        if (index <= this.state.bulletins_show) {
                            return (
                                <div key={index + 2} style={{ marginBottom: 20 }}>
                                    <table className="className_table_first">
                                        <tr>
                                            <td style={{ textAlign: 'left' }} className="td-no-border-r">
                                                <img src={logo_rdc} height="60" width="100" />
                                            </td>
                                            <td style={{ textAlign: 'center', fontSize: 17 }} className="td-no-border">
                                                <strong>RÉPUBLIQUE DÉMOCRATIQUE DU CONGO</strong><br />
                                                <strong>MINISTÈRE DE L'ÉDUCATION NATIONALE ET NOUVELLE CITOYENNETÉ</strong>
                                            </td>
                                            <td style={{ textAlign: 'right' }} className="td-no-border-l">
                                                <img src={logo_armoiries} height="60" width="80" />
                                            </td>
                                        </tr>
                                    </table>

                                    <table className="className_table">
                                        <tr>
                                            <td style={{ paddingTop: 5, paddingBottom: 5 }}>
                                                <div style={{ textAlign: 'center' }}>
                                                    <span>No ID. : </span>
                                                    <span className="id-case1"> {pupil.pupil.identification_number.substr(0, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(1, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(2, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(3, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(4, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(5, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(6, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(7, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(8, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(9, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(10, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(11, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(12, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(13, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(14, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(15, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(16, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(17, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(18, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(19, 1)}</span>
                                                    <span className="id-case">{pupil.pupil.identification_number.substr(20, 1)}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>

                                    <table className="className_table">
                                        <tr>
                                            <td style={{ paddingLeft: 10, fontWeight: 'bold' }} className="td-border-nob">
                                                PROVINCE : SUD-KIVU
                                            </td>
                                        </tr>
                                    </table>

                                    <table className="className_table">
                                        <tr>
                                            <td style={{ width: '50%', paddingLeft: 10, paddingBottom: 5 }} className="td-border">
                                                <span className="span-block-header">VILLE : </span><strong> {("" + this.props.autres.school_city).toUpperCase()}</strong><br />
                                                <span className="span-block-header">COMMUNE : </span><strong> {("" + this.props.autres.school_commune).toUpperCase()}</strong><br />
                                                <span className="span-block-header">ECOLE : </span><strong> {("" + this.props.autres.school_name).toUpperCase()}</strong><br />
                                                <span className="span-block-header">
                                                    <span>CODE : </span>
                                                    <span className="id-case1"> {this.props.autres.code_school.substr(0, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(1, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(2, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(3, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(4, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(5, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(6, 1)}</span>
                                                    <span className="id-case">{this.props.autres.code_school.substr(7, 1)}</span>
                                                    {/* <span className="id-case">{this.state.autres.code_school.substr(8, 1)}</span>
                                <span className="id-case">{this.state.autres.code_school.substr(9, 1)}</span>
                                <span className="id-case">{this.state.autres.code_school.substr(10, 1)}</span> */}
                                                </span>
                                            </td>
                                            <td style={{ width: '50%', paddingLeft: 10, paddingBottom: 5 }} className="td-border">
                                                <span className="span-block-header">ELEVE : </span><strong> {pupil.pupil.first_name.toUpperCase() + " " + pupil.pupil.second_name.toUpperCase() + " " + pupil.pupil.last_name}</strong><span style={{ marginLeft: 30 }}>SEXE : </span><strong>{pupil.pupil.gender === "1" ? "M" : "F"}</strong><br />
                                                <span className="span-block-header">NE (E) À : </span><strong> {pupil.pupil.birth_place}</strong> {pupil.pupil.birth_place === "" ? "" : ", LE "}
                                                <strong>{this.find_date(pupil.pupil.birth_date + "")}</strong>
                                                <br />
                                                <span className="span-block-header">CLASSE : </span><strong> {this.props.classe.cycle_id.toUpperCase() !== "MATERNELLE" ? this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.order_id : this.props.classe.class_id + " ANNÉE MATERNELLE " + this.props.classe.order_id}</strong><br />
                                                <span className="span-block-header">
                                                    <span>No PERM. : </span>
                                                    <span className="id-case1"><span style={{ color: 'transparent' }}>i</span> {pupil.pupil.permanent_number.substr(0, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(1, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(2, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(3, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(4, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(5, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(6, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(7, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(8, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(9, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(10, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(11, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(12, 1)}</span>
                                                    <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.pupil.permanent_number.substr(13, 1)}</span>
                                                    {/* <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(14, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(15, 1)}</span> */}
                                                </span>
                                            </td>
                                        </tr>
                                    </table>

                                    <table className="className_table" style={{ width: '100%' }}>
                                        <tr>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                <span>
                                                    {this.class_name()}
                                                    <span
                                                        style={{ color: 'transparent' }}>......</span>
                                                    ANNÉE SCOLAIRE {this.props.annee_scolaire.year_name}</span>
                                            </td>
                                        </tr>
                                    </table>

                                    {this.props.classe.cycle_id.toUpperCase() !== "MATERNELLE" && this.props.classe.cycle_id.toUpperCase() !== "MATERNEL" ?
                                        <><table className="className_table" style={{ width: '100%' }}>
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', minWidth: 150 }} rowSpan="3" className="standard-td-top">
                                                    BRANCHES
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="7" className="standard-td-top">
                                                    {this.is_primaire() ? 'PREMIER TRIMESTRE' : 'PREMIER SEMESTRE'}
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="7" className="standard-td-top">
                                                    {this.is_primaire() ? 'DEUXIÈME TRIMESTRE' : 'SECOND SEMESTRE'}
                                                </td>

                                                {this.is_primaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="7" className="standard-td-top">
                                                        TROISIÈME TRIMESTRE
                                                    </td>
                                                    : null}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="3" className="standard-td-top">
                                                    MAX
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="3" className="standard-td-top">
                                                    TOTAL<br />GENERAL
                                                </td>

                                                {this.is_secondaire() ?
                                                    <>
                                                        <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        {parseInt(this.props.classe.class) === 6 ?
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" rowSpan={2} className="standard-td-top">
                                                                EXAMEN D'ÉTAT
                                                            </td>
                                                            :
                                                            <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                                EXAMEN DE REPECHAGE
                                                            </td>}</> : null}
                                            </tr>
                                            <tr>
                                                {/* <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="2" className="standard-td-top">
									MAX.<br />
								</td> */}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    COMPO<br />
                                                    SITION
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>
                                                {/* {this.is_secondaire()? */}
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    COMPO<br />
                                                    SITION
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    MAX.
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>

                                                {this.is_primaire() ?
                                                    <>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                            MAX.
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                            TRAVAUX JOURNAL.<br />
                                                        </td>

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                            MAX.
                                                        </td>

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                            COMPO<br />
                                                            SITION
                                                        </td>

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                            MAX.
                                                        </td>

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 2, paddingRight: 2 }} rowSpan="2" className="standard-td-top">
                                                            TO<br />
                                                            TAL
                                                        </td>
                                                    </> : null}

                                            </tr>
                                            <tr>

                                                <td className="td-top-table">
                                                    1P
                                                </td>
                                                <td className="td-top-table">
                                                    2P
                                                </td>

                                                <td className="td-top-table">
                                                    3P
                                                </td>
                                                <td className="td-top-table">
                                                    4P
                                                </td>

                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-top-table">
                                                            5P
                                                        </td>
                                                        <td className="td-top-table">
                                                            6P
                                                        </td>
                                                    </> : null}

                                                {this.is_secondaire() ?
                                                    <>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        {parseInt(this.props.classe.class) !== 6 ?
                                                            <>
                                                                <td className="standard-td-top" style={{ textAlign: 'center', fontWeight: 'bold', width: 20 }}>
                                                                    <span style={{ color: 'black' }}> % </span>
                                                                </td>
                                                                <td className="standard-td-top">SIGN. PROF.</td>
                                                            </> : null}
                                                    </> : null}

                                                {parseInt(this.props.classe.class) === 6 ?
                                                    <td valign="top" className="standard-td-right" rowSpan={this.props.classe.data.valeur_colonne + 50} style={{paddingRight:5}}>
                                                        <table style={{ width: '100%' }} className="table-fill">
                                                            <tr>
                                                                <td style={{ color: 'black', width: '30%', textAlign: 'center', fontSize: 10 }}>M. EC.</td>
                                                                <td style={{ color: 'black', width: '30%', fontWeight: 'bold', textAlign: "center" }}>{this.render_total_pourcentage(pupil.pupil.pupil_id).replace(".", "")}</td>
                                                                <td style={{ color: 'black', width: '40%', fontWeight: 'bold', textAlign: "center" }}> 1000 </td>
                                                            </tr>
                                                            <tr>
                                                                <td style={{ color: 'black', width: '30%', textAlign: 'center' }}>%</td>
                                                                <td style={{ color: 'black', width: '30%', fontWeight: 'bold', textAlign: "center" }}>{Math.round(this.render_total_pourcentage(pupil.pupil.pupil_id))}</td>
                                                                <td style={{ backgroundColor: 'black', width: '40%' }}></td>
                                                            </tr>
                                                        </table><br />

                                                        <span className="underlined">Pour le contrôle</span><br /><br />
                                                        Le........................................<br /><br />


                                                        Nom et signature <br /><br />
                                                        du CHEF DU CENTRE<br /><br />
                                                        ............................................<br /><br />
                                                        ............................................<br /><br />

                                                        CODE DE CENTRE <br /><br />
                                                        <table style={{ width: '100%' }} className="table-fill">
                                                            <tr>
                                                                <td style={{ color: 'black', width: '20%', textAlign: 'center', fontWeight: 'bold', height: 20 }}>{this.state.code_centre.substr(0, 1)}</td>
                                                                <td style={{ color: 'black', width: '20%', textAlign: 'center', fontWeight: 'bold', height: 20 }}>{this.state.code_centre.substr(1, 1)}</td>
                                                                <td style={{ color: 'black', width: '20%', textAlign: 'center', fontWeight: 'bold', height: 20 }}>{this.state.code_centre.substr(2, 1)}</td>
                                                                <td style={{ color: 'black', width: '20%', textAlign: 'center', fontWeight: 'bold', height: 20 }}>{this.state.code_centre.substr(3, 1)}</td>
                                                                <td style={{ color: 'black', width: '20%', textAlign: 'center', fontWeight: 'bold', height: 20 }}>{this.state.code_centre.substr(4, 1)}</td>
                                                            </tr>
                                                        </table><br />

                                                        <span className="underlined">Résultat final</span><br /><br />
                                                        Diplôme (I)<br /><br />
                                                        Avec...........................%<br /><br />
                                                        A échoué (I)<br /><br /><br />

                                                        <span className="underlined">Pour témoignage</span><br /><br />
                                                        Le .........../.........../...........<br /><br />
                                                        {/* Le {this.find_date(this.props.autres.date_end + "")}<br/><br/> */}


                                                        LE CHEF D'ETABLISSEMENT<br /><br /><br />
                                                        Sceau de l'école<br /><br />
                                                    </td> : null}

                                            </tr>

                                            {this.props.classe.data.domains.map((domain, index_domain) => {
                                                show_domain = false;

                                                if (ddomain !== parseInt(domain.domain_id)) {
                                                    ddomain = parseInt(domain.domain_id);
                                                    show_domain = true;
                                                }
                                                return [
                                                    show_domain ?
                                                        <tr key={index_domain + 1}>
                                                            <td className='td-border' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 11, backgroundColor: 'rgba(0,0,0,0.15)' }} colSpan={this.is_primaire() ? 24 : parseInt(this.props.classe.class) !== 6 ? 20 : 17}>{domain.domain_name.toUpperCase()}</td>

                                                            {parseInt(this.props.classe.class) === 6 && this.is_secondaire() ?
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'transparent' }}>00</span>
                                                                </td> : null}

                                                        </tr> : null,
                                                    this.props.classe.data.sub_domains.map((sub_domain, index_sub_domain) => {

                                                        if (parseInt(sub_domain.domain_id) === parseInt(domain.domain_id)) {
                                                            show_sub_domain = false;
                                                            if (sdomain !== parseInt(sub_domain.sub_domain_id)) {
                                                                sdomain = parseInt(sub_domain.sub_domain_id);
                                                                show_sub_domain = true;
                                                            }

                                                            let dd = "";
                                                            let show_sous_total = false;
                                                            let show_sous_total_technologie = false;

                                                            if (sub_domain.course_2 === "") {
                                                                dd = sub_domain.course_1;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_3 === "") {
                                                                dd = sub_domain.course_2;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_4 === "") {
                                                                dd = sub_domain.course_3;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_5 === "") {
                                                                dd = sub_domain.course_4;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_6 === "") {
                                                                dd = sub_domain.course_5;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_7 === "") {
                                                                dd = sub_domain.course_6;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_8 === "") {
                                                                dd = sub_domain.course_7;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_9 === "") {
                                                                dd = sub_domain.course_8;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_10 === "") {
                                                                dd = sub_domain.course_9;
                                                                show_sous_total = true;
                                                            }

                                                            else {
                                                                dd = sub_domain.course_10;
                                                                show_sous_total = true;
                                                            }

                                                            // if (sub_domain.course_1 !== "" && sub_domain.course_2 === "" && sub_domain.course_3 === "" && sub_domain.course_4 === "" && sub_domain.course_5 === "" && sub_domain.course_6 === "" && sub_domain.course_7 === "" && sub_domain.course_8 === "" && sub_domain.course_9 === "" && sub_domain.course_10 === "") {
                                                            if (sub_domain.course_1 !== "" && sub_domain.course_2 === "" && sub_domain.course_3 === "" && sub_domain.course_4 === "" && sub_domain.course_5 === "" && sub_domain.course_6 === "" && sub_domain.course_7 === "" && sub_domain.course_8 === "" && sub_domain.course_9 === "" && sub_domain.course_10 === "") {
                                                                show_sous_total = false;
                                                            }

                                                            return [
                                                                show_sub_domain && sub_domain.sub_domain_name != "" ?
                                                                    <tr key={index_sub_domain + 1}>
                                                                        <td className='td-border' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 11, backgroundColor: 'rgba(0,0,0,0.15)' }} colSpan={this.is_primaire() ? 24 : parseInt(this.props.classe.class) !== 6 ? 20 : 17}>{sub_domain.sub_domain_name}</td>

                                                                        {parseInt(this.props.classe.class) === 6 && this.is_secondaire() ?
                                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                                <span style={{ color: 'transparent' }}>00</span>
                                                                            </td> : null}
                                                                    </tr> : null,
                                                                this.props.classe.courses.map((course, index) => {

                                                                    if (sub_domain.course_1 == course.course_id || sub_domain.course_2 == course.course_id || sub_domain.course_3 == course.course_id || sub_domain.course_4 == course.course_id || sub_domain.course_5 == course.course_id || sub_domain.course_6 == course.course_id) {

                                                                        // if(course.course_name == "Technologie"){
                                                                        //     show_sous_total = true;
                                                                        //     show_sous_total_technologie = false;
                                                                        // } 

                                                                        // if(sub_domain.sub_domain_name == "MATHÉMATIQUES"){
                                                                        //     show_sous_total = false;
                                                                        //     // console.log(sub_domain.sub_domain_name)
                                                                        // }

                                                                        return [
                                                                            <tr key={index}>
                                                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}>{course.course_name}</td>

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1")}</span></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2")}</span></td>
                                                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</span></td> */}

                                                                                {
                                                                                    course.considered !== "5" ?
                                                                                        <>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</strong></td>
                                                                                        </>
                                                                                        :
                                                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                                            <span style={{ color: 'transparent' }}>00</span>
                                                                                        </td>
                                                                                }
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10)}</strong></td>

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks)}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "4")}</span></td>
                                                                                {
                                                                                    course.considered !== "5" ?
                                                                                        <>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "11")}</strong></td>
                                                                                        </>

                                                                                        : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                                            <span style={{ color: 'transparent' }}>00</span>
                                                                                        </td>
                                                                                }

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)}</strong></td>


                                                                                {this.is_primaire() ?
                                                                                    <>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                                            {parseInt(course.total_marks)}
                                                                                        </strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                                                            <span>
                                                                                                {this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "5")}
                                                                                            </span></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                                                            <span>
                                                                                                {this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "6")}
                                                                                            </span></td>
                                                                                        {
                                                                                            course.considered !== "5" ?
                                                                                                <>
                                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>
                                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                                                        {this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "12")}
                                                                                                    </strong></td>
                                                                                                </>

                                                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                                                    <span style={{ color: 'transparent' }}>00</span>
                                                                                                </td>
                                                                                        }

                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                                            {parseInt(course.total_marks) * 4}
                                                                                        </strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "5", "6", 12)}</strong></td>
                                                                                    </> : null}


                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                                    {this.is_primaire() ? parseInt(course.total_marks) * 12 : parseInt(course.total_marks) * 8}
                                                                                </strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                                                    {this.is_primaire() ?
                                                                                        <strong>
                                                                                            {parseFloat(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)) + parseFloat(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10)) + parseFloat(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "5", "6", 12))}
                                                                                        </strong>
                                                                                        :
                                                                                        <strong>
                                                                                            {parseFloat(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)) + parseFloat(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10))}
                                                                                        </strong>}
                                                                                </td>

                                                                                {this.is_secondaire() ?
                                                                                    <>
                                                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                                            <span style={{ color: 'transparent' }}>00</span>
                                                                                        </td>
                                                                                        {parseInt(this.props.classe.class) !== 6 ?
                                                                                            <>
                                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: 20 }}><span>{this.render_period_marks_rep(pupil.pupil.pupil_id, course.course_id, "15")}</span></td>
                                                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'transparent' }} className="td-border">
                                                                                                    <span style={{ color: 'transparent' }}>00</span>
                                                                                                </td>
                                                                                            </> : null}
                                                                                    </> : null}
                                                                            </tr>

                                                                        ]
                                                                    }
                                                                })
                                                                ,
                                                                show_sous_total ?
                                                                    <tr key={index}>

                                                                        {show_sous_total_technologie ?
                                                                            <>
                                                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, backgroundColor: 'rgba(0,0,0,0.15)', paddingLeft: 10 }}>Sous-total</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>90</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>180</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>360</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>30</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>180</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>360</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>90</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>180</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>360</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>1080</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}></td>
                                                                            </> :
                                                                            <>
                                                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, backgroundColor: 'rgba(0,0,0,0.15)', paddingLeft: 10 }}>Sous-total</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{sub_domain.total_marks}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "1")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "2")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 2}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "10")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 4}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "1", "2", "10")}</strong></td>

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{sub_domain.total_marks}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "3")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "4")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 2}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "11")}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 4}</strong></td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "3", "4", "11")}</strong></td>

                                                                                {this.is_primaire() ?
                                                                                    <>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{sub_domain.total_marks}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "5")}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "6")}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 2}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "12")}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(sub_domain.total_marks) * 4}</strong></td>
                                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "5", "6", "12")}</strong></td>
                                                                                    </> : null}

                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                                                    {this.is_primaire() ?
                                                                                        <strong>{parseInt(sub_domain.total_marks) * 12}</strong> :
                                                                                        <strong>{parseInt(sub_domain.total_marks) * 8}</strong>}
                                                                                </td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                                                    {this.is_primaire() ?
                                                                                        <strong>
                                                                                            {parseFloat(this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "3", "4", "11") + this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "1", "2", "10") + this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "5", "6", "12"))}
                                                                                        </strong> :
                                                                                        <strong>
                                                                                            {parseFloat(this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "3", "4", "11") + this.render_sub_domain_semester_marks(pupil.pupil.pupil_id, sub_domain, "1", "2", "10"))}
                                                                                        </strong>}
                                                                                </td>
                                                                            </>
                                                                        }



                                                                        {this.is_secondaire() ?
                                                                            <>
                                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                                                {parseInt(this.props.classe.class) !== 6 ?
                                                                                    <>
                                                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                                                    </> : null}

                                                                            </>
                                                                            : null}
                                                                    </tr>
                                                                    : null
                                                            ]
                                                        }
                                                    })
                                                ]
                                            })}

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA GÉNÉRAUX</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 5)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 6)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 12)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 5)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 6)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 12))}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                    </> : null}


                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.is_primaire() ? parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 5)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 6)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 12))
                                                    :
                                                    parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>

                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(8)}</strong></td> */}

                                                {this.is_secondaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                        <span style={{ color: 'transparent' }}>00</span>
                                                    </td> : null}

                                                {this.is_secondaire() && parseInt(this.props.classe.class) !== 6 ?
                                                    <td rowSpan="7" colSpan="2">
                                                        <div style={{ textAlign: 'center', fontSize: 11, marginTop: 0 }} className="minw">
                                                            <div style={{ textAlign: 'left', marginLeft: 10 }}>
                                                                {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 3 ?
                                                                    <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> PASSE (I)<br /></strong></> :
                                                                    <><span>- PASSE (I)</span><br /></>}

                                                                {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 4 ?
                                                                    <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> DOUBLE (I)<br /></strong></> :
                                                                    <><span>- DOUBLE (I)</span><br /></>}

                                                                {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 5 ?
                                                                    <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> ORIENTÉ VERS (I)<br /></strong></> :
                                                                    <><span>- ORIENTÉ VERS (I)</span><br /></>}
                                                            </div>
                                                            Le {this.find_date(this.props.autres.date_end + "")}<br />
                                                            Le chef d'Établissement<br /><br />

                                                            Sceau de l'École<br /><br />
                                                        </div>
                                                    </td> : null}

                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>TOTAUX</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 10))}</strong></td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 5)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 6)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 12)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 5)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 6)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 12))}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                    </> : null}

                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                    <strong>
                                                        {parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 10)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 11)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 5)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 6)) + parseFloat(this.totaux_generaux(pupil.pupil.pupil_id, 12))}
                                                    </strong></td>
                                                {this.is_secondaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                        <span style={{ color: 'transparent' }}>00</span>
                                                    </td> : null}
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>POURCENTAGEh</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 1, 2, 10)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>


                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 3, 4, 11)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 5)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 6)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 12)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 5, 6, 12)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                    </> : null}

                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                {this.is_secondaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                        <span style={{ color: 'transparent' }}>00</span>
                                                    </td> : null}
                                            </tr>
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>PLACE/NBR D'ÉLÈVES</strong></td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.props.classe.data.array_places_1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.props.classe.data.array_places_10.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.props.classe.data.array_places_tot1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.props.classe.data.array_places_3.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_4.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                {this.props.classe.data.array_places_11.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                {this.props.classe.data.array_places_tot2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.is_primaire() ?
                                                    <>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                        {this.props.classe.data.array_places_5.map((place, index_p) => {
                                                            if (place.pupil_id == pupil.pupil.pupil_id) {
                                                                return (
                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                        {index_p + 1}/{this.props.classe.data.pupils_count}
                                                                    </strong></td>
                                                                )
                                                            }
                                                        })}

                                                        {this.props.classe.data.array_places_6.map((place, index_p) => {
                                                            if (place.pupil_id == pupil.pupil.pupil_id) {
                                                                return (
                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                        {index_p + 1}/{this.props.classe.data.pupils_count}
                                                                    </strong></td>
                                                                )
                                                            }
                                                        })}

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                        {this.props.classe.data.array_places_12.map((place, index_p) => {
                                                            if (place.pupil_id == pupil.pupil.pupil_id) {
                                                                return (
                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                        {index_p + 1}/{this.props.classe.data.pupils_count}
                                                                    </strong></td>
                                                                )
                                                            }
                                                        })}

                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>

                                                        {this.props.classe.data.array_places_tot3.map((place, index_p) => {
                                                            if (place.pupil_id == pupil.pupil.pupil_id) {
                                                                return (
                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>
                                                                        {index_p + 1}/{this.props.classe.data.pupils_count}
                                                                    </strong></td>
                                                                )
                                                            }
                                                        })}
                                                    </> : null}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.props.classe.data.array_places_tott.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.is_secondaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                        <span style={{ color: 'transparent' }}>00</span>
                                                    </td> : null}
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>APPLICATION</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 5)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 6)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                    </> : null}
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>CONDUITE</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                                {this.is_primaire() ?
                                                    <>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 5)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 6)}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'transparent' }}>00</span>
                                                        </td>
                                                    </> : null}
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>SIGNATURE DU RESPONSABLE</strong></td>
                                                {/* <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20 }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}><span style={{ color: 'transparent' }}>00</span></td>
                                            <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td> */}

                                                {this.is_primaire() ?
                                                    <>
                                                        <td colSpan="7" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                    </> : null}

                                                <td colSpan="7" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="9" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                {this.is_secondaire() ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                        <span style={{ color: 'transparent' }}>00</span>
                                                    </td> : null}
                                            </tr>

                                        </table>

                                            <table className="className_table">
                                                <tr>
                                                    <td colSpan="4" style={{ width: '100%' }}>

                                                        {this.is_2e_secondaire() ?
                                                            <table style={{ fontSize: 10, borderCollapse: 'collapse', marginLeft: 15 }}>
                                                                <caption>(I) RÉSULTAT DE L'EXAMEN DE FIN DE CYCLE DE SECONDAIRE GÉNÉRAL</caption>
                                                                <tr>
                                                                    <th className="td-border" style={{ textAlign: 'left' }}>RÉSULTAT FINAL</th>
                                                                    <th className="td-border" style={{ paddingHorizontal: 15, }}>POINTS OBTENUS</th>
                                                                    <th className="td-border">MAXIMA</th>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-border">MOYENNE ÉCOLE</td>
                                                                    <td className="td-border"></td>
                                                                    <td className="td-border" style={{ textAlign: 'center' }}><strong>50</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-border">MOYENNE EXAMEN DE FIN DE CYCLE</td>
                                                                    <td className="td-border"></td>
                                                                    <td className="td-border" style={{ textAlign: 'center' }}><strong>50</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="td-border"><strong>TOTAL</strong></td>
                                                                    <td className="td-border"></td>
                                                                    <td className="td-border" style={{ textAlign: 'center' }}><strong>100</strong></td>
                                                                </tr>
                                                            </table> : null}



                                                        <div style={{ fontSize: 11, textAlign: 'left', paddingRight: 10, width: '100%', paddingLeft: 10, paddingBottom: 0, paddingTop: 0 }}>

                                                            {this.props.classe.cycle_id.toUpperCase() === "SECONDAIRE" ? <div>
                                                                {parseInt(this.findConseil(pupil.pupil.pupil_id)) !== 6 ?
                                                                    parseInt(this.findConseil(pupil.pupil.pupil_id)) > 2 ?
                                                                        <><strong style={{ color: 'black' }} className="flex items-center"><FaCheck className='mr-2' size={8} /> L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . {this.render_courses_repechage(pupil.pupil.pupil_id)} (1) </strong></> :
                                                                        <><span>- L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . <strong>{this.render_courses_repechage(pupil.pupil.pupil_id)}</strong> (1)</span><br /></>
                                                                    : <><span>- L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . <strong>{this.render_courses_repechage(pupil.pupil.pupil_id)}</strong> (1)</span><br /></>}
                                                            </div> : null}

                                                            {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 0 ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> L'élève passe dans la classe supérieure (1)</strong></> :
                                                                <><span>- L'élève passe dans la classe supérieure (1)</span><br /></>}

                                                            {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 1 ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> L'élève double la classe (1)</strong></> :
                                                                <><span>- L'élève double la classe (1)</span><br /></>}

                                                            {parseInt(this.findConseil(pupil.pupil.pupil_id)) === 2 ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="flex items-center underline"><FaCheck className='mr-2' size={8} /> L'élève est orienté (e) vers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . (1)</strong></> :
                                                                <><span>- L'élève est orienté (e) vers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . (1)</span><br /></>}

                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                        <span style={{ fontSize: 11 }}>
                                                            {/* <!-- <span style="font-size: 50px; color: transparent;">i</span><br/> */}<br />

                                                            {this.props.classe.cycle_id.toUpperCase() === "SECONDAIRE" ? <strong>Signature de l'élève</strong> : null}

                                                            {this.is_6e_primaire() ?
                                                                <table style={{ fontSize: 10, borderCollapse: 'collapse', marginLeft: 15 }}>
                                                                    {/* <caption>(I) RÉSULTAT DE L'EXAMEN DE FIN DE CYCLE DE SECONDAIRE GÉNÉRAL</caption> */}
                                                                    <tr>
                                                                        <th className="td-border" style={{ textAlign: 'left' }}>RÉSULTAT FINAL</th>
                                                                        <th className="td-border" style={{ paddingHorizontal: 15, }}>POINTS OBTENUS</th>
                                                                        <th className="td-border">MAXIMA</th>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="td-border">MOYENNE ÉCOLE</td>
                                                                        <td className="td-border"></td>
                                                                        <td className="td-border" style={{ textAlign: 'center' }}><strong>50</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="td-border">ENAFEP</td>
                                                                        <td className="td-border"></td>
                                                                        <td className="td-border" style={{ textAlign: 'center' }}><strong>50</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="td-border"><strong>TOTAL</strong></td>
                                                                        <td className="td-border"></td>
                                                                        <td className="td-border" style={{ textAlign: 'center' }}><strong>100</strong></td>
                                                                    </tr>
                                                                </table> : null}
                                                        </span>
                                                    </td>
                                                    <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                        <span style={{ fontSize: 11 }}>
                                                            {/* <!-- <span style="font-size: 50px; color: transparent;">i</span><br/> */}<br />
                                                            <strong>Sceau de l'école</strong>
                                                        </span>
                                                    </td>
                                                    <td className="td-bizz-bottom40" style={{ width: '40%', textAlign: 'center' }}>
                                                        <span style={{ fontSize: 11 }}>
                                                            <br /><span>Fait à </span><strong>{"" + this.props.autres.school_city}</strong>,
                                                            le <strong>{this.find_date(this.props.autres.date_end + "")}</strong>
                                                            <br />
                                                            <strong>LE CHEF D'ETABLISSEMENT</strong><br /><br /><br />
                                                            <strong>{this.props.autres.name_promoter}</strong>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table className="className_table-reverse">
                                                <tr>
                                                    <td style={{ paddingLeft: 10 }}>
                                                        <span style={{ fontSize: 9 }}>
                                                            <strong>(I) Biffer la mention inutile <br /> Note impotante : le bulletin est sans valeur s'il est raturé ou surchargé</strong>
                                                        </span><br />
                                                    </td>
                                                </tr>
                                            </table></> :
                                        <table className="className_tableehudheu" style={{ width: '100%', borderWidth: 2, borderTop: 'none' }}>
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: '50%', backgroundColor: 'white', padding: 0 }} className="standard-td-top">
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', width: '50%', borderLeft: 'none', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} rowSpan={2} className="standard-td-top">

                                                            </td>
                                                            <td style={{ textAlign: 'left', fontWeight: 'bold', paddingLeft: 15, backgroundColor: 'white', borderRight: 'none' }} className="standard-td-top">
                                                                Trimestre
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'left', fontWeight: 'bold', backgroundColor: 'white', paddingLeft: 15, }} className="standard-td-top">
                                                                Maxima
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white', padding: 0 }} className="standard-td-top">
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white', width: '16%' }} className="standard-td-top" colSpan={2}>
                                                                1er
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white', width: '16%' }} className="standard-td-top" colSpan={2}>
                                                                2e
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white', width: '16%' }} className="standard-td-top" colSpan={2}>
                                                                3e
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white', width: '16%' }} className="standard-td-top" colSpan={2}>
                                                                Total
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top" rowSpan={2}>
                                                                Qualité
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top" rowSpan={2}>
                                                                Couleur
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style={{ textAlign: 'center', color: 'transparent', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                2
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                4
                                                            </td>
                                                            <td style={{ textAlign: 'center', color: 'transparent', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                2
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                4
                                                            </td>
                                                            <td style={{ textAlign: 'center', color: 'transparent', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                2
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                4
                                                            </td>
                                                            <td style={{ textAlign: 'center', color: 'transparent', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                2
                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'white' }} className="standard-td-top">
                                                                12
                                                            </td>
                                                            {/* <td style={{ textAlign: 'center', fontWeight: 'bold' }} className="standard-td-top">

                                                            </td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold' }} className="standard-td-top"></td> */}
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            {this.props.classe.data.domains.map((domain, index_domain) => {
                                                show_domain = false;

                                                if (ddomain !== parseInt(domain.domain_id)) {
                                                    ddomain = parseInt(domain.domain_id);
                                                    show_domain = true;
                                                }
                                                return [
                                                    show_domain ?
                                                        <tr key={index_domain + 1}>
                                                            <td className='td-border' style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 11, height: 25, paddingLeft: 10, backgroundColor: 'rgba(0,0,0,0.15)' }} colSpan={this.is_primaire() ? 24 : 20}>{domain.domain_name.toUpperCase()}</td>
                                                        </tr> : null,
                                                    this.props.classe.data.sub_domains.map((sub_domain, index_sub_domain) => {

                                                        if (parseInt(sub_domain.domain_id) === parseInt(domain.domain_id)) {
                                                            show_sub_domain = false;
                                                            if (sdomain !== parseInt(sub_domain.sub_domain_id)) {
                                                                sdomain = parseInt(sub_domain.sub_domain_id);
                                                                show_sub_domain = true;
                                                            }

                                                            let dd = "";
                                                            let show_sous_total = false;
                                                            let show_sous_total_technologie = false;

                                                            if (sub_domain.course_2 === "") {
                                                                dd = sub_domain.course_1;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_3 === "") {
                                                                dd = sub_domain.course_2;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_4 === "") {
                                                                dd = sub_domain.course_3;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_5 === "") {
                                                                dd = sub_domain.course_4;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_6 === "") {
                                                                dd = sub_domain.course_5;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_7 === "") {
                                                                dd = sub_domain.course_6;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_8 === "") {
                                                                dd = sub_domain.course_7;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_9 === "") {
                                                                dd = sub_domain.course_8;
                                                                show_sous_total = true;
                                                            }

                                                            else if (sub_domain.course_10 === "") {
                                                                dd = sub_domain.course_9;
                                                                show_sous_total = true;
                                                            }

                                                            else {
                                                                dd = sub_domain.course_10;
                                                                show_sous_total = true;
                                                            }

                                                            // if (sub_domain.course_1 !== "" && sub_domain.course_2 === "" && sub_domain.course_3 === "" && sub_domain.course_4 === "" && sub_domain.course_5 === "" && sub_domain.course_6 === "" && sub_domain.course_7 === "" && sub_domain.course_8 === "" && sub_domain.course_9 === "" && sub_domain.course_10 === "") {
                                                            if (sub_domain.course_1 !== "" && sub_domain.course_2 === "" && sub_domain.course_3 === "" && sub_domain.course_4 === "" && sub_domain.course_5 === "" && sub_domain.course_6 === "" && sub_domain.course_7 === "" && sub_domain.course_8 === "" && sub_domain.course_9 === "" && sub_domain.course_10 === "") {
                                                                show_sous_total = false;
                                                            }

                                                            return [
                                                                show_sub_domain && sub_domain.sub_domain_name != "" ?
                                                                    <tr key={index_sub_domain + 1}>
                                                                        <td className='td-border' style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 11, backgroundColor: 'rgba(0,0,0,0.15)' }} colSpan={this.is_primaire() ? 24 : 20}>{sub_domain.sub_domain_name}</td>
                                                                    </tr> : null,
                                                                this.props.classe.courses.map((course, index) => {

                                                                    if (sub_domain.course_1 == course.course_id || sub_domain.course_2 == course.course_id || sub_domain.course_3 == course.course_id || sub_domain.course_4 == course.course_id || sub_domain.course_5 == course.course_id || sub_domain.course_6 == course.course_id) {

                                                                        // if(course.course_name == "Technologie"){
                                                                        //     show_sous_total = true;
                                                                        //     show_sous_total_technologie = false;
                                                                        // } 

                                                                        // if(sub_domain.sub_domain_name == "MATHÉMATIQUES"){
                                                                        //     show_sous_total = false;
                                                                        //     // console.log(sub_domain.sub_domain_name)
                                                                        // }

                                                                        return [
                                                                            <tr key={index}>
                                                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 30, fontWeight: 'bold' }}>
                                                                                    {
                                                                                        // (index + 1).toString().padStart(2, '0') +  " " + 
                                                                                        course.course_name}
                                                                                </td>

                                                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td> */}
                                                                                <td style={{ padding: 0 }}>
                                                                                    <table style={{ width: '100%' }}>
                                                                                        <tr>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0 }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1")}</span></td>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2")}</span></td>
                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>

                                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1") + this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2") + this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>

                                                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent' }} className="td-border">Qual.</td>
                                                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent' }} className="td-border">Coul.</td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>

                                                                        ]
                                                                    }
                                                                })
                                                                ,
                                                                show_sous_total ?
                                                                    <tr key={index}>
                                                                        <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 40, backgroundColor: 'rgb(0, 0, 0, 0.15)' }}>Sous-total</td>

                                                                        <td style={{ padding: 0 }}>
                                                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                                                <tr>
                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', padding: 0, borderBottom: 'none' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "1")}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{sub_domain.total_marks}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', padding: 0, borderBottom: 'none' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "2")}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{sub_domain.total_marks}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "3")}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{sub_domain.total_marks}</strong></td>


                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "1") + this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "2") + this.render_sub_domain_period_marks(pupil.pupil.pupil_id, sub_domain, "3")}</strong></td>

                                                                                    <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', borderBottom: 'none' }}><strong>{sub_domain.total_marks * 3}</strong></td>

                                                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', borderBottom: 'none', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Qual.</td>
                                                                                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', borderBottom: 'none', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Coul.</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    : null
                                                            ]
                                                        }
                                                    })
                                                ]
                                            })}
                                            <tr key={index}>
                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 0 }}>
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 20, width: '60%', borderLeft: 'none', borderBottom: 'none', borderRightWidth: 2 }} rowSpan={3}>
                                                                Appréciation générale
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none' }}>
                                                                TOTAL GÉNÉRAL
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none' }}>
                                                                Qualité
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none' }}>
                                                                Couleur
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td className='td-border' style={{ padding: 0 }}>
                                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                        <tr>
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', padding: 0 }}><strong>
                                                                {this.totaux_generaux(pupil.pupil.pupil_id, 1)}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {this.maxima_generaux(pupil.pupil.pupil_id, 1)}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%', padding: 0 }}><strong>
                                                                {this.totaux_generaux(pupil.pupil.pupil_id, 2)}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {this.maxima_generaux(pupil.pupil.pupil_id, 2)}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {this.totaux_generaux(pupil.pupil.pupil_id, 3)}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {this.maxima_generaux(pupil.pupil.pupil_id, 3)}
                                                            </strong></td>


                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1) + this.totaux_generaux(pupil.pupil.pupil_id, 2) + this.totaux_generaux(pupil.pupil.pupil_id, 3))}
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '8%' }}><strong>
                                                                {parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1) * 3)}
                                                            </strong></td>

                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Qual.</td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Coul.</td>
                                                        </tr>

                                                        <tr>
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0 }} colSpan={2}><strong>
                                                                {parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 1) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 1)).toString().substr(0, 4)}%
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0 }} colSpan={2}><strong>
                                                                {parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 2) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 2)).toString().substr(0, 4)}%
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%' }} colSpan={2}><strong>
                                                                {parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 3) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 3)).toString().substr(0, 4)}%
                                                            </strong></td>


                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%' }} colSpan={2}><strong>
                                                                {parseFloat(((this.totaux_generaux(pupil.pupil.pupil_id, 1) + this.totaux_generaux(pupil.pupil.pupil_id, 2) + this.totaux_generaux(pupil.pupil.pupil_id, 3)) * 100) / (this.maxima_generaux(pupil.pupil.pupil_id, 1) + this.maxima_generaux(pupil.pupil.pupil_id, 2) + this.maxima_generaux(pupil.pupil.pupil_id, 3))).toString().substr(0, 4)}%
                                                            </strong></td>

                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Qual.</td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Coul.</td>
                                                        </tr>

                                                        <tr>
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0, backgroundColor: this.render_color(parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 1) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 1))) }} colSpan={2}><strong>
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0, backgroundColor: this.render_color(parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 2) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 2))) }} colSpan={2}><strong>
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0, backgroundColor: this.render_color(parseFloat((this.totaux_generaux(pupil.pupil.pupil_id, 3) * 100) / this.maxima_generaux(pupil.pupil.pupil_id, 3))) }} colSpan={2}><strong>
                                                            </strong></td>

                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center', width: '16%', padding: 0, backgroundColor: this.render_color(parseInt(((this.totaux_generaux(pupil.pupil.pupil_id, 1) + this.totaux_generaux(pupil.pupil.pupil_id, 2) + this.totaux_generaux(pupil.pupil.pupil_id, 3)) * 100) / (this.maxima_generaux(pupil.pupil.pupil_id, 1) + this.maxima_generaux(pupil.pupil.pupil_id, 2) + this.maxima_generaux(pupil.pupil.pupil_id, 3)))) }} colSpan={2}><strong>
                                                                {/* 
                                                                {parseFloat(((this.totaux_generaux(pupil.pupil.pupil_id, 1) + this.totaux_generaux(pupil.pupil.pupil_id, 2) + this.totaux_generaux(pupil.pupil.pupil_id, 3)) * 100) / (this.maxima_generaux(pupil.pupil.pupil_id, 1) + this.maxima_generaux(pupil.pupil.pupil_id, 2) + this.maxima_generaux(pupil.pupil.pupil_id)))} */}
                                                            </strong></td>

                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Qual.</td>
                                                            <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'transparent', backgroundColor: 'rgba(0, 0, 0, 0.16)' }} className="standard-td-top">Coul.</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className='td-border09' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 0, borderRight: 'none' }}>
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, padding: 0, textAlign: 'center', height: 25, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} colSpan={3}>Signatures</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderLeft: 'none' }}>Trimestre</td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderLeft: 'none' }}>Instituteur</td>
                                                            <td className='td-border56' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderLeft: 'none' }}>Parent</td>
                                                        </tr>

                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, height: 30, borderLeft: 'none' }}>1er Trimestre</td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10 }}></td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderRight: 'none' }}></td>
                                                        </tr>

                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, height: 30, borderLeft: 'none' }}>2e Trimestre</td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10 }}></td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderRight: 'none' }}></td>
                                                        </tr>

                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, height: 30, borderLeft: 'none', borderBottom: 'none' }}>3e Trimestre</td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderBottom: 'none' }}></td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 10, borderBottom: 'none', borderRight: 'none' }}></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 10, borderLeftWidth: 2 }} valign='top'>Sceau de l'école<br /><br /><br />

                                                    <div style={{ textAlign: 'center' }}>
                                                        Le (La) Directeur (trice)
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 0 }}>
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 20, width: '60%', borderLeft: 'none', borderRightWidth: 2 }} rowSpan={3}>
                                                                Légende
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none' }}>
                                                                Appréciation qualité
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none' }}>
                                                                Couleur correspondante
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingRight: 10, textAlign: 'right', borderRight: 'none', color: 'transparent' }}>
                                                                fueiwhfuewf
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>

                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 0 }}>
                                                    <table style={{ width: '100%' }}>
                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 20, backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>

                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                100-80
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                79-70
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                69-50
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                49-40
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                39-0
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 20 }}>
                                                                QUALITÉ
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Élite
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Très bien
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Bien
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Assez bien
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Médiocre
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, paddingLeft: 20 }}>
                                                                COULEUR
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Jaune
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Bleu
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Vert
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Noir
                                                            </td>
                                                            <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, textAlign: 'center' }}>
                                                                Rouge
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign='top' className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 10 }}>Observation:</td>

                                                <td className='td-border' style={{ fontWeight: 'bold', fontSize: 11, width: '50%', padding: 10, textAlign: 'center', borderLeftWidth: 2 }}>
                                                    <br /><br />

                                                    Fait à Bukavu, le {this.find_date(this.props.autres.date_end + "")} </td>
                                            </tr>
                                        </table>}
                                </div>
                            )
                        }
                    })}
                </div>

            </div>
        )
    }
}

export default connect(mapStateToProps)(BulletinsType2);
