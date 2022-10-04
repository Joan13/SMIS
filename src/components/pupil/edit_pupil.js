import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonNormal from "../includes/button_normal";

const EditPupil = () => {
    const dispatch = useDispatch();
    const pupil = useSelector(state => state.pupil);
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const cycles = useSelector(state => state.cycles);
    const class_numbers = useSelector(state => state.class_numbers);
    const orders = useSelector(state => state.orders);
    const sections = useSelector(state => state.sections);
    const options = useSelector(state => state.options);
    const paiement_categories = useSelector(state => state.paiement_categories);
    const [pupil_id, setPupil_id] = useState(pupil.pupil.pupil_id);
    const [first_name_pupil, setFirst_name_pupil] = useState(pupil.pupil.first_name);
    const [second_name_pupil, setSecond_name_pupil] = useState(pupil.pupil.second_name);
    const [last_name_pupil, setLast_name_pupil] = useState(pupil.pupil.last_name);
    const [gender_pupil, setGender_pupil] = useState(pupil.pupil.gender);
    const [birth_date_pupil, setBirth_date_pupil] = useState(pupil.pupil.birth_date);
    const [birth_place_pupil, setBirth_place_pupil] = useState(pupil.pupil.birth_place);
    const [father_name, setFather_name] = useState(pupil.pupil.father_names);
    const [mother_name, setMother_name] = useState(pupil.pupil.mother_names);
    const [parents_alive, setParents_alive] = useState(pupil.pupil.parents_alive);
    const [parents_state, setParents_state] = useState(pupil.pupil.parents_state);
    const [lives_with, setLives_with] = useState(pupil.pupil.lives_with);
    const [father_work_pupil, setFather_work_pupil] = useState(pupil.pupil.father_principal_work);
    const [mother_work_pupil, setMother_work_pupil] = useState(pupil.pupil.mother_principal_work);
    const [cycle_school_pupil, setCycle_school_pupil] = useState(pupil.pupil.cycle_school);
    const [class_school_pupil, setClass_school_pupil] = useState(pupil.pupil.class_school);
    const [class_order_pupil, setClass_order_pupil] = useState(pupil.pupil.class_order);
    const [class_section_pupil, setClass_section_pupil] = useState(pupil.pupil.class_section);
    const [class_option_pupil, setClass_option_pupil] = useState(pupil.pupil.class_option);
    const [school_year_pupil, setSchool_year_pupil] = useState(annee);
    const [email_address_pupil, setEmail_address_pupil] = useState(pupil.pupil.email_address);
    const [physical_address_pupil, setPhysical_address_pupil] = useState(pupil.pupil.physical_address);
    const [contact_1_pupil, setContact_1_pupil] = useState(pupil.pupil.contact_phone_1);
    const [contact_2_pupil, setContact_2_pupil] = useState(pupil.pupil.contact_phone_2);
    const [contact_3_pupil, setContact_3_pupil] = useState(pupil.pupil.contact_phone_3);
    const [contact_4_pupil, setContact_4_pupil] = useState(pupil.pupil.contact_phone_4);
    const [id_number, setId_number] = useState(pupil.pupil.identification_number);
    const [perm_number, setPerm_number] = useState(pupil.pupil.permanent_number);
    const [nationality, setNationality] = useState(pupil.pupil.nationality);
    const [statut_scolaire, setStatut_scolaire] = useState(pupil.pupil.statut_scolaire);
    const [paiement_category, setPaiement_category] = useState(pupil.pupil.paiement_category);
    const [pupilIdentification, setPupilIdentification] = useState(pupil.pupil.pupilIdentification);
    const [isInactive, setIsInactive] = useState(pupil.pupil.is_inactive);

    const find_pupil = () => {
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil.pupil.pupil_id,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_PUPIL", payload: response.pupil });
                dispatch({ type: "SET_TITLE_MAIN", payload: (response.pupil.pupil.first_name + " " + response.pupil.pupil.second_name + " " + response.pupil.pupil.last_name).toUpperCase() });
            })
            .catch((error) => { });
    };

    const Edit_pupil = () => {

        if ((first_name_pupil === "" || second_name_pupil === "" || cycle_school_pupil === "" || class_school_pupil === "") && isInactive !== '1') {
            // this.setState({ modal_title: "Information erreur", modal_main_text: "Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identité de base de l'élève et son orientation scolaire.", modal_view: true, loading_middle: false });
            console.log(first_name_pupil + " " + second_name_pupil + " " + cycle_school_pupil + " " + class_school_pupil);
        } else {
            let url_server = sessionStorage.getItem('yambi_smis_url_server');
            let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/edit_pupil.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil.pupil.pupil_id,
                    first_name_pupil: first_name_pupil,
                    second_name_pupil: second_name_pupil,
                    last_name_pupil: last_name_pupil,
                    gender_pupil: gender_pupil,
                    birth_date_pupil: birth_date_pupil,
                    birth_place_pupil: birth_place_pupil,
                    father_name: father_name,
                    mother_name: mother_name,
                    parents_alive: parents_alive,
                    parents_state: parents_state,
                    lives_with: lives_with,
                    father_work_pupil: father_work_pupil,
                    mother_work_pupil: mother_work_pupil,
                    cycle_school_pupil: cycle_school_pupil,
                    class_school_pupil: class_school_pupil,
                    class_order_pupil: class_order_pupil,
                    class_section_pupil: class_section_pupil,
                    class_option_pupil: class_option_pupil,
                    school_year_pupil: annee,
                    email_address_pupil: email_address_pupil,
                    physical_address_pupil: physical_address_pupil,
                    contact_1_pupil: contact_1_pupil,
                    contact_2_pupil: contact_2_pupil,
                    contact_3_pupil: contact_3_pupil,
                    contact_4_pupil: contact_4_pupil,
                    identification_number: id_number,
                    permanent_number: perm_number,
                    nationality: nationality,
                    statut_scolaire: statut_scolaire,
                    paiement_category: paiement_category,
                    pupilIdentification: pupilIdentification,
                    is_inactive: isInactive }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if(response === '1')  { 
                        if(isInactive !== '1')  {
                        find_pupil();
                        dispatch({type:"SET_EDIT_PUPIL", payload:false});
                        alert("Les modifications ont été enregistrées avec succès");
                    } else  {
                        dispatch({type:"SET_EDIT_PUPIL", payload:false});
                        alert("Vous avez effacé cet élève. Rechargez la page pour constater les modifications");
                    } }
                })
                .catch((error) => {
                    // this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        }
    };

    return (
        <div className="center-fixeddd" style={{ paddingRight: 20 }}>

            <ButtonNormal text="Enregistrer les modifications" style={{ float: 'right', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }} onPress={() => Edit_pupil()} />

            <span className="title-background">I. DE L'IDENTITÉ DE BASE DE L'ÉLÈVE</span>
            <table className="tables-new-pupil">
                <tbody>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setFirst_name_pupil(val.target.value)}
                                placeholder="Nom"
                                className="input-normall"
                                value={first_name_pupil}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <input
                                onChange={(val) => setSecond_name_pupil(val.target.value)}
                                placeholder="Post-nom"
                                className="input-normall"
                                value={second_name_pupil}
                                style={{ width: '96%' }}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setLast_name_pupil(val.target.value)}
                                placeholder="Prénom de l'élève"
                                className="input-normall"
                                value={last_name_pupil}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setGender_pupil(val.target.value)}
                                value={gender_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Féminin</option>
                                <option value="1">Masculin</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <span style={{ color: 'transparent' }}>.</span>
                            <input
                                onChange={(val) => setBirth_place_pupil(val.target.value)}
                                placeholder="Lieu de naissance"
                                className="input-normall"
                                value={birth_place_pupil}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'left' }}>
                            Date de naissance<br />
                            <input
                                onChange={(val) => setBirth_date_pupil(val.target.value)}
                                className="input-normall"
                                placeholder="Date de naissance"
                                type='date'
                                value={birth_date_pupil}
                                style={{ width: '96%' }}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setNationality(val.target.value)}
                                placeholder="Nationalité"
                                className="input-normall"
                                value={nationality}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setPaiement_category(val.target.value)}
                                value={paiement_category}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="">Catégorie de paiement</option>
                                {paiement_categories.map((category, index) => (
                                    <option value={category.category_id} key={index}>{category.category_name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <span className="title-background">II. DE L'ORIENTATION SCOLAIRE</span>
            <table className="tables-new-pupil">
                <tbody>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setCycle_school_pupil(val.target.value)}
                                label="Cycle d'étude"
                                value={cycle_school_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Sélectionner le cycle</option>
                                {cycles.map((cycle, index) => (
                                    <option value={cycle.cycle_id} key={index}>{cycle.cycle_name}</option>
                                ))}
                            </select>
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setClass_school_pupil(val.target.value)}
                                placeholder="Classe"
                                value={class_school_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Séléctionner la classe</option>
                                {class_numbers.map((classe, index) => (
                                    <option value={classe.class_id} key={index}>{classe.class_number}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setClass_order_pupil(val.target.value)}
                                value={class_order_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Sélectionner l'ordre de classe</option>
                                {orders.map((order, index) => (
                                    <option value={order.order_id} key={index}>{order.order_name}</option>
                                ))}
                            </select>
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setClass_section_pupil(val.target.value)}
                                value={class_section_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Séléctionner la section</option>
                                {sections.map((section, index) => (
                                    <option value={section.section_id} key={index}>{section.section_name}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left', width: '50%' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setClass_option_pupil(val.target.value)}
                                value={class_option_pupil}
                                style={{ width: '100%', textAlign: 'left' }}>
                                <option value="0">Séléctionner l'option</option>
                                {options.map((option, index) => (
                                    <option value={option.option_id} key={index}>{option.option_name}</option>
                                ))}
                            </select>
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            {/* <select
                                    className="select-normall"
                                    onChange={(val) => setStatut_scolaire(val.target.value)}
                                    value={statut_scolaire}
                                    style={{ width: '100%' }}>
                                    <option selected value="0">Normal</option>
                                    <option value="1">Nouveau (N)</option>
                                    <option value="1">Reddoublant (D)</option>
                                    <option value="1">Nouveau reddoublant (ND)</option>
                                </select> */}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <input
                                onChange={(val) => setId_number(val.target.value)}
                                placeholder="Numéro d'identification"
                                className="input-normall"
                                value={id_number}
                                style={{ width: '96%' }}
                            />
                        </td>
                        <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            <input
                                onChange={(val) => setPerm_number(val.target.value)}
                                placeholder="Numéro permanent"
                                className="input-normall"
                                value={perm_number}
                                style={{ width: '96%' }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* <span className="title-background">III. DES PARENTS DE L'ÉLÈVE</span> */}
            {/* <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: "50%" }}>
                                <input
                                    onChange={(val) => this.setState({ father_name: val.target.value })}
                                    placeholder="Nom du père"
                                    className="input-normall"
                                    value={this.state.father_name}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_name: val.target.value })}
                                    placeholder="Noms de la mère"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.mother_name}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    // select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ parents_alive: val.target.value })}
                                    value={this.state.parents_alive}
                                    style={{ width: '100%' }}>
                                    <option value="">Vie des parents</option>
                                    <option value="0">Les deux parents en vie</option>
                                    <option value="1">Seul le père en vie</option>
                                    <option value="1">Seule la mère en vie</option>
                                    <option value="1">Les deux parents dècédés</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ parents_state: val.target.value })}
                                    value={this.state.parents_state}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">Statut des parents</option>
                                    <option value="0">Ensemble</option>
                                    <option value="1">Divorcés</option>
                                    <option value="1">Célibataire</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ lives_with: val.target.value })}
                                    value={this.state.lives_with}
                                    style={{ width: '100%' }}>
                                    <option value="">Vis avec</option>
                                    <option value="0">Les deux parents</option>
                                    <option value="1">Le père</option>
                                    <option value="1">La mère</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ father_work_pupil: val.target.value })}
                                    placeholder="Travail du père"
                                    className="input-normall"
                                    value={this.state.father_work_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_work_pupil: val.target.value })}
                                    placeholder="Travail de la mère"
                                    value={this.state.mother_work_pupil}
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table> */}

            {/* <span className="title-background">IV. DES CONTACTS ET ADRESSES</span> */}
            {/* <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ email_address_pupil: val.target.value })}
                                    placeholder="Adresse électronique"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.email_address_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ physical_address_pupil: val.target.value })}
                                    placeholder="Adresse physique"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.physical_address_pupil}
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
                                    value={this.state.contact_1_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_2_pupil: val.target.value })}
                                    placeholder="Contact phone 2"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.contact_2_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_3_pupil: val.target.value })}
                                    placeholder="Contact phone 3"
                                    value={this.state.contact_3_pupil}
                                    // variant="outlined"
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_4_pupil: val.target.value })}
                                    placeholder="Contact phone 4"
                                    value={this.state.contact_4_pupil}
                                    // variant="outlined"
                                    className="input-normall"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table> */}

                <span className="title-background">III. EFFACER L'ÉLÈVE</span>
            <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                            <select
                                className="select-normall"
                                onChange={(val) => setIsInactive(val.target.value)}
                                value={isInactive}
                                style={{ width: '100%', textAlign: 'left' }}>
                                 <option value="0">Sélectionner option</option>
                                <option value="1">Désactiver l'élève (Effacer)</option>
                            </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

            {/* {this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                        </div>
                    </div> : null} */}

        </div>
    )
}

export default EditPupil;
