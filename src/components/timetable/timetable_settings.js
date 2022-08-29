import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TimetableSettings() {
    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const course = useSelector(state => state.course);
    const employees = useSelector(state => state.workers);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const teachers = employees.filter(employee => employee.poste === "5");
    const [trick_course, setTrick_course] = useState(0);
    const [trick_course_successive,setTrick_course_successive] = useState(0);
    const [worker,setWorker] = useState('');

    const AssignCourseToProf = () => {
        // dispatch({ type: "SET_SEARCHING_PUPIL", payload: true });
        // dispatch({ type: "SET_NUMBER_PUPILS_SHOW", payload: false });
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/search_pupil.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: course.school_year,
                worker: worker,
                course: course.course_id,
                trics_course: trick_course,
                trick_course_successive: trick_course_successive,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                // dispatch({ type: "SET_SEARCHING_PUPIL", payload: false });
                // dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils });
                // dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count });

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
                                        checked={trick_course === 1 ? true : false}
                                        onChange={(value => trick_course === 1 ? setTrick_course(0) : setTrick_course(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence après la 3e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 2 ? true : false}
                                        onChange={(value => trick_course === 2 ? setTrick_course(0) : setTrick_course(2))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence après la 4e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 3 ? true : false}
                                        onChange={(value => trick_course === 3 ? setTrick_course(0) : setTrick_course(3))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 5e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 4 ? true : false}
                                        onChange={(value => trick_course === 4 ? setTrick_course(0) : setTrick_course(4))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Fixer ce cours à la 6e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 5 ? true : false}
                                        onChange={(value => trick_course === 5 ? setTrick_course(0) : setTrick_course(5))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 7e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 6 ? true : false}
                                        onChange={(value => trick_course === 6 ? setTrick_course(0) : setTrick_course(6))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Heure supplémentaire (après 6e heure)</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course === 7 ? true : false}
                                        onChange={(value => trick_course === 7 ? setTrick_course(0) : setTrick_course(7))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Réquerrir heures succéssives</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={trick_course_successive === 1 ? true : false}
                                        onChange={(value => trick_course_successive === 1 ? setTrick_course_successive(0) : setTrick_course_successive(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Heure (s) par semaine</td>
                                    <td style={{ width: 80,textAlign:'center' }} className="td-border">
                                        <input type="number"
                                        style={{width: 30,outline:'none'}}
                                        // onChange={(value => trick_course_successive === 1 ? setTrick_course_successive(0) : setTrick_course_successive(1))} 
                                        />
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    )
}
