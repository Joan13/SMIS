import React from 'react';
import { Button } from '@material-ui/core';
import modalView from '../../includes/modal';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import ButtonNormal from '../includes/button_normal';
import { http } from '../../global_vars';

class NewPupil extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            annees: [],
            class_numbers: [],
            orders: [],
            sections: [],
            options: [],
            cycles: [],
            modal_view: false,
            first_name_pupil: "",
            second_name_pupil: "",
            last_name_pupil: "",
            gender_pupil: "0",
            birth_date_pupil: "",
            birth_place_pupil: "",
            father_name: "",
            mother_name: "",
            lives_with: "0",
            parents_alive: "0",
            parents_state: "0",
            father_work_pupil: "",
            mother_work_pupil: "",
            cycle_school_pupil: "",
            class_school_pupil: "",
            class_order_pupil: "0",
            class_section_pupil: "0",
            class_option_pupil: "0",
            email_address_pupil: "",
            physical_address_pupil: "",
            contact_1_pupil: "",
            contact_2_pupil: "",
            contact_3_pupil: "",
            contact_4_pupil: "",
            id_number: "",
            perm_number: "",
            nationality: "",
            statut_scolaire: "0",
            date_type: 'text',
            paiement_category: "",
        }
    }

    register_new_pupil() {

        if (this.state.first_name === "" || this.state.second_name === "" || this.state.cycle_school_pupil === "" || this.state.class_school_pupil === "") {
            this.setState({ modal_title: "Information erreur", modal_main_text: "Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identité de base de l'élève et son orientation scolaire.", modal_view: true, loading_middle: false });
        } else {
            // let url_server = sessionStorage.getItem('yambi_smis_url_server');
            this.setState({loading_middle: true});

            let BaseURL = http + this.props.url_server + "/yambi_class_SMIS/API/new_pupil.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    first_name_pupil: this.state.first_name_pupil,
                    second_name_pupil: this.state.second_name_pupil,
                    last_name_pupil: this.state.last_name_pupil,
                    gender_pupil: this.state.gender_pupil,
                    birth_date_pupil: this.state.birth_date_pupil,
                    birth_place_pupil: this.state.birth_place_pupil,
                    father_name: this.state.father_name,
                    mother_name: this.state.mother_name,
                    parents_alive: this.state.parents_alive,
                    parents_state: this.state.parents_state,
                    lives_with: this.state.lives_with,
                    father_work_pupil: this.state.father_work_pupil,
                    mother_work_pupil: this.state.mother_work_pupil,
                    cycle_school_pupil: this.state.cycle_school_pupil,
                    class_school_pupil: this.state.class_school_pupil,
                    class_order_pupil: this.state.class_order_pupil,
                    class_section_pupil: this.state.class_section_pupil,
                    class_option_pupil: this.state.class_option_pupil,
                    school_year_pupil: this.props.annee,
                    email_address_pupil: this.state.email_address_pupil,
                    physical_address_pupil: this.state.physical_address_pupil,
                    contact_1_pupil: this.state.contact_1_pupil,
                    contact_2_pupil: this.state.contact_2_pupil,
                    contact_3_pupil: this.state.contact_3_pupil,
                    contact_4_pupil: this.state.contact_4_pupil,
                    id_number: this.state.id_number,
                    perm_number: this.state.perm_number,
                    nationality: this.state.nationality,
                    statut_scolaire: this.state.statut_scolaire,
                    paiement_category: this.state.paiement_category,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    alert("Enregistrement réussi");
                    // this.setState({ modal_title: "Information Succès", modal_main_text: "Vous venez d'enregistrer un nouvel(le) élève. Vous pourrez editer ses informations au moment voulu.", modal_view: true, loading_middle: false });
                    this.setState({
                        first_name_pupil: "",
                        second_name_pupil: "",
                        last_name_pupil: "",
                        gender_pupil: "",
                        birth_date_pupil: "",
                        birth_place_pupil: "",
                        father_name: "",
                        mother_name: "",
                        lives_with: "0",
                        parents_alive: "0",
                        parents_state: "0",
                        father_work_pupil: "",
                        mother_work_pupil: "",
                        email_address_pupil: "",
                        physical_address_pupil: "",
                        contact_1_pupil: "",
                        contact_2_pupil: "",
                        contact_3_pupil: "",
                        contact_4_pupil: "",
                        id_number: "",
                        perm_number: "",
                        nationality: "",
                        statut_scolaire: "0",
                    })
                })
                .catch((error) => {
                    // console.log(error)
                    this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        }
    };

    render() {
        return (
            <div className="center-fixeddd" style={{ paddingRight: 20 }}>

                <div className='float-right'>
                    <ButtonNormal text="Enregistrer l'élève" onPress={() => this.register_new_pupil()} />
                </div>

                <span className="title-background-1">I. DE L'IDENTITÉ DE BASE DE L'ÉLÈVE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ first_name_pupil: val.target.value })}
                                    placeholder="Nom"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.first_name_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ second_name_pupil: val.target.value })}
                                    placeholder="Post-nom"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.second_name_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ last_name_pupil: val.target.value })}
                                    placeholder="Prénom de l'élève"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.last_name_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ gender_pupil: val.target.value })}
                                    value={this.state.gender_name_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option value="0">Féminin</option>
                                    <option value="1">Masculin</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <span style={{ color: 'transparent' }}>.</span>
                                <input
                                    onChange={(val) => this.setState({ birth_place_pupil: val.target.value })}
                                    placeholder="Lieu de naissance"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.birth_place_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'left' }}>
                                Date de naissance<br />
                                <input
                                    onChange={(val) => this.setState({ birth_date_pupil: val.target.value })}
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    placeholder="Date de naissance"
                                    type='date'
                                    value={this.state.birth_date_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ nationality: val.target.value })}
                                    placeholder="Nationalité"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.nationality}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ paiement_category: val.target.value })}
                                    value={this.state.paiement_category}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option value="">Catégorie de paiement</option>
                                    {this.props.paiement_categories.map((category, index) => (
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
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ cycle_school_pupil: val.target.value })}
                                    label="Cycle d'étude"
                                    value={this.state.cycle_school_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option value="">Sélectionner le cycle</option>
                                    {this.props.cycles.map((cycle, index) => (
                                        <option value={cycle.cycle_id} key={index}>{cycle.cycle_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ class_school_pupil: val.target.value })}
                                    placeholder="Classe"
                                    value={this.state.class_school_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option value="">Séléctionner la classe</option>
                                    {this.props.class_numbers.map((classe, index) => (
                                        <option value={classe.class_id} key={index}>{classe.class_number}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ class_order_pupil: val.target.value })}
                                    value={this.state.class_order_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option>Sélectionner l'ordre de classe</option>
                                    {this.props.orders.map((order, index) => (
                                        <option value={order.order_id} key={index}>{order.order_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ class_section_pupil: val.target.value })}
                                    value={this.state.class_section_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option>Séléctionner la section</option>
                                    {this.props.sections.map((section, index) => (
                                        <option value={section.section_id} key={index}>{section.section_name}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: '50%' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ class_option_pupil: val.target.value })}
                                    value={this.state.class_option_pupil}
                                    style={{ width: '96%', textAlign: 'left' }}>
                                    <option>Séléctionner l'option</option>
                                    {this.props.options.map((option, index) => (
                                        <option value={option.option_id} key={index}>{option.option_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ statut_scolaire: val.target.value })}
                                    value={this.state.statut_scolaire}
                                    style={{ width: '96%' }}>
                                    <option value="0">Statut scolaire</option>
                                    <option value="0">Normal</option>
                                    <option value="1">Nouveau (N)</option>
                                    <option value="1">Reddoublant (D)</option>
                                    <option value="1">Nouveau reddoublant (ND)</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ id_number: val.target.value })}
                                    placeholder="Numéro d'identification"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.id_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ perm_number: val.target.value })}
                                    placeholder="Numéro permanent"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.perm_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <span className="title-background">III. DES PARENTS DE L'ÉLÈVE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: "50%" }}>
                                <input
                                    onChange={(val) => this.setState({ father_name: val.target.value })}
                                    placeholder="Nom du père"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.father_name}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_name: val.target.value })}
                                    placeholder="Noms de la mère"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.mother_name}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ parents_alive: val.target.value })}
                                    value={this.state.parents_alive}
                                    style={{ width: '96%' }}>
                                    <option value="">Vie des parents</option>
                                    <option value="0">Les deux parents en vie</option>
                                    <option value="1">Seul le père en vie</option>
                                    <option value="1">Seule la mère en vie</option>
                                    <option value="1">Les deux parents dècédés</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ parents_state: val.target.value })}
                                    value={this.state.parents_state}
                                    style={{ width: '96%', textAlign: 'left' }}>
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
                                    className="select-normall border border-gray-50 dark:border-gray-20"
                                    onChange={(val) => this.setState({ lives_with: val.target.value })}
                                    value={this.state.lives_with}
                                    style={{ width: '96%' }}>
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
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.father_work_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_work_pupil: val.target.value })}
                                    placeholder="Travail de la mère"
                                    value={this.state.mother_work_pupil}
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <span className="title-background">IV. DES CONTACTS ET ADRESSES</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ email_address_pupil: val.target.value })}
                                    placeholder="Adresse électronique"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.email_address_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ physical_address_pupil: val.target.value })}
                                    placeholder="Adresse physique"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.physical_address_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_1_pupil: val.target.value })}
                                    placeholder="Ajouter un numéro de téléphone"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.contact_1_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_2_pupil: val.target.value })}
                                    placeholder="Ajouter un numéro de téléphone"
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    value={this.state.contact_2_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_3_pupil: val.target.value })}
                                    placeholder="Ajouter un numéro de téléphone"
                                    value={this.state.contact_3_pupil}
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ contact_4_pupil: val.target.value })}
                                    placeholder="Ajouter un numéro de téléphone"
                                    value={this.state.contact_4_pupil}
                                    className="input-normall border border-gray-50 dark:border-gray-20"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {!this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                        </div>
                    </div> : null} */}
            </div>
        )
    }
}

export default connect(mapStateToProps)(NewPupil);
