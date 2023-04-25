import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../../global_vars';

let paye = 0;

const SoldeTrimesters = () => {

    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const autres = useSelector(state => state.autres);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const [pupils, setPupils] = useState([]);
    const [total_montant, setTotal_montant] = useState(0);
    const [paye, setPaye] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const loading_footer = useSelector(state => state.loading_footer);
    const [trimester, setTrimester] = useState(1);

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

    const view_pupil = (pupil) => {
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

    // console.log(classe.data.solde1);
    return (
        <div style={{
            marginTop: '30px',
        }}>
            <select
                onChange={(val) => setTrimester(parseInt(val.target.value))}
                style={{
                    color: 'rgba(0, 80, 180)',
                    backgroundColor: 'white',
                    float: 'right',
                    textAlign: 'right',
                    marginBottom: -20
                }}
                value={trimester}
                className="select-no-border-select">
                <option value="1">Insolvables T1</option>
                <option value="2">Insolvables T2</option>
                <option value="3">Insolvables T3</option>
            </select>
            {/* </div> */}

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
                                <table className="full-table-listeeeeee w-full" style={{marginTop: -40}}>
                                    <caption>
                                        <h4 className='font-bold'>
                                            FICHE DES INSOLVABLES T{trimester}<br />
                                            {classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id}
                                        </h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th className='border pt-2 pb-2 border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Nom</th>
                                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Post-nom</th>
                                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Prénom</th>
                                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ textAlign: 'center' }}>Soldes</th>
                                        </tr>
                                    </thead>
                                    {classe.data.pupils.map((pupil, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    {trimester === 1 ?
                                                        parseInt(pupil.soldes_paiements.solde1) !== 0 ?
                                                            <>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde1} </td>
                                                            </>
                                                            : null : null}

                                                    {trimester === 2 ? parseInt(pupil.soldes_paiements.solde2) !== 0 ?
                                                        <>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde2} </td>
                                                        </>

                                                        : null : null}

                                                    {trimester === 3 ? parseInt(pupil.soldes_paiements.solde3) !== 0 ?
                                                        <>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{pupil.soldes_paiements.solde3} </td>
                                                        </>
                                                        : null : null}
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SoldeTrimesters;
