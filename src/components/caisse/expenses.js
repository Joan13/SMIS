import { CircularProgress } from '@material-ui/core';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { http } from '../../global_vars';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FiPlus } from 'react-icons/fi';

// class NewPaiements extends Component {
const Expenses = () => {
    const [montant, setMontant] = useState("");
    const [montant_text, setMontant_text] = useState("");
    const [libelle, setLibelle] = useState("");
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const expenses = useSelector(state => state.expenses);
    const libelles = useSelector(state => state.libelles);
    const loading_middle = useSelector(state => state.loading_middle);
    const [number_expense, setNumber_expense] = useState(1);
    const [nouvelle_depense, setNouvelle_depense] = useState(false);
    const [success, setSuccess] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(expenses)
    }, []);

    const new_expense = () => {

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

        const dd = day + "/" + month + "/" + date.getFullYear();
        const hh = date.getHours() + ":" + date.getMinutes();

        if (montant !== "" && montant_text !== "" && libelle !== "") {
            dispatch({ type: "LOADING_MIDDLE", payload: true });

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/new_expense.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    montant: montant,
                    libelle: libelle,
                    date_creation: dd,
                    hour: hh,
                    school_year: annee,
                    number_expense: number_expense
                })
            })
                .then((response) => response.json())
                .then((response) => {

                    if (response.message === "1") {
                        setMontant("");
                        setMontant_text("");
                        setLibelle("");
                        setNumber_expense("1");
                        setSuccess("Operation successful");

                        dispatch({ type: "SET_EXPENSES", payload: response.depenses });
                    }
                })
                .catch((error) => {
                    // console.log(error)
                    // alert("Erreur");
                });
        }
        // else {
        //     alert("Vous devez renseigner le libellé et le montant avant de procéder");
        //     // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à l'enregistrement du nouveau paiement. Tous les champs sont obligatoires, notamment le libellé et les champs des montants.", modal_view: true, loading_middle: false });
        // }
    }

    return (
        <div>
            {nouvelle_depense ? <table style={{ width: "100%" }}>
                <thead>
                    <tr className='border border-background-50 dark:border-gray-20'>
                        <th className='border-none bg-background-50 dark:bg-background-20 pt-3 pb-3'>
                            <strong style={{width:'100%'}}>Nouvelle dépense</strong>
                            <button onClick={() => setNouvelle_depense(false)}
                                className='nodrag bg-primary-100 rounded-xl text-text-20 py-2 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6 rightt' style={{float: 'right'}}>
                                Vous toutes les dépenses
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            Libellé:
                                            <input
                                                value={libelle}
                                                onChange={(value) => setLibelle(value.target.value)}
                                                placeholder="Ex: 130"
                                                className="input-normall w-full border border-gray-50 dark:border-gray-20"
                                                style={{ width: '80%' }} />
                                        </td>

                                        <td>
                                            Montant (en dollars US):<br />
                                            <input
                                                value={montant}
                                                onChange={(value) => {
                                                    setMontant(value.target.value);
                                                    if (parseInt(value.target.value) >= 0) setMontant_text(NumberToLetter(value.target.value));
                                                }}
                                                placeholder="Ex: 130"
                                                maxLength={14}
                                                className="input-normall w-full border border-gray-50 dark:border-gray-20"
                                                style={{ width: '80%' }}
                                                type="number" />
                                        </td>

                                        <td style={{ paddingTop: 20 }}>
                                            Quantité:<br />
                                            <input
                                                value={number_expense}
                                                onChange={(value) => setNumber_expense(value.target.value)}
                                                placeholder="Ex: 130"
                                                maxLength={5}
                                                className="input-normall w-full border border-gray-50 dark:border-gray-20"
                                                style={{ width: '80%' }}
                                                type="number" />
                                            Montant total : <span style={{ fontWeight: 'bold', color: 'rgb(51 143 255)' }}> {number_expense * montant}</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {success !== "" ?
                                                <><span style={{ color: 'green', marginBottom: 5 }} className='flex items-center'>
                                                    <FaCheckCircle color="green" size={11} style={{ marginRight: 5 }} />
                                                    {success}
                                                </span><br /></> : null}
                                            <br />

                                            {loading_middle ?
                                                <><CircularProgress style={{ color: 'rgb(0, 80, 180)', marginLeft: '35%' }} /><br /></>
                                                :
                                                <button onClick={new_expense}
                                                    style={{ width: '90%' }}
                                                    className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6'>
                                                    Valider la dépense
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
                :
                expenses.length === 0 ?
                    <div style={{ textAlign: 'center', marginTop: 50, alignItems: 'center' }}>
                        Aucune dépense enregistrée pour le moment.<br /><br />

                        <button onClick={() => setNouvelle_depense(true)}
                            className='nodrag bg-primary-100 rounded-xl text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6'>
                            Ajouter une dépense
                        </button>
                    </div>
                    :
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr className=' border border-background-50 dark:border-gray-20'>
                                <th className='border-none bg-background-50 dark:bg-background-20 pt-3 pb-3'><strong style={{}}>Toutes les dépenses</strong>
                                <button onClick={() => setNouvelle_depense(true)}
                            className='nodrag bg-primary-100 rounded-xl text-text-20 py-2 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md pl-6 pr-6' style={{float: 'right'}}>
                            Ajouter une dépense
                        </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <th style={{ width: 35 }}>N0</th>
                                                <th style={{textAlign:'left', paddingLeft: 15}}>Libellé</th>
                                                <th>Montant (en dollars US)</th>
                                                <th style={{ paddingTop: 10 }}>Quantité</th>
                                                <th style={{ paddingTop: 10 }}> Montant total </th>
                                                <th style={{ paddingTop: 10 }}> Date et heure </th>
                                            </tr>

                                            {expenses.map((expense, index) => {
                                                return (
                                                    <tr key={index + 1}>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{textAlign:'center'}}>{index + 1}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{paddingLeft: 15}}>{expense.libelle}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingTop: 10, textAlign:'center' }}>{expense.cout_depense}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingTop: 10, textAlign:'center' }}>{expense.number_depense}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingTop: 10, textAlign:'center' }}>{expense.number_depense * expense.cout_depense}</td>
                                                        <td className='border border-gray-50 dark:border-gray-20' style={{ paddingTop: 10, textAlign:'center' }}>{expense.date_creation} à {expense.heure}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>}
        </div>
    )
}

export default Expenses;
