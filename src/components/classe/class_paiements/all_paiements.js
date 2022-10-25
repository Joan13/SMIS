import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import {useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../../global_vars';

let paye = 0;

const AllClassPaiements =()=> {
    
    const dispatch = useDispatch();
    const classe = useSelector(state=>state.classe);
    const autres = useSelector(state=>state.autres);
    const url_server = useSelector(state=>state.url_server);
    const annee_scolaire = useSelector(state=>state.annee_scolaire);
    const [pupils, setPupils] = useState([]);
    const [total_montant, setTotal_montant] = useState(0);
    const [paye, setPaye] = useState(0);
    const [percentage,setPercentage] = useState(0);
    const loading_footer = useSelector(state=>state.loading_footer);

    const find_pupil = (pupil) => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => { });
    };

    const view_pupil=(pupil) =>{
        dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
        dispatch({ type: "SET_PUPIL", payload: pupil });
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 11 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        dispatch({ type: "SET_TITLE_MAIN", payload: (pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name).toUpperCase() });

        find_pupil(pupil.pupil.pupil_id);
    }

    useEffect(()=>{
console.log(classe);
    },[]);
        return (
                <div id="class-paiements">
                    <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top">
                                    <div>
                                        <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                        <strong>{autres.school_bp}</strong><br />
                                        <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                    </div>
                                    <table className="full-table-liste">
                                        <caption>
                                            <h4>
                                                FICHE DES PAIEMENTS<br />
                                                {classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Post-nom</th>
                                                <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th>
                                                <th style={{ textAlign: 'center' }} colSpan={3}>Soldes</th>
                                            </tr>
                                            <tr>
                                                <th style={{ width: 50, textAlign: 'center' }}>T1</th>
                                                <th style={{ width: 50, textAlign: 'center' }}>T2</th>
                                                <th style={{ width: 50, textAlign: 'center' }}>T3</th>
                                            </tr>
                                        </thead>
                                        {classe.data.pupils.map((pupil, index) => {
                                            return (
                                                <tbody key={index}>
                                                    <tr 
                                                    onClick={() => view_pupil(pupil)}
                                                    >
                                                        <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                        <td style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde1} </td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde2}</td>
                                                        <td style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde3}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                        <tfoot>
                                            <tr>
                                                <td colSpan={7} style={{ paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'right', paddingRight: 20 }}>
                                                Montant total payé 
                                                <strong style={{ color: 'rgb(0,80,180)', fontSize: 20 }}> {classe.data.paye_paiements} </strong> 
                                                sur 
                                                <strong style={{ color: 'rgb(0,80,180)', fontSize: 20 }}> {classe.data.total_paiements} </strong> 
                                                soit 
                                                <strong style={{ color: 'rgb(0,80,180)', fontSize: 20 }}> {((classe.data.paye_paiements*100)/classe.data.total_paiements).toString().substr(0,5)} </strong> 
                                                %</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        )
    }

export default AllClassPaiements;
