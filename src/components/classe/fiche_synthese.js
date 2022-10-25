import { Component } from 'react';
import { http } from '../../global_vars';
import Courses from './courses';

export default class SynthesePoints extends Component {

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
        }
    }

    refresh_class() {

        let classe = sessionStorage.getItem('classe');
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
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    open_class() {

        let classe = sessionStorage.getItem('classe');
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

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id && this.state.pupils_marks[i].school_period == periode) {
                return_value = parseInt(return_value) + parseInt(this.state.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_pupil_marks_trim(pupil_id, periode1, periode2, periode3) {
        let return_value = 0;

        for (let i in this.state.pupils_marks) {
            if (this.state.pupils_marks[i].pupil == pupil_id && (this.state.pupils_marks[i].school_period == periode1 || this.state.pupils_marks[i].school_period == periode2 || this.state.pupils_marks[i].school_period == periode3)) {
                return_value = parseInt(return_value) + parseInt(this.state.pupils_marks[i].main_marks);
            }
        }

        return return_value;
    }

    render_total_marks_courses(periode) {
        let return_value = 0;
        for (let i in this.state.courses) {
            return_value = parseInt(return_value) + parseInt(this.state.courses[i].total_marks);
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

    componentDidMount() {
        this.open_class();
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                <div className="float-menu-right">
                    <select
                        onChange={(val) => this.assign_periode(val.target.value)}
                        style={{ color: 'rgba(0, 80, 180)' }}
                        value={this.state.periode}
                        className="select-no-border">
                        {/* <option value="12">Toutes les périodes</option>
                        <option>- - - - - - - - - - - -</option> */}
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

                <div>
                    <strong>{this.state.autres.school_name}</strong><br />
                    <strong>{this.state.autres.school_bp}</strong><br />
                    <strong>{this.state.autres.school_commune}</strong>
                </div>

                <div className="float-right-div">
                    <strong>{this.state.classe.class_id + " " + this.state.classe.section_id + " " + this.state.classe.order_id}</strong><br />
                    <strong>Année scolaire : {this.state.autres.annee}</strong>
                </div>
                <h3>SYNTHÈSE DES RÉSULTATS {this.state.periode_full}</h3>
                <table className="full-table-liste-marks" style={{ marginTop: 10 }}>
                    <thead>
                        <tr>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>CLASSES</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>Nbr ÉlÈVES</th>
                            <th style={{ textAlign: 'center' }}>80% + </th>
                            <th style={{ textAlign: 'center' }}>70 - 79%</th>
                            <th style={{ textAlign: 'center' }}>60 - 69%</th>
                            <th style={{ textAlign: 'center' }}>50 - 59%</th>
                            <th style={{ textAlign: 'center' }}>40 - 49%</th>
                            <th style={{ textAlign: 'center' }}>30 - 39%</th>
                            <th rowSpan="2" style={{ textAlign: 'center', fontSize: 10 }}>MEILLEURE<br />NOTE</th>
                            <th rowSpan="2" style={{ textAlign: 'center' }}>PLUS BASSE<br />NOTE</th>
                            <th rowSpan="2" style={{ textAlign: 'center', fontSize: 10 }}>MOYENNE</th>
                        </tr>
                        <tr>
                            <th style={{ textAlign: 'center' }}>E</th>
                            <th style={{ textAlign: 'center' }}>TB</th>
                            <th colSpan="2" style={{ textAlign: 'center' }}>B</th>
                            <th style={{ textAlign: 'center' }}>Me</th>
                            <th style={{ textAlign: 'center' }}>MA</th>
                        </tr>
                    </thead>
                    {this.state.array_places_1.map((place, index_p) => (
                        this.state.pupils.map((pupil, index) => {
                            if (place.pupil_id === pupil.pupil_id) {
                                return (
                                    <tbody>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                            <td style={{ paddingLeft: 10 }}>{pupil.first_name + " " + pupil.second_name + " " + pupil.last_name}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                {((this.render_pupil_marks(pupil.pupil_id, 1) * 100) / this.render_total_marks_courses(1)).toString().substr(0, 4)}
                                            </td>
                                            <td style={{ textAlign: 'center' }}>{index_p + 1}</td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })
                    ))}
                </table>


                {/* <span onClick={() => window.print()}>Print</span> */}

            </div>
        )
    }
}
