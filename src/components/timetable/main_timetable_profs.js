import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PrintDocument from '../includes/print';

export default function ProfsTimetable() {

    const timetable = useSelector(state => state.timetable1);

    const find_timetable = (data, day, hour) => {
        for (let i in data) {
            if (parseInt(data[i].day_course) === day && parseInt(data[i].hour_course) === hour) {
                console.log(data[i]);
                return data[i].class_name;
            }
        }

        return "";
    }

    useEffect(()=>{
        console.log(timetable);
    }, []);

    return (
        <div className='mr-4'>

            <PrintDocument div={'main_timetable'} />

            <div id="main_timetable">
                <div className='flex items-center' style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 15,
                    borderColor: 'rgba(0,0,0,0.12)'
                }}>TABLE DES HORAIRES
                    {/* <div style={{
                        color: 'gray',
                        marginLeft: 15
                    }}> | DRAFT</div> */}
                </div>

                {timetable.map((classe, index) => (
                    <table className='w-full mb-10'>
                        <caption><strong style={{ fontSize: 16 }}>{classe.worker_id} | {classe.worker_name}</strong></caption>
                        <tbody>
                            <tr>
                                <th></th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>LUNDI</th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>MARDI</th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>MERCREDI</th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>JEUDI</th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>VENDREDI</th>
                                <th className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>SAMEDI</th>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>1H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 1)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 1)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 1)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 1)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 1)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 1)}</td>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>2H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 2)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 2)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 2)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 2)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 2)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 2)}</td>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>3H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 3)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 3)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 3)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 3)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 3)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 3)}</td>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>4H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 4)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 4)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 4)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 4)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 4)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 4)}</td>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>5H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 5)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 5)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 5)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 5)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 5)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 5)}</td>
                            </tr>

                            <tr>
                                <td className='border border-gray-50 dark:border-gray-20 pl-4 pr-4 w-10'><strong>6H</strong></td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 1, 6)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 2, 6)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 3, 6)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 4, 6)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 5, 6)}</td>
                                <td contentEditable className='border border-gray-50 dark:border-gray-20 pl-2 pr-2'>{find_timetable(classe.timetable, 6, 6)}</td>
                            </tr>

                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    )
}
