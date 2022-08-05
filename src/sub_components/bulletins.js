import React from 'react';
import logo_rdc from './../../src/assets/flag_drc.jpg';
import logo_armoiries from './../../src/assets/armoirie_rdc.png';
import { home_redirect } from "./../global_vars";
import { FiCheck, FiCircle } from 'react-icons/fi';
import { FaCheck, FaCircle } from 'react-icons/fa';
import { mapStateToProps } from '../store/state_props';
import { connect } from 'react-redux';
import BulletinsType2 from './bulletins_type2';

let max = 0;
let can_show = false;

class Bulletins extends React.Component {

    // intervalID = 0;

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

            let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_class_info.php";

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
                return_value = this.props.classe.data.pupils_marks[i].main_marks;
            }
        }

        return return_value;
    }

    findConseil(pupil_id) {

        let conseil = "";
        for (let i in this.props.classe.data.conseil_deliberation) {
            if (parseInt(this.props.classe.data.conseil_deliberation[i].pupil_id) === parseInt(pupil_id)) {
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
                return_value = parseInt(this.props.classe.data.pupils_marks[i].main_marks);
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
                return_value = return_value + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_period_pourcentage(pupil_id, periode) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
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
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }

    }

    render_total_pourcentage(pupil_id) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil === pupil_id && this.props.classe.data.pupils_marks[i].school_period !== "15") {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

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
        } else if (main_conduite === "1") {
            return "E";
        } else if (main_conduite === "2") {
            return "TB";
        } else if (main_conduite === "3") {
            return "B";
        } else if (main_conduite === "4") {
            return "AB";
        } else if (main_conduite === "5") {
            return "M";
        } else {
            return "MA";
        }
    }

    render_application_periode(pupil_id, periode) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            // return (pourcentage).toString().substr(0, 4);
            if (pourcentage == "") {
                return "-";
            } else if (pourcentage >= 80) {
                return "E";
            } else if (pourcentage >= 70) {
                return "TB";
            } else if (pourcentage >= 50) {
                return "B";
            } else if (pourcentage >= 40) {
                return "AB";
            } else {
                return "M";
            }

        } else {
            return "";
        }
    }

    maxima_generaux(pupil_id, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseInt(return_value) + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        return return_value;
    }

    totaux_generaux(pupil_id, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseInt(return_value) + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
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

        // console.log(this.props.classe.data.conduites)
    }

    printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = "http://" + this.props.url_server + home_redirect;
        window.location.replace("http://" + this.props.url_server + home_redirect);
    }

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

    select_bulletins_type(type){
        if (type === "1") {
            this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 14 });
        this.props.dispatch({ type: "SET_FICHES_TAB", payload: "" });
        this.props.dispatch({ type: "SET_MARKS_TAB", payload: "" });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        }
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                {this.props.classe.class === "6" ?
                    <>
                    
                        {/* <div>
                            Augmenter/diminuer la valeur de la colone Exétat (si elle ne correspond pas correctement); <br />Valeur courante : {this.state.valeur_colonne}<br />
                            <span onClick={() => this.setState({ valeur_colonne: this.state.valeur_colonne - 1 })} className="add-minus">Diminuer</span>
                            <span onClick={() => this.setState({ valeur_colonne: parseInt(this.state.valeur_colonne) + 1 })} className="add-minus">Augmenter</span><br /><br /><br />
                        </div> */}


                        <div>
                            Renseignez le code du centre avant l'impression des bulletins. Ceci peut varier d'une année à une autre.<br />
                            <input
                            placeholder="Nombre des bulletins"
                                type="number"
                                style={{ width: 150 }}
                                maxLength="5"
                                value={this.state.code_centre}
                                onChange={(text) => this.setState({ code_centre: text.target.value })}
                            />
                        </div><br /><br />
                    </>

                    : null}

                    {this.props.classe.data.domains.length === 0 ?
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

                    <br /><br /><br />
                </div>:null}

                <div className="float-right-div">

                <select
                                    onChange={(val) => this.select_bulletins_type(val.target.value)}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="0">Bulletins (type par défaut)</option>
                                    <option value="1">Bulletins (type 2)</option>
                                </select><br /><br />
                </div>

                <span onClick={() => this.printContent("bulletins-p")} className="add-minus" style={{ fontWeight: 'bold' }}>
                    IMPRIMER LES BULLETINS
                </span><br /><br />

                {this.props.classe.data.domains.length !== 0 ?
                <BulletinsType2 />
                :
                this.props.classe.class === "6" ?
                    <div id="bulletins-p">

                        {this.props.classe.pupils.map((pupil, index) => {
                            if (index <= this.state.bulletins_show) {
                                return (
                                    <div key={pupil.pupil.pupil_id} style={{ marginBottom: 20 }}>
                                        <table className="className_table_first">
                                            <tr>
                                                <td style={{ textAlign: 'left' }} className="td-no-border-r">
                                                    <img src={logo_rdc} height="60" width="100" />
                                                </td>
                                                <td style={{ textAlign: 'center', fontSize: 17 }} className="td-no-border">
                                                    <strong>REPUBLIQUE DEMOCRATIQUE DU CONGO</strong><br />
                                                    <strong>MINISTERE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET TECHNIQUE</strong>
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
                                                    </span>
                                                </td>
                                                <td style={{ width: '50%', paddingLeft: 10, paddingBottom: 7 }} className="td-border">
                                                    <span className="span-block-header">ELEVE : </span><strong> {pupil.pupil.first_name.toUpperCase() + " " + pupil.pupil.second_name.toUpperCase() + " " + pupil.pupil.last_name}</strong><span style={{ marginLeft: 30 }}>SEXE : </span><strong>{pupil.pupil.gender === "1" ? "M" : "F"}</strong><br />
                                                    <span className="span-block-header">NE (E) À : </span><strong> {pupil.pupil.birth_place}</strong> {pupil.birth_place === "" ? "" : ", LE "} <strong>{this.find_date(pupil.pupil.birth_date)}</strong><br />
                                                    <span className="span-block-header">CLASSE : </span><strong> {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.order_id}</strong><br />
                                                    <span className="span-block-header" style={{ paddingTop: 5 }}>
                                                        <span>No PERM. : </span>
                                                        <span className="id-case1"> <span style={{ color: 'transparent' }}>i</span> {pupil.pupil.permanent_number.substr(0, 1)}</span>
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
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                    <span>BULLETIN DE LA {this.props.classe.class_id} ANNÉE HUMANITÉ {this.props.classe.section_id.toUpperCase()}<span
                                                        style={{ color: 'transparent' }}>......</span>
                                                        ANNÉE SCOLAIRE {this.props.autres.annee}</span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', minWidth: 150 }} rowSpan="3" className="standard-td-top">
                                                    BRANCHES
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    PREMIER SEMESTRE
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    SECOND SEMESTRE
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="3" className="standard-td-top">
                                                    TOTAL<br />GENERAL
                                                </td>
                                                <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                {this.state.classe.class == 6 ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" className="standard-td-top">
                                                        EXAMEN D'ÉTAT
                                                    </td>
                                                    :
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" className="standard-td-top">
                                                        EXAMEN DE REPECHAGE
                                                    </td>}
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>


                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>


                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                <td className="standard-td-top">Points<br />obtenus</td>
                                                <td className="standard-td-top">Max.</td>
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

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>



                                                <td valign="top" className="standard-td-right" rowSpan={this.props.classe.data.valeur_colonne + 50} colSpan="3">
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
                                                </td>
                                            </tr>
                                            {this.props.classe.data.courses.map((course, index) => {

                                                can_show = false;

                                                if (max !== parseInt(course.total_marks)) {
                                                    max = parseInt(course.total_marks);
                                                    can_show = true;
                                                }
                                                return [

                                                    <tr key={index}>
                                                        {can_show ?
                                                            <>
                                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }


                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }

                                                                {
                                                                    course.considered !== "5" ?
                                                                        [
                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 8}</strong></td>
                                                                        ]
                                                                        :
                                                                        [
                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>]
                                                                }
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                            </>
                                                            : null}
                                                    </tr>
                                                    ,
                                                    <tr key={index}>
                                                        <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}>{course.course_name}</td>
                                                        <td className={`td-border`} style={{ fontSize: 11, textAlign: 'center' }}>
                                                            <span style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1") < course.total_marks / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            <span style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2") < course.total_marks / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2")}</span></td>

                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong
                                                                    style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10") < (course.total_marks * 2) / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            {course.considered !== "5" ?
                                                                <strong
                                                                    style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")) < parseInt((course.total_marks * 4) / 2) ? "red" : "" }}>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")}</strong>
                                                                :
                                                                <strong
                                                                    style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")) < parseInt((course.total_marks)) ? "red" : "" }}>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")}</strong>}
                                                        </td>

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            <span style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3") < course.total_marks / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            <span style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "4") < course.total_marks / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "4")}</span></td>
                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong
                                                                    style={{ color: this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "11") < (course.total_marks * 2) / 2 ? "red" : "" }}>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "11")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            {course.considered !== "5" ?
                                                                <strong style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) < parseInt((course.total_marks * 4) / 2) ? "red" : "" }}>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")}</strong>
                                                                :
                                                                <strong style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) < parseInt((course.total_marks)) ? "red" : "" }}>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")}</strong>}
                                                        </td>

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}>
                                                            {course.considered !== "5" ?
                                                                <strong style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")) < (course.total_marks * 8) / 2 ? "red" : "" }}>{parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10"))}</strong>
                                                                :
                                                                <strong style={{ color: parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10")) < (course.total_marks * 4) / 2 ? "red" : "" }}>{parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", "11")) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", "10"))}</strong>
                                                            }

                                                        </td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                        </td>
                                                    </tr>
                                                ]
                                            })}
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA GÉNÉRAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>

                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(8)}</strong></td> */}
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>TOTAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>POURCENTAGE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 1, 2, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 3, 4, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>PLACE/NBR D'ÉLÈVES</strong></td>
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

                                                {this.props.classe.data.array_places_10.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tot1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

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

                                                {this.props.classe.data.array_places_11.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tot2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tott.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>APPLICATION</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>CONDUITE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>SIGNATURE DU RESPONSABLE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br />
                                                        <strong>Signature de l'élève</strong>
                                                    </span>
                                                </td>
                                                <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br />
                                                        <strong>Sceau de l'école</strong>
                                                    </span>
                                                </td>
                                                <td className="td-bizz-bottom40" style={{ width: '40%', textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br /><span>Fait à </span><strong>{"" + this.props.autres.school_city}</strong>, le <strong>{this.find_date(this.props.autres.date_end + "")}</strong><br />
                                                        <strong>LE CHEF D'ETABLISSEMENT</strong><br /><br /><br />
                                                        <strong>{this.props.autres.name_promoter + ""}</strong>
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
                                        </table>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    :
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
                                                    <strong>REPUBLIQUE DEMOCRATIQUE DU CONGO</strong><br />
                                                    <strong>MINISTERE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET TECHNIQUE</strong>
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
                                                    <span className="span-block-header">CLASSE : </span><strong> {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.order_id}</strong><br />
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

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                    <span>BULLETIN DE LA {this.props.classe.class_id} ANNÉE HUMANITÉ {this.props.classe.section_id.toUpperCase()}<span
                                                        style={{ color: 'transparent' }}>......</span>
                                                        ANNÉE SCOLAIRE {this.props.annee_scolaire.year_name}</span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', minWidth: 150 }} rowSpan="3" className="standard-td-top">
                                                    BRANCHES
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    PREMIER SEMESTRE
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    SECOND SEMESTRE
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="3" className="standard-td-top">
                                                    TOTAL<br />GENERAL
                                                </td>
                                                <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                {this.state.classe.class == 6 ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" className="standard-td-top">
                                                        EXAMEN D'ÉTAT
                                                    </td>
                                                    :
                                                    <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                        EXAMEN DE REPECHAGE
                                                    </td>}
                                            </tr>
                                            <tr>
                                                {/* <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="2" className="standard-td-top">
									MAX.<br />
								</td> */}
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>


                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
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

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                <td className="standard-td-top" style={{ textAlign: 'center', fontWeight: 'bold', width: 20 }}>
                                                    <span style={{ color: 'black' }}> % </span>
                                                </td>
                                                <td className="standard-td-top">SIGN. PROF.</td>
                                            </tr>

                                            {this.props.classe.courses.map((course, index) => {

                                                can_show = false;

                                                if (max !== parseInt(course.total_marks)) {
                                                    max = parseInt(course.total_marks);
                                                    can_show = true;
                                                }
                                                return [

                                                    <tr key={index}>
                                                        {can_show ?
                                                            <>
                                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks)*2}</strong></td> */}
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }


                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }

                                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks)*4}</strong></td> */}

                                                                {
                                                                    course.considered !== "5" ?
                                                                        [
                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 8}</strong></td>
                                                                        ]
                                                                        :
                                                                        [
                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>]
                                                                }

                                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 8}</strong></td> */}
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                            </>
                                                            : null}
                                                    </tr>
                                                    ,
                                                    <tr key={index}>
                                                        <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}>{course.course_name}</td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2")}</span></td>
                                                        {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</span></td> */}

                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "4")}</span></td>
                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "11")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10))}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                        </td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks_rep(pupil.pupil.pupil_id, course.course_id, "15")}</span></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: 'transparent' }} className="td-border">
                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                        </td>
                                                    </tr>
                                                ]
                                            })}
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA GÉNÉRAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>

                                                {/* <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_gen(8)}</strong></td> */}
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                <td rowSpan="7" colSpan="2">
                                                    <div style={{ textAlign: 'center', fontSize: 11, marginTop: -5 }}>
                                                        <div style={{ textAlign: 'left', marginLeft: 20 }}>
                                                            {this.findConseil(pupil.pupil.pupil_id) == "3" ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> PASSE (I)<br /></strong></> :
                                                                <><span>- PASSE (I)</span><br /></>}

                                                            {this.findConseil(pupil.pupil.pupil_id) == "4" ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> DOUBLE (I)<br /></strong></> :
                                                                <><span>- DOUBLE (I)</span><br /></>}

                                                            {this.findConseil(pupil.pupil.pupil_id) == "5" ?
                                                                <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> ORIENTÉ VERS (I)<br /></strong></> :
                                                                <><span>- ORIENTÉ VERS (I)</span><br /></>}
                                                        </div>
                                                        Le {this.find_date(this.props.autres.date_end + "")}<br />
                                                        Le chef d'Établissement<br /><br />

                                                        Sceau de l'École<br /><br />
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>TOTAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>POURCENTAGE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 1, 2, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 3, 4, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>PLACE/NBR D'ÉLÈVES</strong></td>
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

                                                {this.props.classe.data.array_places_10.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tot1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

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

                                                {this.props.classe.data.array_places_11.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tot2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.props.classe.data.array_places_tott.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.props.classe.data.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>APPLICATION</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>CONDUITE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>SIGNATURE DU RESPONSABLE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td colSpan="4" style={{ width: '100%' }}>
                                                    <div style={{ fontSize: 11, textAlign: 'left', paddingRight: 10, width: '100%', paddingLeft: 10, paddingBottom: 0, paddingTop: 0 }}>
                                                        {this.findConseil(pupil.pupil.pupil_id) !== "6" ?
                                                            this.findConseil(pupil.pupil.pupil_id) > "2" ?
                                                                <><strong style={{ color: 'black' }} className="okokkk"><FaCheck size={8} /> L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . {this.render_courses_repechage(pupil.pupil.pupil_id)} (1)</strong><br /></> :
                                                                <><span>- L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . <strong>{this.render_courses_repechage(pupil.pupil.pupil_id)}</strong> (1)</span><br /></>
                                                            : <><span>- L'élève ne pourra passer dans la classe supérieure s'il n'a subi avec succès un examen de repêchage en . . <strong>{this.render_courses_repechage(pupil.pupil.pupil_id)}</strong> (1)</span><br /></>}

                                                        {this.findConseil(pupil.pupil.pupil_id) == "0" ?
                                                            <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> L'élève passe dans la classe supérieure (1)</strong><br /></> :
                                                            <><span>- L'élève passe dans la classe supérieure (1)</span><br /></>}

                                                        {this.findConseil(pupil.pupil.pupil_id) == "1" ?
                                                            <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> L'élève double la classe (1)</strong><br /></> :
                                                            <><span>- L'élève double la classe (1)</span><br /></>}

                                                        {this.findConseil(pupil.pupil.pupil_id) == "2" ?
                                                            <><strong style={{ color: 'rgba(0, 80, 180)' }} className="okokkk"><FaCheck size={8} /> L'élève est orienté (e) vers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . (1)</strong><br /></> :
                                                            <><span>- L'élève est orienté (e) vers . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . (1)</span><br /></>}

                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        {/* <!-- <span style="font-size: 50px; color: transparent;">i</span><br/> */}<br />
                                                        <strong>Signature de l'élève</strong>
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
                                        </table>
                                    </div>
                                )
                            }
                        })}
                    </div>
                }
            </div>
        )
    }
}


