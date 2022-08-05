import { Component } from 'react';
import logo_armoiries from './../../src/assets/armoirie_rdc.png';
import { home_redirect } from "./../global_vars";

export default class FicheE80 extends Component {

    intervalID = 0;

    constructor(props) {
        super(props);

        this.state = {
            classe: [],
            autres: [],
            pupils_marks: [],
            courses: [],
            pupils: [],
            pupil: [],
            url_server: "",
            periode: "*",
            num: 0,
            pupil_id: 1,
            should_fetch_marks: false,
            can_mount: 0,
            autres: [],
            conduites: [],
            school_naame: "",
            gestion: "",
            centre: "",
            option: "",
            code1: "",
            code2: "",
            bpi: "",
        }

        this.open_class = this.open_class.bind(this);
    }

    refresh_class() {

        let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        classe = JSON.parse(classe);
        this.setState({
            classe: classe,
            title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
            loading_middle: true,
            url_server: url_server,
        });

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
                    pupils_marks: response.pupils_marks,
                    courses: response.courses,
                    pupils: response.pupils,
                    loading_middle: false,
                })
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    open_class() {

        this.setState({ can_mount: this.state.can_mount + 1 });

        let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        classe = JSON.parse(classe);
        this.setState({
            classe: classe,
            title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
            loading_middle: true,
            url_server: url_server,
        });

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
                    pupils_marks: response.pupils_marks,
                    courses: response.courses,
                    pupils: response.pupils,
                    loading_middle: false,
                    pupil_id: response.first_pupil,
                    autres: response.autres,
                    school_naame: response.autres.school_name.toUpperCase(),
                    conduites: response.conduites,
                })
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    edit_marks(pupil_id, course_id, period, marks) {

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id && this.state.pupils_marks[i].course == course_id && this.state.pupils_marks[i].school_period == period) {
                this.state.pupils_marks[i].main_marks = marks;
                this.setState({ should_fetch_marks: true });
            } else {
                this.setState({ should_fetch_marks: true });
            }
        }

        let BaseURL = "http://" + this.state.url_server + "/yambi_class_SMIS/API/insert_marks.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    course_id: course_id,
                    periode: period,
                    school_year: this.state.classe.school_year,
                    main_marks: marks,
                    cycle: this.state.classe.cycle,
                    class_id: this.state.classe.class,
                    section_id: this.state.classe.section,
                    option_id: this.state.classe.option
                })
            })
            .then((response) => response.json())
            .then((response) => {

                if (this.state.should_fetch_marks) {
                    this.refresh_class();
                }

            })
            .catch((error) => {
                // Alert.alert(strings.error, strings.connection_failed);
                // alert(error.toString())
                this.setState({ loading_class: false, pupils_see: false });
            });

    }

    findPupil(pupil_id) {

        let pupil = [];
        for (let i in this.state.pupils) {
            if (this.state.pupils[i].pupil_id == pupil_id) {
                pupil = this.state.pupils[i]
            }
        }

        return pupil;
    }

    render_period_marks(pupil_id, periode) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id && this.state.pupils_marks[i].school_period == periode) {
                main_marks = main_marks + parseInt(this.state.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.state.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }
    }

    render_semester_marks(pupil_id, periode1, periode2, periode3) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id && (this.state.pupils_marks[i].school_period == periode1 || this.state.pupils_marks[i].school_period == periode2 || this.state.pupils_marks[i].school_period == periode3)) {
                main_marks = main_marks + parseInt(this.state.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.state.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }

    }

    render_total_marks(pupil_id) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id) {
                main_marks = main_marks + parseInt(this.state.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.state.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }

    }

    render_period_conduite(pupil_id, periode) {
        let main_conduite = "";

        for (let i in this.state.conduites) {
            if (this.state.conduites[i].pupil_id == pupil_id && this.state.conduites[i].periode == periode) {
                main_conduite = this.state.conduites[i].main_conduite;
            }
        }

        if (main_conduite == "") {
            return "-";
        } else if (main_conduite == "1") {
            return "E";
        } else if (main_conduite == "2") {
            return "TB";
        } else if (main_conduite == "3") {
            return "B";
        } else if (main_conduite == "4") {
            return "AB";
        } else if (main_conduite == "5") {
            return "M";
        } else {
            return "MA";
        }
    }

    componentDidMount() {
        this.open_class();

        if (this.state.can_mount < 5) {
            this.intervalID = setInterval(() => {
                let classe = sessionStorage.getItem('classeYambiSMIS');
                classe = JSON.parse(classe);

                if (classe.id_classes !== this.state.classe.id_classes) {
                    this.open_class();
                    console.log("Can mount");
                }
            }, 500);

            this.setState({ can_mount: this.state.can_mount + 1 });
        }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = "http://" + this.state.url_server + "/cirezi2/";
        window.location.replace("http://" + this.state.url_server + "/cirezi2/");
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>

                <span onClick={() => this.printContent("e80")} className="add-minus" style={{ fontWeight: 'bold' }}>
                    IMPRIMER LA FICHE
                </span><br /><br />

                Complétez les informations :<br />
                Gestion : <input
                    onChange={(text) => this.setState({ gestion: text.target.value })} /><br />
                Centre : <input
                    onChange={(text) => this.setState({ centre: text.target.value })} /><br />
                Option : <input
                    onChange={(text) => this.setState({ option: text.target.value })} /><br />
                Code1 : <input
                    onChange={(text) => this.setState({ code1: text.target.value })} /><br />
                Code2 : <input
                    onChange={(text) => this.setState({ code2: text.target.value })} /><br />
                B.P. Inspection : <input
                    onChange={(text) => this.setState({ bpi: text.target.value })} /><br />

                <div id="e80">

                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">

                                    <div style={{ textAlign: 'center', fontWeight: 'bold' }} className="border-bottom">
                                        EXAMEN D'ETAT EDITION {this.state.autres.annee}<br />
                                        MINISTERE DE L'ENSEIGNEMENT PRIMAIRE, SECONDAIRE ET PROFESSIONNEL<br /><br />
                                        <img src={logo_armoiries} height="60" width="80" /><br /><br />
                                        PROVINCE DU SUD-KIVU<br />
                                        INSPECTION PRINCIPALE PROVINCIALE<br />
                                        {this.state.bpi.toUpperCase()}<br /><br />
                                    </div>

                                    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                        REPUBLIQUE DEMOCRATQUE DU CONGO<br />
                                        EPREUVES HORS-SESSION<br /><br />

                                    </div>

                                    <div>
                                        <strong>E80</strong><br /><br />
                                        <table className="full-table-listee">
                                            <tr>
                                                <td>
                                                    <strong>ECOLE : {this.state.school_naame}</strong><br />
                                                    <strong>GESTION : {this.state.gestion.toUpperCase()}</strong><br />
                                                    <strong>CENTRE : {this.state.centre.toUpperCase()}</strong>
                                                </td>
                                                <td>
                                                    <strong>OPTION : {this.state.option.toUpperCase()}</strong><br />
                                                    <strong>CODE : {this.state.code1.toUpperCase()}</strong><br />
                                                    <strong>CODE : {this.state.code2.toUpperCase()}</strong>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                    <table className="full-table-listeee">
                                        <caption>
                                            <h4>
                                                LISTE DES CANDIDATS PAR ETABLISSEMENT - OPTION ET PAR CENTRE
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }}>NOM ET POSTNOM / PRENOM</th>
                                                <th style={{ minWidth: 50, textAlign: 'center' }}> SEXE </th>
                                                <th style={{ minWidth: 70, textAlign: 'center' }}> DISS/100 </th>
                                                <th style={{ minWidth: 50, textAlign: 'center' }}> O.F./20 </th>
                                                <th style={{ minWidth: 50, textAlign: 'center' }}> P.P./30 </th>
                                                <th style={{ minWidth: 70, textAlign: 'center' }}> TOTAL/150 </th>
                                                <th style={{ minWidth: 70, textAlign: 'center' }}> CONVERSION/100 </th>
                                            </tr>
                                        </thead>
                                        {this.state.pupils.map((pupil, index) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.first_name + " " + pupil.second_name + " " + pupil.last_name}</td>

                                                        <td></td>

                                                        <td></td>

                                                        <td></td>

                                                        <td></td>

                                                        <td></td>

                                                        <td></td>

                                                    </tr>
                                                </tbody>
                                            )
                                        })}
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