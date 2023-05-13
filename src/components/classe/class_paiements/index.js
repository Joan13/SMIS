import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../../global_vars';
import All_paiements_pupil from '../../paiements/all_paiements_pupil';
import AllClassPaiements from './all_paiements';
import SoldeTrimesters from './soldes_trimesters';
import PrintDocument from '../../includes/print';

let paye = 0;

const PaiementsClasse = () => {

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
    const [paiements_tab, setpaiements_tab] = useState(0);

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

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
    return (
        <div style={{ marginBottom: 50, paddingTop: 0 }}>
            {loading_footer ?
                <div className="progress-center-progress">
                    <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                    Chargement de la fiche des paiements...
                </div>
                :
                <div>
                    <div style={{ float: 'right' }}>
                        <PrintDocument div={"class-paiements"} /><br />

                        {paiements_tab === 0 ?
                            <div style={{ float: 'right', marginTop: 10, cursor: 'pointer' }} className='text-primary-50' onClick={() => setpaiements_tab(1)}>FILTRER LES FICHES</div>
                            :
                            <div style={{ float: 'right', marginTop: 10, cursor: 'pointer' }} className='text-primary-50' onClick={() => setpaiements_tab(0)}>VOIR TOUTES LES PAIEMENTS</div>}
                    </div>
                    {paiements_tab === 0 ? <AllClassPaiements /> : <SoldeTrimesters />}
                </div>}
        </div>
    )
}

export default PaiementsClasse;
