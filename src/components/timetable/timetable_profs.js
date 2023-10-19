import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrintDocument from '../includes/print';

export default function TimetableProfs() {
    const classes = useSelector(state => state.classes);
    const data = useSelector(state => state.timetable_config_data);

    const find_classe = (classe_id) => {
        let name = "";

        if (classe_id !== "" || classe_id !== undefined) {
            for (let i in classes) {
                if (parseInt(classes[i].id_classes) === parseInt(classe_id)) {
                    name = classes[i].class_id + " " + classes[i].section_id + " " + classes[i].order_id + " " + classes[i].cycle_id;
                    return name;
                }
            }
        }

        return name;
    }

    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <div className='pt-2'>
            <PrintDocument div={'timetable_profs'} />
            <div id="timetable_profs">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <caption style={{ textAlign: 'left' }} className='mb-2'><strong style={{ fontSize: 16 }}>Attribution des cours par enseignant</strong></caption>
                    <tbody>
                        {/* <tr>
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
                            </tr> */}
                        {data.map((employee, index) => (
                            <><tr className={`bg-background-100 dark:bg-gray-20`}
                                // onClick={() => dispatch({ type: "SET_EMPLOYEE_TIMETABLE_CONFIG", payload: employee.worker_id })}
                                key={index + 1}>
                                {/* <td className={`border border-gray-50 dark:border-gray-20`} style={{ paddingLeft: 10 }}> {index + 1} </td> */}
                                <td style={{  paddingLeft: 10 }} className="border border-gray-50 dark:border-gray-20">
                                    <div className='font-bold'>{employee.worker.first_name.toString().toUpperCase()}  {employee.worker.second_name.toString().toUpperCase()}  {employee.worker.last_name.toString().toUpperCase()}  ({employee.worker.gender === "1" ? "M" : "F"})<br /></div>
                                </td>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4'><strong>{employee.worker.worker_id}</strong></td>
                                {/* <td className='border border-gray-50 dark:border-gray-20 pl-4'><strong>Cours</strong></td> */}
                                {/* <td className='border border-gray-50 dark:border-gray-20 pl-4'><strong>Nbr H</strong></td> */}
                            </tr>
                                {employee.tricks.map((trick, index_tricks) => (
                                    <tr className='mt-2 border-top border-gray-50' key={index_tricks}>
                                        <td></td>
                                        {/* <td className='border border-gray-50 dark:border-gray-20 pl-4'>{find_classe(trick.trick.class_id)}</td> */}
                                        {/* <td className='border border-gray-50 dark:border-gray-20 pl-4'>{trick.course.course_name}</td> */}
                                        {/* <td className='border border-gray-50 dark:border-gray-20 pl-4 flex items-center'>{trick.trick.hours_per_week}</td> */}
                                    </tr>
                                ))}
                                <tr className='mt-2 border-top border-gray-50' key={index}>
                                    {/* <td colSpan={3} className='border border-gray-50 dark:border-gray-20 pl-4' style={{ textAlign: 'right', paddingRight: 20 }}><strong>Total heures</strong></td> */}
                                    {/* <td className='border border-gray-50 dark:border-gray-20 pl-4'>{employee.number_hours}</td> */}
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
