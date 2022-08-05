import { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/state_props';

class FichePointsPupils extends Component {

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
            periode: "P1",
            num: 0,
            pupil_id: this.props.classe.data.first_pupil,
            should_fetch_marks: false,
            can_mount: 0,
            annee: "",
            conseils: []
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
                    annee: classe.school_year,
                    conseils: response.conseils
                })
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    edit_marks(pupil_id, course_id, period, marks) {

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == period) {
                this.props.classe.data.pupils_marks[i].main_marks = marks;
                this.setState({ should_fetch_marks: true });
            } else {
                this.setState({ should_fetch_marks: true });
            }
        }

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/insert_marks.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    course_id: course_id,
                    periode: period,
                    school_year: this.props.classe.school_year,
                    main_marks: marks,
                    cycle: this.props.classe.cycle,
                    class_id: this.props.classe.class,
                    section_id: this.props.classe.section,
                    option_id: this.props.classe.option
                })
            })
            .then((response) => response.json())
            .then((response) => {

                if (this.state.should_fetch_marks) {
                    // this.refresh_class();
                }

            })
            .catch((error) => {
                // Alert.alert(strings.error, strings.connection_failed);
                // alert(error.toString())
                this.setState({ loading_class: false, pupils_see: false });
            });

    }

    delete_marks(pupil_id, period) {

        if (period === "P1") {
            period = "1";
        }

        if (period === "P2") {
            period = "2";
        }

        if (period === "P3") {
            period = "3";
        }

        if (period === "P4") {
            period = "4";
        }

        if (period === "EX1") {
            period = "10";
        }

        if (period === "EX2") {
            period = "11";
        }

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/delete_marks.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    periode: period,
                    school_year: this.props.classe.school_year
                })
            })
            .then((response) => response.json())
            .then((response) => {
                // this.refresh_class();
            })
            .catch((error) => {
                this.setState({ loading_class: false, pupils_see: false });
            });
    }

    conseil_deliberation(pupil_id, main_conseil) {
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/conseil_deliberation.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    main_conseil: main_conseil,
                    school_year: this.props.classe.school_year,
                })
            })
            .then((response) => response.json())
            .then((response) => {

                // if (this.state.should_fetch_marks) {
                //     this.refresh_class();
                // }

                // alert("ok");
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });

            })
            .catch((error) => {
                // Alert.alert(strings.error, strings.connection_failed);
                // alert(error.toString())
                this.setState({ loading_class: false, pupils_see: false });
            });

    }

    findPupil(pupil_id) {

        let pupill = "";
        for (let i in this.props.classe.data.pupils) {
            if (this.props.classe.data.pupils[i].pupil.pupil_id == pupil_id) {
                let pupil = this.props.classe.data.pupils[i].pupil;
                pupill = pupil.first_name + " " + pupil.second_name + " " + pupil.last_name;
            }
        }

        return pupill;
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

    set_page(middle_func,marks_tab,menu_left,menu_pupils) {
        // this.setState({ middle_func: 7, marks_tab: "", allow_right_menu: true })

        // this.props.dispatch({ type: "SET_CLASSE", payload: [] });
        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "Nouvel(le) élève | " });
        // this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: menu_pupils });
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        this.props.dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
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


    componentDidMount() {

        // if (this.state.can_mount < 5) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);

        //         if (classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //             console.log("Can mount");
        //         }
        //     }, 500);

            this.setState({ first_pupil: this.props.classe.data.first_pupil });
        // }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }}>
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td valign="top">

                                <strong style={{ fontSize: 20 }}>
                                    {this.findPupil(this.state.pupil_id)}
                                </strong>

                                <div className="float-menu-right">
                                    {/* <select
                        onChange={(val) => this.setState({ pupil_id: val.target.value })}
                        style={{ color: 'rgba(0, 80, 180)' }}
                        value={this.state.pupil_id}
                        className="select-no-border">
                        {this.state.pupils.map((pupil, index) => (
                            <option key={pupil.pupil_id} value={pupil.pupil_id}>{index + 1} {pupil.first_name + " " + pupil.second_name + " " + pupil.last_name}</option>
                        ))}
                    </select> */}

                                    <select
                                        onChange={(val) => this.setState({ periode: val.target.value })}
                                        style={{ color: 'rgba(0, 80, 180)', marginRight: 300 }}
                                        value={this.state.periode}
                                        className="select-no-border-select">
                                        <option value="*">Toutes les périodes</option>
                                        <option>- - - - - - - - - - - -</option>
                                        <option value="P1">Première période</option>
                                        <option value="P2">Deuxième période</option>
                                        <option value="P3">Troisième période</option>
                                        <option value="P4">Quatrième période</option>
                                        <option>- - - - - - - - - - - -</option>
                                        <option value="EX1">Examen premier semestre</option>
                                        <option value="EX2">Examen deuxième semestre</option>
                                        <option>- - - - - - - - - - - -</option>
                                        <option value="S1">Premier semestre</option>
                                        <option value="S2">Deuxième semestre</option>
                                        <option>- - - - - - - - - - - -</option>
                                        <option value="REP">Examen de repêchage</option>
                                    </select>
                                </div>

                                <table className="full-table-liste-marks" style={{ marginTop: 10, width:'100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Cours</th>
                                            {this.state.periode == "P1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P1</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P1</th> :
                                                    this.state.periode == "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P1</th> : null}

                                            {this.state.periode == "P2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P2</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P2</th> :
                                                    this.state.periode == "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P2</th> : null}

                                            {this.state.periode == "EX1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>EX1</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX1</th> :
                                                    this.state.periode == "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>EX1</th> : null}

                                            {this.state.periode == "S1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>S1</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S1</th> :
                                                    this.state.periode == "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>S1</th> : null}

                                            {this.state.periode == "P3" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P3</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P3</th> :
                                                    this.state.periode == "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P3</th> : null}

                                            {this.state.periode == "P4" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P4</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P4</th> :
                                                    this.state.periode == "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P4</th> : null}

                                            {this.state.periode == "EX2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>EX2</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX2</th> :
                                                    this.state.periode == "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>EX2</th> : null}

                                            {this.state.periode == "S2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>S2</th> :
                                                this.state.periode == "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S2</th> :
                                                    this.state.periode == "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>S2</th> : null}

                                            {this.state.periode == "*" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>TOTAL</th> : null}

                                                {this.state.periode == "REP" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>REPECHAGES</th> : null}

                                        </tr>
                                    </thead>
                                    {this.props.classe.data.courses.map((course, index) => {
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{course.course_name} / {course.total_marks}</td>
                                                    {this.state.periode == "P1" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 1)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 1, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 1)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 1, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S1" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 1)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 1, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "P2" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 2)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 2, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 2)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 2, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S1" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 2)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 2, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "EX1" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 10)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 10, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 10)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 10, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S1" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 10)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 10, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "*" ?
                                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                            {parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 1)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 2)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 10))}
                                                        </td> :
                                                        this.state.periode == "S1" ?
                                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                                {parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 1)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 2)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 10))}
                                                            </td> : null}


                                                    {this.state.periode == "P3" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 3)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 3, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 3)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 3, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S2" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 3)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 3, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "P4" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 4)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 4, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 4)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 4, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S2" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 4)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 4, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "EX2" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={this.render_period_marks(this.state.pupil_id, course.course_id, 11)}
                                                                onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 11, text.target.value)}
                                                            />
                                                        </td> :
                                                        this.state.periode == "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 11)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 11, text.target.value)}
                                                                />
                                                            </td> :
                                                            this.state.periode == "S2" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={this.render_period_marks(this.state.pupil_id, course.course_id, 11)}
                                                                        onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 11, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {this.state.periode == "*" ?
                                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                            {parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 3)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 4)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 11))}
                                                        </td> :
                                                        this.state.periode == "S2" ?
                                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                                {parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 3)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 4)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 11))}
                                                            </td> : null}

                                                    {this.state.periode == "*" ?
                                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                            {parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 3)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 4)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 11)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 1)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 2)) + parseInt(this.render_period_marks(this.state.pupil_id, course.course_id, 10))}
                                                        </td> : null}

                                                        {this.state.periode == "REP" ?
                                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                        <input className="input-marks"
                                                                    type="number"
                                                                    value={this.render_period_marks(this.state.pupil_id, course.course_id, 15)}
                                                                    onChange={(text) => this.edit_marks(this.state.pupil_id, course.course_id, 15, text.target.value)}
                                                                />
                                                        </td> : null}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </td>
                            <td valign="top" style={{ paddingLeft: 30 }} className="td-pupils">

                            <strong onClick={() => 
                                                    this.set_page(1,"",true, false)
                                                    // this.setState({ middle_func: 1, marks_tab: "", allow_right_menu_pupils: false, allow_right_menu: true })
                                                    } style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${this.props.middle_func === 1 ? "select-no-border-bold" : ""}`}>
                                                        {/* <FaClipboard style={{ marginRight: 7 }} /> */}
                                                        Revenir en arrière
                                                    </strong><br/>
                                <h3>Liste des élèves</h3>
                                {this.props.classe.data.pupils.map((pupil, index) => (
                                    <span onClick={() => this.setState({ pupil_id: pupil.pupil.pupil_id })} className={`list-pupils ${this.state.pupil_id === pupil.pupil.pupil_id ? "list-pupils-selected" : ""}`} key={pupil.pupil.pupil_id}>{index + 1} {pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</span>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3>Conseil de délibération fin d'année</h3><br/>
                <select
                value={this.findConseil(this.state.pupil_id)}
                onChange={(text) => this.conseil_deliberation(this.state.pupil_id, text.target.value)}
                >
                    <option value="">Sélectionner la décision</option>
                    <option value="0">L'élève passe dans la classe supérieure</option>
                    <option value="1">L'élève double la classe</option>
                    <option value="2">L'élève est orienté ailleurs (a échoué)</option>
                    <option value="">. . . . . . . . . . . . . . . . . . . .</option>
                    <option value="3">L'élève passe dans la classe supérieure</option>
                    <option value="4">L'élève double la classe</option>
                    <option value="5">L'élève est orienté ailleurs (a échoué)</option>
                    <option value="">. . . . . . . . . . . . . . . . . . . .</option>
                    <option value="6">Abandon</option>
                </select>

                <div className="float-right">
                    <button
                    onClick={() => this.delete_marks(this.state.pupil_id, this.state.periode)}
                    >Supprimer les points<br/>de la période courante<br/> pour l'élève</button>
                </div>
                
            </div>
        )
    }
}

export default connect(mapStateToProps)(FichePointsPupils);
