import React from 'react';
import { FaCalendarAlt, FaChartBar, FaExpandArrowsAlt, FaFolder, FaPeopleArrows, FaPeopleCarry, FaSquarespace, FaUsers } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { FcBarChart, FcBriefcase, FcCalendar, FcCollaboration, FcComboChart, FcConferenceCall, FcCurrencyExchange, FcLibrary } from 'react-icons/fc';

export default function MenuHome() {

    const dispatch = useDispatch();
    const url_server = useSelector(state=>state.url_server);
    const annee = useSelector(state=>state.annee);

    const fetch_workers =()=> {
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/fetch_workers.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
dispatch({type:"SET_WORKERS", payload:response.employees});
            })
            .catch((error) => {});
    };

    const fetch_tricks_timetable =()=> {
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/fetch_tricks_timetable.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
dispatch({type:"SET_TRICKS_TIMETABLE", payload:response.tricks_timetable});
            })
            .catch((error) => {});
    };

    const stats_caisse =()=> {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 12 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "État de la caisse" });
    }

    const gestion_personnel =()=> {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 15 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Gestion du personnel" });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });

        fetch_workers();
    }

    const timetable =()=> {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 23 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Horaires" });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });

        fetch_workers();
        fetch_tricks_timetable();
    }

        return (
            <div>
                <div style={{ marginBottom: 40 }} className='menu-home-block'>
                    <div onClick={() => stats_caisse()} className="div-menu-home-circle" style={{ marginRight: 70 }}>
                    <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcCurrencyExchange size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Détails de<br/>la caisse<br/></span>
                    </div>

                    <div className="div-menu-home-circle" style={{ marginRight: 70, textAlign:'center' }}>
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcLibrary size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Bibliothèque<br/><span style={{color:'transparent'}}>.</span></span>
                    </div>

                    <div onClick={() => gestion_personnel()} className="div-menu-home-circle">
                    <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcConferenceCall size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Gestion du<br/>personnel<br/></span>
                    </div>
                </div>

                <div style={{ marginBottom: 40 }} className='menu-home-block'>

                    <div onClick={() => timetable()} className="div-menu-home-circle" style={{ marginRight: 70 }}>
                    <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcCalendar size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Table des<br/> horaires<br/></span>
                    </div>

                    <div className="div-menu-home-circle" style={{ marginRight: 70, textAlign:'center' }}>
                    <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcCollaboration size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Communications,<br/>chat et réunions<br/></span>
                    </div>

                    <div className="div-menu-home-circle">
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><FcBriefcase size={70} /><br /><br /></div>
                        <span style={{ fontSize: 15, fontWeight: '500' }}>Logistique</span>
                    </div>
                </div>
            </div>
        )
}