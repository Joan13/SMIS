import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { FaCheckCircle } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { http } from "../../global_vars";

const NewPaiementWorker = () => {

    const employee = useSelector(state => state.employee);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const [month_paie, setMonth_paie] = useState("");
    const [montant_paie, setMontant_paie] = useState("");
    const [loading_middle, setLoading_middle] = useState(false);
    const [success, setSuccess] = useState("");
    const url_server = useSelector(state => state.url_server);
    const user_data = useSelector(state => state.user_data);
    const dispatch = useDispatch();

    const months = [
        { month: "Janvier" },
        { month: "Février" },
        { month: "Mars" },
        { month: "Avril" },
        { month: "Mai" },
        { month: "Juin" },
        { month: "Juillet" },
        { month: "Août" },
        { month: "Septembre" },
        { month: "Octobre" },
        { month: "Novembre" },
        { month: "Décembre" },
    ]

    const new_paiement = () => {

        let date = new Date();
        let day = "";
        let month = "";

        if ((date.getDate().toString()).length === 1) {
            day = "0" + date.getDate();
        } else {
            day = date.getDate();
        }

        if ((parseInt(date.getMonth() + 1).toString()).length === 1) {
            month = "0" + parseInt(date.getMonth() + 1);
        } else {
            month = date.getMonth() + 1;
        }

        date = day + "/" + month + "/" + date.getFullYear();
        console.log({
            worker_id: employee.worker_id,
            montant_paie: montant_paie,
            month_paie: month_paie,
            user_id: user_data.user_id,
            school_year: employee.worker_year,
            date_entry: date
        })

        if (montant_paie !== "" && month_paie !== "") {
            setLoading_middle(true);

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/new_paiement_salaire.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    worker_id: employee.worker_id,
                    montant_paie: montant_paie,
                    month_paie: month_paie,
                    user_id: user_data.worker_id,
                    school_year: employee.worker_year,
                    date_entry: date
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    setMontant_paie("");
                    setMonth_paie("");
                    setSuccess("Operation successful");
                    setLoading_middle(false);

                    // dispatch({ type: "SET_SALAIRES_WORKER", payload: response.fiche_paie });
                })
                .catch((error) => {
                    console.log(error)
                    // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        } else {
            // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à l'enregistrement du nouveau paiement. Tous les champs sont obligatoires, notamment le libellé et les champs des montants.", modal_view: true, loading_middle: false });
        }
    }
    return (
        <div>
            <table style={{ width: "100%", maginBottom: 20 }}>
                <tbody>
                    {employee.paiement_amount === null ?
                        <div style={{ marginTop: 45, marginBottom: 45 }}>
                            Cet(te) employé(e) n'a pas de salaire pré-enregistré.<br />
                            Veuillez enregistrer son salaire avant de proceder.
                        </div>
                        :
                        <>
                            <tr>
                                <td>
                                    <select
                                        value={month_paie}
                                        onChange={(val) => setMonth_paie(val.target.value)}
                                        style={{
                                            color: 'rgba(0, 80, 180)',
                                            backgroundColor: 'white',
                                            marginBottom: 10,
                                            width: '66%'
                                        }} className="select-borderr">
                                        <option value="">Sélectionner le mois</option>
                                        {months.map((month, index) => (
                                            <option key={index} value={index + 1}>{month.month}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Année scolaire : <span style={{ fontWeight: 'bold', color: 'rgb(0, 80, 180)' }}> {annee_scolaire.year_name} </span><br /><br />
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    Montant (en dollars US):<br />
                                    <input
                                        value={montant_paie}
                                        onChange={(value) => { setMontant_paie(value.target.value); }}
                                        placeholder="Ex: 130"
                                        maxLength={14}
                                        className="input-montant"
                                        type="number" />
                                </td>
                            </tr>

                            <tr>
                                <td style={{ paddingTop: 10 }}>
                                    {montant_paie !== "" ?
                                        montant_paie > 0 ?
                                            <div><strong style={{ color: 'rgb(0, 80, 180)' }}>{NumberToLetter(montant_paie)} </strong>dollars Américains<br /></div>
                                            : null : null}
                                </td>
                            </tr>

                            <tr>
                                <td style={{ paddingTop: 10 }}>
                                    Salaire net : <span style={{ fontWeight: 'bold', color: 'rgb(0, 80, 180)' }}>{employee.paiement_amount} USD </span>  |
                                    En lettres : <span style={{ fontWeight: 'bold', color: 'rgb(0, 80, 180)' }}> {NumberToLetter(employee.paiement_amount)} </span> dollars Américains
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    {success !== "" ?
                                        <><span style={{ color: 'green', marginBottom: 5 }}>
                                            <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                            {success}
                                        </span><br /></> : null}
                                    <br />
                                    {loading_middle ?
                                        <><CircularProgress style={{ color: 'rgb(0, 80, 180)', marginLeft: '35%' }} /><br /></>
                                        :
                                        <><button
                                            onClick={() => new_paiement()}
                                            className="button-primary" style={{ width: '66%' }}>Valider le paiement</button></>
                                    }
                                </td>
                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default NewPaiementWorker;
