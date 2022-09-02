import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNormal from '../includes/button_normal';

export default function TimetableSettings() {
    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const course = useSelector(state => state.course);
    const employees = useSelector(state => state.workers);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const teachers = employees.filter(employee => employee.poste === "5");
    const [tricks_course, setTricks_course] = useState(0);
    const [tricks_course_successive,setTricks_course_successive] = useState(0);
    const [worker,setWorker] = useState('');
    const [hours_per_week,setHours_per_week] = useState(course.hours_per_week);

    const AssignCourseToProf = () => {
        dispatch({ type: "SET_LOADING_FOOTER", payload: true });
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/assign_course_prof.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: course.school_year,
                worker: worker,
                course: course.course_id,
                tricks_course: tricks_course,
                tricks_course_successive: tricks_course_successive,
                hours_per_week: hours_per_week,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_LOADING_FOOTER", payload: false });

            })
            .catch((error) => { });
    };

    return (
        <div>
            <h3>Configuration des horaires ({classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id})</h3><br />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                    <td valign='top'>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <caption><strong style={{ fontSize: 16, marginBottom: 15 }}>Séléctionner l'enseignant</strong></caption>
                            <tr>
                                <th style={{ width: 25, textAlign: 'left', paddingLeft: 5 }} className="td-border">N0</th>
                                <th style={{ textAlign: 'left', paddingLeft: 10 }} className="td-border">Noms de l'enseignant</th>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ marginBottom: 10 }} className="td-border">
                                    <input
                                        className="input-normall"
                                        style={{ width: '80%', marginLeft: 30, border: 'none', height: 32 }}
                                        placeholder='Rechercher un enseignant'
                                    />
                                </td>
                            </tr>
                            {teachers.map((employee, index) => (
                                <tr
                                    // onClick={() => this.view_pupil(pupil)}
                                    key={index + 1}>
                                    <td className="td-border" style={{ paddingLeft: 10 }}> {index + 1} </td>
                                    <td style={{ paddingBottom: 10, paddingTop: 10, paddingLeft: 10 }} className="td-border">
                                        {employee.first_name.toString().toUpperCase()}  {employee.second_name.toString().toUpperCase()}  {employee.last_name.toString().toUpperCase()}  ({employee.gender === "1" ? "M" : "F"})
                                    </td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={worker === employee.worker_id ? true : false}
                                        onChange={(value => worker === employee.worker_id ? setWorker(0) : setWorker(employee.worker_id))} />
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </td>
                    <td valign='top' style={{ width: '50%' }}>
                        <div style={{ marginLeft: 20 }}>
                            
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <caption><strong style={{ fontSize: 16, marginBottom: 15 }}> {course.course_name}</strong></caption>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 4e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 1 ? true : false}
                                        onChange={(value => tricks_course === 1 ? setTricks_course(0) : setTricks_course(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence après la 3e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 2 ? true : false}
                                        onChange={(value => tricks_course === 2 ? setTricks_course(0) : setTricks_course(2))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence après la 4e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 3 ? true : false}
                                        onChange={(value => tricks_course === 3 ? setTricks_course(0) : setTricks_course(3))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 5e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 4 ? true : false}
                                        onChange={(value => tricks_course === 4 ? setTricks_course(0) : setTricks_course(4))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Fixer ce cours à la 6e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 5 ? true : false}
                                        onChange={(value => tricks_course === 5 ? setTricks_course(0) : setTricks_course(5))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 7e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 6 ? true : false}
                                        onChange={(value => tricks_course === 6 ? setTricks_course(0) : setTricks_course(6))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Heure supplémentaire (après 6e heure)</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course === 7 ? true : false}
                                        onChange={(value => tricks_course === 7 ? setTricks_course(0) : setTricks_course(7))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Réquerrir heures succéssives</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={tricks_course_successive === 1 ? true : false}
                                        onChange={(value => tricks_course_successive === 1 ? setTricks_course_successive(0) : setTricks_course_successive(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Heure (s) par semaine</td>
                                    <td style={{ width: 80,textAlign:'center' }} className="td-border">
                                        <input type="number"
                                        style={{width: 30,outline:'none'}}
                                        value={hours_per_week}
                                        onChange={(value => setHours_per_week(value.target.value))}  />
                                    </td>
                                </tr>
                            </table>
                            <ButtonNormal text="Enregistrer les modifications" onPress={()=>AssignCourseToProf()} style={{marginTop: 15,marginBottom: 20, width:'100%'}} />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
