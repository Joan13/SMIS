import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';

const Conduites = () => {

    const [course_id, setCourse_id] = useState(null);
    const [periode, setPeriode] = useState('*');
    const classe = useSelector(state => state.classe);
    const middle_func = useSelector(state => state.middle_func);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const [marks_edit, setMarks_edit] = useState([]);
    const [errors, setErrors] = useState([]);
    const [conduites, setConduites] = useState([]);
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

    const edit_conduites = () => {
        if (conduites.length !== 0) {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/edit_conduites.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    conduites: conduites
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success === '1' || response.success === '2') {
                        setConduites([]);
                        // dispatch({ type: "SET_CONDUITES_MODIFIED", payload: true });

                        open_classe();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const render_conduite = (pupil, period) => {
        let return_value = '';

        for (let i in classe.data.conduites) {
            if (parseInt(classe.data.conduites[i].pupil_id) === parseInt(pupil.pupil.pupil_id) && parseInt(classe.data.conduites[i].periode) === parseInt(period)) {
                return_value = classe.data.conduites[i].main_conduite;
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

    const handle_change = (pupil, period, conduite, modified) => {
        let conduitess = {};
        let global_conduites = [];
        global_conduites = conduites;
        // markks.id = pupil.pupil.pupil_id + (course + period);
        conduitess.pupil_id = pupil.pupil.pupil_id;
        conduitess.periode = period;
        conduitess.school_year = pupil.pupil.school_year;
        conduitess.modified = modified;
        conduitess.conduite = conduite;

        // const main_conduites = global_conduites.filter(conduite => marks.id === pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period));
        // if (main_marks.length !== 0) {
        //     main_marks[0].marks = marks;
        //     setMarks_edit(global_marks);
        // } else {
        global_conduites = [...global_conduites, conduitess];
        setConduites(global_conduites);
        // }

        // if (parseInt(marks) > findCourse(course).total_marks) {
        //     setErrors([...errors, pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period)]);
        // } else {
        //     setErrors(errors.filter((element) => !(pupil.pupil.first_name + pupil.pupil.second_name + pupil.pupil.last_name + pupil.pupil.pupil_id + (course + period)).includes(element)));
        // }
    }

    const show_periode = (period, semester) => {
        if (periode === period || semester === periode || periode === "*") {
            return true;
        }
    }

    const options_select = () => {
        return (
            <>
                <option value=""> </option>
                <option value="1">E</option>
                <option value="2">TB</option>
                <option value="3">B</option>
                <option value="4">AB</option>
                <option value="5">M</option>
                <option value="6">MA</option>
            </>
        );
    }

    useEffect(() => {
        if (classe.courses[0] !== undefined) {
            setCourse_id(classe.courses[0].course_id);
        }

    }, [classe.courses]);

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <div>
                    {/* <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top"> */}

                                    <strong style={{ fontSize: 15 }}>Édition de conduite des élèves</strong>

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
                                        </select>

                                    </div>

                                    <table className="full-table-liste-marksssss" style={{ marginTop: 10, width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th className='border pt-2 pb-2 border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Noms des élèves</th>
                                                {show_periode("P1", "S1") ?
                                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>P1</th> : null}

                                                {show_periode("P2", "S1") ?
                                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>P2</th> : null}

                                                {show_periode("P3", "S2") ?
                                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>P3</th> : null}

                                                {show_periode("P4", "S2") ?
                                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>P4</th> : null}
                                            </tr>
                                        </thead>
                                        {classe.data.pupils.map((pupil, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr className={`hover-tr ${index % 2 === 0 ? "tr-background1" : "tr-background2"}`}>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>

                                                        {show_periode("P1", "S1") ?
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                <select className='input-marks'
                                                                    defaultValue={render_conduite(pupil, 1)}
                                                                    onChange={(text) => handle_change(pupil, 1, text.target.value, true)}>
                                                                    {options_select()}
                                                                </select>
                                                            </td> : null}

                                                        {show_periode("P2", "S1") ?
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                <select className='input-marks'
                                                                    defaultValue={render_conduite(pupil, 2)}
                                                                    onChange={(text) => handle_change(pupil, 2, text.target.value, true)}>
                                                                    {options_select()}
                                                                </select>
                                                            </td> : null}

                                                        {show_periode("P3", "S2") ?
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                <select className='input-marks'
                                                                    defaultValue={render_conduite(pupil, 3)}
                                                                    onChange={(text) => handle_change(pupil, 3, text.target.value, true)}>
                                                                    {options_select()}
                                                                </select>
                                                            </td> : null}

                                                        {show_periode("P4", "S2") ?
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>
                                                                <select className='input-marks'
                                                                    defaultValue={render_conduite(pupil, 4)}
                                                                    onChange={(text) => handle_change(pupil, 4, text.target.value, true)}>
                                                                    {options_select()}
                                                                </select>
                                                            </td> : null}
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </table>
                                {/* </td>
                            </tr>
                        </tbody>
                    </table> */}

                    {conduites.lengh === 0 ? null
                        :
                        <div style={{ textAlign: 'right', paddingRight: 7 }}>
                            <button className='button-enter-marks' onClick={() => edit_conduites()}>Finir et envoyer</button>
                        </div>}
                </div>
                :
                <div className="progress-center-progress">
                    <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                    Chargement de la fiche des points...
                </div>}
        </div>
    )
}

export default Conduites;
