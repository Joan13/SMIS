import React, { useState } from 'react';
import { FiPrinter } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { home_redirect, http } from '../../../global_vars';
import PrintDocument from '../../includes/print';

const ClassePaiementCategorisation = () => {

    const classe = useSelector(state => state.classe);
    const paiement_categories = useSelector(state => state.paiement_categories);
    const autres = useSelector(state => state.autres);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const url_server = useSelector(state => state.url_server);
    const classes = useSelector(state => state.classes);
    const dispatch = useDispatch();
    const [viewByCategory, setViewByCategory] = useState(false);

    const set_paiement_category = (pupil, category) => {

        // console.log(classe);
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/set_pupil_paiement_category.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil: pupil,
                category: category,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success === "1") {
                    dispatch({ type: "SET_PUPIL_PAIEMENT_CATEGORY", payload: { pupil: pupil, category: category, classe: classe } });
                }
            })
            .catch((error) => { });
    }

    const find_pupil = (pupil) => {
        dispatch({ type: "SET_SEARCHING_PUPIL", payload: true });
        dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
        dispatch({ type: "SET_PUPIL", payload: pupil });
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 11 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: true });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
        dispatch({ type: "SET_TITLE_MAIN", payload: (pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name).toUpperCase() });

        const BaseURL = http + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil.pupil.pupil_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_SEARCHING_PUPIL", payload: false });
                dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => { });
    };

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = "http://" + url_server + home_redirect;
        window.location.replace("http://" + url_server + home_redirect);
    }

    return (
        <div style={{ marginRight: 10, marginBottom: 50 }}>
            <div style={{ float: 'right', marginBottom: -60, paddingTop: 10 }}>
            <PrintDocument div={"paiement-categories"} />
                <br /><br />
            </div>

                <div id="paiement_categories" style={{ marginTop: 0 }}>
                    {/* <table style={{ width: '100%' }}>
                        <tbody>
                            <tr>
                                <td valign="top"> */}
                                    <div>
                                        <strong>{(autres.school_name).toUpperCase()}</strong><br />
                                        <strong>{autres.school_bp}</strong><br />
                                        <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                                    </div>
                                    <table className="w-full" style={{marginTop:-40}}>
                                        <caption>
                                            <h4 className='font-bold'>
                                                CATÉGORIESATION DE PAIEMENT <br /> DES FRAIS SCOLAIRES <br />
                                                {classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id}
                                            </h4>
                                        </caption>
                                        <thead>
                                            <tr>
                                                <th className='border pt-2 pb-2 border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Nom</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Post-nom</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Prénom</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>Sexe</th>
                                                <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20'style={{ width: 120, textAlign: 'center' }}>Catégorie</th>
                                            </tr>
                                        </thead>
                                        {classe.pupils.map((pupil, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td className='border border-gray-50 dark:border-gray-20' onClick={() => find_pupil(pupil)} style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                    <td className='border border-gray-50 dark:border-gray-20' onClick={() => find_pupil(pupil)} style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                                    <td className='border border-gray-50 dark:border-gray-20' onClick={() => find_pupil(pupil)} style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                                    <td className='border border-gray-50 dark:border-gray-20' onClick={() => find_pupil(pupil)} style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                                    <td className='border border-gray-50 dark:border-gray-20' onClick={() => find_pupil(pupil)} style={{ width: 50, textAlign: 'center' }}>{parseInt(pupil.pupil.gender) === 0 ? "F" : "M"} </td>
                                                    <td className='border border-gray-50 dark:border-gray-20' style={{ textAlign: 'center' }}>
                                                        <select
                                                            className="select-normall"
                                                            onChange={(val) => set_paiement_category(pupil.pupil.pupil_id, val.target.value)}
                                                            style={{ width: '100%', textAlign: 'center', height: '100%', border: 'none' }}>
                                                            <option value="">Sélect. cat. </option>
                                                            <option selected={pupil.pupil.paiement_category === "0"} value="0">{parseInt(pupil.pupil.gender) === 0 ? "Exemptée" : "Exempté"}</option>
                                                            {paiement_categories.map((category, index) => (
                                                                <option selected={pupil.pupil.paiement_category === category.category_id}
                                                                    value={category.category_id} key={index}>{category.category_name}</option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                        )}
                                    </table>
                                {/* </td>
                            </tr>
                        </tbody>
                    </table> */}
                </div>
        </div>
    )
}

export default ClassePaiementCategorisation;
