import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';

class ClassOverView extends React.Component {
    render() {
        return (
            <div>
                {!this.props.loadding_footer ?
                    <div style={{ paddingTop: 20 }}>
                        <table className="table-graphics">
                            <tbody>
                                <tr>
                                    <td valign="bottom" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: 50 }}>
                                        {this.props.classe.pupils.map((pupil, index) => {
                                            if (parseInt(pupil.pupil.gender) === 0) {
                                                return (<div key={index} style={{ height: 2, backgroundColor: "rgb(120, 25, 100)", color: 'transparent' }}>ooooooo</div>)
                                            } else {
                                                return (<div key={index} style={{ height: 0, backgroundColor: "rgba(0, 0, 0, 0.05)", color: 'transparent' }}>ooooooo</div>)
                                            }
                                        })}
                                    </td>
                                    <td valign="bottom" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", width: 50 }}>
                                        {this.props.classe.pupils.map((pupil, index) => {
                                            if (parseInt(pupil.pupil.gender) === 1) {
                                                return (<div key={index} style={{ height: 2, backgroundColor: "rgb(250, 105, 0)", color: 'transparent' }}>ooooooo</div>)
                                            } else {
                                                return (<div key={index} style={{ height: 0, backgroundColor: "rgba(0, 0, 0, 0.05)", color: 'transparent' }}>ooooooo</div>)
                                            }
                                        })}
                                    </td>
                                    <td>
                                        <div className="text-right mr-5">
                                            <div className="border-b mb-3 ml-10 pb-4 border-background-50 dark:border-gray-20">
                                                <span className='text-gray-100'>Cycle :</span> <strong>{this.props.classe.cycle_id}</strong>
                                            </div>
                                            <div>
                                                <span className='text-gray-100'>Nombre des élève :</span> <strong>{this.props.classe.pupils_count}</strong>
                                            </div>
                                            <div>
                                                <span className='text-gray-100'>Garçons :</span> <strong>{this.props.classe.pupils_count_male}</strong>
                                            </div>
                                            <div>
                                                <span className='text-gray-100'>Filles :</span> <strong>{this.props.classe.pupils_count_female}</strong>
                                            </div>
                                            <div>
                                                <span className='text-gray-100'>Nombre de cours :</span> <strong>{this.props.classe.courses_count}</strong>
                                            </div>
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
                    :
                    <div style={{ textAlign: 'center' }}>
                        <CircularProgress style={{ color: 'rgb(0, 80, 180)', width: 20, height: 20 }} />
                    </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(ClassOverView);