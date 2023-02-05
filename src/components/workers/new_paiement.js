import { useSelector } from "react-redux";
import {useState} from 'react';
import { NumberToLetter } from 'convertir-nombre-lettre';
import { FaCheckCircle } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";

const NewPaiementWorker=()=>{

    const employee = useSelector(state=>state.employee);
    const libelles = useSelector(state=>state.libelles);
    const [libelle_paie, setLibelle_paie] = useState("");
    const [montant_paie, setMontant_paie] = useState("");
    const [loading_middle, setLoading_middle] = useState(false);
    const [success, setSuccess] = useState("");


    return(
        <div>
            <table style={{ width: "100%" }}>
                                    <tbody>
                                        {
                                            employee.paiement_amount === null ?
                                                <div>
                                                    Cet employé n'a pas de salaire pré-enregistré.<br/>
                                                    Veuillez enregistrer son salaire avant de proceder.
                                                </div>
                                                :
                                                <>
                                                    <tr>
                                                        <td>
                                                            <select
                                                                value={libelle_paie}
                                                                onChange={(val) => setLibelle_paie(val.target.value)}
                                                                style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white', marginBottom: 10, width: '80%' }} className="select-no-border-select">
                                                                <option value="">Sélectionner le libellé</option>
                                                                {libelles.map((libelle, index) => {
                                                                    if (parseInt(libelle.gender_libelle) === 1) { return (<option key={index} value={libelle.libelle_id}>{libelle.description_libelle}</option>) }
                                                                })}
                                                            </select>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            Montant (en dollars US):<br />
                                                            <input
                                                                value={montant_paie}
                                                                onChange={(value) => {
                                                                    setMontant_paie(value.target.value);
                                                                    // if (parseInt(value.target.value) >= 0) this.setState({ montant_text_paie: NumberToLetter(value.target.value) })
                                                                }}
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
                                                                    : null:null}
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
                                                                    // onClick={() => this.new_paiement()}  
                                                                    className="button-primary" style={{ width: '83%' }}>Valider le paiement</button></>
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
