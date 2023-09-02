import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import modalView from '../../includes/modal';
import { http } from '../../global_vars';

export default function AddWorker() {

    const [loading_middle, setLoading_middle] = useState(false);
    const [modal_title, setModal_title] = useState("");
    const [modal_main_text, setModal_main_text] = useState("");
    const [modal_view, setModal_view] = useState(false);
    const [first_name, setFirst_name] = useState("");
    const [second_name, setSecond_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [gender, setGender] = useState("");
    const [free_day_1, setFree_day_1] = useState("");
    const [free_day_2, setFree_day_2] = useState("");
    const [poste, setPoste] = useState("");

    const annee = useSelector(state => state.annee);
    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);

    const add_worker = () => {

        if (first_name === "" || second_name === "" || poste === "" || gender === "") {
            setModal_title("Information erreur");
            setModal_main_text("Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identité de base de l'employé(e) et son orientation professionnelle (le poste qu'il occupe).");
            setModal_view(true);
            setLoading_middle(false);
        }
        else {

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/add_worker.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    first_name: first_name,
                    second_name: second_name,
                    last_name: last_name,
                    gender: gender,
                    free_day_1: free_day_1,
                    free_day_2: free_day_2,
                    poste: poste,
                    user_name: first_name.toLocaleLowerCase().trim() + "." + second_name.toLocaleLowerCase().trim() + "@yambi.class",
                    school_year: annee
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    // setModal_title("Information succès");
                    alert("Vous venez d'enregistrer un nouvau membre du personnel");
                    setModal_view(true);
                    setLoading_middle(false);
                    setFirst_name("");
                    setSecond_name("");
                    setLast_name("");
                    setGender("");
                    setPoste("");
                    setFree_day_1("");
                    setFree_day_2("");

                    dispatch({ type: "SET_WORKERS", payload: response.employees });

                })
                .catch((error) => {
                    setModal_title("Information erreur");
                    setModal_main_text("Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.");
                    setModal_view(true);
                    setLoading_middle(false);
                });
        }
    };

    const fetch_workers = () => {

        let BaseURL = http + url_server + "/yambi_class_SMIS/API/fetch_workers.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_WORKERS", payload: response });

            })
            .catch((error) => {
                setModal_title("Information erreur");
                setModal_main_text("Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.");
                setModal_view(true);
                setLoading_middle(false);
            });
    };

    return (
        <div className="center-fixeddd" style={{ paddingRight: 20 }}>

            <div
                className="save-pupil"
                onClick={() => add_worker()}>
                Enregistrer l'employé(e)
            </div>

            <span className="title-background">I. DE L'IDENTITÉ DE BASE DE L'EMPLOYÉ(E)</span>
            <table className="tables-new-pupil">
                <tbody>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setFirst_name(val.target.value)}
                                placeholder="Nom"
                                className="input-normall border border-gray-50 dark:border-gray-20"
                                value={first_name}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <input
                                onChange={(val) => setSecond_name(val.target.value)}
                                placeholder="Post-nom"
                                className="input-normall border border-gray-50 dark:border-gray-20"
                                value={second_name}
                                style={{ width: '96%' }}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setLast_name(val.target.value)}
                                placeholder="Prénom"
                                className="input-normall border border-gray-50 dark:border-gray-20"
                                value={last_name}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall border border-gray-50 dark:border-gray-20"
                                onChange={(val) => setGender(val.target.value)}
                                placeholder="Sexe"
                                variant="outlined"
                                value={gender}
                                style={{ width: '96%', textAlign: 'left' }}>
                                <option value="">Sélectionner le sexe</option>
                                <option value="0">Féminin</option>
                                <option value="1">Masculin</option>
                            </select>
                        </td>
                    </tr>

                    {/* <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ birth_place_pupil: val.target.value })}
                                    placeholder="Lieu de naissance"
                                    className="input-normall"
                                    // label="Né (e) à"
                                    value={birth_place_pupil}
                                    // variant="outlined"
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ birth_date_pupil: val.target.value })}
                                    // label="Le"
                                    className="input-normall"
                                    placeholder="Date de naissance"
                                    type={date_type}
                                    // onClick={this.setState({date_type:'date'})}
                                    value={birth_date_pupil}
                                    //                                     ref={input=>{
                                    // if(input.focus()) {
                                    //     console.log('focused')
                                    // }
                                    //                                     }}
                                    // variant="outlined"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr> */}

                    {/* <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ nationality: val.target.value })}
                                    placeholder="Nationalité"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={nationality}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                
                            </td>
                        </tr> */}
                </tbody>
            </table>
            {first_name !== "" || second_name !== "" ?
                <div>
                    <span>{first_name !== "" || second_name !== "" ? "Nom d'utilisateur" : ""}</span><br />
                    <strong style={{ color: 'rgb(0, 80, 180)' }}>{first_name.toLowerCase().trim()}{first_name !== "" || second_name !== "" ? "." : ""}{second_name.toLowerCase().trim()}</strong>
                    <strong>{first_name !== "" || second_name !== "" ? "@yambi.class" : ""}</strong>
                    <br /><br /><br />
                </div> : null}

            {/* <span className="title-background">II. DE L'ORIENTATION SCOLAIRE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ school_year_pupil: val.target.value })}
                                    placeholder="Année scolaire"
                                    // variant="outlined"
                                    value={school_year_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">Sélectionner l'année scolaire</option>
                                    {annees.map((annee, index) => (
                                        <option value={annee.year_id} key={index}>{annee.year_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ cycle_school_pupil: val.target.value })}
                                    label="Cycle d'étude"
                                    // variant="outlined"
                                    value={cycle_school_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">Sélectionner le cycle</option>
                                    {cycles.map((cycle, index) => (
                                        <option value={cycle.cycle_id} key={index}>{cycle.cycle_name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ class_school_pupil: val.target.value })}
                                    placeholder="Classe"
                                    // variant="outlined"
                                    value={class_school_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">Séléctionner la classe</option>
                                    {class_numbers.map((classe, index) => (
                                        <option value={classe.class_id} key={index}>{classe.class_number}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ class_order_pupil: val.target.value })}
                                    // label="Ordre de classe"
                                    // variant="outlined"
                                    value={class_order_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>Sélectionner l'ordre de classe</option>
                                    {orders.map((order, index) => (
                                        <option value={order.order_id} key={index}>{order.order_name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: '50%' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ class_section_pupil: val.target.value })}
                                    // label="Section"
                                    value={class_section_pupil}
                                    // variant="outlined"
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>Séléctionner la section</option>
                                    {sections.map((section, index) => (
                                        <option value={section.section_id} key={index}>{section.section_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ class_option_pupil: val.target.value })}
                                    // label="Option"
                                    // variant="outlined"
                                    value={class_option_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>Séléctionner l'option</option>
                                    {options.map((option, index) => (
                                        <option value={option.option_id} key={index}>{option.option_name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ statut_scolaire: val.target.value })}
                                    // label="Statut scolaire"
                                    // variant="outlined"
                                    value={statut_scolaire}
                                    style={{ width: '100%' }}>
                                    <option selected value="0">Normal</option>
                                    <option value="1">Nouveau (N)</option>
                                    <option value="1">Reddoublant (D)</option>
                                    <option value="1">Nouveau reddoublant (ND)</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ id_number: val.target.value })}
                                    placeholder="Numéro d'identification"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={id_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ perm_number: val.target.value })}
                                    placeholder="Numéro permanent"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={perm_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table> */}

            <span className="title-background">II. DE L'ORIENTATION PROFESSIONNELLE</span>
            <table className="tables-new-pupil">
                <tbody>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left', width: "50%" }}>
                            <select
                                className="select-normall border border-gray-50 dark:border-gray-20"
                                onChange={(val) => setPoste(val.target.value)}
                                value={poste}
                                style={{ width: '96%' }}>
                                <option value="">Sélectionner la fonction</option>
                                <option value="1">Promoteur / Préfet / Recteur</option>
                                <option value="7">Directeur des Études</option>
                                <option value="2">Directeur de Discipline</option>
                                <option value="3">Directeur des Financies / Économe</option>
                                <option value="4">Secrétaire</option>
                                <option value="5">Enseignant</option>
                                <option value="6">Caissier/caissière</option>
                                <option value="0">Administrateur Logiciel</option>
                            </select>
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            {/* {poste === 6 ?
                                    <select
                                    // select
                                    className="select-normall"
                                    onChange={(val) => setCourse(val.target.value)}
                                    // label="Vie des parents"
                                    // variant="outlined"
                                    value={course}
                                    style={{ width: '100%' }}>
                                    <option value="">Vie des parents</option>
                                    <option value="0">Les deux parents en vie</option>
                                    <option value="1">Seul le père en vie</option>
                                    <option value="1">Seule la mère en vie</option>
                                    <option value="1">Les deux parents dècédés</option>
                                </select>:null} */}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{ color: 'gray' }}>Jours de congé. Ajouter-en si l'employé(e) en a. Si il en a deux, compléter les deux journées.</td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <select
                                className="select-normall border border-gray-50 dark:border-gray-20"
                                onChange={(val) => setFree_day_1(val.target.value)}
                                value={free_day_1}
                                style={{ width: '96%' }}>
                                <option value="">Journée pédagogique 1</option>
                                <option value="1">Lundi</option>
                                <option value="2">Mardi</option>
                                <option value="3">Mercredi</option>
                                <option value="4">Jeudi</option>
                                <option value="5">Vendredi</option>
                                <option value="6">Samedi</option>
                            </select>
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall border border-gray-50 dark:border-gray-20"
                                onChange={(val) => setFree_day_2(val.target.value)}
                                value={free_day_2}
                                style={{ width: '96%', textAlign: 'left' }}>
                                <option value="">Journée pédagogique 2</option>
                                <option value="1">Lundi</option>
                                <option value="2">Mardi</option>
                                <option value="3">Mercredi</option>
                                <option value="4">Jeudi</option>
                                <option value="5">Vendredi</option>
                                <option value="6">Samedi</option>
                            </select>
                        </td>
                    </tr>
                    {/* <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ lives_with: val.target.value })}
                                    // label="Vis avec"
                                    value={lives_with}
                                    // variant="outlined"
                                    style={{ width: '100%' }}>
                                    <option value="">Vis avec</option>
                                    <option value="0">Les deux parents</option>
                                    <option value="1">Le père</option>
                                    <option value="1">La mère</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            </td>
                        </tr> */}
                    {/* <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ father_work_pupil: val.target.value })}
                                    placeholder="Travail du père"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={father_work_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_work_pupil: val.target.value })}
                                    placeholder="Travail de la mère"
                                    value={mother_work_pupil}
                                    // variant="outlined"
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr> */}
                </tbody>
            </table>

            {/* <span className="title-background">IV. DES CONTACTS ET ADRESSES</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ email_address_pupil: val.target.value })}
                                    placeholder="Adresse électronique"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={email_address_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ physical_address_pupil: val.target.value })}
                                    placeholder="Adresse physique"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={physical_address_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_1_pupil: val.target.value })}
                                    placeholder="Contact phone 1"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={contact_1_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_2_pupil: val.target.value })}
                                    placeholder="Contact phone 2"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={contact_2_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_3_pupil: val.target.value })}
                                    placeholder="Contact phone 3"
                                    value={contact_3_pupil}
                                    // variant="outlined"
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_4_pupil: val.target.value })}
                                    placeholder="Contact phone 4"
                                    value={contact_4_pupil}
                                    // variant="outlined"
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table> */}

            {modal_view ?
                <div className="main-div-modal">
                    {modalView(modal_title, modal_main_text)}
                    <div className="sub-div-modal">
                        <Button onClick={() => setModal_view(false)} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                    </div>
                </div> : null}
        </div>
    )
}