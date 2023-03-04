import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { FiPrinter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { home_redirect, http } from "../../global_vars";
import Classes from "../../includes/classes";
import MyChart from "./charts/global_charts";

let ff = 0;

const GeneralStatsCaisse = () => {

    const title_main = useSelector(state => state.title_main);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const pupils = useSelector(state => state.pupils);
    const paiement_categories = useSelector(state => state.paiement_categories);
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const libelles = useSelector(state => state.libelles);
    const autres = useSelector(state => state.autres);
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();
    const [ffnombre, setFfnombre] = useState(0);
    const [ffmontant, setFfmontant] = useState(0);
    const [categories, setCategories] = useState([]);
    const [classes_stats, setClasses_stats] = useState([]);
    const [frais_divers_stats, setFrais_divers_stats] = useState([]);
    const [classes_categories, setClasse_categories] = useState([]);
    const [classes_selected, setClasses_selected] = useState([]);
    const [trim1, setTrim1] = useState(0);
    const [trim2, setTrim2] = useState(0);
    const [trim3, setTrim3] = useState(0);
    const [ttrims, setTtrims] = useState(0);
    const [t1_payed, setT1_payed] = useState(0);
    const [t2_payed, setT2_payed] = useState(0);
    const [t3_payed, setT3_payed] = useState(0);
    const [filters, setFilters] = useState(false);
    const [tot_filter, setTot_filter] = useState(0);
    const [filter_data, setFilter_data] = useState(0);
    const [totalFilles, setTotalFilles] = useState(0);
    const [totalGarcons, setTotalGarcons] = useState(0);
    const [total_trim1, setTotal_trim1] = useState(0);
    const [total_trim2, setTotal_trim2] = useState(0);
    const [total_trim3, setTotal_trim3] = useState(0);
    const [nombre_trim1, setNombre_trim1] = useState(0);
    const [nombre_trim2, setNombre_trim2] = useState(0);
    const [nombre_trim3, setNombre_trim3] = useState(0);
    const [loading_stats, setLoading_stats] = useState(false);
    const [payes, setPayes] = useState(0);
    const [total_annee, setTotal_annee] = useState(0);
    const [exampte, setExamptes] = useState(0);
    const [width_categories_columns, setWidth_categories_columns] = useState(0);

    const generate_general_stats = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/stats_general.php";
        setLoading_stats(true);

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                const promise_general_stats = new Promise((resolve, reject) => {

                    const t1_percentages = response.t1_percentages;
                    const t2_percentages = response.t2_percentages;
                    const t3_percentages = response.t3_percentages;

                    let t1ps = 0;
                    let t2ps = 0;
                    let t3ps = 0;

                    for (let i in t1_percentages) {
                        t1ps = t1ps + parseInt(t1_percentages[i]);
                    }

                    for (let i in t2_percentages) {
                        t2ps = t2ps + parseInt(t2_percentages[i]);
                    }

                    for (let i in t3_percentages) {
                        t3ps = t3ps + parseInt(t3_percentages[i]);
                    }

                    setTrim1((response.t1_payed * 100) / response.ttrims);
                    setTrim2((response.t2_payed * 100) / response.ttrims);
                    setTrim3((response.t3_payed * 100) / response.ttrims);
                    setTtrims(response.ttrims);
                    setTotal_annee(response.montant_total);
                    setPayes(response.montants_payes);
                    setT1_payed(response.t1_payed);
                    setT2_payed(response.t2_payed);
                    setT3_payed(response.t3_payed);
                    setCategories(response.categories);
                    setClasse_categories(response.categories);
                    setClasses_stats(response.classes);
                    setFrais_divers_stats(response.frais_divers);
                    setFfmontant(response.ffmontant);
                    setFfnombre(response.ffnombre);

                    resolve();
                }).then(() => { });

                promise_general_stats.finally(() => {
                    setLoading_stats(false);
                })
            })
            .catch((error) => { });
    };

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

    const color_body = (number) => {
        if (number <= 25) {
            return 'green';
        } else if (number >= 26 && number <= 40) {
            return 'rgb(0, 80, 180)';
        } else if (number > 40 && number <= 50) {
            return 'rgb(160, 160, 0)';
        } else if (number >= 51 && number <= 69) {
            return 'rgb(166, 83, 0)';
        } else {
            return 'rgb(128, 0, 0)';
        }
    }

    const open_classe = (classe) => {
        // console.log(classe)

        if (classes_selected.find(element => element === classe.name) === undefined) {
            // dispatch({ type: "SET_CLASSES_SELECTED", payload: [...classes_selected, classe.id_classes] });
            setClasses_selected([...classes_selected, classe.name]);
            setFilter_data(parseInt(filter_data) + parseInt(classe.payed_classe));
            setTot_filter(parseInt(tot_filter) + parseInt(classe.total_classe));
            setTotalFilles(parseInt(totalFilles + classe.filles));
            setTotalGarcons(parseInt(totalGarcons + classe.garcons));
        } else {
            // dispatch({ type: 'SET_CLASSES_SELECTED', payload: classes_selected.filter(element => element !== (classe.id_classes)) });
            setClasses_selected(classes_selected.filter(element => element !== (classe.name)));
            setFilter_data(parseInt(filter_data) - parseInt(classe.payed_classe));
            setTot_filter(parseInt(tot_filter) - parseInt(classe.total_classe));
            setTotalFilles(parseInt(totalFilles - classe.filles));
            setTotalGarcons(parseInt(totalGarcons - classe.garcons));
        }

        console.log(classes_stats);
    }

    useEffect(() => {
        generate_general_stats();
        console.log(classes_stats);
    }, []);

    return (
        <div>
            <div>
                {!loading_stats ?
                    <div style={{ float: 'right', }}>
                        <span style={{ color: 'rgb(0, 80, 180)', cursor: 'pointer', marginRight: 20 }} onClick={() => setFilters(!filters)}>FILTRER LES FICHES</span>

                        {filters ?
                        <span onClick={() => printContent("filter-data")} className="add-minus" style={{ fontWeight: 'bold', float: 'right' }}>
                        <FiPrinter /> IMPRIMER LA FICHE
                    </span>:
                    <span onClick={() => printContent("general-stats")} className="add-minus" style={{ fontWeight: 'bold', float: 'right' }}>
                    <FiPrinter /> IMPRIMER LA FICHE
                </span>}
                    </div> : null}
            </div>

            {loading_stats ?
                <div style={{ textAlign: 'center', marginTop: 100 }}>
                    <CircularProgress size={40} style={{ color: "rgb(0, 80, 180)" }} /><br />
                    Génération des statistiques générales de la caisse...
                </div>
                :
                filters ?
                    <div style={{ marginTop: 50 }}>

                        {filter_data !== 0 ?
                        <div id="filter-data">
                            <table style={{ width: "100%" }} className="table-borderr">
                            <thead>
                                <tr>
                                    <td style={{ paddingTop: 15, paddingBottom: 15, textAlign: 'center', fontSize: 13, backgroundColor: 'rgba(0, 80, 180, 0.1)' }} colSpan={paiement_categories.length + 1}>
                                        <strong><span contentEditable>NOMMER LA SELECTION</span> | TOTAL : {totalFilles + totalGarcons} ÉLÈVES</strong>
                                    </td>
                                </tr>
                            </thead>

                            {/* {classes_stats.map((classe, index) => {
                                    return ( */}
                            <tbody>
                                <tr>
                                    <td colSpan={paiement_categories.length + 1} style={{ textAlign: 'left', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.1)' }}>
                                        Nommer la selection
                                        <span style={{ marginLeft: 50, marginRight: 20, color: 'gray' }}>Total : {totalFilles + totalGarcons} | Filles : {totalFilles} | Garçons : {totalGarcons}</span>
                                    </td>
                                </tr>
                                {/* <tr>
                                                <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Exampté(e)(s)</td>
                                                {paiement_categories.map((category, index1) => (
                                                    <td key={index1} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}><span style={{ color: 'transparent' }}>ooooo</span>{category.category_name}<span style={{ color: 'transparent' }}>ooooo</span></td>
                                                ))}
                                            </tr> */}
                                <tr>
                                    {/* <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                    {classe.classe_categories.filter(cc => cc === '0').length}<br />
                                                    <div style={{ marginTop: 13, fontSize: 12, color: 'gray' }}>{(((classe.classe_categories.filter(cc => cc === '0').length) * 100) / classe.pupils).toString().substr(0, 5)} %</div>
                                                </td> */}
                                    {/* {paiement_categories.map((category, index2) => {
                                                    const cat = classe.classe_categories.filter(cc => cc === category.category_id);
                                                    return (
                                                        <td key={index2} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                            {cat.length} <br />
                                                            <div style={{ marginTop: 10, fontSize: 12, color: 'gray', fontWeight: '' }}>{((cat.length * 100) / classe.pupils).toString().substr(0, 5)} %</div>
                                                        </td>
                                                    )
                                                })} */}
                                </tr>
                                <tr>
                                    <td colSpan={7} style={{ paddingTop: 10, paddingBottom: 10, fontSize: 13, textAlign: 'right', paddingRight: 20 }}>
                                        Montant total payé
                                        <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {filter_data} </strong>
                                        sur
                                        <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {tot_filter} </strong>
                                        soit
                                        <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {((filter_data * 100) / tot_filter).toString().substr(0, 5)} </strong>
                                        %</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="border-bottom-smooth" style={{ marginTop: 20, marginBottom: 20 }}></div>
                        </div>:null}

                        {classes_stats.map((classee, index) => {
                            return (
                                <div key={index}
                                    onClick={() => { open_classe(classee) }}
                                    className={`classes-div`}>
                                    {/* <div className="float-left-image"> */}
                                    <div>
                                        <input
                                            type="checkbox"
                                            style={{ width: 20, height: 20, cursor: 'pointer' }}
                                            onClick={() => open_classe(classee)}
                                        />
                                    </div>
                                    {/* </div> */}
                                    <strong>{classee.name}</strong>
                                    <span style={{ backgroundColor: color_body(classee.pupils), color: 'white', paddingLeft: 5, paddingRight: 5, paddingTop: 2, paddingBottom: 2, marginTop: -5 }} className="float-class-pupils">{classee.pupils}</span>
                                    {/* <br /> */}
                                    {/* <span style={{ fontSize: 12 }}>{(classee.cycle_id + "").toUpperCase()}</span> */}
                                    <span className="float-class-pupils">
                                        Garcons : {classee.garcons} |
                                        Filles : {classee.filles}
                                    </span>
                                    <div className="border-bottom-classes"></div>
                                </div>
                            )
                        })}
                    </div>
                    :
                    <div>
                        <div id="general-stats">
                            <table style={{ width: "100%" }} className="table-borderr">
                                <thead>
                                    <tr>
                                        <td style={{ paddingTop: 20, paddingBottom: 20, color: "black", fontSize: 15 }} colSpan="3">
                                            <div style={{ marginLeft: 15 }}>
                                                <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                                <strong>{autres.school_bp}</strong><br />
                                                <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                            </div>
                                            <div style={{ float: 'right', marginTop: -35, textAlign: 'right', marginRight: 15 }}>
                                                <strong>{title_main} {annee_scolaire.year_name}</strong>
                                                <br /> (Paiements scolaires et frais divers)
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Premier Trimestre</th>
                                        <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Deuxième trimestre</th>
                                        <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Troisième Trimestre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            Payé     <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t1_payed}</strong>
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t2_payed}</strong>
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t3_payed}</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            Sur      {ttrims.toString().substr(0, 9)}
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            {ttrims.toString().substr(0, 9)}
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            {ttrims.toString().substr(0, 9)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>~ {trim1.toString().substr(0, 5)} %</strong>
                                            <div style={{ marginTop: 13, fontSize: 12 }}>{trim1}</div>
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>~ {trim2.toString().substr(0, 5)} %</strong>
                                            <div style={{ marginTop: 13, fontSize: 12 }}>{trim2}</div>
                                        </td>
                                        <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                            <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>~ {trim3.toString().substr(0, 5)} %</strong>
                                            <div style={{ marginTop: 13, fontSize: 12 }}>{trim3}</div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.1)' }}>
                                        <td colSpan={7} style={{ paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', fontSize: 13, textAlign: 'center', paddingRight: 20 }}>
                                            Montant total payé
                                            <strong style={{ color: 'rgb(0,80,180)', fontSize: 17 }}> {payes} </strong>
                                            dollars (USD) sur
                                            <strong style={{ color: 'rgb(0,80,180)', fontSize: 17 }}> {total_annee} </strong>
                                            dollars  (USD) soit
                                            <strong style={{ color: 'rgb(0,80,180)', fontSize: 17 }}> {((payes * 100) / total_annee).toString().substr(0, 5)} </strong>
                                            %</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <table style={{ width: "100%" }} className="table-borderr">
                                <thead>
                                    <tr>
                                        <td style={{ paddingTop: 15, paddingBottom: 15, textAlign: 'center', fontSize: 13, backgroundColor: 'rgba(0, 80, 180, 0.1)' }} colSpan={3}>
                                            <strong>CATÉGORISATION DES FRAIS DIVERS</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>Libélé</th>
                                        <th style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Total élèves</th>
                                        <th style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Total Frais</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {libelles.map((libelle, index) => {
                                        const frais = frais_divers_stats.filter(frais => frais.libelle === libelle.libelle_id);
                                        let montant = 0;
                                        for (let i in frais) {
                                            montant = montant + parseInt(frais[i].montant);
                                        }
                                        if (frais.length !== 0) {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
                                                        {libelle.description_libelle}
                                                    </td>
                                                    <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                        <strong>{frais.length}</strong>
                                                    </td>
                                                    <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                        <strong>{montant}</strong>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}

                                    <tr style={{ backgroundColor: 'rgba(0, 80, 180, 0.1)' }}>
                                        <td style={{ textAlign: 'left', paddingTop: 10, paddingBottom: 10, paddingLeft: 15 }}>
                                            <strong>TOTAL GÉNÉRAL</strong>
                                        </td>
                                        <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                            <strong>{ffnombre}</strong>
                                        </td>
                                        <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                            <strong>{ffmontant}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table style={{ width: "100%" }} className="table-borderr">
                                <thead>
                                    <tr>
                                        <td style={{ paddingTop: 15, paddingBottom: 15, textAlign: 'center', fontSize: 13, backgroundColor: 'rgba(0, 80, 180, 0.1)' }} colSpan={paiement_categories.length + 1}>
                                            <strong>NOMBRE D'ÉLÈVES PAR CATEGORIE | TOTAL {pupils.length}</strong>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Exampté(e)(s)</th>
                                        {paiement_categories.map((category, index) => (
                                            <th key={index} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}><span style={{ color: 'transparent' }}>ooooo</span>{category.category_name}<span style={{ color: 'transparent' }}>ooooo</span></th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                            {categories.filter(cc => cc === '0').length}<br />
                                            <div style={{ marginTop: 13, fontSize: 12, color: 'gray' }}>{(((categories.filter(cc => cc === '0').length) * 100) / pupils.length).toString().substr(0, 5)} %</div>
                                        </td>
                                        {paiement_categories.map((category, index) => {
                                            const cat = categories.filter(cc => cc === category.category_id);
                                            return (
                                                <td key={index} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                    {cat.length} <br />
                                                    <div style={{ marginTop: 10, fontSize: 12, color: 'gray', fontWeight: '' }}>{((cat.length * 100) / pupils.length).toString().substr(0, 5)} % </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                </tbody>
                            </table>

                            <table style={{ width: "100%" }} className="table-borderr">
                                <thead>
                                    <tr>
                                        <td style={{ paddingTop: 15, paddingBottom: 15, textAlign: 'center', fontSize: 13, backgroundColor: 'rgba(0, 80, 180, 0.1)' }} colSpan={paiement_categories.length + 1}>
                                            <strong>NOMBRE D'ÉLÈVES PAR CATEGORIE PAR CLASSE | TOTAL : {pupils.length} ÉLÈVES</strong>
                                        </td>
                                    </tr>
                                </thead>

                                {classes_stats.map((classe, index) => {
                                    return (
                                        <tbody key={index}>
                                            <tr>
                                                <td colSpan={paiement_categories.length + 1} style={{ textAlign: 'left', paddingLeft: 15, paddingTop: 10, paddingBottom: 10, fontWeight: 'bold', backgroundColor: 'rgba(0, 80, 180, 0.1)' }}>
                                                    {classe.name}
                                                    <span style={{ marginLeft: 50, marginRight: 20, color: 'gray' }}>Total : {classe.pupils} | Filles : {classe.filles} | Garçons : {classe.garcons}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>Exampté(e)(s)</td>
                                                {paiement_categories.map((category, index1) => (
                                                    <td key={index1} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}><span style={{ color: 'transparent' }}>ooooo</span>{category.category_name}<span style={{ color: 'transparent' }}>ooooo</span></td>
                                                ))}
                                            </tr>
                                            <tr>
                                                <td style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                    {classe.classe_categories.filter(cc => cc === '0').length}<br />
                                                    <div style={{ marginTop: 13, fontSize: 12, color: 'gray' }}>{(((classe.classe_categories.filter(cc => cc === '0').length) * 100) / classe.pupils).toString().substr(0, 5)} %</div>
                                                </td>
                                                {paiement_categories.map((category, index2) => {
                                                    const cat = classe.classe_categories.filter(cc => cc === category.category_id);
                                                    return (
                                                        <td key={index2} style={{ textAlign: 'center', paddingTop: 10, paddingBottom: 10 }}>
                                                            {cat.length} <br />
                                                            <div style={{ marginTop: 10, fontSize: 12, color: 'gray', fontWeight: '' }}>{((cat.length * 100) / classe.pupils).toString().substr(0, 5)} %</div>
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td colSpan={7} style={{ paddingTop: 10, paddingBottom: 10, fontSize: 13, textAlign: 'right', paddingRight: 20 }}>
                                                    Montant total payé
                                                    <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {classe.payed_classe} </strong>
                                                    sur
                                                    <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {classe.total_classe} </strong>
                                                    soit
                                                    <strong style={{ color: 'rgb(0,80,180)', fontSize: 15 }}> {((classe.payed_classe * 100) / classe.total_classe).toString().substr(0, 5)} </strong>
                                                    %</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
            }
        </div>
    )
}

export default GeneralStatsCaisse;
