import { CircularProgress } from "@material-ui/core";
import { FcFolder, FcOpenedFolder } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { http } from "../global_vars";
import { useState } from 'react';
import Selections from "./selections";
import HeaderMenuLeft from "./header_menu_left";

const Classes = (props) => {

    const classes = useSelector(state => state.classes);
    const is_loading_home = useSelector(state => state.is_loading_home);
    const dispatch = useDispatch();
    const middle_func = useSelector(state => state.middle_func);
    const url_server = useSelector(state => state.url_server);
    const class_open = useSelector(state => state.class_open);
    const [class_loading, setClass_loading] = useState(null);
    const classe = useSelector(state => state.classe);
    const classes_selected = useSelector(state => state.classes_selected);
    const selections = useSelector(state => state.selections);

    const color_body = (number) => {
        if (number <= 25) {
            return 'green';
        } else if (number >= 26 && number <= 40) {
            return 'rgb(0, 80, 180)';
        } else if (number > 40 && number <= 50) {
            return 'rgb(160, 160, 0)';
        } else if (number >= 51 && number <= 69) {
            return 'rgb(166, 83, 0)';
        } else {
            return 'rgb(128, 0, 0)';
        }
    }

    const open_classe = (classe) => {
        if (props.type === 1) {
            setClass_loading(parseInt(classe.id_classes));
            dispatch({ type: "SET_LOADING_FOOTER", payload: true });
            dispatch({ type: "SET_CLASSE", payload: classe });
            dispatch({ type: "SET_CLASSE_OPEN", payload: true });
            dispatch({ type: "SET_COURSE_TIMETABLE_CONFIG", payload: null });
            dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
            dispatch({ type: "SET_ECHECS", payload: [] });

            if (middle_func === 23) {
                dispatch({ type: "SET_TITLE_MAIN", payload: "Horaires" });
                dispatch({ type: "SET_COURSE", payload: classe.courses[0] });
            } else if (middle_func === 22) {
                dispatch({ type: "SET_TITLE_MAIN", payload: "Configuration des horaires " + classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id });
            } else {
                dispatch({ type: "SET_TITLE_MAIN", payload: classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id });
            }

            if (middle_func !== 2) {
                dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
            }

            if (middle_func === 15 || middle_func === 16 || middle_func === 17 || middle_func === 0 || middle_func === 30 || middle_func === 13) {
                dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
            }

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_class_info.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    cycle_id: classe.cycle,
                    class_id: classe.class,
                    order_id: classe.order,
                    section_id: classe.section,
                    option_id: classe.option,
                    school_year: classe.school_year,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    classe.data = response;

                    // console.log(response);
                    dispatch({ type: "SET_CLASSE", payload: classe });
                    dispatch({ type: "SET_LOADING_FOOTER", payload: false });

                    if (middle_func !== 0) {

                        if (middle_func === 0 || middle_func === 4 || middle_func === 6 || middle_func === 11 || middle_func === 12) {
                            dispatch({ type: "SET_MIDDLE_FUNC", payload: 1 });
                            dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });
                        }

                        if (middle_func === 0) {
                            dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
                        }

                        dispatch({ type: "SET_MARKS_MODIFIED", payload: false });

                    } else {
                        dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                    }

                    setClass_loading(parseInt(null));
                }).catch((error) => {
                    // console.log(error);
                    setClass_loading(parseInt(null));
                    dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                });
        } else if (props.type === 2) {
            if (classes_selected.find(element => element === classe.id_classes) === undefined) {
                dispatch({ type: "SET_CLASSES_SELECTED", payload: [...classes_selected, classe.id_classes] });
            } else {
                dispatch({ type: 'SET_CLASSES_SELECTED', payload: classes_selected.filter(element => element !== (classe.id_classes)) });
            }
        } else if (props.type === 1) {
            if (classes_selected.find(element => element === classe.id_classes) === undefined) {
                dispatch({ type: "SET_CLASSES_SELECTED", payload: [...classes_selected, classe.id_classes] });
            } else {
                dispatch({ type: 'SET_CLASSES_SELECTED', payload: classes_selected.filter(element => element !== (classe.id_classes)) });
            }
        }
        else {

        }
    }

    const show_timetable_hours=()=>{

        if(middle_func === 22 || middle_func === 23) {
            return true;
        }

        return false;
    }

    return (
        <div className="flex bg-transparent-20 rounded-xl">
            <div className="fixed top-0 left-0 bottom-0 bg-background-100 border border-gray-50 dark:border-gray-20 dark:bg-background-20 textcenter w-16 content-centershadow-xl items-center rounded-l-lg hover:scale-100 hover:w-17 duration-300">
                <HeaderMenuLeft />
            </div>

            {is_loading_home ?
                <div className="progress-center">
                    <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                    Chargement des données...
                </div>
                :
                <div className={`flex-auto ${props.type === 1 ? "ml-16" : ""}`}>

                    {/* <Selections /> */}

                    {classes.map((classee, index) => {
                        // console.log('Rendered classes')
                        return (
                            <div key={index}
                                onClick={() => { if (props.type === 1) { open_classe(classee) } }}
                                className={`classes-div ${classe.id_classes === classee.id_classes ? class_open ? props.type === 1 ? "classes-div-selected" : "" : "" : ""} flex items-center pl-3 pr-5 w-full`}>
                                <div className="w-18">
                                    <div className="border-gray-50 dark:border-gray-20 border mr-3 w-14  h-14 rounded-full flex justify-center items-center">
                                        {props.type === 2 ?
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    style={{ width: 25, height: 25 }}
                                                    onClick={() => open_classe(classee)}
                                                />
                                            </div> : null}

                                        {props.type === 3 ?
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    style={{ width: 25, height: 25 }}
                                                    onClick={() => open_classe(classee)}
                                                />
                                            </div> : null}

                                        {props.type === 1 ? class_loading === classee.id_classes ? <CircularProgress size={20} /> :
                                            classe.id_classes === classee.id_classes ? <FcOpenedFolder color="orange" size={25} /> : <FcFolder color="orange" size={25} />
                                            : null}
                                    </div>
                                </div>
                                <div className="border-b border-gray-50 dark:border-gray-20 w-full pt-4 pb-4">
                                    <strong>{classee.class_id} {classee.section_id} {classee.order_id}</strong>
                                    {!show_timetable_hours() ? <span style={{ backgroundColor: color_body(classee.pupils_count), color: 'white', paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, marginTop: -5 }} className="float-class-pupils">{classee.pupils_count}</span>
                                    :
                                    <span style={{ backgroundColor: color_body(classee.pupils_count), color: 'white', paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, marginTop: -5 }} className="float-class-pupils">{classee.timetable_hours}</span>}
                                    <br />
                                    <span style={{ fontSize: 12 }} className="text-gray-100">{(classee.cycle_id + "").toUpperCase()}</span>
                                    <span className="float-class-pupils text-gray-100">
                                        Garcons : {classee.pupils_count_male} |
                                        Filles : {classee.pupils_count_female}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Classes;
