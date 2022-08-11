import React, { Component } from 'react';
import { mapStateToProps } from '../../store/state_props';
import { home_redirect } from "./../../global_vars";
import { connect } from 'react-redux';

class FicheE13 extends Component {

    intervalID = 0;

    constructor(props) {
        super(props);

        this.state = {
            // classe: [],
            // autres: [],
            // pupils_marks: [],
            // courses: [],
            // pupils: [],
            // pupil: [],
            // url_server: "",
            periode: "*",
            // num: 0,
            // pupil_id: 1,
            // should_fetch_marks: false,
            // can_mount: 0,
            // autres: [],
            // conduites: [],
            // school_name_uc: "",
        }

        // this.open_class = this.open_class.bind(this);
    }

    // refresh_class() {

    //     let classe = sessionStorage.getItem('classeYambiSMIS');
    //     let url_server = sessionStorage.getItem('yambi_smis_url_server');
    //     classe = JSON.parse(classe);
    //     this.setState({
    //         classe: classe,
    //         title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
    //         loading_middle: true,
    //         url_server: url_server,
    //     });

    //     let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_class_info.php";

    //     fetch(BaseURL, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             cycle_id: classe.cycle,
    //             class_id: classe.class,
    //             order_id: classe.order,
    //             section_id: classe.section,
    //             option_id: classe.option,
    //             school_year: classe.school_year,
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             this.setState({
    //                 pupils_marks: response.pupils_marks,
    //                 courses: response.courses,
    //                 pupils: response.pupils,
    //                 loading_middle: false,
    //             })
    //         })
    //         .catch((error) => {
    //             alert(error.toString());
    //             // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
    //         });
    // }

    // open_class() {
    //     this.setState({ can_mount: this.state.can_mount + 1 });

    //     let classe = sessionStorage.getItem('classeYambiSMIS');
    //     let url_server = sessionStorage.getItem('yambi_smis_url_server');
    //     classe = JSON.parse(classe);
    //     this.setState({
    //         classe: classe,
    //         title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
    //         loading_middle: true,
    //         url_server: url_server,
    //     });

    //     let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_class_info.php";

    //     fetch(BaseURL, {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             cycle_id: classe.cycle,
    //             class_id: classe.class,
    //             order_id: classe.order,
    //             section_id: classe.section,
    //             option_id: classe.option,
    //             school_year: classe.school_year,
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             this.setState({
    //                 pupils_marks: response.pupils_marks,
    //                 courses: response.courses,
    //                 pupils: response.pupils,
    //                 loading_middle: false,
    //                 pupil_id: response.first_pupil,
    //                 autres: response.autres,
    //                 school_name_uc: response.autres.school_name.toUpperCase(),
    //                 conduites: response.conduites,
    //             })
    //         })
    //         .catch((error) => {
    //             alert(error.toString());
    //             // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
    //         });
    // }

    // edit_marks(pupil_id, course_id, period, marks) {

    //     for (let i in this.state.pupils_marks) {
    //         if (this.state.pupils_marks[i].pupil == pupil_id && this.state.pupils_marks[i].course == course_id && this.state.pupils_marks[i].school_period == period) {
    //             this.state.pupils_marks[i].main_marks = marks;
    //             this.setState({ should_fetch_marks: true });
    //         } else {
    //             this.setState({ should_fetch_marks: true });
    //         }
    //     }

    //     let BaseURL = "http://" + this.state.url_server + "/yambi_class_SMIS/API/insert_marks.php";

    //     fetch(BaseURL,
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 pupil_id: pupil_id,
    //                 course_id: course_id,
    //                 periode: period,
    //                 school_year: this.state.classe.school_year,
    //                 main_marks: marks,
    //                 cycle: this.state.classe.cycle,
    //                 class_id: this.state.classe.class,
    //                 section_id: this.state.classe.section,
    //                 option_id: this.state.classe.option
    //             })
    //         })
    //         .then((response) => response.json())
    //         .then((response) => {

    //             if (this.state.should_fetch_marks) {
    //                 this.refresh_class();
    //             }

    //         })
    //         .catch((error) => {
    //             // Alert.alert(strings.error, strings.connection_failed);
    //             // alert(error.toString())
    //             this.setState({ loading_class: false, pupils_see: false });
    //         });

    // }

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

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        // if(main_marks != 0) {
        //     pourcentage = (main_marks * 100) / total_marks;
        //     return (pourcentage).toString().substr(0, 4);
        // } else {
        //     return "";
        // }

        return main_marks;
    }

    render_semester_marks(pupil_id, periode1, periode2, periode3) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && (this.props.classe.data.pupils_marks[i].school_period == periode1 || this.props.classe.data.pupils_marks[i].school_period == periode2 || this.props.classe.data.pupils_marks[i].school_period == periode3)) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        // if(main_marks != 0) {
        //     pourcentage = (main_marks * 100) / total_marks;
        //     return (pourcentage).toString().substr(0, 4);
        // } else {
        //     return "";
        // }

        return main_marks;

    }

    render_total_marks(pupil_id) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / total_marks;
            return (Math.round(pourcentage).toString().substr(0, 2));
        } else {
            return "";
        }

    }

    render_total_main_marks(pupil_id) {
        let pourcentage = 0;
        let main_marks = 0;
        let total_marks = 0;

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id) {
                main_marks = main_marks + parseInt(this.props.classe.data.pupils_marks[i].main_marks);
                total_marks = total_marks + parseInt(this.props.classe.data.pupils_marks[i].total_marks);
            }
        }

        // if (main_marks != 0) {
        //     pourcentage = (main_marks * 100) / total_marks;
        //     return (pourcentage).toString().substr(0, 4);
        // } else {
        //     return "";
        // }

        return main_marks;

    }

    // render_period_conduite(pupil_id, periode) {
    //     let main_conduite = "";

    //     for (let i in this.state.conduites) {
    //         if (this.state.conduites[i].pupil_id == pupil_id && this.state.conduites[i].periode == periode) {
    //             main_conduite = this.state.conduites[i].main_conduite;
    //         }
    //     }

    //     if (main_conduite == "") {
    //         return "-";
    //     } else if (main_conduite == "1") {
    //         return "E";
    //     } else if (main_conduite == "2") {
    //         return "TB";
    //     } else if (main_conduite == "3") {
    //         return "B";
    //     } else if (main_conduite == "4") {
    //         return "AB";
    //     } else if (main_conduite == "5") {
    //         return "M";
    //     } else {
    //         return "MA";
    //     }
    // }

    componentDidMount() {
        // this.open_class();

        // if (this.state.can_mount < 5) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);

        //         if (classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //             console.log("Can mount");
        //         }
        //     }, 500);

        //     this.setState({ can_mount: this.state.can_mount + 1 });
        // }
    }

    maxima_generaux() {
        const periode = 4;
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

        return return_value * 8;
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

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>

                <div className="float-right-div">
                    <select
                        onChange={(val) => this.setState({ periode: val.target.value })}
                        style={{ color: 'rgba(0, 80, 180)' }}
                        value={this.state.periode}
                        className="select-no-border-select">
                        <option>Choisissez période/Total</option>
                        <option value="*">Total général</option>
                        <option>- - - - - - - - - - - -</option>
                        <option value="P1">Première période</option>
                        <option value="P2">Deuxième période</option>
                        <option value="P3">Troisième période</option>
                        <option value="P4">Quatrième période</option>
                        {/* <option>- - - - - - - - - - - -</option>
                    <option value="EX1">Examen premier semestre</option>
                    <option value="EX2">Examen deuxième semestre</option> */}
                        <option>- - - - - - - - - - - -</option>
                        <option value="S1">Premier semestre</option>
                        <option value="S2">Deuxième semestre</option>
                    </select>
                </div>

                <span onClick={() => this.printContent("e13")} className="add-minus" style={{ fontWeight: 'bold' }}>
                    IMPRIMER LA FICHE
                </span><br /><br />

                <div id="e13">

                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    {/* <div>
                                        <strong>{this.state.autres.school_name}</strong><br />
                                        <strong>{this.state.autres.school_bp}</strong><br />
                                        <strong>Année scolaire : {this.state.autres.annee}</strong>
                                    </div> */}
                                    <table className="full-table-liste">
                                        <caption style={{ color: 'transparent' }}>
                                            <h4>
                                                FICHE E13 <br />
                                                {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id + " " + this.props.classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }}>NOMS ET POSTNOM / PRENOM</th>
                                                <th style={{ width: 50, textAlign: 'center' }}> S </th>
                                                <th style={{ width: 100, textAlign: 'center' }}><input placeholder={this.maxima_generaux()} className="input-no-borderr" /></th>
                                                <th style={{ width: 50, textAlign: 'center' }}><input placeholder="%" className="input-no-borderr" /></th>
                                            </tr>
                                        </thead>
                                        {this.props.classe.pupils.map((pupil, index) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>

                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            {pupil.pupil.gender === "1" ? "M" : "F"}
                                                        </td>

                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            {this.render_total_main_marks(pupil.pupil.pupil_id)}
                                                        </td>

                                                        {this.state.periode === "P1" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_period_marks(pupil.pupil.pupil_id, 1)}
                                                            </td> : null}

                                                        {this.state.periode === "P2" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_period_marks(pupil.pupil.pupil_id, 2)}
                                                            </td> : null}

                                                        {this.state.periode === "S1" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_semester_marks(pupil.pupil.pupil_id, 1, 2, 10)}
                                                            </td> : null}

                                                        {this.state.periode === "P3" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_period_marks(pupil.pupil.pupil_id, 3)}
                                                            </td> : null}

                                                        {this.state.periode === "P4" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_period_marks(pupil.pupil.pupil_id, 4)}
                                                            </td> : null}

                                                        {this.state.periode === "S2" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_semester_marks(pupil.pupil.pupil_id, 3, 4, 11)}
                                                            </td> : null}

                                                        {this.state.periode === "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                {this.render_total_marks(pupil.pupil.pupil_id)}
                                                            </td> : null}

                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </td>
                                <td valign="top" style={{height:'100%'}}>
                                    <span style={{ color: 'transparent' }}>guygyugu</span><br/>
                                    <span style={{ color: 'transparent' }}>guygyugu</span><br/>
                                    <table className="full-table-listee13">
                                        <caption>
                                            <h4 style={{ color: 'transparent' }}>
                                                FICHE E13<br />
                                                {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" style={{ paddingLeft: 10, textAlign: 'center', minWidth: 60 }}>E13</th>
                                            </tr>
                                            <tr>
                                                <td style={{ backgroundColor: 'transparent', height: 50 }}>
                                                    <div className="vertical_text">
                                                        <input className="input-no-border" style={{ borderWidth: 0, width: "100%" }} />
                                                    </div>
                                                </td>

                                                <td style={{ backgroundColor: 'transparent', height: 50 }}>
                                                    <div className="vertical_text">
                                                        <input className="input-no-border" style={{ borderWidth: 0, width: "100%" }} />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre"><br />NOMBRE DES CANDIDATS</div>
                                                    </div>
                                                </td>
                                                <td style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre"><br />NOMBRE TOTAL DES PLACES</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre2"><br /><br />{this.state.school_name_uc}</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre2"><br /><br />NOM DE L'ETABLISSEMENT</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre2"><br /><br />SCEAU LEGER</div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" style={{ textAlign: 'right', backgroundColor: 'transparent' }}>
                                                    <div className="vertical_text">
                                                        <div className="div-centre2"><br /><br />RAPPEL</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </thead>
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

export default connect(mapStateToProps)(FicheE13);
