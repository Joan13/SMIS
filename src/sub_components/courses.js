import { Component } from 'react';
import modalView from '../includes/modal';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/state_props';

class Courses extends Component {

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
            can_delete_course: false,
            modal_view: false,
            course_to_delete_id: 0,
            can_mount: 0,
            being_modified: 0,
            text_course_name: "",
            new_course_name:"",
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
            url_server: url_server
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
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, loading_middle: false });
            });
    }

    new_course() {

        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/new_course.php";

        if(this.state.new_course_name !== "" && this.state.maxima_new_course !== "") {
            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    cycle_id: this.props.classe.cycle,
                    class_id: this.props.classe.class,
                    section_id: this.props.classe.section,
                    option_id: this.props.classe.option,
                    school_year: this.props.classe.school_year,
                    course: this.state.new_course_name,
                    maxima:this.state.maxima_new_course,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                    this.load_class_data(this.props.classe);
                    this.setState({new_course_name:"",maxima_new_course:""});
                })
                .catch((error) => {
                    alert(error.toString());
                    // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, loading_middle: false });
                });
        } else {
            this.setState({ modal_title: "Information erreur", modal_main_text: "Entrer l'intitul?? du cours et le maxima avant de proc??der ?? l'enregistrement du cours.", modal_view: true, loading_middle: false });
        }
    }

    open_class() {

        this.setState({ can_mount: this.state.can_mount + 1, text_course_name: '', being_modified: 0 });

        let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        classe = JSON.parse(classe);
        this.setState({
            classe: classe,
            title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
            loading_middle: true,
            url_server: url_server
        });

        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_class_summary.php";

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

                console.log(response.courses)
            })
            .catch((error) => {
                alert(error.toString());
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, loading_middle: false });
            });
    }

    load_class_data(classe) {
        // sessionStorage.setItem("classeYambiSMIS", JSON.stringify(classe));
        this.setState({ text_course_name: '', being_modified: 0 });
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: classe});
        // console.log(this.props)


        // this.props.dispatch({ type: "SET_TITLE_MAIN", payload: classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id });
        // this.props.dispatch({ type: "SET_CLASS_LOADING", payload: classe.id_classes });
        // this.props.dispatch({ type: "SET_CLASSE_OPEN", payload: true });
        // this.props.dispatch({ type: "SET_LOADING_CLASS", payload: true });
        //         // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });



        // if (this.props.middle_func === 4 || this.props.middle_func === 6) {
        //     // this.setState({ middle_func: 1, allow_right_menu_pupils: false, allow_right_menu: true });
        //     this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
        // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        //     this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/get_class_info.php";

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

                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
        //         // this.props.dispatch({ type: "SET_LOADING_CLASS", payload: false});
        //         // this.props.dispatch({ type: "SET_COURSES", payload: response.courses });
        //         // this.props.dispatch({ type: "SET_AUTRES", payload: response.autres });
        //         // this.props.dispatch({ type: "SET_COURSES_COUNT", payload: response.courses_count });

                // this.setState({can_load_data:false});

                for(let i in this.props.classes) {
if (this.props.classes[i].id_classes === classe.id_classes) {
    this.props.classes[i].data = response;
    // console.log(this.props.classes[i])
}
                }

        // if (this.props.middle_func === 4 || this.props.middle_func === 6 || this.props.middle_func === 11 || this.props.middle_func === 12) {
            // this.setState({ middle_func: 1, allow_right_menu: true, });
            // this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
            // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
            // this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        // if (this.props.middle_func === 0 || this.props.middle_func === 6 || this.props.middle_func === 11) {
            // this.setState({ middle_func: 1, allow_right_menu: true, });
        //     this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
        //     this.props.dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        // }

        //         console.log(this.props)
            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({ can_load_data:false,modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }

    delete_course_ask(course_id) {
        this.setState({
            course_to_delete_id: course_id,
            can_delete_course: false,
            modal_title: "Information",
            modal_main_text: "Voulez-vous vraiment supprimer ce cours ? Si vous le supprimer, toutes les donn??es y attach??es seront perdues. NB.: Cette action est irreversible, vous ne pourrez plus revenir en arri??re.",
            modal_view: true
        });
    }

    delete_course(course_id) {
        let user = sessionStorage.getItem('assemble_user_data');
        user = JSON.parse(user);

        if (user.poste === "4") {
            this.setState({ modal_view: false, can_delete_course: true });
            let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/delete_course.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    course_id: course_id
                })
            })
                .then((response) => response.json())
                .then((response) => {

                    // this.open_class();

                })
                .catch((error) => {
                    // Alert.alert(strings.error, strings.connection_failed);
                    // alert(error.toString())
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas effacer ce cours tant que vous n'??tes pas secr??taire");
        }
    }

    modify_course_name(course_id, total_marks) {

        let course_name = this.state.text_course_name;

        let user = sessionStorage.getItem('assemble_user_data');
        user = JSON.parse(user);

        // window.open('', 'blank', ''); window.close()

        if (user.poste === "4") {
                
            let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/modify_course.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    course_id: course_id,
                    course_name: course_name,
                    total_marks: total_marks
                })
            })
                .then((response) => response.json())
                .then((response) => {

                    this.load_class_data(this.props.classe);

                })
                .catch((error) => {
                    // Alert.alert(strings.error, strings.connection_failed);
                    // alert(error.toString())
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas modifier ce cours si vous n'??tes pas secr??taire");
        }
    }

    modify_course(course_id, course_name, total_marks) {

        let user = sessionStorage.getItem('assemble_user_data');
        user = JSON.parse(user);

        if (user.poste === "4") {
                
            let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/modify_course.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    course_id: course_id,
                    course_name: course_name,
                    total_marks: total_marks
                })
            })
                .then((response) => response.json())
                .then((response) => {

                    this.load_class_data(this.props.classe);

                })
                .catch((error) => {
                    // Alert.alert(strings.error, strings.connection_failed);
                    // alert(error.toString())
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas modifier ce cours si vous n'??tes pas secr??taire");
        }
    }

    course_ex_bulletin(course_id, tag) {

        let user = sessionStorage.getItem('assemble_user_data');
        user = JSON.parse(user);

        if (user.poste === "4") {
            let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/modify_course_bulletin.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    course_id: course_id,
                    tag: tag
                })
            })
                .then((response) => response.json())
                .then((response) => {

                    this.load_class_data(this.props.classe);

                })
                .catch((error) => {
                    // Alert.alert(strings.error, strings.connection_failed);
                    // alert(error.toString())
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas modifier ce cours si vous n'??tes pas secr??taire");
        }
    }

    componentDidMount() {

        // if (this.state.can_mount < 5) {
        //     this.intervalID = setInterval(() => {
        //         let classe = sessionStorage.getItem('classeYambiSMIS');
        //         classe = JSON.parse(classe);

        //         if (classe.id_classes !== this.state.classe.id_classes) {
        //             this.open_class();
        //         }
        //     }, 500);
        // }
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div style={{ marginBottom: 50, paddingTop: 10 }} className="div-courses">
                <h2>Cours</h2>
                <div className="menu-float-right-normal">
                    <span style={{ marginLeft: 30 }} onClick={() => this.state.option_open ? this.setState({ option_open: false }) : this.setState({ option_open: true })}>Action</span>
                </div>
                <table className="full-table-liste-markss">
                    <tr>
                        <th>No</th>
                        <th style={{ textAlign: 'left', paddingLeft: 10 }}>Intitul?? du cours</th>
                        <th style={{ width: 100 }}>Maxima</th>
                        <th style={{ width: 100 }}>Ex. ?</th>
                        <th>Option</th>
                    </tr>
                    {this.props.classe.data.courses.map((course, index) => (
                        <>
                            <tr key={index + 1}>
                                <td style={{ width: 25 }}>
                                    {index + 1}
                                </td>
                                <td style={{ paddingLeft: 10 }}>
                                    <input
                                    onChange={(text) => this.setState({ text_course_name: text.target.value, being_modified: course.course_id })}
                                        placeholder={course.course_name}
                                        value={this.state.being_modified === course.course_id ? this.state.text_course_name : ""}
                                        className="input-no-borderrr" />
                                        {this.state.being_modified === course.course_id ?
                                        <button
                                        className="button-primary-small"
                                        onClick={(text) => this.modify_course_name(course.course_id, course.total_marks)}
                                        >Enregistrer</button>:null}
                                </td>
                                <td style={{ width: 50 }}>
                                    <input
                                        onChange={(text) => this.modify_course(course.course_id, course.course_name, text.target.value)}
                                        value={course.total_marks}
                                        className="input-no-borderr" />
                                </td>
                                <td style={{ paddingLeft: 10 }}>
                                        <button
                                         className={`button-primary-small-normal ${course.considered === "5" ? "" : "button-primary-small"}`}
                                        onClick={(text) => this.course_ex_bulletin(course.course_id, "")}
                                        >Oui</button>
                                        <button
                                        style={{ marginLeft: 5 }}
                                        className={`button-primary-small-normal ${course.considered === '5'  ? "button-primary-small" : ""}`}
                                        onClick={(text) => this.course_ex_bulletin(course.course_id, "5")}
                                        >Non</button>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <span
                                        onClick={() => this.delete_course_ask(course.course_id)}
                                        className="menu-float-rightt">Supprimer</span>
                                </td>
                            </tr>
                        </>
                    ))}
                </table>

                <div>
                <h2>Entrer un nouveau cours pour cette classe la {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id}</h2>
                <br/><input
                                    onChange={(text) => this.setState({ new_course_name: text.target.value })}
                                    placeholder="Intitul?? du cours"
                                        value={ this.state.new_course_name}
                                        className="input-normal" /><br/><br/>

<input
                                    onChange={(text) => this.setState({ maxima_new_course: text.target.value })}
                                    type='number'
                                    placeholder="Maxima"
                                        value={ this.state.maxima_new_course}
                                        className="input-normal" /><br/><br/>
                                        
                                        <button
                                        className="button-primary-small"
                                        onClick={(text) => this.new_course()}
                                        >Enregistrer le cours</button>
                </div>

                {this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Annuler</Button>
                            <Button onClick={() => this.delete_course(this.state.course_to_delete_id)} variant="outlined" style={{ color: 'white', borderWidth: 1, borderColor: 'red', backgroundColor: 'red', marginLeft: 30 }}>Oui, Proc??der</Button>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Courses);
