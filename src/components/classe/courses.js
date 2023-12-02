import { Component } from 'react';
import modalView from '../../includes/modal';
import { Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { http } from '../../global_vars';
import { FiPlus, FiX } from 'react-icons/fi';

class Courses extends Component {

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
            new_course_name: "",
            maxima_new_course: "",
            toggle_action: false,
            enter_new_course: false,
            erreur_new_course: "",
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

    new_course() {

        if (this.state.new_course_name !== "" || this.state.maxima_new_course !== "") {

            this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });
            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/new_course.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    cycle_id: this.props.classe.cycle,
                    class_id: this.props.classe.class,
                    section_id: this.props.classe.section,
                    option_id: this.props.classe.option,
                    school_year: this.props.classe.school_year,
                    course: this.state.new_course_name,
                    maxima: this.state.maxima_new_course,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                    this.load_class_data(this.props.classe);
                    this.setState({ new_course_name: "", maxima_new_course: "" });
                })
                .catch((error) => {
                    // alert(error.toString());
                    // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        } else {
            this.setState({ erreur_new_course: "Tous les champs sont obligatoires pour enregistrer un cours" });
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

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_class_summary.php";

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
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
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

        let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/get_class_info.php";

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

                for (let i in this.props.classes) {
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
                this.setState({ can_load_data: false, modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }

    delete_course_ask(course_id) {
        this.setState({
            course_to_delete_id: course_id,
            can_delete_course: false,
            modal_title: "Information",
            modal_main_text: "Voulez-vous vraiment supprimer ce cours ? Si vous le supprimez, toutes les données y attachées seront perdues. Les notes des élèves attachées à ce cours seront aussi perdues. NB.: Cette action est irreversible, vous ne pourrez plus revenir en arrière.",
            modal_view: true
        });
    }

    delete_course(course_id) {
        if (this.props.user_data.poste === "4") {
            this.setState({ modal_view: false, can_delete_course: true });
            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/delete_course.php";

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
            alert("Vous ne pouvez pas effacer ce cours tant que vous n'êtes pas secrétaire");
        }
    }

    modify_course_name(course_id, total_marks) {

        let course_name = this.state.text_course_name;

        if (this.props.user_data.poste === "4") {

            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/modify_course.php";

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
            alert("Vous ne pouvez pas modifier ce cours si vous n'êtes pas secrétaire");
        }
    }

    modify_course(course_id, course_name, total_marks) {

        if (this.props.user_data.poste === "4") {

            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/modify_course.php";

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
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas modifier ce cours si vous n'êtes pas secrétaire");
        }
    }

    course_ex_bulletin(course_id, tag) {
        if (this.props.user_data.poste === "4") {
            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/modify_course_bulletin.php";

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
                    alert(error.toString())
                    this.setState({ loading_class: false, pupils_see: false });
                });
        } else {
            alert("Vous ne pouvez pas modifier ce cours si vous n'êtes pas secrétaire");
        }
    }

    render() {
        return (
            <div style={{ marginBottom: 50, marginRight: 10 }} className="div-courses">
                {!this.props.loading_footer ?
                    <div>
                        <div className='flex items-center mt-5' style={{ marginBottom: -40 }}>
                            <div style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                            }}>Cours </div>
                            <div
                                onClick={() => this.setState({ enter_new_course: true })}
                                className='bg-primary-50 rounded-full h-9 w-9 flex items-center justify-center ml-5'>
                                <FiPlus color='white' size={15} />
                            </div>
                        </div>
                        <div className="menu-float-right-normal">
                            <span className='text-primary-50' style={{ cursor: 'pointer' }} onClick={() => this.state.toggle_action ? this.setState({ toggle_action: false }) : this.setState({ toggle_action: true })}>Supprimer un cours</span>
                        </div>
                        <table className="full-table-liste-marksssss w-full">
                            <thead>
                                <tr>
                                    <th className='border pt-2 pb-2 border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, paddingLeft: 10, paddingRight: 10 }}>No</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ textAlign: 'left', paddingLeft: 10 }}>Intitulé du cours</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 100 }}>Maxima</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 150 }}>Ex. ?</th>
                                    {this.state.toggle_action ?
                                        <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20'>Option</th> : null}
                                </tr>
                            </thead>
                            {this.props.classe.data.courses.map((course, index) => (
                                <tbody key={index}>
                                    <tr key={index + 1} style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            {index + 1}
                                        </td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>
                                            <input
                                                onChange={(text) => this.setState({ text_course_name: text.target.value, being_modified: course.course_id })}
                                                placeholder={course.course_name}
                                                value={this.state.being_modified === course.course_id ? this.state.text_course_name : ""}
                                                className="input-no-borderrr" />
                                            {this.state.being_modified === course.course_id ?
                                                <button
                                                    className="button-primary-small"
                                                    onClick={(text) => this.modify_course_name(course.course_id, course.total_marks)}>Enregistrer</button> : null}
                                        </td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50 }}>
                                            <input
                                                onChange={(text) => this.modify_course(course.course_id, course.course_name, text.target.value)}
                                                value={course.total_marks}
                                                className="input-no-borderr" />
                                        </td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10, textAlign: 'center' }}>
                                            <button
                                                className='pl-3 pr-3 bg-gray-50 dark:bg-background-20 border border-gray-50 dark:border-gray-100 pt-0.2 pb-0.2 mt-1 mb-1 rounded-lg cursor-pointer shadow-lg'
                                                onClick={() => this.course_ex_bulletin(course.course_id, "")}>Oui</button>
                                            <button
                                                style={{ marginLeft: 5 }}
                                                className={`pl-3 pr-3 border pt-0.2 pb-0.2 mt-1 mb-1 rounded-lg cursor-pointer shadow-lg ${parseInt(course.considered) === 5 ? "bg-primary-50 text-text-20 border-primary-50" : "bg-gray-50 dark:bg-background-20 border-gray-50 dark:border-gray-100"}`}
                                                onClick={() => this.course_ex_bulletin(course.course_id, "5")}>Non</button>
                                        </td>
                                        {this.state.toggle_action ?
                                            <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center' }}>
                                                <span
                                                    onClick={() => this.delete_course_ask(course.course_id)}
                                                    className="menu-float-rightt">Supprimer</span>
                                            </td> : null}
                                    </tr>
                                </tbody>
                            ))}
                        </table>

                        {this.state.enter_new_course ?
                            <div className="new_course_modal_transparent">
                                <div className="new_course_modal">
                                    <div style={{
                                        textAlign: 'right',
                                        backgroundColor: 'rgb(240,240,240)',
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5
                                    }}>
                                        <span
                                            onClick={() => this.setState({ enter_new_course: false })}
                                            style={{
                                                display: 'inline-block',
                                                backgroundColor: 'red',
                                                padding: 5,
                                                cursor: 'pointer',
                                                borderTopRightRadius: 5
                                            }}>
                                            <FiX color='white' size={20} />
                                        </span>
                                    </div>
                                    <h3>Ajouter un nouveau cours pour cette classe la {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id}</h3>
                                    <br />

                                    <div style={{
                                        textAlign: 'center',
                                    }}>
                                        <table style={{ display: 'inline-block' }}>
                                            <tbody>
                                                <tr>
                                                    <td className='border border-gray-50 dark:border-gray-20'>
                                                        <input
                                                            onChange={(text) => this.setState({ new_course_name: text.target.value })}
                                                            placeholder="Intitulé du cours"
                                                            value={this.state.new_course_name}
                                                            className="input-normall" />
                                                    </td>
                                                    <td className='border border-gray-50 dark:border-gray-20'>
                                                        <input
                                                            onChange={(text) => this.setState({ maxima_new_course: text.target.value })}
                                                            type='number'
                                                            placeholder="Maxima"
                                                            value={this.state.maxima_new_course}
                                                            className="input-normall" />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <span style={{
                                        color: '#780006'
                                    }}>{this.state.erreur_new_course}</span><br />
                                    <button
                                        className="button-primary"
                                        style={{ marginLeft: 2, paddingLeft: 35, paddingRight: 35, marginTop: 10 }}
                                        onClick={(text) => this.new_course()}>Enregistrer le cours</button>
                                </div>
                            </div> : null}

                        {this.state.modal_view ?
                            <div className="main-div-modal">
                                <div className="sub-div-modall bg-background-100 dark:bg-background-20">
                                    <div>
                                    Voulez-vous vraiment supprimer ce cours ? Si vous le supprimez, toutes les données y attachées seront perdues. Les notes des élèves attachées à ce cours seront aussi perdues. NB.: Cette action est irreversible, vous ne pourrez plus revenir en arrière.
                                    </div><br/>
                                    <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" className='text-text-100 dark:text-text-20' style={{ borderWidth: 1, borderColor: 'rgb(100, 100, 100)' }}>Annuler</Button>
                                    <Button onClick={() => this.delete_course(this.state.course_to_delete_id)} variant="outlined" style={{ color: 'white', borderWidth: 1, borderColor: 'red', backgroundColor: 'red', marginLeft: 30 }}>Oui, Procéder</Button>
                                </div>
                            </div> : null}
                    </div>
                    :
                    <div className="progress-center-progress">
                        <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                        Chargement des cours...
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Courses);
