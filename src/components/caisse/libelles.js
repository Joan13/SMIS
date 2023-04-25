import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import ButtonNormal from '../includes/button_normal';

const Libelles = () => {
    const libelles = useSelector(state => state.libelles);
    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const [description_libelle, setDescription_libelle] = useState("");
    const user_data = useSelector(state => state.user_data);

    useEffect(() => {
        console.log(libelles);
    }, []);

    const add_libelle = () => {

        let gender_libelle = "";
        if (user_data.poste === "6") gender_libelle = 1;
        if (user_data.poste === "3") gender_libelle = 0;
        if (user_data.poste === "4") gender_libelle = 0;

        if (description_libelle !== "" && gender_libelle !== "") {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/add_libelle.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    school_year: annee,
                    description_libelle: description_libelle,
                    gender_libelle: gender_libelle,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    dispatch({ type: "SET_LIBELLES", payload: response.libelles });
                    setDescription_libelle("");
                    alert("Le libellé a été enregistré avec succès");
                })
                .catch((error) => { });
        } else {
            alert("Vous devez être de la finance ou caisse pour enregistrer un nouveau libellé. Aussi, vous devez entrer l'intitulé du libellé");
        }
    };

    return (
        <div className="paiement-categories">
            <div className="paiement-categories-modal bg-background-100 dark:bg-background-20 text-text-100 dark:text-background-100">
                <div style={{ margin: 20, marginTop: 10 }}>
                    <div className='w-full flex items-center justify-center'>
                        <div className='w-full text-center font-bold text-lg'>LIBELLES</div>
                        <div className='nodrag w-8 h-8 flex justify-center items-center'
                            onClick={() => dispatch({ type: "SET_MODAL_LIBELLES", payload: false })}
                            style={{
                                backgroundColor: '#780006',
                                cursor: 'pointer',
                                borderRadius: '50%',
                            }}><FiX color='white' /></div>
                    </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <input
                            value={description_libelle}
                            onChange={(text) => setDescription_libelle(text.target.value)}
                            placeholder="Entrer l'intitulé du libellé"
                            className='input-normall border border-gray-50 dark:border-gray-20 mb-5 mt-5'
                            style={{ width: '99%', marginRight: 10 }}
                        />
                    </div>
                    <button onClick={() => add_libelle()}
                        className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6'>
                        Enregistrer le libellé
                    </button>
                    {/* <ButtonNormal onPress={() => add_libelle()} text="Enregistrer le libellé" style={{ marginTop: 10, marginBottom: 10, width: '100%' }} /> */}
                </div>

                <div className='border-t m-6 pt-6 border-gray-50 dark:border-gray-20'>
                    <h3>Tous les libellés</h3><br />
                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <tr>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ backgroundColor: 'rgba(0, 80, 180,0.4)' }}>N0</th>
                            <th className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'left', paddingLeft: 10, paddingLeft: 10, paddingTop: 7, paddingBottom: 7, backgroundColor: 'rgba(0, 80, 180,0.4)' }}>Intitulé du libellé</th>
                            {/* <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Montant à payer par an</th> */}
                            {/* <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Intitulé du libellé</th> */}
                        </tr>
                        {libelles.map((libelle, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'center' }}>{index + 1}</td>
                                    <td className="border border-gray-50 dark:border-gray-20" style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 10, paddingBottom: 10 }} key={index}>{libelle.description_libelle}</td>
                                    {/* <td className="td-border" style={{textAlign:'center'}}>{category.category_amount}</td>
                                        <td className="td-border" style={{textAlign:'center'}}>0</td> */}
                                </tr>
                            )
                        })}
                    </table>

                </div>

            </div>
        </div>
    )
}

export default Libelles;
