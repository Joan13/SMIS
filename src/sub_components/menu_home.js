import React from 'react';
import { FaCalendarAlt, FaChartBar, FaFolder, FaSquarespace } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/state_props';

class MenuHome extends React.Component {

    stats_caisse() {
        this.props.dispatch({ type: "SET_MIDDLE_FUNC", payload: 12 });
        this.props.dispatch({ type: "SET_TITLE_MAIN", payload: "État de la caisse" });
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: 40 }}>
                    <div onClick={() => this.stats_caisse()} className="div-menu-home-circle" style={{ marginRight: 70 }}>
                        <div style={{ width: 110, height: 120 }}><br /><br /><br /><br /><FaChartBar size={50} color="rgb(0, 80, 180)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Détails caisse</strong>
                    </div>

                    <div className="div-menu-home-circle" style={{ marginRight: 70 }}>
                        <div style={{ width: 110, height: 120 }}><br /><br /><br /><br /><FaFolder size={50} color="orange" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Dossiers école</strong>
                    </div>

                    <div className="div-menu-home-circle">
                        <div style={{ width: 110, height: 120 }}><br /><br /><br /><br /><FaSquarespace size={50} color="rgb(3, 108, 5)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Bulletins</strong>
                    </div>
                </div>

                <div style={{ marginBottom: 40 }}>

                    <div className="div-menu-home-circle" style={{ marginRight: 70 }}>
                        <div style={{ width: 110, height: 120 }}><br /><br /><br /><br /><FaCalendarAlt size={50} color="rgb(200, 80, 80)" /><br /></div>
                        <strong style={{ fontSize: 15 }}>Horaires</strong>
                    </div>

                    {/* <div className="div-menu-home-circle" style={{marginRight:70}}>
                <div style={{width:130,height:130}}><br/><br/><br/><br/><FaChartBar size={50} color="rgb(0, 80, 180)"/><br/></div>
<strong style={{fontSize:15}}>Détails caisse</strong>
                </div>

                <div className="div-menu-home-circle">
                <div style={{width:130,height:130}}><br/><br/><br/><br/><FaChartBar size={50} color="rgb(0, 80, 180)"/><br/></div>
<strong style={{fontSize:15}}>Détails caisse</strong>
                </div> */}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(MenuHome);