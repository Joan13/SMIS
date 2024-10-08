import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import ButtonNormal from '../includes/button_normal';

const TravauxJournaliers = () => {

    const [course_id, setCourse_id] = useState(null);
    const [periode, setPeriode] = useState('P1');
    const classe = useSelector(state => state.classe);
    const middle_func = useSelector(state => state.middle_func);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const [marks_edit, setMarks_edit] = useState([]);
    const [errors, setErrors] = useState([]);
    const user_data = useSelector(state=>state.user_data);
    const [loading, setLoading] = useState(false);
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

                    // if (middle_func === 35) {
                    //     // dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
                    //     dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
                    // }

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

        

        if (course_id !== null || marks_edit.length !== 0) {
            setLoading(true);
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_travaux_journaliers.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    marks: marks_edit
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    setLoading(false);
                    if (response.success === '1' || response.success === '2') {
                        setErrors([]);
                        setMarks_edit([]);
                        dispatch({ type: "SET_MARKS_MODIFIED", payload: true });

                        open_classe();
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    // console.log(error);
                });
        }
    }

    const render_period_marks = (pupil, course_id, periode, marks_index) => {
        let return_value = 0;

        // console.log(classe.data)

        for (let i in classe.data.travaux_journaliers) {
            if (parseInt(classe.data.travaux_journaliers[i].course) === parseInt(course_id) && parseInt(classe.data.travaux_journaliers[i].pupil) === parseInt(pupil) && parseInt(classe.data.travaux_journaliers[i].school_period) === parseInt(periode) && parseInt(classe.data.travaux_journaliers[i].marks_index) === marks_index) {
                return_value = classe.data.travaux_journaliers[i].main_marks;
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

    const handle_change = (pupil, course, period, marks, modified, marks_index) => {

        let markks = {};
        let global_marks = [];
        global_marks = marks_edit;
        markks.id = pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period);
        markks.pupil_id = pupil.pupil.pupil_id;
        markks.course_id = course;
        markks.period = period;
        markks.school_year = pupil.pupil.school_year;
        markks.total_marks = 10;//findCourse(course).total_marks;
        markks.modified = modified;
        markks.marks_index = marks_index;
        markks.marks = marks;
        markks.worker_id = user_data.worker_id;

        let totall = 10;//findCourse(course).total_marks;

        // if (period === 10 || period === 11)
        //     totall = parseInt(findCourse(course).total_marks * 2);

        const main_marks = global_marks.filter(marks => marks.id === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period));
        if (main_marks.length !== 0) {
            main_marks[0].marks = marks;
            setMarks_edit(global_marks);
        } else {
            global_marks = [...global_marks, markks];
            setMarks_edit(global_marks);
        }

        if (parseInt(marks) > totall || parseInt(marks) < 0) {
            if (errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period)) === undefined) {
                setErrors([...errors, pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period)]);
            }

        } else {
            setErrors(errors.filter((element) => !(pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period)).includes(element)));
        }
    }

    const show_periode = (period) => {
        if (periode === period) {
            return true;
        }

        return false;
    }

    useEffect(() => {

        // open_classe();
        if (classe.courses[0] !== undefined) {
            setCourse_id(classe.courses[0].course_id);
        }

        setErrors([]);
        setMarks_edit([]);

    }, [classe.courses]);

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <div>
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
                                            {/* <option value="*">Toutes les périodes</option>
                                            <option>- - - - - - - - - - - -</option> */}
                                            <option value="P1">Première période</option>
                                            {/* <option value="P2">Deuxième période</option>
                                            <option value="P3">Troisième période</option>
                                            <option value="P4">Quatrième période</option>
                                            <option value="P5">Cinquième période</option>
                                            <option value="P6">Sixième période</option> */}
                                        </select>

                                    </div>

                                    <table className="full-table-liste-marksssss" style={{ marginTop: 10, width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th className='border border-gray-50 pt-2 pb-2 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Noms des élèves</th>
                                                {show_periode("P1") ?
                                                    <th colSpan={3} className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>Travaux journaliers P1</th> : null}
                                            </tr>
                                        </thead>
                                        {classe.data.pupils.map((pupil, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>

                                                        {show_periode("P1") ?
                                                            <>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course_id + 1)) === undefined ? "input-red" : "red-input"}`}
                                                                        type="number"
                                                                        // value={render_period_marks(pupil.marks, course_id, 1)}
                                                                        placeholder={render_period_marks(pupil.pupil.pupil_id, course_id, 1, 1)}
                                                                        onChange={(text) => handle_change(pupil, course_id, 1, text.target.value, true, 1)}
                                                                    />
                                                                </td>

                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course_id + 1)) === undefined ? "input-red" : "red-input"}`}
                                                                        type="number"
                                                                        // value={render_period_marks(pupil.marks, course_id, 1)}
                                                                        placeholder={render_period_marks(pupil.pupil.pupil_id, course_id, 1, 2)}
                                                                        onChange={(text) => handle_change(pupil, course_id, 1, text.target.value, true, 2)}
                                                                    />
                                                                </td>

                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                    <input className={`input-marks ${errors.find(error => error === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course_id + 1)) === undefined ? "input-red" : "red-input"}`}
                                                                        type="number"
                                                                        // value={render_period_marks(pupil.marks, course_id, 1)}
                                                                        placeholder={render_period_marks(pupil.pupil.pupil_id, course_id, 1, 3)}
                                                                        onChange={(text) => handle_change(pupil, course_id, 1, text.target.value, true, 3)}
                                                                    />
                                                                </td>
                                                            </> : null}
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                </td>
                                <td valign="top" style={{ paddingLeft: 30 }} className="td-pupils">
                                    <div
                                        className='font-bold flex items-center mb-10 cursor-pointer text-primary-50'
                                        onClick={() => set_page(1, "", true, false)}>
                                        <FaChevronCircleLeft style={{ marginRight: 7 }} />
                                        <strong> Revenir en arrière </strong>
                                    </div>

                                    {/* <h3>Liste des Cours</h3> */}
                                    {classe.data.courses.map((course, index) => (
                                        <span style={{ marginBottom: 13 }} onClick={() => {
                                            setMarks_edit([]);
                                            setErrors([]);
                                            setCourse_id(course.course_id)
                                        }}
                                            className={`list-pupils ${course_id === course.course_id ? "list-pupils-selected" : ""}`} key={course.course_id}>{index + 1}. {course.course_name.toUpperCase()}</span>
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {loading?
                    <CircularProgress />:
                    marks_edit.lengh !== 0 ?
                        <div style={{ textAlign: 'right', paddingRight: 7 }}>
                            {errors.length === 0 ?
                                <ButtonNormal text="Finir et envoyer" onPress={() => edit_marks()} />
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
        </div>
    )
}

export default TravauxJournaliers;