{/*<div>
                            Augmenter/diminuer la valeur de la colone Exétat (si elle ne correspond pas correctement); <br />Valeur courante : {this.state.valeur_colonne}<br />
                            <span onClick={() => this.setState({ valeur_colonne: this.state.valeur_colonne - 1 })} className="add-minus">Diminuer</span>
                            <span onClick={() => this.setState({ valeur_colonne: parseInt(this.state.valeur_colonne) + 1 })} className="add-minus">Augmenter</span><br /><br /><br />
                        </div>


                        <div>
                            Renseignez le code du centre avant l'impression des bulletins. Ceci peut varier d'une année à une autre.<br />
                            <input
                                type="number"
                                style={{ width: 150 }}
                                maxLength="5"
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

                    <br /><br /><br />
                </div>

                <span onClick={() => this.printContent("bulletins-p")} className="add-minus" style={{ fontWeight: 'bold' }}>
                    IMPRIMER LES BULLETINS
                </span><br /><br />

                {this.state.classe.class === 6 ?
                    <div id="bulletins-p">

                        {this.props.class.pupils.map((pupil, index) => {
                            if (index <= this.state.bulletins_show) {
                                return (
                                    <div key={pupil.pupil.pupil_id} style={{ marginBottom: 20 }}>
                                        <table className="className_table_first">
                                            <tr>
                                                <td style={{ textAlign: 'left' }} className="td-no-border-r">
                                                    <img src={logo_rdc} height="60" width="100" />
                                                </td>
                                                <td style={{ textAlign: 'center', fontSize: 17 }} className="td-no-border">
                                                    <strong>REPUBLIQUE DEMOCRATIQUE DU CONGO</strong><br />
                                                    <strong>MINISTERE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET TECHNIQUE</strong>
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
                                                        <span className="id-case1"> {pupil.identification_number.substr(0, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(1, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(2, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(3, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(4, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(5, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(6, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(7, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(8, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(9, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(10, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(11, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(12, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(13, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(14, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(15, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(16, 1)}</span>
                                                        <span className="id-case">{pupil.identification_number.substr(17, 1)}</span>
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
                                                    <span className="span-block-header">VILLE : </span><strong> {("" + this.state.autres.school_city).toUpperCase()}</strong><br />
                                                    <span className="span-block-header">COMMUNE : </span><strong> {("" + this.state.autres.school_commune).toUpperCase()}</strong><br />
                                                    <span className="span-block-header">ECOLE : </span><strong> {("" + this.state.autres.school_name).toUpperCase()}</strong><br />
                                                    <span className="span-block-header">
                                                        <span>CODE : </span>
                                                        <span className="id-case1"> {this.state.autres.code_school.substr(0, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(1, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(2, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(3, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(4, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(5, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(6, 1)}</span>
                                                        <span className="id-case">{this.state.autres.code_school.substr(7, 1)}</span>
                                                    </span>
                                                </td>
                                                <td style={{ width: '50%', paddingLeft: 10, paddingBottom: 7 }} className="td-border">
                                                    <span className="span-block-header">ELEVE : </span><strong> {pupil.first_name.toUpperCase() + " " + pupil.second_name.toUpperCase() + " " + pupil.last_name}</strong><span style={{ marginLeft: 30 }}>SEXE : </span><strong>{this.state.gender === "1" ? "M" : "F"}</strong><br />
                                                    <span className="span-block-header">NE (E) À : </span><strong> {pupil.birth_place}</strong> {pupil.birth_place === "" ? "" : ", LE "} <strong>{this.find_date(pupil.birth_date)}</strong><br />
                                                    <span className="span-block-header">CLASSE : </span><strong> {this.state.classe.class_id + " " + this.state.classe.section_id + " " + this.state.classe.order_id}</strong><br />
                                                    <span className="span-block-header" style={{ paddingTop: 5 }}>
                                                        <span>No PERM. : </span>
                                                        <span className="id-case1"> <span style={{ color: 'transparent' }}>i</span> {pupil.permanent_number.substr(0, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(1, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(2, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(3, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(4, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(5, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(6, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(7, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(8, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(9, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(10, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(11, 1)}</span>
                                                        <span className="id-case"><span style={{ color: 'transparent' }}>i</span>{pupil.permanent_number.substr(12, 1)}</span>
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                                    <span>BULLETIN DE LA {this.state.classe.class_id} ANNÉE HUMANITÉ {this.state.classe.section_id.toUpperCase()}<span
                                                        style={{ color: 'transparent' }}>......</span>
                                                        ANNEE SCOLAIRE {this.state.autres.annee}</span>
                                                </td>
                                            </tr>
                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', minWidth: 150 }} rowSpan="3" className="standard-td-top">
                                                    BRANCHES
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    PREMIER SEMESTRE
                                                </td>

                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="4" className="standard-td-top">
                                                    SECOND SEMESTRE
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} rowSpan="3" className="standard-td-top">
                                                    TOTAL<br />GENERAL
                                                </td>
                                                <td rowSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                {this.state.classe.class == 6 ?
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" className="standard-td-top">
                                                        EXAMEN D'ÉTAT
                                                    </td>
                                                    :
                                                    <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="3" className="standard-td-top">
                                                        EXAMEN DE REPECHAGE
                                                    </td>}
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>


                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold' }} colSpan="2" className="standard-td-top">
                                                    TRAVAUX JOURNAL.<br />
                                                </td>


                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    MAX.<br />
                                                    EXAM.
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', paddingLeft: 5, paddingRight: 5 }} rowSpan="2" className="standard-td-top">
                                                    TO<br />
                                                    TAL
                                                </td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                                <td className="standard-td-top">Points<br />obtenus</td>
                                                <td className="standard-td-top">Max.</td>
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

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>



                                                <td valign="top" className="standard-td-right" rowSpan={this.state.valeur_colonne + 50} colSpan="3">
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


                                                    LE CHEF D'ETABLISSEMENT<br /><br /><br />
                                                    Sceau de l'école<br /><br />
                                                </td>
                                            </tr>
                                            {this.state.courses.map((course, index) => {

                                                can_show = false;

                                                if (max !== parseInt(course.total_marks)) {
                                                    max = parseInt(course.total_marks);
                                                    can_show = true;
                                                }
                                                return [

                                                    <tr key={index}>
                                                        {can_show ?
                                                            <>
                                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }


                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{course.total_marks}</strong></td>
                                                                {
                                                                    course.considered !== "5" ?
                                                                        [<td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>
                                                                        ]
                                                                        :
                                                                        [<td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                        </td>,
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 2}</strong></td>]
                                                                }

                                                                {
                                                                    course.considered !== "5" ?
                                                                        [
                                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 8}</strong></td>
                                                                        ]
                                                                        :
                                                                        [
                                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(course.total_marks) * 4}</strong></td>]
                                                                }
                                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                            </>
                                                            : null}
                                                    </tr>
                                                    ,
                                                    <tr key={index}>
                                                        <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}>{course.course_name}</td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "1")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "2")}</span></td>

                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "10")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "3")}</span></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><span>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "4")}</span></td>
                                                        {
                                                            course.considered !== "5" ?
                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_marks(pupil.pupil.pupil_id, course.course_id, "11")}</strong></td>
                                                                : <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                                </td>
                                                        }

                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)}</strong></td>
                                                        <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "3", "4", 11)) + parseInt(this.render_semester_marks(pupil.pupil.pupil_id, course.course_id, "1", "2", 10))}</strong></td>
                                                        <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                            <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                        </td>
                                                    </tr>
                                                ]
                                            })}
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>MAXIMA GÉNÉRAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.maxima_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.maxima_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>TOTAUX</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.totaux_generaux(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 1)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 2)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 10)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 3)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 4)) + parseInt(this.totaux_generaux(pupil.pupil.pupil_id, 11))}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>POURCENTAGE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 1, 2, 10)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_pourcentage(pupil.pupil.pupil_id, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_semester_pourcentage(pupil.pupil.pupil_id, 3, 4, 11)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>PLACE/NBR D'ÉLÈVES</strong></td>
                                                {this.state.array_places_1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_10.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_tot1.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_3.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_4.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_11.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_tot2.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                {this.state.array_places_tott.map((place, index_p) => {
                                                    if (place.pupil_id == pupil.pupil.pupil_id) {
                                                        return (
                                                            <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{index_p + 1}/{this.state.classe.pupils_count}</strong></td>
                                                        )
                                                    }
                                                })}

                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>APPLICATION</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_application_periode(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>CONDUITE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 1)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 2)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 3)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_period_conduite(pupil.pupil.pupil_id, 4)}</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center', backgroundColor: 'black' }}><strong><span style={{ color: 'transparent' }}>okok</span></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="td-border" style={{ fontSize: 11, paddingLeft: 10 }}><strong>SIGNATURE DU RESPONSABLE</strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td colSpan="2" className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong></strong></td>
                                                <td style={{ textAlign: 'center', fontWeight: 'bold', width: 20, backgroundColor: 'black' }}>
                                                    <span style={{ color: 'black', color: 'transparent' }}>00</span>
                                                </td>
                                            </tr>

                                        </table>

                                        <table className="className_table">
                                            <tr>
                                                <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br />
                                                        <strong>Signature de l'élève</strong>
                                                    </span>
                                                </td>
                                                <td className="td-bizz-bottom" style={{ textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br />
                                                        <strong>Sceau de l'école</strong>
                                                    </span>
                                                </td>
                                                <td className="td-bizz-bottom40" style={{ width: '40%', textAlign: 'center' }}>
                                                    <span style={{ fontSize: 11 }}>
                                                        <br /><span>Fait à </span><strong>{this.state.autres.school_city}</strong>, le <strong>{this.find_date(this.state.autres.date_end)}</strong><br />
                                                        <strong>LE CHEF D'ETABLISSEMENT</strong><br /><br /><br />
                                                        <span>{this.state.autres.name_promoter}</span>
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
                                        </table>
                                    </div>
                                )
                            }
                        })}
                    </div>*/}

export default connect(mapStateToProps)(Bulletins);
