import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { find_date2, http, format_date, generateMonth } from '../../global_vars';
import PrintDocument from '../includes/print';
import { CircularProgress } from '@material-ui/core';

const PaiementsMonth = () => {
    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    const pupils_school = useSelector(state => state.pupils);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const paiements_day = useSelector(state => state.paiements_month);
    const frais_divers_day = useSelector(state => state.frais_divers_month);
    const paiements_day_deleted = useSelector(state => state.paiements_month_deleted);
    const frais_divers_day_deleted = useSelector(state => state.frais_divers_month_deleted);
    const selections = useSelector(state=>state.selections);
    const libelles = useSelector(state => state.libelles);
    const classes = useSelector(state => state.classes_selected);
    const classess = useSelector(state=>state.classes);
    const [loading_stats_day, setLoading_stats_day] = useState(false);
    const cycles = useSelector(state => state.cycles);
    const orders = useSelector(state => state.orders);
    const class_numbers = useSelector(state => state.class_numbers);
    const [paiements_tab, setPaiements_tab] = useState(3);
    const month = useSelector(state=>state.month_caisse);
    const makuta_day = useSelector(state => state.makuta_month);
    let total_paiement = 0;
    let total_frais_divers = 0;

    for (let i in paiements_day) {
        total_paiement = total_paiement + parseInt(paiements_day[i].montant_paye);
    }

    for (let i in frais_divers_day) {
        total_frais_divers = total_frais_divers + parseInt(frais_divers_day[i].montant);
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

    const find_class_number = (class_id) => {

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

    const find_class_order = (order) => {

        let return_value = "";
        for (let i in orders) {
            if (orders[i].order_id === order) {
                return_value = orders[i].order_name;
            }
        }

        return return_value;
    }

    const find_cycle = (cycle) => {

        let return_value = "";
        for (let i in cycles) {
            if (cycles[i].cycle_id === cycle) {
                return_value = cycles[i].cycle_name;
            }
        }

        return return_value;
    }

    const find_pupil_data = (pupil_id) => {

        let return_value = null;
        for (let i in pupils_school) {
            if (pupils_school[i].pupil.pupil_id === pupil_id) {
                return_value = pupils_school[i];
            }
        }

        return return_value;
    }

    const generate_stats = (monthh, cl) => {

        setLoading_stats_day(true);

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/stats_month_caisse.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee_scolaire.year_id,
                month: monthh,
                classes: cl
            })
        })
            .then((response) => response.json())
            .then((response) => {

                setLoading_stats_day(false);
                dispatch({ type: "SET_MONTH_CAISSE", payload: response.month });
                dispatch({ type: "SET_PAIEMENTS_MONTH", payload: response.paiements });
                dispatch({ type: "SET_MAKUTA_MONTH", payload: response.paiements_day });
                dispatch({ type: "SET_FRAIS_DIVERS_MONTH", payload: response.frais_divers });
                dispatch({ type: "SET_PAIEMENTS_MONTH_DELETED", payload: response.paiements_deleted });
                dispatch({ type: "SET_FRAIS_DIVERS_MONTH_DELETED", payload: response.frais_divers_deleted });

                // console.log(response);
            })
            .catch((error) => {
                setLoading_stats_day(false);
            });
    }

    useEffect(() => {

        let classesss = [];
        for (let i in classess) {
            classesss.push(classess[i].id_classes);
        }

        dispatch({ type: "SET_CLASSES_SELECTED", payload: classesss });

        // let date = new Date();
        // let day = "";
        // let month = "";
        // if ((date.getDate().toString()).length === 1) {
        //     day = "0" + date.getDate();
        // } else {
        //     day = date.getDate();
        // }

        // if ((parseInt(date.getMonth() + 1).toString()).length === 1) {
        //     month = "0" + parseInt(date.getMonth() + 1);
        // } else {
        //     month = date.getMonth() + 1;
        // }
        // generate_day_stats(date.getFullYear() + "/" + month + "/" + day);
    }, []);

    return (
        <div style={{ marginBottom: 50, paddingTop: 0 }}>

            <div className='flex items-center mt-3 pt-3 mb-10 border-b border-gray-50 dark:border-gray-20'>
                <div onClick={() => setPaiements_tab(3)} style={{ fontWeight: 'bold' }} className="flex text-text-50 items-center cursor-pointer w-full mr-3">
                    <span className={`${paiements_tab === 3 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> Rapport Mensuel de paiement</span>
                </div>
                <div onClick={() => setPaiements_tab(1)} style={{ fontWeight: 'bold' }} className="flex w-full text-text-50 items-center cursor-pointer mr-3">
                    <span className={`${paiements_tab === 1 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> Fiche Mensuelle frais scolaires</span>
                </div>
                <div onClick={() => setPaiements_tab(2)} style={{ fontWeight: 'bold' }} className="flex text-text-50 items-center cursor-pointer w-full mr-3">
                    <span className={`${paiements_tab === 2 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> Fiche Mensuelle frais divers</span>
                </div>
                <div onClick={() => setPaiements_tab(4)} style={{ fontWeight: 'bold' }} className="flex text-text-50 items-center cursor-pointer w-auto">
                    <span className={`${paiements_tab === 4 ? "border-b-2" : "border-b-2 border-background-100 dark:border-background-20"} pb-3`}> Corbeille</span>
                </div>
            </div>

            {paiements_tab === 1 ?
                <div>
                    <PrintDocument div={"paiements-day"} />
                    <div id="paiements-day">
                        <table style={{ width: '100%' }} className='w-full'>
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <div>
                                            <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                            <strong>{autres.school_bp}</strong><br />
                                            <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                        </div>
                                        <table className="w-full" style={{ marginTop: -40 }}>
                                            <caption>
                                                <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                    <strong className='text-lg'>DÉTAILLÉ DU RAPPORT MENSUEL DE PAIEMENT DES FRAIS SCOLAIRES<br/>Mois : {generateMonth(month)}</strong><br />
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {paiements_day.map((paiement, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
                                                {/* total_paiement = total_paiement + parseInt(paiement.montant_paye); */ }
                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_class_order(paiement.class_order)}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                            <tfoot>
                                                <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
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
                    <PrintDocument div={"frais-divers-day"} />
                    <div id="frais-divers-day">
                        <table className='w-full'>
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <div>
                                            <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                            <strong>{autres.school_bp}</strong><br />
                                            <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                        </div>
                                        <table className="w-full" style={{ marginTop: -40 }}>
                                            <caption>
                                                <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                    <strong className='text-lg'>DÉTAILLÉ DU RAPPORT MENSUEL DE PAIEMENT DES FRAIS DIVERS<br/>Mois : {generateMonth(month)}</strong><br />
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {frais_divers_day.map((frais_divers, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);
                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td>
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
                                                            <tr key={index} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                                                <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total payé {libelle.description_libelle}</td>
                                                                <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais}</strong></td>
                                                            </tr>
                                                        )
                                                    }

                                                })}
                                                <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                                    <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                    <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais_divers}</strong></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                : null}

            {paiements_tab === 3 ?
                <div>
                    <div>
                        <div style={{ marginBottom: 10, float: 'right', marginTop: -15 }}>
                            Sélectionner un mois<br />
                            <select
                                                    onChange={(e) => {generate_stats(e.target.value, classes)}}
                                                    className="nodrag select-no-border-selectddwdwd border border-gray-50 cursor-pointer dark:border-gray-20 p-2 rounded-lg bg-background-100 dark:bg-background-20 ml-2">
                                                    <option value="">Mois</option>
                                                    <option value="01">Janvier</option>
                                                    <option value="02">Février</option>
                                                    <option value="03">Mars</option>
                                                    <option value="04">Avril</option>
                                                    <option value="05">Mai</option>
                                                    <option value="06">Juin</option>
                                                    <option value="07">Juillet</option>
                                                    <option value="08">Aôut</option>
                                                    <option value="09">Septembre</option>
                                                    <option value="10">Octobre</option>
                                                    <option value="11">Novembre</option>
                                                    <option value="12">Décembre</option>
                                                </select>
                        </div>
                        <select
                                                    onChange={(val) => {
                                                        if(val.target.value !== "") {
                                                        let cl = JSON.parse(val.target.value);
                                                        dispatch({ type: "SET_CLASSES_SELECTED", payload: cl.classes_selected });
                                                        generate_stats(month, cl.classes_selected);
                                                        }
                                                    }}
                                                    className="nodrag border border-gray-50 dark:border-gray-20 p-2 rounded-lg cursor-pointer bg-background-100 dark:bg-background-20 ml-2">
                                                    <option value="">Sélections</option>
                                                    {selections.map((selection, index) => (
                                                        <option key={index} value={selection.selection_data}>
                                                            {selection.selection_name}
                                                        </option>
                                                    ))}
                                                </select>
                        <br /><br /><br /><br />

                        <div style={{ marginTop: 70, marginBottom: 70, textAlign: 'center', fontWeight: 'bold', fontSize: 17 }}>
                            Montant total perçu pendant le mois de {generateMonth(month)}<br />
                            <strong className='text-3xl text-text-50'>{makuta_day} dollars Américains</strong><br />

                            {loading_stats_day ?
                                <div>
                                    <CircularProgress size={20} style={{ color: "rgb(0, 80, 180)" }} /><br />
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>Chargement des données...</span>
                                </div> : <div><br /><br /></div>}
                        </div>

                        <PrintDocument div={"total-day"} />
                        <div id="total-day" style={{ marginTop: 30 }} className='border-none border-gray-50 dark:border-gray-20'>
                            <div>
                                <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                <strong>{autres.school_bp}</strong><br />
                                <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                            </div>
                            <table className="w-full" style={{ marginTop: -40 }}>
                                <caption>
                                    <h4 style={{ float: 'right', textAlign: 'right' }}>
                                        <strong className='text-lg'>TOTAL FRAIS MENSUEL<br/>Mois : {generateMonth(month)}</strong><br />
                                    </h4>
                                </caption>
                                <thead>
                                    <tr>
                                        <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Libellé</th>
                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>1</td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais scolaires</td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement}</strong></td>
                                    </tr>
                                    <tr>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>2</td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais divers</td>
                                        <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_frais_divers}</strong></td>
                                    </tr>
                                    <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                        <td colSpan={2} style={{ padding: 15, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>TOTAL MENSUEL</td>
                                        <td style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement + total_frais_divers}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><br />

                        <div className='border-t-2 border-gray-50 dark:border-gray-20 text-lg font-bold pt-5 mt-5 mb-10'>
                            RAPPORT DÉTAILLÉ
                        </div>

                    </div>

                    <PrintDocument div={"repport-day"} />
                    <div id="repport-day">
                        <div>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <div>
                                                <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                                <strong>{autres.school_bp}</strong><br />
                                                <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                            </div>
                                            <table className="w-full" style={{ marginTop: -40 }}>
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'right' }}>
                                                        <strong className='text-lg'>JOURNAL DE CAISSE<br/>Mois : {generateMonth(month)}</strong><br />
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Libellé</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>1</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais scolaires</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement}</strong></td>
                                                    </tr>
                                                    <tr>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>2</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ padding: 15, fontSize: 15, fontWeight: 'bold' }}>Paiement des frais divers</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_frais_divers}</strong></td>
                                                    </tr>
                                                    <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                                        <td colSpan={2} style={{ padding: 15, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>TOTAL</td>
                                                        <td style={{ textAlign: 'center', fontSize: 15 }}><strong>{total_paiement + total_frais_divers}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><br />


                        <div>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <table className="w-full">
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'center' }} className='font-bold'>
                                                        DÉTAILLÉ DU RAPPORT MENSUEL DE PAIEMENT DES FRAIS SCOLAIRES<br />
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                {paiements_day.map((paiement, index) => {
                                                    const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                    const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);

                                                    return (
                                                        <tbody key={index}>
                                                            <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_class_order(paiement.class_order)}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                })}
                                                <tfoot>
                                                    <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
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
                        <br />

                        <div>
                            <table style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td valign="top">
                                            <table className="w-full">
                                                <caption>
                                                    <h4 style={{ float: 'right', textAlign: 'center' }} className='font-bold'>
                                                        DÉTAILLÉ DU RAPPORT MENSUEL DE PAIEMENT DES FRAIS DIVERS<br />
                                                    </h4>
                                                </caption>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                        <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                    </tr>
                                                </thead>
                                                {frais_divers_day.map((frais_divers, index) => {
                                                    const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                    const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);
                                                    return (
                                                        <tbody key={index}>
                                                            <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td>
                                                            </tr>
                                                        </tbody>
                                                    )

                                                })}
                                                <tfoot>
                                                    {libelles.map((libelle, index) => {
                                                        let total_frais = 0;

                                                        for (let i in frais_divers_day) {
                                                            if (frais_divers_day[i].libelle === libelle.libelle_id) {
                                                                total_frais = total_frais + parseInt(frais_divers_day[i].montant);
                                                            }
                                                        }

                                                        if (total_frais !== 0) {
                                                            return (
                                                                <tr key={index} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                                                    <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total payé {libelle.description_libelle}</td>
                                                                    <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais}</strong></td>
                                                                </tr>
                                                            )
                                                        }

                                                    })}
                                                    <tr className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                                                        <td colSpan={4} style={{ padding: 10, fontSize: 13, fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                                                        <td style={{ textAlign: 'center', fontSize: 13 }}><strong>{total_frais_divers}</strong></td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                : null}

            {paiements_tab === 4 ?
                <div>
                    <PrintDocument div={"corbeille-day"} />
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
                                        <table className="w-full" style={{ marginTop: -40 }}>
                                            <caption>
                                                <h4 style={{ float: 'right', textAlign: 'right' }} className='font-bold'>
                                                    DÉTAILLÉ DE LA CORBEILLE (FRAIS SCOLAIRES)<br/>Mois : {generateMonth(month)}<br />
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {paiements_day_deleted.map((paiement, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === paiement.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === paiement.libelle);
                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(paiement.pupil_id))}>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{paiement.first_name.toUpperCase()} {paiement.second_name.toUpperCase()} {paiement.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(paiement.class_school)} {find_cycle(paiement.cycle_school)} {find_class_order(paiement.class_order)}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{paiement.montant_paye} </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table><br />
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td valign="top">
                                        <table className="w-full">
                                            <caption>
                                                <h4 style={{ float: 'right', textAlign: 'center' }} className='font-bold'>
                                                    DÉTAILLÉ DE LA CORBEILLE (FRAIS DIVERS)<br/>Mois : {generateMonth(month)}<br />
                                                </h4>
                                            </caption>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: 30, textAlign: 'center' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>No</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Noms de l'élève</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Classe</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'left' }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Motif de paiement</th>
                                                    <th style={{ paddingLeft: 10, textAlign: 'center', minWidth: 130 }} className='border border-gray-50 dark:border-gray-20 bg-background-50 dark:bg-background-20 pt-3 pb-3'>Montant (USD)</th>
                                                </tr>
                                            </thead>
                                            {frais_divers_day_deleted.map((frais_divers, index) => {
                                                const pupil = pupils_school.filter(pupil => pupil.pupil_id === frais_divers.pupil_id);
                                                const libelle = libelles.filter(libelle => libelle.libelle_id === frais_divers.libelle);

                                                return (
                                                    <tbody key={index}>
                                                        <tr onClick={() => view_pupil(find_pupil_data(frais_divers.pupil_id))}>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{frais_divers.first_name.toUpperCase()} {frais_divers.second_name.toUpperCase()} {frais_divers.last_name.toUpperCase()}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{find_class_number(frais_divers.class_school)} {find_cycle(frais_divers.cycle_school)} {find_class_order(frais_divers.class_order)}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{libelle[0].description_libelle}</td>
                                                            <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{frais_divers.montant} </td>
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
                </div> : null}
        </div>
    )
}

export default PaiementsMonth;
