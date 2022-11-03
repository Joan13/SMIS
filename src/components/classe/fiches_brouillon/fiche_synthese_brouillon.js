import React from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { home_redirect, http } from '../../../global_vars';

const FicheSynthesePointsBrouillon =()=> {
const classe = useSelector(state=>state.classe);
const autres = useSelector(state => state.autres);
const annee_scolaire = useSelector(state => state.annee_scolaire);
const url_server = useSelector(state=>state.url_server);

const printContent=(divName)=> {

    let printContents = document.getElementById(divName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
    window.location.href = http + url_server + home_redirect;
    window.location.replace(http + url_server + home_redirect);
}

   
        return (
            <div style={{ marginBottom: 50, paddingTop: 0, marginRight:10 }}>

                
                    <div onClick={() => printContent("fiche-points-brouillon")} style={{ display: 'block', fontWeight: 'bold', float: 'right', marginBottom: -50, paddingTop: 3 }}>
                        <span className="add-minus" style={{ marginRight: 3 }}><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div>

                <div id="fiche-points-brouillon" style={{ marginTop: 0 }}>
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <div>
                                        <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                        <strong>{autres.school_bp}</strong><br />
                                        <strong>ANNÉE SCOLAIRE : {annee_scolaire.year_name}</strong><br/>
                                        <strong>COURS:</strong> ......................................................<br />
                                        <strong>TITULAIRE/COURS: </strong>...................................<br /><br/>
                                    </div>

                                    <table className="full-table-liste" style={{marginTop:0}}>
                                        <caption>
                                            <h4>
                                                FICHE SYNTHÉSE BROUILLON DES POINTS<br />
                                                {classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th rowSpan={2} style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th rowSpan={2} style={{ paddingLeft: 10, textAlign: 'left' }}>Noms de l'élève</th>
                                                <th rowSpan={2} valign="bottom" style={{ paddingLeft: 10, textAlign: 'left',width:40,paddingBottom:5 }}>MAX</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>P1</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>P2</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>Ex1</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>S1</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>P3</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>P4</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>EX2</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>S2</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left',width:40 }}>TOT</th>
                                            </tr>
                                            <tr>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            <td style={{ textAlign:'center' }}></td>
                                            </tr>
                                        </thead>
                                        {classe.pupils.map((pupil, index) => (
                                            <tbody key={index}>
                                                <tr onClick={() => this.find_pupil(pupil)}>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name.toUpperCase()}</td>
                                                    <td style={{ textAlign:'center', backgroundColor:"rgba(0,80,180,0.3)" }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                    <td style={{ textAlign:'center' }}></td>
                                                </tr>
                                            </tbody>
                                        )
                                        )}
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        )
}

export default FicheSynthesePointsBrouillon;