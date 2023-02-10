import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';

const FichesPointsCourses = () => {

    const [course_id, setCourse_id] = useState(null);
    const [periode, setPeriode] = useState('P1');
    const classe = useSelector(state => state.classe);
    // const autres = useSelector(state => state.autres);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const dispatch = useDispatch();

    // intervalID = 0;

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         classe: [],
    //         autres: [],
    //         pupils_marks: [],
    //         courses: [],
    //         pupils: [],
    //         url_server: "",
    //         periode: "P1",
    //         num: 0,
    //         pupil_id: 1,
    //         should_fetch_marks: false,
    //         can_mount: 0,
    //         course_id: null,
    //     }
    // }

    const refresh_class=()=> {

        // let classe = sessionStorage.getItem('classeYambiSMIS');
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        // classe = JSON.parse(classe);
        // this.setState({
        //     classe: classe,
        //     title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
        //     loading_middle: true,
        //     url_server: url_server
        // });

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

                let new_classe = classe;
                new_classe.data = response;
                    dispatch({ type: "SET_CLASSE", payload: new_classe });
                    console.log(new_classe);

            })
            .catch((error) => {
                console.log(error);
                // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
            });
    }

    // open_class() {

    //     let classe = sessionStorage.getItem('classeYambiSMIS');
    //     let url_server = sessionStorage.getItem('yambi_smis_url_server');
    //     classe = JSON.parse(classe);
    //     this.setState({
    //         classe: classe,
    //         title_main: classe.class_id + " " + classe.section_id + " " + classe.order_id,
    //         loading_middle: true,
    //         url_server: url_server
    //     });

    //     let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_class_info.php";

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
    //                 course_id: response.first_course
    //             })
    //         })
    //         .catch((error) => {
    //             // alert(error.toString());
    //             // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
    //         });
    // }

    const edit_marks = (pupil_id, course_id, period, marks) => {

        // for (let i in classe.data.pupils_marks) {
        //     if (classe.data.pupils_marks[i].pupil == pupil_id && classe.data.pupils_marks[i].course == course_id && classe.data.pupils_marks[i].school_period == period) {
        //         classe.data.pupils_marks[i].main_marks = marks;
        //         this.setState({ should_fetch_marks: true });
        //     } else {
        //         this.setState({ should_fetch_marks: true });
        //     }
        // }

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_marks.php";

        fetch(BaseURL,
            {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil_id,
                    course_id: course_id,
                    periode: period,
                    school_year: classe.school_year,
                    main_marks: marks,
                    total_marks: findCourse(course_id).total_marks,
                })
            })
            .then((response) => response.json())
            .then((response) => {

                // console.log('powa')

                // let index_pupil = classe.data.pupils.findIndex(pupil => parseInt(pupil.pupil_id) === parseInt(response.pupil));
                // let pupil_m = classe.data.pupils.filter(pupil => parseInt(pupil.pupil_id) === parseInt(response.pupil));
                
                // if(pupil_m.length > 0){
                //     pupil_m[0].marks = response.marks;
                //     pupil_m[0].tmarks = response.tmarks;
                //     let new_classe_marks = classe;
                //     Object.assign({}, pupil_m);
                //     new_classe_marks.pupils[index_pupil] = pupil_m[0];
    
                    if(response.success === '1' || response.success === '2') {
                    // dispatch({type: "SET_EDIT_PUPIL_MARKS", payload: new_classe_marks});
                    // alert("ok")
                    // }
                    refresh_class();
                }

                // console.log(classe);

            })
            .catch((error) => {
                // Alert.alert(strings.error, strings.connection_failed);
                // alert(error.toString())
                console.log(error);
                // this.setState({ loading_class: false, pupils_see: false });
                // alert("siko")
            });
    }

    // insert_marks(pupil_id, course_id, period, marks, total_marks) {

    //     // for (let i in classe.data.pupils_marks) {
    //     //     if (classe.data.pupils_marks[i].pupil == pupil_id && classe.data.pupils_marks[i].course == course_id && classe.data.pupils_marks[i].school_period == period) {
    //     //         classe.data.pupils_marks[i].main_marks = marks;
    //     //         this.setState({ should_fetch_marks: true });
    //     //     } else {
    //     //         this.setState({ should_fetch_marks: true });
    //     //     }
    //     // }

    //     let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_marks.php";

    //     fetch(BaseURL, {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 pupil_id: pupil_id,
    //                 course_id: course_id,
    //                 periode: period,
    //                 school_year: classe.school_year,
    //                 main_marks: marks,
    //                 total_marks:total_marks,
    //                 cycle: classe.cycle,
    //                 class_id: classe.class,
    //                 section_id: classe.section,
    //                 option_id: classe.option
    //             })
    //         })
    //         .then((response) => response.json())
    //         .then((response) => {

    //             if (should_fetch_marks) {
    //                 // this.refresh_class();
    //             }

    //         })
    //         .catch((error) => {
    //             // Alert.alert(strings.error, strings.connection_failed);
    //             // alert(error.toString())
    //             this.setState({ loading_class: false, pupils_see: false });
    //         });
    // }

    // const render_period_marks=(pupil_id, course_id, periode)=> {
    //     let return_value = 0;

    //     for (let i in classe.data.pupils_marks) {
    //         if (parseInt(classe.data.pupils_marks[i].pupil) === parseInt(pupil_id) && parseInt(classe.data.pupils_marks[i].course) === parseInt(course_id) && parseInt(classe.data.pupils_marks[i].school_period) === parseInt(periode)) {
    //             return_value = classe.data.pupils_marks[i].main_marks;
    //         }
    //     }

    //     return return_value;
    // }

    const render_period_marks = (marks, course_id, periode) => {
        let return_value = 0;

        for (let i in marks) {
            if (parseInt(marks[i].course) === parseInt(course_id) && parseInt(marks[i].school_period) === parseInt(periode)) {
                return_value = marks[i].main_marks;
            }
        }

        return return_value;
    }

    const findCourse = (course_id) => {

        let course = [];
        for (let i in classe.data.courses) {
            if (parseInt(classe.data.courses[i].course_id) === parseInt(course_id)) {
                course = classe.data.courses[i];
            }
        }

        return course;
    }

    const set_page = (middle_func, marks_tab, menu_left, menu_pupils) => {
        // this.setState({ middle_func: 7, marks_tab: "", allow_right_menu: true })

        // dispatch({ type: "SET_CLASSE", payload: [] });
        // dispatch({ type: "SET_TITLE_MAIN", payload: "Nouvel(le) élève | " });
        // dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        // dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: menu_pupils });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
    }

    // componentDidMount() {
    //     // if(can_mount < 4) {
    //     //     this.intervalID = setInterval(() => {
    //     //         let classe = sessionStorage.getItem('classeYambiSMIS');
    //     //         classe = JSON.parse(classe);

    //     //         if(classe.id_classes !== classe.id_classes) {
    //     //             this.open_class();
    //     //         }
    //     //     }, 500);



    //     // }
    // }

    useEffect(() => {
        if (classe.courses[0] !== undefined) {
            setCourse_id(classe.courses[0].course_id);
        }

        // console.log(classe.pupils[0])
    }, [classe.courses]);

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td valign="top">

                                <strong style={{ fontSize: 20 }}>{findCourse(course_id).course_name} / {findCourse(course_id).total_marks}</strong>

                                <div className="float-menu-right">
                                    <select
                                        onChange={(val) => setPeriode(val.target.value)}
                                        style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white', textAlign: 'right' }}
                                        value={periode}
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

                                <table className="full-table-liste-markss" style={{ marginTop: 10, width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Noms des élèves</th>
                                            {periode === "P1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P1</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P1</th> :
                                                    periode === "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P1</th> : null}

                                            {periode === "P2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P2</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P2</th> :
                                                    periode === "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P2</th> : null}

                                            {periode === "EX1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>EX1</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX1</th> :
                                                    periode === "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>EX1</th> : null}

                                            {periode === "S1" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>S1</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S1</th> :
                                                    periode === "S1" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>S1</th> : null}

                                            {periode === "P3" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P3</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P3</th> :
                                                    periode === "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P3</th> : null}

                                            {periode === "P4" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>P4</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P4</th> :
                                                    periode === "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>P4</th> : null}

                                            {periode === "EX2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>EX2</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX2</th> :
                                                    periode === "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>EX2</th> : null}

                                            {periode === "S2" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>S2</th> :
                                                periode === "*" ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S2</th> :
                                                    periode === "S2" ?
                                                        <th style={{ width: 50, textAlign: 'center' }}>S2</th> : null}

                                            {periode === "*" ?
                                                <th style={{ width: 50, textAlign: 'center' }}>TOTAL</th> : null}
                                        </tr>
                                    </thead>
                                    {classe.data.pupils.map((pupil, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>
                                                    {periode === "P1" ?
                                                        <td style={{ width: 50, textAlign: 'center' }}>
                                                            <input className="input-marks"
                                                                type="number"
                                                                value={render_period_marks(pupil.marks, course_id, 1)}
                                                                onChange={(text) => edit_marks(pupil.pupil.pupil_id, course_id, 1, text.target.value)}
                                                            />
                                                        </td> :
                                                        periode === "*" ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className="input-marks"
                                                                    type="number"
                                                                    value={render_period_marks(pupil.marks, course_id, 1)}
                                                                    onChange={(text) => edit_marks(pupil.pupil.pupil_id, course_id, 1, text.target.value)}
                                                                />
                                                            </td> :
                                                            periode === "S1" ?
                                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className="input-marks"
                                                                        type="number"
                                                                        value={render_period_marks(pupil.marks, course_id, 1)}
                                                                        onChange={(text) => edit_marks(pupil.pupil.pupil_id, course_id, 1, text.target.value)}
                                                                    />
                                                                </td> : null}

                                                    {/* {periode == "P2" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 2, text.target.value)}
                                            />
                                        </td> :
                                        periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 2, text.target.value)}
                                                />
                                            </td> :
                                            periode == "S1" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 2, text.target.value)}
                                                    />
                                                </td> : null} */}

                                                    {/* {periode == "EX1" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 10)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 10, text.target.value)}
                                            />
                                        </td> :
                                        periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 10)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 10, text.target.value)}
                                                />
                                            </td> :
                                            periode == "S1" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 10)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 10, text.target.value)}
                                                    />
                                                </td> : null} */}

                                                    {/* {periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 10))}
                                        </td> :
                                        periode == "S1" ?
                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                {parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 10))}
                                            </td> : null} */}


                                                    {/* {periode == "P3" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 3, text.target.value)}
                                            />
                                        </td> :
                                        periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 3, text.target.value)}
                                                />
                                            </td> :
                                            periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 3, text.target.value)}
                                                    />
                                                </td> : null} */}

                                                    {/* {periode == "P4" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 4, text.target.value)}
                                            />
                                        </td> :
                                        periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 4, text.target.value)}
                                                />
                                            </td> :
                                            periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 4, text.target.value)}
                                                    />
                                                </td> : null} */}

                                                    {/* {periode == "EX2" ?
                                        <td style={{ width: 50, textAlign: 'center' }}>
                                            <input className="input-marks"
                                                type="number"
                                                value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 11)}
                                                onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 11, text.target.value)}
                                            />
                                        </td> :
                                        periode == "*" ?
                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                <input className="input-marks"
                                                    type="number"
                                                    value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 11)}
                                                    onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 11, text.target.value)}
                                                />
                                            </td> :
                                            periode == "S2" ?
                                                <td style={{ width: 50, textAlign: 'center' }}>
                                                    <input className="input-marks"
                                                        type="number"
                                                        value={this.render_period_marks(pupil.pupil.pupil_id, course_id, 11)}
                                                        onChange={(text) => this.edit_marks(pupil.pupil.pupil_id, course_id, 11, text.target.value)}
                                                    />
                                                </td> : null} */}

                                                    {/* {periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 11))}
                                        </td> :
                                        periode == "S2" ?
                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                {parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 11))}
                                            </td> : null}

                                    {periode == "*" ?
                                        <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                            {parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 3)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 4)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 11)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 1)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 2)) + parseInt(this.render_period_marks(pupil.pupil.pupil_id, course_id, 10))}
                                        </td> : null} */}


                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </td>
                            <td valign="top" style={{ paddingLeft: 30 }} className="td-pupils">
                                {/* <Courses /> */}

                                <strong onClick={() =>
                                    set_page(1, "", true, false)
                                } style={{ color: 'rgba(0, 80, 180)' }} className="select-no-border-bold">
                                    <FaChevronCircleLeft style={{ marginRight: 7 }} />
                                    Revenir en arrière
                                </strong><br />

                                <h3>Liste des Cours</h3>
                                {classe.data.courses.map((course, index) => (
                                    <span style={{ marginBottom: 13 }} onClick={() => setCourse_id(course.course_id)} className={`list-pupils ${course_id === course.course_id ? "list-pupils-selected" : ""}`} key={course.course_id}>{index + 1}. {course.course_name.toUpperCase()}</span>
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

export default FichesPointsCourses;
