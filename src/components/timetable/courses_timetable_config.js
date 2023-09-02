import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CoursesTimetableConfigurator() {

    const classe = useSelector(state => state.classe);
    const course_timetable_config = useSelector(state => state.course_timetable_config);
    const dispatch = useDispatch();

    return (
        <div className='menu-right'>
            <table className='mt-2'>
                <caption style={{ textAlign: 'left' }} className='border-bottom border-gray-50 dark:border-gray-20'><strong style={{ fontSize: 16 }}>Liste des cours</strong></caption>

                {classe.courses.map((course, index) => (
                    <div
                        onClick={() => dispatch({ type: 'SET_COURSE_TIMETABLE_CONFIG', payload: course.course_id })}
                        key={index + 1} className={`${parseInt(course_timetable_config) === parseInt(course.course_id) ? 'bg-background-50 dark:bg-gray-20' : ''} mb-1 pt-1 pb-1 pl-3 pr-3 cursor-pointer`}>
                        <tr>
                            <td style={{ width: 25 }}>{index + 1}.</td>
                            <td>
                                <input type="checkbox"
                                    className='cursor-pointer mr-3'
                                    checked={course.course_id === course_timetable_config ? true : false}
                                    onChange={() => dispatch({ type: "SET_COURSE_TIMETABLE_CONFIG", payload: course.course_id })} />
                                {course.course_name.toUpperCase()}
                            </td>
                        </tr>
                    </div>
                ))}
            </table>
        </div>
    )
}
