import { FaArrowDown, FaChevronDown, FaPrint } from 'react-icons/fa';
import { connect, useDispatch, useSelector } from 'react-redux';
import { find_date, home_redirect, http } from '../../global_vars';
import PrintDocument from '../includes/print';

const AllPupilPaiements = () => {

    const pupil = useSelector(state => state.pupil);
    const autres = useSelector(state => state.autres);
    const class_numbers = useSelector(state => state.class_numbers);
    const orders = useSelector(state => state.orders);
    const cycles = useSelector(state => state.cycles);
    const libelles = useSelector(state => state.libelles);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const url_server = useSelector(state => state.url_server);
    const dispatch = useDispatch();

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

    const find_libelle = (libelle) => {

        let return_value = "";
        for (let i in libelles) {
            if (libelles[i].libelle_id == libelle) {
                return_value = libelles[i].description_libelle;
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

    // const printContent = (divName) => {

    //     dispatch({ type: "SET_MOUNT_HOME", payload: false });
    //     let printContents = document.getElementById(divName).innerHTML;
    //     let originalContents = document.body.innerHTML;
    //     document.body.innerHTML = printContents;
    //     window.print();

    //     document.body.innerHTML = originalContents;
    //     window.location.href = http + url_server + home_redirect;
    //     window.location.replace(http + url_server + home_redirect);
    // }

    const find_pupil = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil.pupil.pupil_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => { });
    };

    const delete_recu = (recu_id) => {

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/delete_recu.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                paiement_id: recu_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                find_pupil();
            })
            .catch((error) => {
                // alert(error.toString());
                // setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, is_loading_home: false, loading_middle: false });
            });
    };

    return (
        <div style={{ width: '100%' }}>
            {pupil.paiements.map((paiement, index) => {

                if (parseInt(paiement.paiement_validated) === 1) {
                    return (
                        <div key={index} style={{ margin: 0, padding: 0, marginBottom: 20 }}>

                            <div id={`recu ${paiement.paiement_id}`}>
                                <div className="div-recuuu border-4 border-double border-gray-50 dark:border-gray-20 p-1 rounded-xl">
                                    <div className="sub-div-recuuu  border-gray-50 dark:border-gray-20 p-8 rounded-lg pb-24">
                                        <table style={{ width: "100%", padding: 10, paddingTop: 0, paddingBottom: 0 }}>
                                            <tbody>
                                                <tr>
                                                    <td className="border-r border-b border-gray-50 dark:border-gray-20 pb-5" style={{ width: "50%", fontSize: 12 }}>
                                                        <strong className="div-title-recu border-b border-gray-50 dark:border-gray-20">{(autres.school_name).toUpperCase()}</strong><br />
                                                        <strong className="sub-title-div-recu">{autres.school_bp}</strong>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td className='text-gray-100'>EMAIL <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                                    <td><span className='text-gray-100'>:</span> <strong>{autres.email_school}</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td className='text-gray-100'>TÉLÉPHONES <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                                    <td><span className='text-gray-100'>:</span> <strong>{autres.phone_1}</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td> </td>
                                                                    <td><span style={{ color: 'transparent' }}>:</span> <strong>{autres.phone_2}</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                    <td style={{ width: "50%", fontSize: 12, }} className='border-b pl-8 border-gray-50 dark:border-gray-20 pb-5'>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>ÉLÈVE :</span> <strong>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name}</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>CLASSE :</span> <strong>{find_class_number(pupil.pupil.class_school)} {find_cycle(pupil.pupil.cycle_school)} {find_class_order(pupil.pupil.class_order)}</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>ANNÉE SCOLAIRE :</span> <strong>{annee_scolaire.year_name}</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr style={{ padding: 20 }}>
                                                                    <td colSpan={2}><strong>REÇU DES FRAIS SCOLAIRES</strong></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>DATE :</span> <strong>{find_date(paiement.date_creation)}</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>REÇU No :</span> <strong>{paiement.paiement_id}</strong></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="td-border-right-top" colSpan={2}>
                                                        <table style={{ width: "100%" }}>
                                                            <tbody>
                                                                <tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td><span className='text-gray-100'>ÉLÈVE :</span> <strong>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name}</strong>
                                                                    </td>
                                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }}><span className='text-gray-100'>Montant payé :</span> <strong>{paiement.montant_paye} dollars USD</strong>
                                                                    </td>
                                                                    <td><span className='text-gray-100'>Montant En toutes lettres :</span> <strong>{paiement.montant_text} dollars Américains</strong>
                                                                    </td>
                                                                </tr>
                                                                <tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }} valign="top"><span className='text-gray-100'>Solde année :</span> <strong>{pupil.soldes.solde} dollars USD</strong>
                                                                    </td>
                                                                    <td><span className='text-gray-100'>Solde par trimestre</span>    <FaArrowDown size={10} style={{ marginLeft: 5 }} /><br />
                                                                        <div style={{ marginTop: 5, paddingTop: 2 }} className="td-border-left-topppp dispp border-t border-gray-50 dark:border-gray-20 pt-5">
                                                                            <span>T1 : <strong>{pupil.soldes.solde1}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                            <span>T2 : <strong>{pupil.soldes.solde2}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                            <span>T3 : <strong>{pupil.soldes.solde3}</strong></span>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td style={{ width: '50%' }}><span className='text-gray-100'>Motif du paiement</span> : <strong>{find_libelle(paiement.libelle)}</strong>
                                                                    </td>
                                                                    <td></td>
                                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                <tr>
                                                    <td style={{ width: "100%", textAlign: 'center' }} colSpan={2}>
                                                        Signature et sceau de l'école
                                                    </td>
                                                </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'left', marginTop: 5 }} className='flex items-center'>
                                <div className='flex items-center'>
                                    <FaChevronDown color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span
                                        onClick={() => delete_recu(paiement.paiement_id)}
                                        className="add-minus">
                                        EFFACER CE REÇU
                                    </span>
                                </div>

                                <div className='flex items-center border-l pl-5 border-gray-50 dark:border-gray-20'>
                                    {/* <FaPrint color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                    <span onClick={() => printContent(`recu ${paiement.paiement_id}`)} className="add-minus">
                                        IMPRIMER CE REÇU
                                    </span> */}
                                    <PrintDocument div={(`recu ${paiement.paiement_id}`)} />
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default AllPupilPaiements;


