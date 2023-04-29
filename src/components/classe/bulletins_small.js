import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FiPrinter } from 'react-icons/fi';
import PrintDocument from '../includes/print';

const BulletinsSmall = () => {

    const [periode, setPeriode] = useState("1");
    const classe = useSelector(state => state.classe);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    // const echecs = useSelector(state=>state.echecs);
    const [echecs, setEchecs] = useState([]);
    const dispatch = useDispatch();

    const render_period_marks = (marks, course_id) => {
        let return_value = 0;

        if (parseInt(periode) === 40) {
            for (let i in marks) {
                if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10)) {
                    if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 4) / 2) {
                        // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        // echecs.push(marks[i].course);
                    }
                    return_value = return_value + marks[i].main_marks;
                }
            }
        }

        else if (parseInt(periode) === 50) {
            for (let i in marks) {
                if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 3 || parseInt(marks[i].school_period) === 4 || parseInt(marks[i].school_period) === 11)) {

                    if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 4) / 2) {
                        // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        // echecs.push(marks[i].course);
                    }
                    return_value = return_value + marks[i].main_marks;
                }
            }
        }
        else {
            for (let i in marks) {
                if (parseInt(marks[i].course) === parseInt(course_id) && parseInt(marks[i].school_period) === parseInt(periode)) {

                    if (parseInt(periode) === 10 || parseInt(periode) === 11) {
                        if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 2) / 2) {
                            // echecs.push(marks[i].course);
                            // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        }
                    } else {
                        if (parseInt(marks[i].main_marks) < parseInt(marks[i].total_marks) / 2) {
                            let echec = [];
                            // echec.id = marks[i].course + main_marks[i].pupil;
                            // echec.course = marks[i].course;
                            // echecs.push(marks[i].course);
                            // echecs.push([...echecs, echec]);
                            // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        }
                    }

                    return_value = marks[i].main_marks;
                }
            }
        }

        // if(return_value < total_marks()/2) {
        //     let echec = {};
        //     echec.id = 
        // }

        return return_value;
    }


    const render_period_main_marks = (marks) => {
        let return_value = 0;

        if (parseInt(periode) === 40) {
            for (let i in marks) {
                if (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10) {
                    return_value = return_value + parseInt(marks[i].main_marks);
                }
            }
        }

        if (parseInt(periode) === 50) {
            for (let i in marks) {
                if (parseInt(marks[i].school_period) === 3 || parseInt(marks[i].school_period) === 4 || parseInt(marks[i].school_period) === 11) {
                    return_value = return_value + parseInt(marks[i].main_marks);
                }
            }
        }

        else {
            for (let i in marks) {
                if (parseInt(marks[i].school_period) === parseInt(periode)) {
                    return_value = return_value + parseInt(marks[i].main_marks);
                }
            }
        }

        return return_value;
    }

    const echecs_pupil = (marks) => {

        let markss = [];

        for (let i in marks) {
            if ((parseInt(marks[i].main_marks) < parseInt(marks[i].total_marks / 2)) && (parseInt(marks[i].school_period) === parseInt(periode))) {
                markss.push(marks[i].course);
            }
        }

        return (
            <div className='text-left ml-2'>
                <div className='border-b pb-2 border-gray-50 dark:border-gray-20 font-bold'>Échecs ({markss.length})</div>
                {markss.map((echec, index) => (
                    <div key={index} className='pl-1 ml-1 border-l mb-1 text-sm border-gray-50 dark:border-gray-20' style={{ display: 'inline-block' }}>{find_course(echec)}</div>
                ))}
            </div>
        )
    }

    const find_course = (course) => {
        let coursee = "";
        for (let i in classe.data.courses) {
            if (classe.data.courses[i].course_id === course) {
                return classe.data.courses[i].course_name.toUpperCase();
            }
        }
    }

    const period_max = () => {
        let total = 0;
        for (let i in classe.data.courses) {
            total = total + parseInt(classe.data.courses[i].total_marks);
        }

        if (parseInt(periode) === 40 || parseInt(periode) === 50) {
            total = total * 4;
        }

        if (parseInt(periode) === 10 || parseInt(periode) === 11) {
            total = total * 2;
        }

        return total;
    }

    const maxima = (period) => {
        let total = 0;
        let considered = 0;
        let moins = 0;

        for (let i in classe.data.courses) {
            total = total + parseInt(classe.data.courses[i].total_marks);

            if (parseInt(classe.data.courses[i].considered) === 5) {
                considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(classe.data.courses[i].total_marks) * 2;
            }
        }

        if (parseInt(period) === 40 || parseInt(period) === 50) {
            if (considered === 5) {
                total = (total * 4) - moins;
            } else {
                total = (total * 4) - moins;
            }
        }

        if (parseInt(period) === 10 || parseInt(period) === 11) {
            if (considered === 5) {
                total = (total * 2) - moins;
            } else {
                total = (total * 2) - moins;
            }
        }

        return total;
    }

    const render_period_pourcentage = (marks) => {
        let pourcentage = 0;
        let main_marks = render_period_main_marks(marks);
        let total_marks = period_max();

        if (main_marks != 0) {
            pourcentage = (main_marks * 100) / maxima(periode);
            return (pourcentage).toString().substr(0, 4);
        } else {
            return "";
        }
    }

    const show_periode = () => {
        if (parseInt(periode) === 40) {
            return true;
        }

        return false;
    }

    const total_marks = (marks) => {
        if (parseInt(periode) === 10 || parseInt(periode) === 11) {
            return marks * 2;
        } else if (parseInt(periode) === 40 || parseInt(periode) === 50) {
            return marks * 4;
        } else {
            return marks;
        }
    }

    const render_periode = () => {
        if (parseInt(periode) === 1) {
            return "de la 1 ère période";
        }
        else if (parseInt(periode) === 10) {
            return "de l'examen du premier semestre";
        }
        else if (parseInt(periode) === 11) {
            return "de l'examen du deuxième semestre";
        }
        else if (parseInt(periode) === 40) {
            return "du premier semestre";
        }
        else if (parseInt(periode) === 50) {
            return "du deuxième semestre";
        }
        else {
            return "de la " + periode + "e période";
        }
    }

    const render_period_conduite = (pupil_id, periode) => {
        let main_conduite = "";

        for (let i in classe.data.conduites) {
            if (classe.data.conduites[i].pupil_id == pupil_id && classe.data.conduites[i].periode == periode) {
                main_conduite = classe.data.conduites[i].main_conduite;
            }
        }

        if (main_conduite === "") {
            return "-";
        } else if (parseInt(main_conduite) === 1) {
            return "E";
        } else if (parseInt(main_conduite) === 2) {
            return "TB";
        } else if (parseInt(main_conduite) === 3) {
            return "B";
        } else if (parseInt(main_conduite) === 4) {
            return "AB";
        } else if (parseInt(main_conduite) === 5) {
            return "M";
        } else if (parseInt(main_conduite) === 6) {
            return "MA";
        } else {
            return "-";
        }
    }

    const display_conduite = () => {
        if (parseInt(periode) === 4 || parseInt(periode) === 1 || parseInt(periode) === 3 || parseInt(periode) === 2) {
            return true;
        }

        return false;
    }

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <div>
                    <PrintDocument div={"fiche-points-print"} /> <br /><br />
                    <div className="float-menu-right">
                        <select
                            onChange={(val) => {
                                setEchecs([]);
                                setPeriode(val.target.value);
                            }}
                            style={{ backgroundColor: 'white', textAlign: 'right' }}
                            value={periode}
                            className="select-no-border-select border-none bg-background-100 dark:bg-background-20 ">
                            {/* <option value="100">Toute l'année</option> */}
                            {/* <option>- - - - - - - - - - - -</option> */}
                            <option value="1">Première période</option>
                            <option value="2">Deuxième période</option>
                            <option value="3">Troisième période</option>
                            <option value="4">Quatrième période</option>
                            <option>- - - - - - - - - - - -</option>
                            <option value="10">Examen premier semestre</option>
                            <option value="11">Examen deuxième semestre</option>
                            <option>- - - - - - - - - - - -</option>
                            <option value="40">Premier semestre</option>
                            <option value="50">Deuxième semestre</option>
                        </select>
                    </div><br /><br />

                    <div id="fiche-points-print">
                        {classe.data.pupils.map((pupil, index) => {
                            return (
                                <div key={index} className='border-4 border-double rounded-lg border-gray-50 dark:border-gray-20 p-5 mb-5'>
                                    <table className="w-full">
                                        <caption>
                                            <div style={{ textAlign: 'left', marginBottom: -40 }}>
                                                <strong>{autres.school_name.toUpperCase()}</strong><br />
                                                <strong>{autres.school_bp}</strong><br />
                                                <strong><span className='text-gray-100'>Année scolaire :</span> {autres.annee}</strong><br />
                                                <strong><span className='text-gray-100'>Classe : </span>{classe.class_id.toUpperCase() + " " + classe.section_id.toUpperCase() + " " + classe.order_id.toUpperCase()}</strong>
                                            </div>
                                            <div className='font-bold'>
                                                <div className='text-xl'>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</div>
                                                FICHE DES POINTS {render_periode().toUpperCase()}
                                            </div>
                                        </caption>
                                        <thead>
                                            <tr>
                                                {classe.data.courses.map((course, index) => (<th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' style={{ paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }} key={index}>{total_marks(course.total_marks)} / {course.course_name.toUpperCase().substr(0, 25)}</th>))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {classe.data.courses.map((course, index2) => (
                                                    <td className='border border-gray-50 h-14 dark:border-gray-20' key={index2} style={{ textAlign: 'center', minWidth: 32 }}>
                                                        {render_period_marks(pupil.marks, course.course_id)}
                                                    </td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td colSpan={classe.data.courses.length} className='text-right border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20'>
                                                    <div className="text-right flex items-center">
                                                        <div className='w-full'>
                                                            {echecs_pupil(pupil.marks)}
                                                        </div>
                                                        <table className=' w-full font-bold text-md'>
                                                            <tr>
                                                                <td><span className='text-gray-100 mr-3'>TOTAL OBTENU </span></td>
                                                                <td className='pr-3 border border-gray-50 dark:border-gray-20'>{render_period_main_marks(pupil.marks)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><span className='text-gray-100 mr-3'>MAXIMA </span></td>
                                                                <td className='pr-3 border border-gray-50 dark:border-gray-20'>{maxima(periode)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><span className='text-gray-100 mr-3'>POURCENTAGE </span></td>
                                                                <td className='pr-3 border border-gray-50 dark:border-gray-20'>{render_period_pourcentage(pupil.marks)}</td>
                                                            </tr>
                                                            <tr>
                                                                <td><span className='text-gray-100 mr-3'>PLACE </span></td>
                                                                <td className='pr-3 border border-gray-50 dark:border-gray-20'>
                                                                    {periode === "1" ?
                                                                        classe.data.array_places_1.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}

                                                                    {periode === "2" ?
                                                                        classe.data.array_places_2.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}

                                                                    {periode === "10" ?
                                                                        classe.data.array_places_10.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}

                                                                    {periode === "3" ?
                                                                        classe.data.array_places_3.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}

                                                                    {periode === "4" ?
                                                                        classe.data.array_places_4.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}

                                                                    {periode === "11" ?
                                                                        classe.data.array_places_11.map((place, index_p) => {
                                                                            if (place.pupil_id === pupil.pupil.pupil_id) {
                                                                                return (
                                                                                    <div key={index_p}>{index_p + 1} / {classe.data.pupils.length}</div>
                                                                                )
                                                                            }
                                                                        }
                                                                        )
                                                                        : null}
                                                                </td>
                                                            </tr>
                                                            {display_conduite ?
                                                                <tr>
                                                                    <td><span className='text-gray-100 mr-3'>CONDUITE </span></td>
                                                                    <td className='pr-3 border border-gray-50 dark:border-gray-20'>{render_period_conduite(pupil.pupil.pupil_id, periode)}</td>
                                                                </tr> : null}
                                                        </table>
                                                    </div>


                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div className="progress-center-progress">
                    <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                    Chargement de la fiche des points...
                </div>}
        </div>
    )
}

export default BulletinsSmall;
