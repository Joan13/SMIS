import { CircularProgress } from '@material-ui/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import { http } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';

class FichesPointsCourses extends Component {

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
            periode: "P1",
            num: 0,
            pupil_id: 1,
            should_fetch_marks: false,
            can_mount: 0,
            course_id: null,
        }
    }

    refresh_class() {

        let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        classe = JSON.parse(classe);
        this.setState({
            classe: classe,
            title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
            loading_middle: true,
            url_server: url_server
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

        let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        classe = JSON.parse(classe);
        this.setState({
            classe: classe,
            title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
            loading_middle: true,
            url_server: url_server
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
                    pupil_id: response.first_pupil,
                    course_id: response.first_course
                })
            })
            .catch((error) => {
                // alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    edit_marks(pupil_id, course_id, period, marks) {

        // for (let i in this.props.classe.data.pupils_marks) {
        //     if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == period) {
        //         this.props.classe.data.pupils_marks[i].main_marks = marks;
        //         this.setState({ should_fetch_marks: true });
        //     } else {
        //         this.setState({ should_fetch_marks: true });
        //     }
        // }

        let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/edit_marks.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    course_id: course_id,
                    periode: period,
                    school_year: this.props.classe.school_year,
                    main_marks: marks
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

    insert_marks(pupil_id, course_id, period, marks, total_marks) {

        // for (let i in this.props.classe.data.pupils_marks) {
        //     if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == period) {
        //         this.props.classe.data.pupils_marks[i].main_marks = marks;
        //         this.setState({ should_fetch_marks: true });
        //     } else {
        //         this.setState({ should_fetch_marks: true });
        //     }
        // }

        let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/edit_marks.php";

        fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    course_id: course_id,
                    periode: period,
                    school_year: this.props.classe.school_year,
                    main_marks: marks,
                    total_marks:total_marks,
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

    render_period_marks(pupil_id, course_id, periode) {
        let return_value = "0";

        for (let i in this.props.classe.data.pupils_marks) {
            if (this.props.classe.data.pupils_marks[i].pupil == pupil_id && this.props.classe.data.pupils_marks[i].course == course_id && this.props.classe.data.pupils_marks[i].school_period == periode) {
                return_value = this.props.classe.data.pupils_marks[i].main_marks;
            }
        }

        return return_value;
    }

    findCourse(course_id) {

        let coursee = "";
        for (let i in this.props.classe.data.courses) {
        if (this.props.classe.data.courses[i].course_id == course_id) {
            let course = this.props.classe.data.courses[i];
            coursee = course.course_name + " / " + course.total_marks;
        } 
        }

        return coursee;
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

    componentDidMount() {
        // if(this.state.can_mount < 4) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);
    
        //         if(classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //         }
        //     }, 500);

        if (this.props.classe.courses[0] !== undefined) {
            this.setState({ course_id:this.props.classe.courses[0].course_id });
        }
           
        // }
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10,width:'100%' }}>
            {!this.props.loading_footer ?
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td valign="top">

            <strong style={{ fontSize: 20 }}>{this.findCourse(this.state.course_id)}</strong>
                
                <div className="float-menu-right">
                <select
                    onChange={(val) => this.setState({ periode: val.target.value })}
                    style={{ color: 'rgba(0, 80, 180)',backgroundColor:'white',textAlign:'right' }}
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
                </select>

                </div>

                <table className="full-table-liste-markss" style={{ marginTop: 10, width:'100%' }}>
                    <thead>
                        <tr>
                            <th style={{ width: 30, textAlign: 'center' }}>No</th>
                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Noms des élèves</th>
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
                        </tr>
                    </thead>
                    {this.props.classe.data.pupils.map((pupil, index) => {
                        return (
                            <tbody>
                                <tr>
                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                    {this.state.periode == "P1" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 1, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 1, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S1" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 1, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "P2" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 2, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 2, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S1" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 2, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "EX1" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 10, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 10, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S1" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 10, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10))}
                                        </td> :
                                        this.state.periode == "S1" ?
                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                {parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10))}
                                            </td> : null}


                                    {this.state.periode == "P3" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 3, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 3, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 3, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "P4" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 4, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 4, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 4, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "EX2" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 11, text.target.value)}
                                            />
                                        </td> :
                                        this.state.periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 11, text.target.value)}
                                                />
                                            </td> :
                                            this.state.periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, this.state.course_id, 11, text.target.value)}
                                                    />
                                                </td> : null}

                                    {this.state.periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11))}
                                        </td> :
                                        this.state.periode == "S2" ?
                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                {parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11))}
                                            </td> : null}

                                    {this.state.periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 11)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, this.state.course_id, 10))}
                                        </td> : null}


                                </tr>
                            </tbody>
                        )
                    })}
                </table>
                </td>
                            <td valign="top" style={{ paddingLeft: 30 }} className="td-pupils">
                                {/* <Courses /> */}

                                <strong onClick={() => 
                                                    this.set_page(1,"",true, false)
                                                    // this.setState({ middle_func: 1, marks_tab: "", allow_right_menu_pupils: false, allow_right_menu: true })
                                                    } style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${this.props.middle_func === 1 ? "select-no-border-bold" : ""}`}>
                                                        {/* <FaClipboard style={{ marginRight: 7 }} /> */}
                                                        Revenir en arrière
                                                    </strong><br/>

                                <h3>Liste des Cours</h3>
                                {this.props.classe.data.courses.map((course, index) => (
                                    <span style={{marginBottom:13}} onClick={() => this.setState({ course_id: course.course_id })} className={`list-pupils ${this.state.course_id === course.course_id ? "list-pupils-selected" : ""}`} key={course.course_id}>{index + 1}. {course.course_name.toUpperCase()}</span>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            :
            <div className="progress-center-progress">
                                <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                                Chargement de la fiche des points...
                            </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(FichesPointsCourses);
