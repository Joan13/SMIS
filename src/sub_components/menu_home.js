import React from 'react';
import { FaCalendarAlt, FaChartBar, FaFolder, FaPeopleArrows, FaPeopleCarry, FaSquarespace, FaUsers } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { connect, useDispatch } from 'react-redux';
import { mapStateToProps } from '../store/state_props';

export default function MenuHome() {

    const dispatch = useDispatch();

    const stats_caisse =()=> {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 12 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "État de la caisse" });
    }

    const gestion_personnel =()=> {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 15 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Gestion du personnel" });
    }

        return (
            <div>
                <div style={{ marginBottom: 40 }} className='menu-home-block'>
                    <div onClick={() => stats_caisse()} className="div-menu-home-circle" style={{ marginRight: 70 }}>
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaChartBar size={50} color="rgb(0, 80, 180)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Détails de <br/>la caisse</strong>
                    </div>

                    <div className="div-menu-home-circle" style={{ marginRight: 70, textAlign:'center' }}>
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaFolder size={50} color="orange" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Dossiers école<br/><span style={{color:'transparent'}}>.</span></strong>
                    </div>

                    <div onClick={() => gestion_personnel()} className="div-menu-home-circle">
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaUsers size={50} color="rgb(3, 108, 5)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Gestion du <br/>personnel</strong>
                    </div>
                </div>

                <div style={{ marginBottom: 40 }} className='menu-home-block'>

                    <div className="div-menu-home-circle" style={{ marginRight: 70 }}>
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaCalendarAlt size={50} color="rgb(200, 80, 80)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Horaires</strong>
                    </div>

                    <div className="div-menu-home-circle" style={{ marginRight: 70, textAlign:'center' }}>
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaFolder size={50} color="orange" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Dossiers école<br/><span style={{color:'transparent'}}>.</span></strong>
                    </div>

                    <div className="div-menu-home-circle">
                        <div style={{ width: '100%', height: 120 }}><br /><br /><br /><br /><FaUsers size={50} color="rgb(3, 108, 5)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Gestion du <br/>personnel</strong>
                    </div>
                </div>
            </div>
        )
}