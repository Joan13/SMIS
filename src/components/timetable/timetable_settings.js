import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import ButtonNormal from '../includes/button_normal';
import { FaCheckCircle } from 'react-icons/fa';
import { CircularProgress } from '@material-ui/core';

export default function TimetableSettings() {
    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const course = useSelector(state => state.course);
    const employees = useSelector(state => state.workers);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const teachers = employees.filter(employee => employee.poste === "5");
    const employee_timetable_config = useSelector(state => state.employee_timetable_config);
    const course_timetable_config = useSelector(state => state.course_timetable_config);
    const loading_footer = useSelector(state => state.loading_footer);
    const [tricks_course, setTricks_course] = useState(0);
    const [tricks_course_successive, setTricks_course_successive] = useState(0);
    const [success_assign, setSuccess_assign] = useState(false);
    const [worker, setWorker] = useState('');
    const [hours_per_week, setHours_per_week] = useState(course.hours_per_week);

    const AssignCourseToProf = () => {
        dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/assign_course_prof.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: course.school_year,
                worker: employee_timetable_config,
                course: course_timetable_config,
                tricks_course: tricks_course,
                tricks_course_successive: tricks_course_successive,
                classe: classe.id_classes,
                hours_per_week: hours_per_week,
            })
        })
            .then(response => response.json())
            .then(response => {
                dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                ass();
            })
            .catch(error => { });
    };

    const ass = async () => {
        setSuccess_assign(true);
        setTimeout(() => {
            setSuccess_assign(false);
        }, 5000);
    }

    return (
        <div className='pt-2'>
            {/* <h3>Configuration des horaires ({classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id})</h3><br /> */}

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                    <td valign='top'>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <caption style={{ textAlign: 'left' }} className='mb-2'><strong style={{ fontSize: 16 }}>Séléctionner l'enseignant</strong></caption>
                            <tr>
                                <th style={{ width: 25, textAlign: 'left', paddingLeft: 5, paddingRight: 5 }} className="border border-gray-50 dark:border-gray-20">No</th>
                                <th style={{ textAlign: 'left', paddingLeft: 10 }} className="border border-gray-50 dark:border-gray-20">Noms de l'enseignant</th>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ marginBottom: 10 }} className="border border-gray-50 dark:border-gray-20">
                                    <input
                                        className="input-normall"
                                        style={{ width: '80%', marginLeft: 25, border: 'none', height: 32 }}
                                        placeholder='Rechercher un enseignant'
                                    />
                                </td>
                            </tr>
                            {teachers.map((employee, index) => (
                                <tr className={`${parseInt(employee_timetable_config) === parseInt(employee.worker_id) ? 'bg-background-50 dark:bg-gray-20' : ''}`}
                                    onClick={() => dispatch({ type: "SET_EMPLOYEE_TIMETABLE_CONFIG", payload: employee.worker_id })}
                                    key={index + 1}>
                                    <td className={`border border-gray-50 dark:border-gray-20`} style={{ paddingLeft: 10 }}> {index + 1} </td>
                                    <td style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10 }} className="border border-gray-50 dark:border-gray-20">
                                        {employee.first_name.toString().toUpperCase()}  {employee.second_name.toString().toUpperCase()}  {employee.last_name.toString().toUpperCase()}  ({employee.gender === "1" ? "M" : "F"})
                                    </td>
                                    <td style={{ width: 50, textAlign: 'center' }}
                                        onClick={() => dispatch({ type: "SET_EMPLOYEE_TIMETABLE_CONFIG", payload: employee.worker_id })}
                                        className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={employee.worker_id === employee_timetable_config ? true : false}
                                            onChange={() => dispatch({ type: "SET_EMPLOYEE_TIMETABLE_CONFIG", payload: employee.worker_id })} />
                                        {/* onChange={(value => worker === employee.worker_id ? setWorker(0) : setWorker(employee.worker_id))}  */}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </td>
                    <td valign='top' style={{ width: '50%' }}>
                        <div style={{ marginLeft: 20 }}>

                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <caption style={{ textAlign: 'left' }} className='mb-2'><strong style={{ fontSize: 16 }}><span className='text-gray-100'>Cours:</span> {course_timetable_config}</strong></caption>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>De préférence avant la 4e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 1 ? true : false}
                                            onChange={() => setTricks_course(1)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>De préférence après la 3e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 2 ? true : false}
                                            onChange={() => setTricks_course(2)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>De préférence après la 4e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 3 ? true : false}
                                            onChange={() => setTricks_course(3)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>De préférence avant la 5e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 4 ? true : false}
                                            onChange={() => setTricks_course(4)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>Fixer ce cours à la 6e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 5 ? true : false}
                                            onChange={() => setTricks_course(5)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>De préférence avant la 7e heure</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 6 ? true : false}
                                            onChange={() => setTricks_course(6)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>Heure supplémentaire (après 6e heure)</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course === 7 ? true : false}
                                            onChange={() => setTricks_course(7)} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>Réquerrir heures succéssives</td>
                                    <td style={{ width: 50, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="checkbox"
                                            style={{ cursor: "pointer" }}
                                            checked={tricks_course_successive === 1 ? true : false}
                                            onChange={(() => tricks_course_successive === 1 ? setTricks_course_successive(0) : setTricks_course_successive(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ padding: 10 }}>Heure(s) par semaine</td>
                                    <td style={{ width: 80, textAlign: 'center' }} className="border border-gray-50 dark:border-gray-20">
                                        <input type="number"
                                            style={{ width: 70, height: 30, outline: 'none', textAlign: 'center' }}
                                            className='border border-gray-50 dark:border-gray-20 items-center wfull'
                                            value={hours_per_week}
                                            onChange={(value => setHours_per_week(value.target.value))} />
                                    </td>
                                </tr>
                            </table><br />
                            <div className='flex items-center'>
                                {loading_footer ?
                                    <div>
                                        <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} />
                                    </div>
                                    :
                                    !success_assign ?
                                        <ButtonNormal text="Enregistrer les modifications" onPress={AssignCourseToProf} style={{ marginTop: 15, marginBottom: 20, width: '100%' }} />
                                        :
                                        <FaCheckCircle color='green' size={25} />}
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
