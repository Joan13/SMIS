import React, { useEffect } from 'react';
import { FaArrowDown, FaChevronDown, FaPrint } from 'react-icons/fa';
import { connect, useDispatch, useSelector } from 'react-redux';
import { find_date, home_redirect, http } from '../../global_vars';
import { mapStateToProps } from '../../store/state_props';

const AllPupilPaiements =()=> {

    const pupil = useSelector(state=>state.pupil);
    const autres = useSelector(state=>state.autres);
    const class_numbers = useSelector(state=>state.class_numbers);
    const orders = useSelector(state=>state.orders);
    const cycles = useSelector(state=>state.cycles);
    const libelles = useSelector(state=>state.libelles);
    const annee_scolaire = useSelector(state=>state.annee_scolaire);
    const url_server = useSelector(state=>state.url_server);
    const dispatch = useDispatch();     

    useEffect(() => {
        console.log(pupil.paiements);
    }, []);

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

        let return_value = "";
        for (let i in orders) {
            if (orders[i].order_id === order) {
                return_value = orders[i].order_name;
            }
        }

        return return_value;
    }

    const find_libelle=(libelle)=> {

        let return_value = "";
        for (let i in libelles) {
            if (libelles[i].libelle_id == libelle) {
                return_value = libelles[i].description_libelle;
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

    const printContent=(divName)=> {

        dispatch({ type: "SET_MOUNT_HOME", payload: false });
        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

    const find_pupil=()=> {
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

    const delete_recu=(recu_id)=> {

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
                                    <div className="div-recu">
                                        <div className="sub-div-recu">
                                            <table style={{ width: "100%", padding: 10, paddingTop: 0, paddingBottom: 0 }}>
                                                <tbody>
                                                    <tr>
                                                        <td className="td-border-right-recu" style={{ width: "50%", fontSize: 12 }}>
                                                            <strong className="div-title-recu">{(autres.school_name).toUpperCase()}</strong><br />
                                                            <strong className="sub-title-div-recu">{autres.school_bp}</strong>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>EMAIL <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                                        <td>: <strong>{autres.email_school}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>TÉLÉPHONES <span style={{ color: 'transparent' }}>Ybi</span></td>
                                                                        <td>: <strong>{autres.phone_1}</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td> </td>
                                                                        <td><span style={{ color: 'transparent' }}>:</span> <strong>{autres.phone_2}</strong></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        <td style={{ width: "50%", fontSize: 12, paddingLeft: 10 }}>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>ÉLÈVE : <strong>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name}</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>CLASSE : <strong>{find_class_number(pupil.pupil.class_school)} {find_cycle(pupil.pupil.cycle_school)} {find_class_order(pupil.pupil.class_order)}</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>ANNÉE SCOLAIRE : <strong>{annee_scolaire.year_name}</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr style={{ padding: 20 }}>
                                                                        <td colSpan={2}><strong>REÇU DES FRAIS SCOLAIRES</strong></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>DATE : <strong>{find_date(paiement.date_creation)}</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>REÇU No : <strong>{paiement.paiement_id}</strong></td>
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
                                                                        <td>ÉLÈVE : <strong>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name}</strong>
                                                                        </td>
                                                                    </tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                    <tr>
                                                                        <td style={{ width: '50%' }}>Montant payé : <strong>{paiement.montant_paye} dollars USD</strong>
                                                                        </td>
                                                                        <td>Montant En toutes lettres : <strong>{paiement.montant_text} dollars Américains</strong>
                                                                        </td>
                                                                    </tr>
                                                                    <tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr>
                                                                    <tr>
                                                                        <td style={{ width: '50%' }} valign="top">Solde année : <strong>{pupil.soldes.solde} dollars USD</strong>
                                                                        </td>
                                                                        <td>Solde par trimestre    <FaArrowDown size={10} style={{ marginLeft: 5 }} /><br />
                                                                            <div style={{ marginTop: 5, paddingTop: 2 }} className="td-border-left-top dispp">
                                                                                <span>T1 : <strong>{pupil.soldes.solde1}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                                <span>T2 : <strong>{pupil.soldes.solde2}</strong></span><span style={{ marginLeft: 20, marginRight: 20, color: 'gray' }}> | </span>
                                                                                <span>T3 : <strong>{pupil.soldes.solde3}</strong></span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ width: '50%' }}>Motif du paiement : <strong>{find_libelle(paiement.libelle)}</strong>
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

                                <div style={{ textAlign: 'left', marginTop: 5 }}>
                                    <span>
                                        <FaChevronDown color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                        <span
                                            onClick={() => delete_recu(paiement.paiement_id)}
                                            className="add-minus">
                                            EFFACER CE REÇU
                                        </span>
                                    </span>

                                    <span>
                                        <span className="divider-menu-topbar"></span>
                                        <FaPrint color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                                        <span onClick={() => printContent(`recu ${paiement.paiement_id}`)} className="add-minus">
                                            IMPRIMER CE REÇU
                                        </span>
                                    </span>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
}

export default AllPupilPaiements;


