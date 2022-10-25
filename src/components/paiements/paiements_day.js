import React, { useEffect, useState } from 'react';
import { FiChevronRight, FiPrinter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, find_date2, http } from '../../global_vars';

const PaiementsDay = () => {

    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    const pupils_school = useSelector(state => state.pupils);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const paiements_day = useSelector(state => state.paiements_day);
    const frais_divers_day = useSelector(state => state.frais_divers_day);
    const paiements_day_deleted = useSelector(state => state.paiements_day_deleted);
    const frais_divers_day_deleted = useSelector(state => state.frais_divers_day_deleted);
    const day = useSelector(state => state.day);
    const libelles = useSelector(state => state.libelles);
    const classes = useSelector(state=>state.classes);
    const cycles = useSelector(state=>state.cycles);
    const orders = useSelector(state=>state.orders);
    const class_numbers = useSelector(state=>state.class_numbers);
    let total_paiement = 0;
    let total_frais_divers = 0;
    const [paiements_tab, setPaiements_tab] = useState(0);
    
    for (let i in paiements_day) {
        total_paiement = total_paiement + parseInt(paiements_day[i].montant_paye);
    }

    for (let i in frais_divers_day) {
        total_frais_divers = total_frais_divers + parseInt(frais_divers_day[i].montant);
    }

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

    const find_class_number=(class_id)=> {

        let return_value = "";
        let suffixe = "";

        for (let i in class_numbers) {
            if (class_numbers[i].class_id === class_id) {
                return_value = class_numbers[i].class_number;
                if (return_value === "1") {
                    suffixe = "ère";
                } else {
                    suffixe = "ème";
                }
            }
        }

        return return_value + "" + suffixe;
    }

    const find_class_order=(order)=> {

        let return_value="";
        for (let i in orders) {
            if (orders[i].order_id === order) {
                return_value = orders[i].order_name;
            }
        }

        return return_value;
    }

    const find_cycle=(cycle)=> {

        let return_value = "";
        for (let i in cycles) {
            if (cycles[i].cycle_id === cycle) {
                return_value = cycles[i].cycle_name;
            }
        }

        return return_value;
    }

    const find_pupil_data=(pupil_id)=> {

        let return_value = null;
        for (let i in pupils_school) {
            if (pupils_school[i].pupil.pupil_id === pupil_id) {
                return_value = pupils_school[i];
            }
        }

        return return_value;
    }

    return (
        <div style={{ marginBottom: 50, paddingTop: 0 }}>

            <div onClick={() => printContent("total-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7 }}>
                <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
            </div>
            <div id="total-day" style={{ marginTop: 30 }}>
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
            </div><br />

            <div onClick={() => setPaiements_tab(1)} style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronRight /> Fiche journalière détaillée des frais scolaires</span>
            </div><br/>
            <div onClick={() => setPaiements_tab(2)} style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronRight /> Fiche journalière détaillée des frais divers</span>
            </div><br/>
            <div onClick={() => setPaiements_tab(3)} style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronRight /> Rapport journalier De paiement</span>
            </div><br/>
            <div onClick={() => setPaiements_tab(4)} style={{ fontWeight: 'bold' }}>
                <span className="add-minus"><FiChevronRight /> Corbeille</span>
            </div><br/>

            {paiements_tab === 1 ?
                <div>
                    <div onClick={() => printContent("paiements-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 30 }}>
                        <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div>
                    <div id="paiements-day">
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
                                                <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                    DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS SCOLAIRES<br />
                                                    Journée du {find_date2(day)}
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {paiements_day.map((paiement, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
                                                {/* total_paiement = total_paiement + parseInt(paiement.montant_paye); */ }
                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                            <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_cycle(paiement.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
                                                            <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                            <tfoot>
                                                <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                                    <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                    <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_paiement}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div> : null}

            {paiements_tab === 2 ?
                <div>
                    <div onClick={() => printContent("frais-divers-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7, marginTop: 30 }}>
                        <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div>

                    <div id="frais-divers-day">
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
                                                <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                    DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS DIVERS<br />
                                                    Journée du {find_date2(day)}
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                    {/* <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th> */}
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {frais_divers_day.map((frais_divers, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);
                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                            <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
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
                                                                <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total payé {libelle.description_libelle}</td>
                                                                <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais}</strong></td>
                                                            </tr>
                                                        )
                                                    }

                                                })}
                                                <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                                    <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                    <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais_divers}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div><br /><br /><br />
                </div>
                : null}

            {paiements_tab === 3 ?
                <div>
                    <div onClick={() => printContent("repport-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 30 }}>
                        <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div>
                    <div id="repport-day">
                        <div>
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
                                                    <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                        RAPPORT JOURNALIER TOTAL DE CAISSE<br />
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
                        </div><br /><br /><br />


                        <div>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <table className="full-table-liste">
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'center' }}>
                                                        DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS SCOLAIRES<br />
                                                        {/* Journée du {find_date2(day)} */}
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                        {/* <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Prénom</th> */}
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                {paiements_day.map((paiement, index) => {
                                                    const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                    const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
                                                    
                                                        return (
                                                        <tbody key={index}>
                                                            <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                                {/* <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_pupil_data(paiement.pupil_id).pupil.first_name.toUpperCase()} {find_pupil_data(paiement.pupil_id).pupil.second_name.toUpperCase()} {find_pupil_data(paiement.pupil_id).pupil.last_name.toUpperCase()}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_class_number(find_pupil_data(paiement.pupil_id).pupil.class_school)} {find_cycle(find_pupil_data(paiement.pupil_id).pupil.cycle_school)} {find_class_order(find_pupil_data(paiement.pupil_id).pupil.class_order)}</td>
                                                                <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                                <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td> */}

                                                                <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_cycle(paiement.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
                                                            <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                            </tr>
                                                        </tbody>
                                                        )
                                                })}
                                                <tfoot>
                                                    <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                                        <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                        <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_paiement}</strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br /><br /><br />

                        <div>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <table className="full-table-liste">
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'center' }}>
                                                        DÉTAILLÉ DU RAPPORT JOURNALIER DE PAIEMENT DES FRAIS DIVERS<br />
                                                        {/* Journée du {find_date2(day)} */}
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                {frais_divers_day.map((frais_divers, index) => {
                                                    const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                    const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);
return (
                                                        <tbody key={index}>
                                                            <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                                {/* <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_pupil_data(frais_divers.pupil_id).pupil.first_name.toUpperCase()} {find_pupil_data(frais_divers.pupil_id).pupil.second_name.toUpperCase()} {find_pupil_data(frais_divers.pupil_id).pupil.last_name.toUpperCase()}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_class_number(find_pupil_data(frais_divers.pupil_id).pupil.class_school)} {find_cycle(find_pupil_data(frais_divers.pupil_id).pupil.cycle_school)} {find_class_order(find_pupil_data(frais_divers.pupil_id).pupil.class_order)}</td>
                                                                <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                                <td style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td> */}

                                                                <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
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
                                                                    <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total payé {libelle.description_libelle}</td>
                                                                    <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais}</strong></td>
                                                                </tr>
                                                            )
                                                        }

                                                    })}
                                                    <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.2)' }}>
                                                        <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                        <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais_divers}</strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><br /><br /><br />
                    </div>
                </div>
                : null}

                {paiements_tab === 4 ?
                <div>
                    <div onClick={() => printContent("corbeille-day")} style={{ fontWeight: 'bold', float: 'right', paddingTop: 30 }}>
                        <span className="add-minus"><FiPrinter /> IMPRIMER LA FICHE</span>
                    </div>
                    <div id="corbeille-day">
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
                                                <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                    DÉTAILLÉ DE LA CORBEILLE (FRAIS SCOLAIRES)<br />
                                                    Journée du {find_date2(day)}
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {paiements_day_deleted.map((paiement, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                            {/* <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_pupil_data(paiement.pupil_id).pupil.first_name.toUpperCase()} {find_pupil_data(paiement.pupil_id).pupil.second_name.toUpperCase()} {find_pupil_data(paiement.pupil_id).pupil.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(find_pupil_data(paiement.pupil_id).pupil.class_school)} {find_cycle(find_pupil_data(paiement.pupil_id).pupil.cycle_school)} {find_class_order(find_pupil_data(paiement.pupil_id).pupil.class_order)}</td>
                                                            <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td> */}

                                                            <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_cycle(paiement.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
                                                            <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table><br/><br/><br/>

                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <table className="full-table-liste">
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'center' }}>
                                                        DÉTAILLÉ DE LA CORBEILLE (FRAIS DIVERS)<br />
                                                        Journée du {find_date2(day)}
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} rowSpan={2}>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Noms de l'élève</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Classe</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} rowSpan={2}>Motif de paiement</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} rowSpan={2}>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                {frais_divers_day_deleted.map((frais_divers, index) => {
                                                    const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                    const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);

return (
                                                        <tbody key={index}>
                                                            <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                                {/* <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_pupil_data(frais_divers.pupil_id).pupil.first_name.toUpperCase()} {find_pupil_data(frais_divers.pupil_id).pupil.second_name.toUpperCase()} {find_pupil_data(frais_divers.pupil_id).pupil.last_name.toUpperCase()}</td>
                                                                <td style={{ paddingLeft: 10 }}>{find_class_number(find_pupil_data(frais_divers.pupil_id).pupil.class_school)} {find_cycle(find_pupil_data(frais_divers.pupil_id).pupil.cycle_school)} {find_class_order(find_pupil_data(frais_divers.pupil_id).pupil.class_order)}</td>
                                                                <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                                <td style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td> */}

                                                                <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                            <td style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                            {/* <td style={{ paddingLeft: 10 }}></td> */}
                                                            <td style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                    
                                                })}
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table><br /><br /><br />

                    </div>
                </div> : null}
        </div>
    )
}

export default PaiementsDay;
