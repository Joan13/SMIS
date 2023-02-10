import {useState} from 'react';
import { FaAccusoft } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';

export default function GestionPersonnel() {
const employees = useSelector(state=>state.workers);
const url_server = useSelector(state=>state.url_server);
const dispatch = useDispatch();

const Poste=(poste)=>{
    if (parseInt(poste) === 0) {
        return('Admin');
    } else if (parseInt(poste) === 1) {
        return('Promoteur/Recteur');
    } else if (parseInt(poste) === 2) {
        return('D. Discipline');
    } else if (parseInt(poste) === 3) {
        return('Financier/Économe');
    } else if (parseInt(poste) === 4) {
        return('Secretaire');
    } else if (parseInt(poste) === 5) {
        return('Enseignant');
    } else if (parseInt(poste) === 6) {
        return('Percepteur(trice)');
    } else if (parseInt(poste) === 7) {
        return('D. Études');
    } else {
    }
}

const find_worker = (worker) => {
    let BaseURL = http + url_server + "/yambi_class_SMIS/API/find_worker.php";

    fetch(BaseURL, {
        method: 'POST',
        body: JSON.stringify({
            worker_id: worker,
        })
    })
        .then((response) => response.json())
        .then((response) => {
            dispatch({ type: "SET_FICHE_PAIE", payload: response.fiche_paie });
            dispatch({ type: "SET_EMPLOYEE", payload: response.worker });
        })
        .catch((error) => { });
};
    
const open_employee=(employee)=>{
    dispatch({ type: "SET_EMPLOYEE", payload: employee });
                                        dispatch({ type: "SET_MIDDLE_FUNC", payload: 30 });
                                        dispatch({ type: "SET_TITLE_MAIN", payload: employee.first_name.toUpperCase() + " " + employee.second_name.toUpperCase() + " " + employee.last_name });
                                        find_worker(employee.worker_id);
}

const modify_salaire=(worker_id, salaire, school_year)=> {

    // let user = sessionStorage.getItem('assemble_user_data');
    // user = JSON.parse(user);

    // if (user.poste === "4") {

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/modify_salaire.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                worker_id: worker_id,
                salaire: salaire,
                school_year: school_year
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_WORKERS", payload: response.employees });

            })
            .catch((error) => {
                this.setState({ loading_class: false, pupils_see: false });
            });
    // } else {
    //     alert("Vous ne pouvez pas modifier ce cours si vous n'êtes pas secrétaire");
    // }
}

    return(
        <div>
            <div style={{marginTop:10}}>
                <span style={{fontSize:15,fontWeight:'bold'}}>Gestion du personnel</span>
            <div
                                    onClick={()=>{
                                        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Ajouter membre du personnel" });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 16 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
                                    }}
                                    className="add-button">
                                        <FiPlus color='white' size={15} />
                                    </div>
                </div><br/>

{employees.length !== 0 ?
            <table style={{width:'100%'}} className='table-employees-full'>
                <thead>
                    <tr>
                        <th style={{width:35}}>N0</th>
                        <th>Noms</th>
                        <th style={{width:35}}>Sexe</th>
                        <th>Fonction</th>
                        <th>Salaire (USD)</th>
                        <th>Effacer</th>
                    </tr>
                </thead>
                <tbody>
                {employees.map((employee, index) => {
                            return (
                                <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.050)" }}
                                    key={index}>
                                        <td>{index + 1}</td>
                                    <td onClick={()=>open_employee(employee)}>{employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()}</td>
                                    <td onClick={()=>open_employee(employee)}>{employee.gender === "1" ? "M" : "F"}</td>
                                    <td onClick={()=>open_employee(employee)}>{Poste(employee.poste)}</td>
                                    <td>
                                        <input
                                        onChange={(e)=>modify_salaire(employee.worker_id, e.target.value, employee.worker_year)}
                                        value={employee.paiement_amount}
                                         />
                                    </td>
                                </tr>
                            )
                    })}
                </tbody>
            </table>
:
            <div style={{textAlign:'center', marginTop:200}}>
                <FaAccusoft color='gray' size={80} />
                <div style={{marginTop:20,marginBottom:10}}>Aucun employé enregistré pour le moment</div>
                <button  onClick={()=>{
                                        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Ajouter membre du personnel" });
        dispatch({ type: "SET_CLASSE_OPEN", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 16 });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: false });
                                    }}
                className='button-outline'>Ajouter un(e) employé(e)</button>
            </div>}
        </div>
    );
}