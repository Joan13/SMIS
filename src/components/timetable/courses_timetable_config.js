import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CoursesTimetableConfigurator() {

    const classe = useSelector(state => state.classe);
    const dispatch = useDispatch();

    return (
        <table>
            <caption style={{textAlign:'left'}}><strong>Cours</strong></caption><br/>

            {classe.courses.map((course, index) => (
                <div key={index + 1} style={{marginBottom: 7}}>
                <tr>
                    <td style={{width:25}}>{index + 1}.</td>
                    <td>{course.course_name.toUpperCase()}</td>
                </tr>
                </div>
            ))}
        </table>
    )
}