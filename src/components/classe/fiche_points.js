import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../global_vars';
import { useEffect, useState } from 'react';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FiPrinter } from 'react-icons/fi';
import PrintDocument from '../includes/print';

const FichesPoints = () => {

    const [periode, setPeriode] = useState(1);
    const classe = useSelector(state => state.classe);
    const loading_footer = useSelector(state => state.loading_footer);
    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    // const echecs = useSelector(state=>state.echecs);
    const [echecs, setEchecs] = useState([]);
    const dispatch = useDispatch();

    const render_period_marks = (marks, course_id) => {
        let return_value = 0;

        // console.log(marks)

        if (parseInt(periode) === 40) {
            for (let i in marks) {
                if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10)) {
                    if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 4) / 2) {
                        // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        // echecs.push(marks[i].course);
                    }
                    return_value = return_value + parseInt(marks[i].main_marks);
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
                    return_value = return_value + parseInt(marks[i].main_marks);
                }
            }
        }
        else if (parseInt(periode) === 100) {
            for (let i in marks) {
                if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10 || parseInt(marks[i].school_period) === 3 || parseInt(marks[i].school_period) === 4 || parseInt(marks[i].school_period) === 11)) {

                    if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 8) / 2) {
                        // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                        // echecs.push(marks[i].course);
                    }
                    return_value = return_value + parseInt(marks[i].main_marks);
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

        return return_value;
    }

    const total_cours = (total, considered) => {
        let moins = 0;

        if (parseInt(periode) === 40 || parseInt(periode) === 50) {
            if (parseInt(considered) === 5) {
                // console.log("ok")
                // considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(total) * 2;
            }
        }

        if (parseInt(periode) === 100) {
            if (parseInt(considered) === 5) {
                // considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(total) * 4;
            }
        }

        if (parseInt(periode) === 100) {
            return (parseInt(total) * 8) - moins;
        } else if (parseInt(periode) === 40 || parseInt(periode) === 50) {
            return (parseInt(total) * 4) - moins;
            // return total + " " +moins;
        } else {
            return total - moins;
        }
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

        if (parseInt(periode) === 60) {
            for (let i in marks) {
                if (parseInt(marks[i].school_period) === 5 || parseInt(marks[i].school_period) === 6 || parseInt(marks[i].school_period) === 12) {
                    return_value = return_value + parseInt(marks[i].main_marks);
                }
            }
        }

        if (parseInt(periode) === 100) {
            for (let i in marks) {
                if (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10 || parseInt(marks[i].school_period) === 3 || parseInt(marks[i].school_period) === 4 || parseInt(marks[i].school_period) === 11 || parseInt(marks[i].school_period) === 5 || parseInt(marks[i].school_period) === 6 || parseInt(marks[i].school_period) === 12) {
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

    const period_max = () => {
        let total = 0;
        for (let i in classe.data.courses) {
            total = total + parseInt(classe.data.courses[i].total_marks);
        }

        if (parseInt(periode) === 40 || parseInt(periode) === 50 || parseInt(periode) === 60) {
            total = total * 4;
        }

        if (parseInt(periode) === 10 || parseInt(periode) === 11 || parseInt(periode) === 12) {
            total = total * 2;
        }

        return total;
    }

    const is_primaire = () => {
        // if (this.props.classe.cycle_id.toUpperCase() === "PRIMAIRE") {
        //     return true;
        // }

        if (autres.is_primaire) {
            return true;
        }

        return false;
    }

    const maxima = (period) => {
        let total = 0;
        let considered = 0;
        let moins = 0;

        for (let i in classe.data.courses) {
            total = total + parseInt(classe.data.courses[i].total_marks);

            // if(parseInt(period) === 40 || parseInt(period) === 50) {
            if (parseInt(classe.data.courses[i].considered) === 5) {
                considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(classe.data.courses[i].total_marks) * 2;
            }
            // }

            if (parseInt(period) === 100) {
                if (parseInt(classe.data.courses[i].considered) === 5) {
                    considered = parseInt(classe.data.courses[i].considered);
                    moins = parseInt(classe.data.courses[i].total_marks) * 4;
                }
            }
        }

        if (parseInt(period) === 40 || parseInt(period) === 50 || parseInt(period) === 60) {
            if (considered === 5) {
                total = (total * 4) - moins;
            } else {
                total = (total * 4) - moins;
            }
        }

        if (parseInt(period) === 100) {
            if (classe.cycle_id.toUpperCase() === "MATERNELLE") {
                if (considered === 5) {
                    total = (total * 3) - moins;
                } else {
                    total = (total * 3) - moins;
                }
            } else {
                if (is_primaire()) {
                    if (considered === 5) {
                        total = (total * 12) - moins;
                    } else {
                        total = (total * 12) - moins;
                    }
                } else {
                    if (considered === 5) {
                        total = (total * 8) - moins;
                    } else {
                        total = (total * 8) - moins;
                    }
                }
            }
        }

        if (parseInt(period) === 10 || parseInt(period) === 11|| parseInt(period) === 12) {
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
        } else if (parseInt(periode) === 40 || parseInt(periode) === 50 || parseInt(periode) === 60) {
            return marks * 4;
        } else if (parseInt(periode) === 100) {
            return marks * 8;
        } else {
            return marks;
        }
    }

    const render_periode = () => {
        if (parseInt(periode) === 1) {
            return "de la 1 ère période";
        }
        else if (parseInt(periode) === 50 && autres.is_primaire) {
            return "du deuxième trimestre";
        }
        else if (parseInt(periode) === 40 && autres.is_primaire) {
            return "du premier trimestre";
        }
        else if (parseInt(periode) === 60 && autres.is_primaire) {
            return "du troisième trimestre";
        }
        else if (parseInt(periode) === 11 && autres.is_primaire) {
            return "de l'examen du deuxième trimestre";
        }
        else if (parseInt(periode) === 10 && autres.is_primaire) {
            return "de l'examen du premier trimestre";
        }
        else if (parseInt(periode) === 12 && autres.is_primaire) {
            return "de l'examen du troisième trimestre";
        }
        else if (parseInt(periode) === 10) {
            return "de l'examen du premier semestre";
        }
        else if (parseInt(periode) === 11) {
            return "de l'examen du deuxième semestre";
        }
        else if (parseInt(periode) === 12) {
            return "de l'examen du troisième trimestre";
        }
        else if (parseInt(periode) === 40) {
            return "du premier semestre";
        }
        else if (parseInt(periode) === 50) {
            return "du deuxième semestre";
        }
        else if (parseInt(periode) === 60) {
            return "du troisième trimestre";
        }
        else if (parseInt(periode) === 100) {
            return "de fin d'année";
        }
        else {
            return "de la " + periode + "e période";
        }
    }

    const find_m = (course, marks) => {
        let mmarks = 0;
        for (let i in marks) {
            if ((parseInt(course) === parseInt(marks[i].course)) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10)) {
                mmarks = mmarks + parseInt(marks[i].main_marks);
            }
        }

        let total = find_coursee(course) * 2;
        if (mmarks < (total / 2)) {
            return true;
        }

        return false;
    }

    const find_echecs = (course) => {
        let echecs = 0;
        let moins = 0;

        if (parseInt(periode) === 50 || parseInt(periode) === 40) {
            if (parseInt(find_coursee(course).considered) === 5) {
                // considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(find_coursee(course).total_marks) * 2;
            }
        }

        if (parseInt(periode) === 100) {
            if (parseInt(find_coursee(course).considered) === 5) {
                // considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(find_coursee(course).total_marks) * 4;
            }
        }

        let total = (parseInt(find_coursee(course).total_marks) * 8) - moins;

        if (parseInt(periode) === 50 || parseInt(periode) === 40) {
            let total = parseInt(find_coursee(course).total_marks) * 4;
            for (let i in classe.data.pupils) {
                if (parseInt(render_period_marks(classe.data.pupils[i].marks, course)) < (total / 2)) {
                    echecs = echecs + 1;
                }
            }
        } else if (parseInt(periode) === 100) {
            for (let i in classe.data.pupils) {
                if (parseInt(render_period_marks(classe.data.pupils[i].marks, course)) < (total / 2)) {
                    echecs = echecs + 1;
                }
            }
        } else {
            for (let i in classe.data.pupils_marks) {
                if ((parseInt(course) === parseInt(classe.data.pupils_marks[i].course)) && (parseInt(classe.data.pupils_marks[i].main_marks) < parseInt(classe.data.pupils_marks[i].total_marks / 2)) && (parseInt(classe.data.pupils_marks[i].school_period) === parseInt(periode))) {
                    echecs = echecs + 1;
                }
            }
        }
        return echecs;
    }

    const find_coursee = (course) => {
        for (let i in classe.data.courses) {
            if (classe.data.courses[i].course_id === course) {
                return classe.data.courses[i];
            }
        }
    }

    const find_course = (course) => {
        let coursee = "";
        for (let i in classe.data.courses) {
            if (classe.data.courses[i].course_id === course) {
                return classe.data.courses[i].course_name.toUpperCase();
            }
        }
    }

    useEffect(() => {
        // console.log(echecs());
        // setEchecs([]);
        // find_echecss();

        // console.log(echecs)

        // return ()=>{
        //     // setEchecs([]);
        // }
    }, []);

    const can_render = (considered) => {
        if ((parseInt(periode) === 10 || parseInt(periode) === 11) && parseInt(considered) === 5) {
            return false;
        }
        return true;
    }

    const echecs_pupil = (marks) => {

        let markss = [];


        // if (parseInt(periode) === 50 || parseInt(periode) === 40) {
        //     if (parseInt(find_coursee(course).considered) === 5) {
        //         // considered = parseInt(classe.data.courses[i].considered);
        //         moins = parseInt(find_coursee(course).total_marks) * 2;
        //     }
        // }

        // if (parseInt(periode) === 100) {
        //     if (parseInt(find_coursee(course).considered) === 5) {
        //         // considered = parseInt(classe.data.courses[i].considered);
        //         moins = parseInt(find_coursee(course).total_marks) * 4;
        //     }
        // }

        // let total = (parseInt(find_coursee(course).total_marks) * 8) - moins;

        if (parseInt(periode) === 40 || parseInt(periode) === 50) {
            for (let i in marks) {
                let minus = 0;
                if (parseInt(find_coursee(marks[i].course).considered) === 5) {
                    minus = parseInt(find_coursee(marks[i].course).total_marks) * 2;
                }
                let tot = parseInt(find_coursee(marks[i].course).total_marks) - minus;

                if ((parseInt(marks[i].main_marks) < parseInt(tot / 2)) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10)) {
                    markss.push(marks[i].course);
                }
            }
        }
        else {
            for (let i in marks) {
                if ((parseInt(marks[i].main_marks) < parseInt(marks[i].total_marks / 2)) && (parseInt(marks[i].school_period) === parseInt(periode))) {
                    markss.push(marks[i].course);
                }
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
        // return markss.length;
    }

    return (
        <div style={{ marginBottom: 20, paddingTop: 0, width: '100%' }}>
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
                            {/* <option value="100">Toute l'année</option>
                            <option>- - - - - - - - - - - -</option> */}
                            <option value="1">Première période</option>
                            <option value="2">Deuxième période</option>
                            <option value="3">Troisième période</option>
                            <option value="4">Quatrième période</option>
                            {autres.is_primaire ?
                                <>
                                    <option value="5">Cinquième période</option>
                                    <option value="6">Sixième période</option>
                                </> : null}
                            <option>- - - - - - - - - - - -</option>
                            <option value="10">Examen premier {autres.is_primaire ? "trimestre" : "semestre"}</option>
                            <option value="11">Examen deuxième {autres.is_primaire ? "trimestre" : "semestre"}</option>
                            {autres.is_primaire ?
                                <option value="12">Examen troisième {autres.is_primaire ? "trimestre" : "semestre"}</option> : null}
                            <option>- - - - - - - - - - - -</option>
                            <option value="40">Premier {autres.is_primaire ? "trimestre" : "semestre"}</option>
                            <option value="50">Deuxième {autres.is_primaire ? "trimestre" : "semestre"}</option>
                            {autres.is_primaire ?
                                <option value="60">Troisième {autres.is_primaire ? "trimestre" : "semestre"}</option> : null}
                            <option>- - - - - - - - - - - -</option>
                            <option value="100">Fin d'année</option>
                        </select>
                    </div>

                    <div id="fiche-points-print">
                        <table className="fiche-pointsdede" style={{ width: '100%', marginTop: 0 }}>
                            <caption>
                                <div style={{ textAlign: 'left', marginBottom: -30 }}>
                                    <strong>{autres.school_name.toUpperCase()}</strong><br />
                                    <strong>{autres.school_bp}</strong><br />
                                    <strong>Année scolaire : {autres.annee}</strong>
                                </div>
                                <strong>
                                    FICHE DES POINTS {render_periode().toUpperCase()}<br />
                                    {classe.class_id.toUpperCase() + " " + classe.section_id.toUpperCase() + " " + classe.order_id.toUpperCase()}
                                </strong>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Noms des élèves</th>

                                    {classe.data.courses.map((course, index) => (<th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }} key={index}>{total_cours(course.total_marks, course.considered)} / {course.course_name.toUpperCase().substr(0, 25)}</th>))}
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>TOTAL</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>MAXIMA</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>POURCENTAGE</th>
                                    {/* <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>ECHECS</th> */}
                                </tr>
                            </thead>

                            {classe.data.pupils.map((pupil, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>

                                            {classe.data.courses.map((course, index) => (
                                                <td className={`border border-gray-50 dark:border-gray-20 ${can_render(course.considered) ? render_period_marks(pupil.marks, course.course_id) < (total_cours(course.total_marks, course.considered) / 2) ? "font-bold underline text-errror" : "" : ""}`} key={index} style={{ textAlign: 'center', minWidth: 32 }}>
                                                    {can_render(course.considered) ? render_period_marks(pupil.marks, course.course_id) : "-"}
                                                </td>
                                            ))}

                                            <td className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 40, textAlign: 'center', fontWeight: 'bold' }}>
                                                {render_period_main_marks(pupil.marks)}
                                            </td>
                                            <td className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 40, textAlign: 'center', fontWeight: 'bold' }}>
                                                {maxima(periode)}
                                            </td>
                                            <td className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }}>
                                                {render_period_pourcentage(pupil.marks)}
                                            </td>
                                            {/* <td className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center', fontWeight: 'bold' }}>
                                                {echecs_pupil(pupil.marks)}
                                            </td> */}
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>

                        <div className="border-b mt-5 pb-3 border-gray-50 dark:border-gray-20 font-bold">
                            Nombre d'échecs par cours
                        </div>

                        <div style={{ marginLeft: -5 }}>
                            {classe.data.courses.map((cours, index) => {
                                if (find_echecs(cours.course_id) !== 0) {

                                    return (
                                        <div key={index} className='border-l border-gray-50 dark:border-gray-20 pl-2 ml-2 text-sm mt-2' style={{ display: 'inline-block' }}>{cours.course_name.toUpperCase()} <strong>{find_echecs(cours.course_id)}</strong></div>
                                    )
                                }
                            })}
                        </div>
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

export default FichesPoints;
