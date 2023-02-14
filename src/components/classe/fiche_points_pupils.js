import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';

const FichesPointsPupils = () => {

    const [pupil, setPupil] = useState(null);
    const [periode, setPeriode] = useState('*');
    const classe = useSelector(state => state.classe);
    const middle_func = useSelector(state => state.middle_func);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const [marks_edit, setMarks_edit] = useState([]);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const open_classe = () => {
        dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        dispatch({ type: "SET_CLASSE", payload: classe });
        dispatch({ type: "SET_CLASSE_OPEN", payload: true });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });

        if (middle_func === 23 || middle_func === 22) {
            dispatch({ type: "SET_TITLE_MAIN", payload: "Horaires" });
            dispatch({ type: "SET_COURSE", payload: classe.courses[0] });
        } else {
            dispatch({ type: "SET_TITLE_MAIN", payload: classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id });
        }

        if (middle_func !== 2) {
            dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
        }

        if (middle_func === 15 || middle_func === 16 || middle_func === 17 || middle_func === 0 || middle_func === 30) {
            dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
        }

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

                if (middle_func !== 0) {
                    classe.data = response;
                    dispatch({ type: "SET_CLASSE", payload: classe });
                    dispatch({ type: "SET_LOADING_FOOTER", payload: false });

                    if (middle_func === 0 || middle_func === 4 || middle_func === 6 || middle_func === 11 || middle_func === 12) {
                        dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
                        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
                    }

                    if (middle_func === 0) {
                        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
                    }

                    dispatch({ type: "SET_MARKS_MODIFIED", payload: false });

                } else {
                    dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                }
            }).catch((error) => {
                dispatch({ type: "SET_LOADING_FOOTER", payload: false });
            });
    }

    const edit_marks = () => {
        if (pupil.pupil.pupil_id !== null || marks_edit.length !== 0) {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_marks.php";

            fetch(BaseURL, {
                    method: 'POST',
                    body: JSON.stringify({
                        marks: marks_edit
                    })
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success === '1' || response.success === '2') {
                        setErrors([]);
                        setMarks_edit([]);
                        setPupil(null);
                        dispatch({ type: "SET_MARKS_MODIFIED", payload: true });

                        open_classe();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

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
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
    }

    const handle_change = (pupill, course, period, marks, modified) => {
            let sp = '';
            if(period === 'P1') 
                sp = 1;
            if(period === 'P2') 
                sp = 2;
            if(period === 'EX1') 
                sp = 10;
            if(period === 'P3')
                sp = 3;
            if(period === 'P4')
                sp = 4;
            if(period === 'Ex2')
                sp = 11;
    
            let markks = {};
            let global_marks = [];
            global_marks = marks_edit;
            markks.id = pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (pupill.pupil.pupil_id + course + period);
            markks.pupil_id = pupill.pupil.pupil_id;
            markks.course_id = course;
            markks.period = sp;
            markks.school_year = pupill.pupil.school_year;
            markks.total_marks = findCourse(course).total_marks;
            markks.modified = modified;
            markks.marks = marks;
    
            const main_marks = global_marks.filter(marks => marks.id === pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (pupill.pupil.pupil_id + course + period));
            if (main_marks.length !== 0) {
                main_marks[0].marks = marks;
                setMarks_edit(global_marks);
            } else {
                global_marks = [...global_marks, markks];
                setMarks_edit(global_marks);
            }
    
            if (parseInt(marks) > findCourse(course).total_marks || parseInt(marks) < 0) {
                if(errors.find(error => error === pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (parseInt(pupill.pupil.pupil_id) + course + period)) === undefined) {
                    setErrors([...errors, pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (pupill.pupil.pupil_id + course + period)]);
                }
                
            } else {
                setErrors(errors.filter((element) => !(pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (pupill.pupil.pupil_id + course + period)).includes(element)));
            }
    }

    const show_periode = (period, semester) => {
        if ((periode === period || semester === periode || periode === "*") && pupil !== null) {
            return true;
        }
    }

    const find_error=(pupill, course, period)=>{
        const value = pupill.pupil.first_name + pupill.pupil.second_name + pupill.pupil.last_name + (parseInt(pupill.pupil.pupil_id) + course + period);

        return value;
    }

    useEffect(() => {
        setErrors([]);
        setMarks_edit([]);
    }, []);

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <div>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">

                                    {pupil !== null ? 
                                    <strong style={{ fontSize: 20 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</strong>
                                    :
                                    <span>Cliquez sur le nom d'un élève pour commencer</span> 
                                    }

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
                                                {show_periode("P1", "S1") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P1</th> : null}

                                                {show_periode("P2", "S1") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P2</th> : null}

                                                {show_periode("EX1", "S1") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX1</th> : null}

                                                {show_periode("S1", "S1") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S1</th> : null}

                                                {show_periode("P3", "S2") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P3</th> : null}

                                                {show_periode("P4", "S2") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>P4</th> : null}

                                                {show_periode("EX1", "S2") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>EX2</th> : null}

                                                {show_periode("S2", "S2") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>S2</th> : null}

                                                {show_periode("*", "*") ?
                                                    <th style={{ width: 50, textAlign: 'center' }}>TOTAL</th> : null}
                                            </tr>
                                        </thead>
                                        {classe.courses.map((course, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                        <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ paddingLeft: 10 }}>{course.course_name + " / " + course.total_marks}</td>

                                                        {show_periode("P1", "S1") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + (parseInt(pupil.pupil.pupil_id) + course.course_id + 'P1')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 1)}
                                                                    onChange={(text) => handle_change(pupil, parseInt(course.course_id), 'P1', text.target.value, true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("P2", "S1") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + (parseInt(pupil.pupil.pupil_id) + course.course_id + 'P2')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 2)}
                                                                    onChange={(text) => handle_change(pupil, parseInt(course.course_id), 'P2', parseInt(text.target.value), true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("EX1", "S1") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === find_error(pupil, course.course_id, 'EX1')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 10)}
                                                                    onChange={(text) => handle_change(pupil, course.course_id, 'EX1', text.target.value, true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("S1", "S1") ?
                                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                                {parseInt(render_period_marks(pupil.marks, course.course_id, 1)) + parseInt(render_period_marks(pupil.marks, course.course_id, 2)) + parseInt(render_period_marks(pupil.marks, course.course_id, 10))}
                                                            </td> : null}

                                                        {show_periode("P3", "S2") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + (parseInt(pupil.pupil.pupil_id) + course.course_id + 'P3')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 3)}
                                                                    onChange={(text) => handle_change(pupil, course.course_id, 'P3', text.target.value, true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("P4", "S2") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + (parseInt(pupil.pupil.pupil_id) + course.course_id + 'P4')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 4)}
                                                                    onChange={(text) => handle_change(pupil, course.course_id, 'P4', text.target.value, true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("EX2", "S2") ?
                                                            <td style={{ width: 50, textAlign: 'center' }}>
                                                                <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + (parseInt(pupil.pupil.pupil_id) + course.course_id + 'EX2')) === undefined ? "input-red" : "red-input"}`}
                                                                    type="number"
                                                                    placeholder={render_period_marks(pupil.marks, course.course_id, 11)}
                                                                    onChange={(text) => handle_change(pupil, course.course_id, 'EX2', text.target.value, true)}
                                                                />
                                                            </td> : null}

                                                        {show_periode("S2", "S2") ?
                                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                                {parseInt(render_period_marks(pupil.marks, course.course_id, 3)) + parseInt(render_period_marks(pupil.marks, course.course_id, 4)) + parseInt(render_period_marks(pupil.marks, course.course_id, 11))}
                                                            </td> : null}

                                                        {show_periode("*", "*") ?
                                                            <td style={{ width: 50, textAlign: 'center', fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.3)' }}>
                                                                {parseInt(render_period_marks(pupil.marks, course.course_id, 3)) + parseInt(render_period_marks(pupil.marks, course.course_id, 4)) + parseInt(render_period_marks(pupil.marks, course.course_id, 11)) + parseInt(render_period_marks(pupil.marks, course.course_id, 1)) + parseInt(render_period_marks(pupil.marks, course.course_id, 2)) + parseInt(render_period_marks(pupil.marks, course.course_id, 10))}
                                                            </td> : null}
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </td>
                                <td valign="top" style={{ paddingLeft: 30 }} className="td-pupils">
                                    <strong onClick={() =>
                                        set_page(1, "", true, false)
                                    } style={{ color: 'rgba(0, 80, 180)' }} className="select-no-border-bold">
                                        <FaChevronCircleLeft style={{ marginRight: 7 }} />
                                        Revenir en arrière
                                    </strong><br />

                                    <h3>Liste des élèves</h3>
                                {classe.data.pupils.map((pupill, index) => (
                                    <span onClick={() => {
                                        setPupil(pupill);
                                        setErrors([]);
                                        setMarks_edit([]);
                                    }} 
                                    className={`list-pupils ${pupil !== null ? parseInt(pupill.pupil.pupil_id) === parseInt(pupil.pupil.pupil_id) ? "list-pupils-selected" : "":""}`} key={pupill.pupil.pupil_id}>{index + 1} {pupill.pupil.first_name + " " + pupill.pupil.second_name + " " + pupill.pupil.last_name}</span>
                                ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {marks_edit.lengh !== 0 ?
                        <div style={{ textAlign: 'right', paddingRight: 7 }}>
                            {errors.length === 0 ?
                                <button className='button-enter-marks' onClick={() => edit_marks()}>Finir et envoyer</button>
                                :
                                <div style={{ color: 'red', fontWeight: 'bold', marginTop: 10 }}>
                                    Il y a {errors.length} erreur{errors.length > 1 ? "s" : ""} dans vos entrées<br />
                                    Corrigez toute erreur avant de valider
                                </div>
                            }
                        </div> : null}
                </div>
                :
                <div className="progress-center-progress">
                    <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                    Chargement de la fiche des points...
                </div>}
                {/* <button className='button-enter-marks' onClick={() => edit_marks()}>Finir et envoyer</button> */}
        </div>
    )
}

export default FichesPointsPupils;

{/* <h3>Liste des élèves</h3>
                                {this.props.classe.data.pupils.map((pupil, index) => (
                                    <span onClick={() => this.setState({ pupil_id: pupil.pupil.pupil_id })} className={`list-pupils ${this.state.pupil_id === pupil.pupil.pupil_id ? "list-pupils-selected" : ""}`} key={pupil.pupil.pupil_id}>{index + 1} {pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</span>
                                ))} */}

// <h3>Conseil de délibération fin d'année</h3><br/>
//                 <select
//                 value={this.findConseil(this.state.pupil_id)}
//                 onChange={(text) => this.conseil_deliberation(this.state.pupil_id, text.target.value)}
//                 >
//                     <option value="">Sélectionner la décision</option>
//                     <option value="0">L'élève passe dans la classe supérieure</option>
//                     <option value="1">L'élève double la classe</option>
//                     <option value="2">L'élève est orienté ailleurs (a échoué)</option>
//                     <option value="">. . . . . . . . . . . . . . . . . . . .</option>
//                     <option value="3">L'élève passe dans la classe supérieure</option>
//                     <option value="4">L'élève double la classe</option>
//                     <option value="5">L'élève est orienté ailleurs (a échoué)</option>
//                     <option value="">. . . . . . . . . . . . . . . . . . . .</option>
//                     <option value="6">Abandon</option>
//                 </select>

//                 <div className="float-right">
//                     <button
//                     onClick={() => this.delete_marks(this.state.pupil_id, this.state.periode)}
//                     >Supprimer les points<br/>de la période courante<br/> pour l'élève</button>
//                 </div>
                
//             </div>
//                 :
//                 <div className="progress-center-progress">
//                                 <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
//                                 Chargement de la fiche des points...
//                             </div>