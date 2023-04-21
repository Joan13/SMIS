import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import ButtonNormal from '../includes/button_normal';

const PaiementCategories = () => {
    const paiement_categories = useSelector(state => state.paiement_categories);
    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const [category_name, setCategory_name] = useState("");
    const [category_amount, setCategory_amount] = useState("");

    const add_paiement_category = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/add_paiement_category.php";

        if (category_name !== "" && category_amount !== "") {
            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    school_year: annee,
                    category_name: category_name,
                    category_amount: category_amount,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    dispatch({ type: "SET_PAIEMENT_CATEGORIES", payload: response.paiement_categories });
                    setCategory_name("");
                    setCategory_amount("");
                })
                .catch((error) => { });
        } else {
            alert("Le champs de l'intitulé de la catégorie et du montant total annuel sont obligatoires.")
        }
    };

    return (
        <div className="paiement-categories">
            <div className="paiement-categories-modal bg-background-100 dark:bg-background-20 text-text-100 dark:text-background-100">
                <div style={{ margin: 20, marginTop: 10 }}>
                <div className='w-full flex items-center justify-center'>
                    <div className='w-full text-center font-bold text-lg'>CATEGORISATION DES PAIEMENTS DES ÉLÈVES</div>
                    <span
                        onClick={() => dispatch({ type: "SET_MODAL_PAIEMENT_CATEGORIES", payload: false })}
                        className='w-8 h-8 flex justify-center items-center'
                        style={{
                            float: 'right',
                            backgroundColor: '#780006',
                            cursor: 'pointer',
                            borderRadius: '50%',
                        }}><FiX color='white' /></span>
                        </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <input
                            value={category_name}
                            onChange={(text) => setCategory_name(text.target.value)}
                            placeholder='Entrer une nouvelle catégorie de paiement'
                            className='input-normall  border border-gray-50 dark:border-gray-20'
                            style={{ width: '98%', marginRight: 10 }}
                        />
                        <input
                            value={category_amount}
                            onChange={(text) => setCategory_amount(text.target.value)}
                            placeholder='Entrer le montant total par an pour cette catégorie'
                            className='input-normall  border border-gray-50 dark:border-gray-20'
                            style={{ width: '98%' }}
                        />
                    </div>
                    <button onClick={() => add_paiement_category()}
                        className='nodrag bg-primary-100 rounded-xl mt-4 text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6'>
                        Enregistrer la catégorie de paiement
                    </button>
                    {/* <ButtonNormal onPress={() => add_paiement_category()} text="Enregistrer la catégorie de paiement" style={{ marginTop: 10, marginBottom: 10, width: '100%' }} /> */}
                </div>

                <div className='border-t m-6 pt-6 border-gray-50 dark:border-gray-20'>
                    <h3>Toutes les catégories de paiement</h3><br />
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <tr>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ backgroundColor: 'rgba(0, 80, 180,0.4)' }}>N0</th>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'left', paddingLeft: 10, paddingLeft: 10, paddingTop: 7, paddingBottom: 7, backgroundColor: 'rgba(0, 80, 180,0.4)' }}>Catégorie</th>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ backgroundColor: 'rgba(0, 80, 180,0.4)' }}>Montant à payer par an</th>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ backgroundColor: 'rgba(0, 80, 180,0.4)' }}>Nbre d'élèves</th>
                        </tr>
                        {paiement_categories.map((category, index) => {
                            let namec = "";
                            if (category.category_name === "0")
                                namec = "Exampté(e)"
                            else
                                namec = category.category_name
                            return (
                                <tr>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'center' }}>{index + 1}</td>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} key={index}><strong>{namec}</strong></td>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'center' }}>{category.category_amount}</td>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'center' }}>0</td>
                                </tr>
                            )
                        })}
                    </table>

                </div>

            </div>
        </div>
    )
}

export default PaiementCategories;
