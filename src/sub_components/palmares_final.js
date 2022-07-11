import { Component } from 'react';
import { connect } from 'react-redux';
import { home_redirect } from '../global_vars';
import { mapStateToProps } from '../store/state_props';
import Courses from './courses';

class PalmaresFinal extends Component {

    pourcent_stage = "";

    intervalID = 0;

    constructor(props) {
        super(props);

        this.state = {
            classe: [],
            autres: [],
            pupils_marks: [],
            courses: [],
            pupils: [],
            url_server: "",
            periode: "*",
            total_marks: 0,
            array_places_1: [],
            array_places_2: [],
            array_places_10: [],
            array_places_tot1: [],
            array_places_3: [],
            array_places_4: [],
            array_places_11: [],
            array_places_tot2: [],
            array_places_tott: [],
            autres: [],
            conseil_deliberation: [],
            periode_full: "DE LA 1ère PÉRIODE",
            can_mount: 0
        }
    }

    refresh_class() {

        let classe = sessionStorage.getItem('classeYambiSMIS');
        // let classe = this.state.classe;
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

                alert("ok")
            })
            .catch((error) => {
                // alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    open_class() {

        this.setState({ can_mount: this.state.can_mount + 1 });

        let classe = sessionStorage.getItem('classeYambiSMIS');
        // let classe = this.state.classe;
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
                    autres: response.autres,
                    loading_middle: false,
                    pupil_id: response.first_pupil,
                    array_places_1: response.array_places_1,
                    array_places_2: response.array_places_2,
                    array_places_10: response.array_places_10,
                    array_places_tot1: response.array_places_tot1,
                    array_places_3: response.array_places_3,
                    array_places_4: response.array_places_4,
                    array_places_11: response.array_places_11,
                    array_places_tot2: response.array_places_tot2,
                    array_places_tott: response.array_places_tott,
                    conseil_deliberation: response.conseils,
                })
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    render_pupil_marks(pupil_id, periode) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = parseInt(return_value) + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_pupil_marks_trim(pupil_id, periode1, periode2, periode3) {
        let return_value = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && (this.props.classe.data.pupils_marks[i].school_period == periode1 || this.props.classe.data.pupils_marks[i].school_period == periode2 || this.props.classe.data.pupils_marks[i].school_period == periode3)) {
                return_value = parseInt(return_value) + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_total_marks_courses(periode) {
        let return_value = 0;
        for (let i in this.props.classe.data.courses) {
            return_value = parseInt(return_value) + parseInt(this.props.classe.data.courses[i].total_marks);
        }

        if (periode == 10 || periode == 11) {
            return parseInt(return_value) * 2;
        } else if (periode == "12") {
            return parseInt(return_value) * 8;
        } else if (periode == "40" || periode == "50") {
            return parseInt(return_value) * 4;
        }
        else {
            return parseInt(return_value);
        }
    }

    compare(x, y) {
        return x - y;
    }

    render_place(places) {
        places.sort(this.compare);
    }

    assign_periode(periode) {
        this.setState({ periode: periode });
        if (periode == "1") {
            this.setState({ periode_full: "DE LA 1ère PÉRIODE" });
        } else if (periode == "2") {
            this.setState({ periode_full: "DE LA 2e PÉRIODE" });
        } else if (periode == "3") {
            this.setState({ periode_full: "DE LA 3e PÉRIODE" });
        } else if (periode == "4") {
            this.setState({ periode_full: "DE LA 4e PÉRIODE" });
        } else if (periode == "10") {
            this.setState({ periode_full: "DES EXAMENS DU 1er SEMESTRE" });
        } else if (periode == "11") {
            this.setState({ periode_full: "DES EXAMENS DU 2e SEMESTRE" });
        } else if (periode == "40") {
            this.setState({ periode_full: "DU PREMIER SEMESTRE" });
        } else if (periode == "50") {
            this.setState({ periode_full: "DU SECOND SEMESTRE" });
        } else {

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

    componentDidMount() {
        // this.open_class();

        // if (this.state.can_mount < 5) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);

        //         if (classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //             console.log("can mount palmares")
        //         }
        //     }, 500);

        //     this.setState({ can_mount: this.state.can_mount + 1 });
        // }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div style={{ paddingTop: 0 }} className="center-fixed">

                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td valign="top">

                                <div onClick={() => this.printContent("print-palmares")} className="span-blockk">
                                    IMPRIMER
                                </div>


                                <div id="print-palmares" style={{ marginTop: -20 }}>
                                    <div>
                                        <strong>{this.props.autres.school_name}</strong><br />
                                        <strong>{this.props.autres.school_bp}</strong><br />
                                        <strong>{this.props.autres.school_commune}</strong>
                                    </div>

                                    <div className="float-right-div">
                                        <strong>{this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.order_id}</strong><br />
                                        <strong>Année scolaire : {this.props.autres.annee}</strong>
                                    </div>
                                    <h3>PALMARÈS FINAL DES RÉSULTATS DE FIN D'ANNÉE</h3>
                                    <table className="full-table-liste-markss" style={{ marginTop: 10 }}>
                                        <thead>
                                            <tr>
                                                <th rowSpan="2" style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th rowSpan="2" style={{ paddingLeft: 10, textAlign: 'left' }}>Noms de l'élève</th>


                                                {this.state.periode === "*" ?
                                                    <th colSpan="2" style={{ textAlign: 'center' }}>TOTAL</th> : null}
                                            </tr>
                                            <tr>
                                                {this.state.periode === "*" ?
                                                    <th style={{ textAlign: 'center' }}>%</th> : null}
                                                {/* {this.state.periode === "*" ?
                                                    <th style={{ textAlign: 'center' }}>Place</th> : null} */}
                                            </tr>
                                        </thead>

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves qui passent dans la classe supérieure (à la première session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "0") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.state.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}


                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves qui doublent la classe (à la première session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "1") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves orienté(e)s ailleurs (Exclu(e)s) (à la première session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "2") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves qui passent dans la classe supérieure (après 2e session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "3") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves qui doublent la classe (après 2e session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "4") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Les élèves orienté(e)s ailleurs (après 2e session)</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "5") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}

                                        <tr><td colSpan="4" style={{ paddingLeft: 10 }}><h3>Cas d'abandon</h3></td></tr>
                                        {this.props.classe.data.conseil_deliberation.map((conseil) => {
                                            if (conseil.main_conseil === "6") {

                                                let title = "";

                                                if (conseil.main_conseil === "0") {
                                                    title = "Les élèves qui sont passé dans la classe supérieure";
                                                } else if (conseil.main_conseil === "1") {
                                                    title = "Les élèves qui doublent la classe";
                                                } else if (conseil.main_conseil === "2") {
                                                    title = "Les élèves qui sont orientés ailleurs";
                                                } else if (conseil.main_conseil === "6") {
                                                    title = "Abandon";
                                                } else if (conseil.main_conseil === "3") {
                                                    title = "Les élèves qui passent dans la classe supérieure après 2e session";
                                                } else if (conseil.main_conseil === "4") {
                                                    title = "Les élèves qui doublent la classe après 2e session";
                                                } else if (conseil.main_conseil === "5") {
                                                    title = "Les élèves qui sont orientés ailleurs apres 2e session";
                                                } else {
                                                    title = "ok";
                                                }

                                                return (
                                                    <>
                                                        {this.state.periode === "*" ?
                                                            this.props.classe.data.pupils.map((pupil, index) => {
                                                                if (conseil.pupil_id === pupil.pupil.pupil_id) {
                                                                    return (
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style={{ textAlign: 'center' }}> {index + 1}</td>
                                                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                                <td className="td-border" style={{ fontSize: 11, textAlign: 'center' }}><strong>{this.render_total_pourcentage(pupil.pupil.pupil_id)}</strong></td>
                                                                                {/* <td style={{ textAlign: 'center' }}>{index_p + 1}</td> */}
                                                                            </tr>
                                                                        </tbody>
                                                                    )
                                                                }
                                                            })
                                                            : null}
                                                    </>
                                                )
                                            }
                                        })}
                                    </table>
                                </div>
                            </td>
                            {/* <td valign="top" style={{ paddingLeft: 30 }} className="td-courses">
                                <Courses />
                            </td> */}
                        </tr>
                    </tbody>
                </table>


                {/* <span onClick={() => window.print()}>Print</span> */}

            </div>
        )
    }
}
// {this.state.periode == "1" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>P1</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>P1</th> :
//                                     this.state.periode == "40" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>P1</th> : null}

