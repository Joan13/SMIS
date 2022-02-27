import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/state_props';

class ClassOverView extends React.Component {
    render() {
        return (
            <div style={{ paddingTop: 20 }}>
                <table className="table-graphics">
                    <tbody>
                        <tr>
                            <td valign="bottom" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: 50 }}>
                                {this.props.classe.pupils.map((pupil, index) => {
                                    if (pupil.pupil.gender === "0") {
                                        return (<div key={index} style={{ height: 2, backgroundColor: "rgb(120, 25, 100)", color: 'transparent' }}>ooooooo</div>)
                                    } else {
                                        return (<div key={index} style={{ height: 0, backgroundColor: "rgba(0, 0, 0, 0.05)", color: 'transparent' }}>ooooooo</div>)
                                    }
                                })}
                            </td>
                            <td valign="bottom" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: 50 }}>
                                {this.props.classe.pupils.map((pupil, index) => {
                                    if (pupil.pupil.gender === "1") {
                                        return (<div key={index} style={{ height: 2, backgroundColor: "rgb(250, 105, 0)", color: 'transparent' }}>ooooooo</div>)
                                    } else {
                                        return (<div key={index} style={{ height: 0, backgroundColor: "rgba(0, 0, 0, 0.05)", color: 'transparent' }}>ooooooo</div>)
                                    }
                                })}
                            </td>
                            <td>
                                <div className="graphics-summary-right">
                                    <span className="border-bottom">
                                        Cycle : <strong>{this.props.classe.cycle_id}</strong>
                                    </span>
                                    <span>
                                        Nombre des élève : <strong>{this.props.classe.pupils_count}</strong>
                                    </span>
                                    <span>
                                        Garçons : <strong>{this.props.classe.pupils_count_male}</strong>
                                    </span>
                                    <span>
                                        Filles : <strong>{this.props.classe.pupils_count_female}</strong>
                                    </span>
                                    <span>
                                        Nombre des cours : <strong>{this.props.classe.courses_count}</strong>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style={{ fontSize: 10, textAlign: 'center' }}>Filles</td>
                            <td style={{ fontSize: 10, textAlign: 'center' }}>Garçons</td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        )
    }
}

export default connect(mapStateToProps)(ClassOverView);