import React, { useEffect } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { connect, useDispatch, useSelector } from 'react-redux';
import { home_redirect, find_date2 } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';

const PaiementsDay = () => {

    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    const pupils_school = useSelector(state => state.pupils_school);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const paiements_day = useSelector(state => state.paiements_day);
    const frais_divers_day = useSelector(state => state.frais_divers_day);
    const day = useSelector(state => state.day);
    const libelles = useSelector(state => state.libelles);
    let total_paiement = 0;
    let total_frais_divers = 0;

    useEffect(() => {

    }, []);

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = "http://" + url_server + home_redirect;
        window.location.replace("http://" + url_server + home_redirect);
    }

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
    }

    return (
        <div style={{ marginBottom: 50, paddingTop: 0 }}>

            <div onClick={() => printContent("paiements-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7 }}>
                <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
            </div>
            <div id="paiements-day">
                <table style={{ width: '98%' }}>
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
                                        <h4 style={{ float: 'right', textAlign: 'right' }}>
                                            DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS SCOLAIRES<br />
                                            Journée du {find_date2(day)}
                                        </h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Post-nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                        </tr>
                                    </thead>
                                    {paiements_day.map((paiement, index) => {
                                        const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                        const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
                                        total_paiement = total_paiement + parseInt(paiement.montant_paye);
                                        return (
                                            <tbody key={index}>
                                                <tr onClick={() => view_pupil(pupil[0])}>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.first_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.second_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.last_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                    <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                    <tfoot>
                                        <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                            <td colSpan={5} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_paiement}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div onClick={() => printContent("frais-divers-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7, marginTop: 70 }}>
                <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
            </div>
            <div id="frais-divers-day">
                <table style={{ width: '98%' }}>
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
                                        <h4 style={{ float: 'right', textAlign: 'right' }}>
                                            DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS DIVERS<br />
                                            Journée du {find_date2(day)}
                                        </h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Post-nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                        </tr>
                                    </thead>
                                    {frais_divers_day.map((frais_divers, index) => {
                                        const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                        const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);
                                        total_frais_divers = total_frais_divers + parseInt(frais_divers.montant);
                                        return (
                                            <tbody key={index}>
                                                <tr onClick={() => view_pupil(pupil[0])}>
                                                    <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.first_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.second_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{pupil[0].pupil.last_name.toUpperCase()}</td>
                                                    <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                    <td style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                    <tfoot>
                                        {libelles.map((libelle, index) => {
                                            let total_frais = 0;
                                            {/* const frais_divers_day = libelles.filter(libellle=>libellle.libelle_id === libelle.libelle_id); */ }

                                            for (let i in frais_divers_day) {
                                                if (frais_divers_day[i].libelle === libelle.libelle_id) {
                                                    total_frais = total_frais + parseInt(frais_divers_day[i].montant);
                                                }
                                            }

                                            if (total_frais !== 0) {
                                                return (
                                                    <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                                        <td colSpan={5} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total payé {libelle.description_libelle}</td>
                                                        <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais}</strong></td>
                                                    </tr>
                                                )
                                            }

                                        })}
                                        <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                            <td colSpan={5} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                            <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais_divers}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div><br/><br/><br/>

            <div onClick={() => printContent("total-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7 }}>
                <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
            </div>
            <div id="total-day" style={{marginTop:30}}>
                <table style={{ width: '98%' }}>
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
                                        <h4 style={{ float: 'right', textAlign: 'right' }}>
                                            TOTAL FRAIS JOURNALIERS<br />
                                            Journée du {find_date2(day)}
                                        </h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Libellé</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: 30, textAlign: 'center' }}>1</td>
                                            <td style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais scolaires</td>
                                            <td style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement}</strong></td>
                                        </tr>
                                        <tr>
                                            <td style={{ width: 30, textAlign: 'center' }}>2</td>
                                            <td style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais divers</td>
                                            <td style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_frais_divers}</strong></td>
                                        </tr>
                                        <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                            <td colSpan={2} style={{ padding: 15, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>TOTAL JOURNALIER</td>
                                            <td style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement + total_frais_divers}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaiementsDay;
