import { Component } from 'react';
import { home_redirect, http } from '../../global_vars';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { CircularProgress } from '@material-ui/core';

class PalmaresPupils extends Component {

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
            periode: "1",
            total_marks: 0,
            array_places_1: [],
            array_places_2: [],
            array_places_10: [],
            array_places_tot1: [],
            array_places_3: [],
            array_places_4: [],
            array_places_11: [],
            array_places_tot2: [],
            autres: [],
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
            if (this.props.classe.data.pupils_marks[i].pupil === pupil_id && (this.props.classe.data.pupils_marks[i].school_period === periode1 || this.props.classe.data.pupils_marks[i].school_period === periode2 || this.props.classe.data.pupils_marks[i].school_period === periode3)) {
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

        if (periode === 10 || periode === 11) {
            return parseInt(return_value) * 2;
        } else if (periode === 12) {
            return parseInt(return_value) * 8;
        } else if (periode === 40 || periode === 50) {
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

    printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = http + this.props.url_server + home_redirect;
        window.location.replace(http + this.props.url_server + home_redirect);
    }

    // componentDidMount() {
    //     // this.open_class();

    //     // if (this.state.can_mount < 5) {
    //     //     this.intervalID = setInterval(() => {
    //     //         let classe = sessionStorage.getItem('classeYambiSMIS');
    //     //         classe = JSON.parse(classe);

    //     //         if (classe.id_classes !== this.state.classe.id_classes) {
    //     //             this.open_class();
    //     //             console.log("can mount palmares")
    //     //         }
    //     //     }, 500);

    //     //     this.setState({ can_mount: this.state.can_mount + 1 });
    //     // }
    // }

    // componentWillUnmount() {
    //     clearInterval(this.intervalID);
    // }

    render() {
        return (
            <div style={{ paddingTop: 0, marginLeft: 15, paddingBottom:50 }} className="center-fixed">

                {!this.props.loading_footer ?
                    <table style={{ width: '98%', marginRight: 15 }}>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <div className="float-menu-right">
                                        <select
                                            onChange={(val) => this.assign_periode(val.target.value)}
                                            style={{ color: 'rgba(0, 80, 180)' }}
                                            value={this.state.periode}
                                            className="select-no-border-select">
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
                                        <h3>PALMARÈS DES RÉSULTATS {this.state.periode_full}</h3>
                                        <table className="full-table-liste-markss" style={{ marginTop: 10 }}>
                                            <thead>
                                                <tr>
                                                    <th rowSpan="2" style={{ width: 30, textAlign: 'center' }}>No</th>
                                                    <th rowSpan="2" style={{ paddingLeft: 10, textAlign: 'left' }}>Noms de l'élève</th>
                                                    {this.state.periode === "1" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>P1</th> : null}

                                                    {this.state.periode === "2" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>P2</th> : null}

                                                    {this.state.periode === "10" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>EX1</th> : null}

                                                    {this.state.periode === "40" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>S1</th> : null}

                                                    {this.state.periode === "3" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>P3</th> : null}

                                                    {this.state.periode === "4" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>P4</th> : null}

                                                    {this.state.periode === "11" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>EX2</th> : null}

                                                    {this.state.periode === "50" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>S2</th> : null}

                                                    {this.state.periode === "12" ?
                                                        <th colSpan="2" style={{ textAlign: 'center' }}>TOTAL</th> : null}
                                                </tr>
                                                <tr>
                                                    {this.state.periode === "1" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "1" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "2" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "2" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "10" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "10" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "40" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "40" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "3" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "3" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "4" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "4" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "11" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "11" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}

                                                    {this.state.periode === "50" ?
                                                        <th style={{ textAlign: 'center' }}>%</th> : null}
                                                    {this.state.periode === "50" ?
                                                        <th style={{ textAlign: 'center' }}>Place</th> : null}
                                                </tr>
                                            </thead>
                                            {this.state.periode === "1" ?
                                                this.props.classe.data.array_places_1.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 1) * 100) / this.render_total_marks_courses(1)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}

                                            {this.state.periode === "2" ?
                                                this.props.classe.data.array_places_2.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 2) * 100) / this.render_total_marks_courses(2)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}

                                            {this.state.periode === "10" ?
                                                this.props.classe.data.array_places_10.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 10) * 100) / this.render_total_marks_courses(10)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}


                                            {this.state.periode === "40" ?
                                                this.props.classe.data.array_places_tot1.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((parseInt(this.render_pupil_marks_trim(pupil.pupil.pupil_id, '1', '2', '10') * 100) / this.render_total_marks_courses(40)).toString().substr(0, 4))}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}


                                            {this.state.periode === "3" ?
                                                this.props.classe.data.array_places_3.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {

                                                            let pourcent_stage = ((this.render_pupil_marks(pupil.pupil.pupil_id, 3) * 100) / this.render_total_marks_courses(3)).toString().substr(0, 4);

                                                            if (pourcent_stage >= "60") {
                                                                return (
                                                                    <tbody key={index}>
                                                                        <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                            <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                            <td style={{ textAlign: 'center' }}>
                                                                                {((this.render_pupil_marks(pupil.pupil.pupil_id, 3) * 100) / this.render_total_marks_courses(3)).toString().substr(0, 4)}
                                                                            </td>
                                                                            <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                )
                                                            }

                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 3) * 100) / this.render_total_marks_courses(3)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}

                                            {this.state.periode === "4" ?
                                                this.props.classe.data.array_places_4.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 4) * 100) / this.render_total_marks_courses(4)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}

                                            {this.state.periode === "11" ?
                                                this.props.classe.data.array_places_11.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((this.render_pupil_marks(pupil.pupil.pupil_id, 11) * 100) / this.render_total_marks_courses(11)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}


                                            {this.state.periode === "50" ?
                                                this.props.classe.data.array_places_11.map((place, index_p) => (
                                                    this.props.classe.data.pupils.map((pupil, index) => {
                                                        if (place.pupil_id === pupil.pupil.pupil_id) {
                                                            return (
                                                                <tbody key={index}>
                                                                    <tr style={{ backgroundColor: index_p % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                                        <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                                        <td style={{ textAlign: 'center' }}>
                                                                            {((parseInt(this.render_pupil_marks_trim(pupil.pupil.pupil_id, '3', '4', '11')) * 100) / this.render_total_marks_courses(50)).toString().substr(0, 4)}
                                                                        </td>
                                                                        <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                                                    </tr>
                                                                </tbody>
                                                            )
                                                        }
                                                    })
                                                ))
                                                : null}
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    :
                    <div className="progress-center-progress">
                        <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                        Chargement du palmarès...
                    </div>}

            </div>
        )
    }
}

export default connect(mapStateToProps)(PalmaresPupils);