//                             {this.state.periode == "2" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>P2</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>P2</th> :
//                                     this.state.periode == "40" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>P2</th> : null}

//                             {this.state.periode == "10" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>EX1</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>EX1</th> :
//                                     this.state.periode == "40" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>EX1</th> : null}

//                             {this.state.periode == "40" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>S1</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>S1</th> :
//                                     this.state.periode == "40" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>S1</th> : null}

//                             {this.state.periode == "3" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>P3</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>P3</th> :
//                                     this.state.periode == "50" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>P3</th> : null}

//                             {this.state.periode == "4" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>P4</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>P4</th> :
//                                     this.state.periode == "50" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>P4</th> : null}

//                             {this.state.periode == "11" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>EX2</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>EX2</th> :
//                                     this.state.periode == "50" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>EX2</th> : null}

//                             {this.state.periode == "50" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>S2</th> :
//                                 this.state.periode == "12" ?
//                                     <th colSpan="2" style={{ textAlign: 'center' }}>S2</th> :
//                                     this.state.periode == "50" ?
//                                         <th colSpan="2" style={{ textAlign: 'center' }}>S2</th> : null}

//                             {this.state.periode == "12" ?
//                                 <th colSpan="2" style={{ textAlign: 'center' }}>TOTAL</th> : null}
//                         </tr>
//                         <tr>
//                         {this.state.periode == "1" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "1" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "2" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "2" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "10" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "10" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "40" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "3" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "3" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "4" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "4" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "11" ?
//                                 <th style={{ textAlign: 'center' }}>%</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "11" ?
//                                 <th style={{ textAlign: 'center' }}>Place</th> :
//                                 this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> :
//                                     this.state.periode == "50" ?
//                                         <th style={{ textAlign: 'center' }}>Place</th> : null}

//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>%</th> : null}
//                                         {this.state.periode == "12" ?
//                                     <th style={{ textAlign: 'center' }}>Place</th> : null}

export default connect(mapStateToProps)(PalmaresFinal);

