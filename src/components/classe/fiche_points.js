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

    const maxima=(period)=> {
        let total = 0;
        let considered = 0;
        let moins = 0;
        
        for (let i in classe.data.courses) {
            total = total + parseInt(classe.data.courses[i].total_marks);
            
            if(parseInt(classe.data.courses[i].considered) === 5) {
                considered = parseInt(classe.data.courses[i].considered);
                moins = parseInt(classe.data.courses[i].total_marks) * 2;
            }
        }

        if (parseInt(period) === 40 || parseInt(period) === 50) {
            if(considered === 5) {
                total = (total * 4) - moins;
            } else {
                total = (total * 4) - moins;
            }
        }

        if (parseInt(period) === 10 || parseInt(period) === 11) {
            if(considered === 5) {
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

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

    const find_echecss = () => {
        let return_value = 0;

        for(let i in classe.data.pupils) {

            let marks = classe.data.pupils[i].marks;

            if (parseInt(periode) === 40) {
                for (let i in marks) {
                    let course_id = marks[i].course;
                    if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 1 || parseInt(marks[i].school_period) === 2 || parseInt(marks[i].school_period) === 10)) {
                        if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 4) / 2) {
                            echecs.push(marks[i].course);
                        }
                        // return_value = return_value + marks[i].main_marks;
                    }
                }
            }
    
            else if (parseInt(periode) === 50) {
                for (let i in marks) {
                    let course_id = marks[i].course;
                    if (parseInt(marks[i].course) === parseInt(course_id) && (parseInt(marks[i].school_period) === 3 || parseInt(marks[i].school_period) === 4 || parseInt(marks[i].school_period) === 11)) {
    
                        if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 4) / 2) {
                            // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                            echecs.push(marks[i].course);
                        }
                        // return_value = return_value + marks[i].main_marks;
                    }
                }
            }
            else {
                for (let i in marks) {
                    let course_id = marks[i].course;
                    if (parseInt(marks[i].course) === parseInt(course_id) && parseInt(marks[i].school_period) === parseInt(periode)) {
    
                        if (parseInt(periode) === 10 || parseInt(periode) === 11) {
                            if (parseInt(marks[i].main_marks) < (parseInt(marks[i].total_marks) * 2) / 2) {
                                echecs.push(marks[i].course);
                                // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                            }
                        } else {
                            if (parseInt(marks[i].main_marks) < parseInt(marks[i].total_marks) / 2) {
                                // let echec = [];
                                // echec.id = marks[i].course + main_marks[i].pupil;
                                // echec.course = marks[i].course;
                                echecs.push(marks[i].course);
                                // echecs.push([...echecs, echec]);
                                // dispatch({type:"SET_ECHECS", payload:[...echecs, marks[i].course]});
                            }
                        }
    
                        // return_value = marks[i].main_marks;
                    }
                }
            }
        }
        
        // return return_value;
    }

    const find_echecs = (course) => {

        let ecc = [];
        for (let i in echecs) {
            if (echecs[i] === course) {
                // ecc = ecc + 1;
                ecc.push(echecs[i]);
            }
        }

        return ecc.length;
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

    return (
        <div style={{ marginBottom: 50, paddingTop: 10, width: '100%' }}>
            {!loading_footer ?
                <div>
                    <PrintDocument div={"fiche-points-print"} /> <br/><br/>
                    <div className="float-menu-right">
                        <select
                            onChange={(val) => {
                                setEchecs([]);
                                setPeriode(val.target.value);
                            }}
                            style={{ backgroundColor: 'white', textAlign: 'right' }}
                            value={periode}
                            className="select-no-border-select border-none bg-background-100 dark:bg-background-20 ">
                            <option value="100">Toute l'année</option>
                            <option>- - - - - - - - - - - -</option>
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
                    </div>

                    <div id="fiche-points-print">
                        <table className="fiche-pointsdede" style={{ width: '100%' }}>
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

                                    {classe.data.courses.map((course, index) => (<th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }} key={index}>{total_marks(course.total_marks)} / {course.course_name.toUpperCase().substr(0, 25)}</th>))}
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>TOTAL</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}>MAXIMA</th>
                                    <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20 vertical-course' contentEditable style={{ paddingLeft: 15, paddingRight: 5, fontWeight: 'bold', fontSize: 11 }}  >POURCENTAGE</th>
                                </tr>
                            </thead>

                            {classe.data.pupils.map((pupil, index) => {
                                return (
                                    <tbody key={index}>
                                        <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.020)" : "rgba(0,0,0,0.080)" }}>
                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name}</td>

                                            {classe.data.courses.map((course, index) => (
                                                <td className='border border-gray-50 dark:border-gray-20' key={index} style={{ textAlign: 'center', minWidth: 32 }}>
                                                    {render_period_marks(pupil.marks, course.course_id)}
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
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </table>

                        {/* <table>
                            <tbody>
                            {classe.data.courses.map((course, index) => (
                            <tr>
                                <td style={{ }} key={index}>{total_marks(course.total_marks)} / {course.course_name.toUpperCase().substr(0, 25)}</td>
                                <td>{find_echecs(course.course_id)}</td>
                            </tr>
                         ))}
                            </tbody>
                        </table> */}

                        {/* <div>
                            <h4>Nombre d'echecs</h4><br />
                            {classe.data.courses.map((course, index) => (
                                <span style={{}} key={index}>{course.course_name.toUpperCase().substr(0, 25)} <strong>({find_echecs(course.course_id)}), </strong></span>
                            ))}
                        </div> */}
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
