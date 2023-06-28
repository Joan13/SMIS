import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import PrintDocument from '../includes/print';

const ListeNomminative = () => {

    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const classe = useSelector(state => state.classe);
    const dispatch = useDispatch();

    const delete_class = () => {

        let class_id = classe.id_classes;
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/delete_class.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                class_id: class_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                alert("La classe a été effacée avec succès. Si vous voulez voir de changements immédiats, appuyez sur le boutton de rafraichissement de la page en rechargeant les données.");

            })
            .catch((error) => {
                console.log(error);
            });
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

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

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
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div style={{ marginBottom: 50, paddingTop: 0, marginRight: 10 }}>

            {classe.pupils_count !== 0 ?
                <PrintDocument div={"nomminative"} />
                :
                <>
                    <br /><br />

                    <div>Cette classe est vide, elle ne contient pas d'élèves. Vous pouvez l'effacer si vous l'avez entrée par erreur.</div><br /><br />

                    <span
                        onClick={() => delete_class()}
                        className="add-minus" style={{ fontWeight: 'bold', color: 'red' }}>
                        EFFACER CETTE CLASSE
                    </span><br /><br />
                </>}

            <div id="nomminative" style={{ marginTop: 0 }}>
                <div>
                    <strong>{(autres.school_name).toUpperCase()}</strong><br />
                    <strong>{autres.school_bp}</strong><br />
                    <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                </div>
                <table className="w-full" style={{ marginTop: -40 }}>
                    <caption>
                        <h4 className='font-bold'>
                            LISTE NOMMINATIVE<br />
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
                        </tr>
                    </thead>
                    {classe.pupils.map((pupil, index) => (
                        <tbody key={index}>
                            <tr className='cursor-pointer' onClick={() => find_pupil(pupil)}>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.second_name.toUpperCase()}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.last_name.toUpperCase()}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{parseInt(pupil.pupil.gender) === 0 ? "F" : "M"} </td>
                            </tr>
                        </tbody>
                    )
                    )}
                </table>
            </div>

        </div>
    )
}

export default ListeNomminative;
