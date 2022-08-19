import { Checkbox } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TimetableSettings() {
    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const course = useSelector(state => state.course);
    const employees = useSelector(state => state.workers);
    const teachers = employees.filter(employee => employee.poste === "5");

    const [before_break_1, setBefore_break_1] = useState(0);
    const [before_break_2, setBefore_break_2] = useState(1);
    const [after_break_1, setAfter_break_1] = useState(false);
    const [after_break_2, setAfter_break_2] = useState(false);
    const [before_4, setBefore_4] = useState(false);
    const [before_5, setBefore_5] = useState(false);

    return (
        <div>
            <h3>Configuration des horaires ({classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id})</h3><br />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tr>
                    <td valign='top'>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                </tr>
                            ))}
                        </table>
                    </td>
                    <td valign='top' style={{ width: '50%' }}>
                        <div style={{ marginLeft: 20 }}>
                            <strong style={{ fontSize: 16, marginBottom: 15 }}> {course.course_name}</strong>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 4e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={before_break_1 === 1 ? true : false}
                                        onChange={(value => before_break_1 === 1 ? setBefore_break_1(0) : setBefore_break_1(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence après la 3e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={after_break_1 === 1 ? true : false}
                                        onChange={(value => after_break_1 === 1 ? setAfter_break_1(0) : setAfter_break_1(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 4e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={before_4 === 1 ? true : false}
                                        onChange={(value => before_4 === 1 ? setBefore_4(0) : setBefore_4(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 5e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={before_5 === 1 ? true : false}
                                        onChange={(value => before_5 === 1 ? setBefore_5(0) : setBefore_5(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Fixer ce cours à la 6e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={before_5 === 1 ? true : false}
                                        onChange={(value => before_5 === 1 ? setBefore_5(0) : setBefore_5(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>De préférence avant la 7e heure</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={before_break_2 === 1 ? true : false}
                                        onChange={(value => before_break_2 === 1 ? setBefore_break_2(0) : setBefore_break_2(1))} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="td-border" style={{ padding: 10 }}>Heure supplémentaire (après 6e heure)</td>
                                    <td style={{ width: 50,textAlign:'center' }} className="td-border">
                                        <input type="checkbox"
                                        style={{cursor:"pointer"}}
                                        checked={after_break_2 === 1 ? true : false}
                                        onChange={(value => after_break_2 === 1 ? setAfter_break_2(0) : setAfter_break_2(1))} />
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
