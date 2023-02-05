import { FaEdit, FaMoneyBillWave, FaMoneyCheck, FaPrint } from "react-icons/fa";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { find_date, home_redirect, http } from "../../global_vars";
import { CircularProgress } from "@material-ui/core";
import NewPaiementWorker from "./new_paiement";

const ViewWorker = () => {

    const employee = useSelector(state => state.employee);
    const autres = useSelector(state => state.autres);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const url_server = useSelector(state=>state.url_server);
    const loading_footer = useSelector(state=>state.loadding_footer);
    const [options_tab, setOptions_tab] = useState(1);
    const dispatch = useDispatch();

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

    return (
        <div>
            {!loading_footer ?
            <div>
                <div className="border-bottom-smooth" style={{ marginTop: 10 }}>
                <div id="table-employee-data">
                    <div>
                        <strong>{(autres.school_name).toUpperCase()}</strong><br />
                        <strong>{autres.school_bp}</strong><br />
                        <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                    </div>
                    <div style={{ float: 'right', marginTop: -47 }}>
                        <div style={{ fontWeight: 'bold', fontSize: 15 }}>FICHE DE L'EMPLOYÉ(E)</div>
                        <div style={{ fontWeight: 'bold', textAlign: 'right', marginTop: 2 }}>{employee.first_name.toUpperCase()} {employee.second_name.toUpperCase()} {employee.last_name}</div>
                    </div>
                </div>
                <div style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>Noms : {employee.first_name.toUpperCase()} {employee.second_name.toUpperCase()} {employee.last_name}</div>
                <table className="fiche-employee-pupil" style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td style={{ width: "50%" }} valign="top">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Sexe  </td>
                                            <td>
                                                <strong> : {employee.gender === "1" ? "Masculin (M)" : "Féminin (F)"}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Nationalité  </td>
                                            <td>
                                                <strong> : {employee.nationality !== null ? employee.nationality : "Non défini"}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date de naissance  </td>
                                            <td>
                                                <strong> : {find_date(employee.birth_date)}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Lieu de naissance  </td>
                                            <td>
                                                <strong> : {employee.birth_place !== "" ? employee.birth_place : "Non défini"}</strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>

                            <td style={{ width: "50%" }} valign="top">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Adresse  </td>
                                            <td>
                                                <strong> : {employee.physical_address !== "" ? employee.physical_address : "Non défini"}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email  </td>
                                            <td>
                                                <strong> : {employee.email_address !== "" ? employee.email_address : "Non défini"}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Téléphone  </td>
                                            <td>
                                                <strong> : {employee.user_phone_1 !== "" ? employee.user_phone_1 : "Non défini"}</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            {employee.user_phone_2 !== "" ?
                                                <td>
                                                    <strong> : {employee.user_phone_2}</strong>
                                                </td> : null}
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            {employee.user_phone_3 !== "" ?
                                                <td>
                                                    <strong> : {employee.user_phone_3}</strong>
                                                </td> : null}
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            {employee.user_phone_4 !== "" ?
                                                <td>
                                                    <strong> : {employee.user_phone_4}</strong>
                                                </td> : null}
                                        </tr>

                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ textAlign: 'left', marginTop: 20 }}>

                {/* <span>
                    {this.props.edit_pupil ? <FaChevronUp color="rgb(0, 80, 180)" style={{ marginRight: 5 }} /> : <FaChevronDown color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />}
                    <span
                        onClick={() => dispatch({ type: "SET_EDIT_PUPIL", payload: !this.props.edit_pupil })}
                        className="add-minus">
                        MODIFIER L'EMPLOYÉ(E)
                    </span>
                </span> */}

                <span>
                    <span className="divider-menu-topbar"></span>
                    <FaPrint color="rgb(0, 80, 180)" style={{ marginRight: 5 }} />
                    <span onClick={() => printContent("table-employee-data")} className="add-minus">
                        IMPRIMER LA FICHE DE L'EMPLOYÉ(E)
                    </span>
                </span>
            </div>

            <div className="div-div" style={{ paddingBottom: 0 }}>
                            <h3>Paiements de l'élève</h3>
                            <span  onClick={() => {
                               setOptions_tab(0);
}} 
                            style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${options_tab === 0 ? "select-no-border-bold" : ""}`}>
                                <span className="divider-menu-topbar"></span>
                                <FaEdit style={{ size: 17, marginRight: 5 }} />
                                Effectuer un paiement</span>

                            <span  onClick={() => {
                                setOptions_tab(1);
}} 
                            style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${options_tab === 1 ? "select-no-border-bold" : ""}`}>
                                <span className="divider-menu-topbar"></span>
                                <FaMoneyCheck style={{ size: 17, marginRight: 5 }} />
                                Fiche de paie</span>

                            <span onClick={() => {
                                setOptions_tab(2);
}} 
                            style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${options_tab === 2 ? "select-no-border-bold" : ""}`}>
                                <span className="divider-menu-topbar"></span>
                                <FaMoneyBillWave style={{ size: 17, marginRight: 5 }} />
                                Avance sur salaire</span>

                                <span onClick={() => {
                                setOptions_tab(3);
}} 
                            style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${options_tab === 3 ? "select-no-border-bold" : ""}`}>
                                <span className="divider-menu-topbar"></span>
                                <FaMoneyBillWave style={{ size: 17, marginRight: 5 }} />
                                Prêts</span>

                            {options_tab === 0 ?
                                <NewPaiementWorker />
                                : null}

                            {options_tab === 1 ?
                                <div>Fiche paie</div>
                                : null}

{options_tab === 2 ?
                                <div>Avances salaires</div>
                                : null}

{options_tab === 3 ?
                                <div>Prets</div>
                                : null}

                            {/* {this.props.paiements_frais_divers ?
                                <FraisDiversPupil /> : null} */}
                        </div>
                    </div>
                    :
                    <div className="progress-center-progress">
                        <CircularProgress style={{ color: 'rgb(0, 80, 180)' }} /><br />
                        Chargement de la page de l'employé(e)...
                    </div>}
        </div>
    )
}

export default ViewWorker;
