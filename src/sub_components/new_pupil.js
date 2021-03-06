import React from 'react';
import { Button, option, TextField, Input } from '@material-ui/core';
import { FaChevronDown, FaCircle, FaSearch, FaExpandAlt, FaCheck, FaToolbox, FaHome, FaTools, FaUserPlus, FaClipboard, FaCreativeCommonsSamplingPlus, FaUsers, FaFolder, FaUser, FaPaperclip, FaDatabase, FaStarHalfAlt, FaEdit, FaParagraph, FaChartBar, FaRegChartBar, FaChartLine, FaChartArea, FaChartPie, FaCalendar, FaNapster, FaComment, FaBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiBarChart, FiCalendar, FiClipboard, FiLogOut, FiMinimize2, FiPaperclip, FiRefreshCcw } from 'react-icons/fi';
import modalView from '../includes/modal';

export default class NewPupil extends React.Component {

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
            cycle_school_pupil: "",
            class_school_pupil: "",
            class_order_pupil: "0",
            class_section_pupil: "0",
            class_option_pupil: "0",
            school_year_pupil: "",
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
        }
    }

    get_general_info(annee) {

        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        this.setState({
            loading_middle: true,
        });

        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/get_info_home.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    annees: response.annees,
                    class_numbers: response.class_numbers,
                    orders: response.orders,
                    sections: response.sections,
                    options: response.options,
                    cycles: response.cycles,
                })

                console.log(response.cycles)
            })
            .catch((error) => {
                // alert(error.toString());
                this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, is_loading_home: false, loading_middle: false });
            });
    };

    register_new_pupil() {

        if (this.state.first_name == "" || this.state.second_name == "" || this.state.cycle_school_pupil == "" || this.state.school_year_pupil == "" || this.state.class_school_pupil == "") {
            this.setState({ modal_title: "Information erreur", modal_main_text: "Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identit?? de base de l'??l??ve et son orientation scolaire.", modal_view: true, loading_middle: false });
        } else {
            let url_server = sessionStorage.getItem('yambi_smis_url_server');
            this.setState({
                loading_middle: true,
            });

            let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/new_pupil.php";

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
                    school_year_pupil: this.state.school_year_pupil,
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
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({ modal_title: "Information Succ??s", modal_main_text: "Vous venez d'enregistrer un nouvel(le) ??l??ve. Vous pourrez editer ses informations au moment voulu.", modal_view: true, loading_middle: false });
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
                        statut_scolaire: "0"
                    })
                })
                .catch((error) => {
                    // alert(error.toString());
                    this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de proc??der ?? la requ??te. V??rifiez que vous ??tes bien connect??(e) au serveur ensuite r??essayez.", modal_view: true, loading_middle: false });
                });
        }
    };

    componentDidMount() {
        // this.get_general_info("");
    }

    render() {
        return (
            <div className="center-fixeddd" style={{ paddingRight: 20 }}>

                <div
                    className="save-pupil"
                    onClick={() => this.register_new_pupil()}>
                    Enregistrer l'??l??ve
                </div>

                <span className="title-background">I. DE L'IDENTIT?? DE BASE DE L'??L??VE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                {/* <TextField
                                    onChange={(val) => this.setState({ first_name_pupil: val.target.value })}
                                    placeholder="Nom de l'??l??ve"
                                    label="Nom"
                                    value={this.state.first_name_pupil}
                                    variant="outlined"
                                    style={{ width: '96%' }}
                                /> */}

                                <input
                                    onChange={(val) => this.setState({ first_name_pupil: val.target.value })}
                                    placeholder="Nom"
                                    className="input-normall"
                                    value={this.state.first_name_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ second_name_pupil: val.target.value })}
                                    placeholder="Post-nom"
                                    className="input-normall"
                                    value={this.state.second_name_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ last_name_pupil: val.target.value })}
                                    placeholder="Pr??nom de l'??l??ve"
                                    // label="Pr??nom"
                                    className="input-normall"
                                    value={this.state.last_name_pupil}
                                    // variant="outlined"
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ gender_pupil: val.target.value })}
                                    placeholder="Sexe"
                                    variant="outlined"
                                    value={this.state.gender_name_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="0">F??minin</option>
                                    <option value="1">Masculin</option>
                                </select>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ birth_place_pupil: val.target.value })}
                                    placeholder="Lieu de naissance"
                                    className="input-normall"
                                    // label="N?? (e) ??"
                                    value={this.state.birth_place_pupil}
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
                                    type={this.state.date_type}
                                    // onClick={this.setState({date_type:'date'})}
                                    value={this.state.birth_date_pupil}
                                    //                                     ref={input=>{
                                    // if(input.focus()) {
                                    //     console.log('focused')
                                    // }
                                    //                                     }}
                                    // variant="outlined"
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ nationality: val.target.value })}
                                    placeholder="Nationalit??"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.nationality}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                {/* <input
            onChange={(val) => this.setState({ first_name_pupil: val.target.value })}
            className="input-normall"
            type="date"
            placeholder="Date de naissance"
             /> */}
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
                                    onChange={(val) => this.setState({ school_year_pupil: val.target.value })}
                                    placeholder="Ann??e scolaire"
                                    // variant="outlined"
                                    value={this.state.school_year_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">S??lectionner l'ann??e scolaire</option>
                                    {this.state.annees.map((annee, index) => (
                                        <option value={annee.year_id} key={index}>{annee.year_name}</option>
                                    ))}
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ cycle_school_pupil: val.target.value })}
                                    label="Cycle d'??tude"
                                    // variant="outlined"
                                    value={this.state.cycle_school_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">S??lectionner le cycle</option>
                                    {this.state.cycles.map((cycle, index) => (
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
                                    value={this.state.class_school_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">S??l??ctionner la classe</option>
                                    {this.state.class_numbers.map((classe, index) => (
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
                                    value={this.state.class_order_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>S??lectionner l'ordre de classe</option>
                                    {this.state.orders.map((order, index) => (
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
                                    value={this.state.class_section_pupil}
                                    // variant="outlined"
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>S??l??ctionner la section</option>
                                    {this.state.sections.map((section, index) => (
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
                                    value={this.state.class_option_pupil}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option>S??l??ctionner l'option</option>
                                    {this.state.options.map((option, index) => (
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
                                    value={this.state.statut_scolaire}
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
                                    placeholder="Num??ro d'identification"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.id_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ perm_number: val.target.value })}
                                    placeholder="Num??ro permanent"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.perm_number}
                                    style={{ width: '96%' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <span className="title-background">III. DES PARENTS DE L'??L??VE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: "50%" }}>
                                <input
                                    onChange={(val) => this.setState({ father_name: val.target.value })}
                                    placeholder="Nom du p??re"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.father_name}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_name: val.target.value })}
                                    label="Noms de la m??re"
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
                                    // label="Vie des parents"
                                    // variant="outlined"
                                    value={this.state.parents_alive}
                                    style={{ width: '100%' }}>
                                    <option value="">Vie des parents</option>
                                    <option value="0">Les deux parents en vie</option>
                                    <option value="1">Seul le p??re en vie</option>
                                    <option value="1">Seule la m??re en vie</option>
                                    <option value="1">Les deux parents d??c??d??s</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ parents_state: val.target.value })}
                                    // label="statut des parents"
                                    // variant="outlined"
                                    value={this.state.parents_state}
                                    style={{ width: '100%', textAlign: 'left' }}>
                                    <option value="">Statut des parents</option>
                                    <option value="0">Ensemble</option>
                                    <option value="1">Divorc??s</option>
                                    <option value="1">C??libataire</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <select
                                    className="select-normall"
                                    onChange={(val) => this.setState({ lives_with: val.target.value })}
                                    // label="Vis avec"
                                    value={this.state.lives_with}
                                    // variant="outlined"
                                    style={{ width: '100%' }}>
                                    <option value="">Vis avec</option>
                                    <option value="0">Les deux parents</option>
                                    <option value="1">Le p??re</option>
                                    <option value="1">La m??re</option>
                                </select>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <input
                                    onChange={(val) => this.setState({ father_work_pupil: val.target.value })}
                                    placeholder="Travail du p??re"
                                    // variant="outlined"
                                    className="input-normall"
                                    value={this.state.father_work_pupil}
                                    style={{ width: '96%' }}
                                />
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <input
                                    onChange={(val) => this.setState({ mother_work_pupil: val.target.value })}
                                    placeholder="Travail de la m??re"
                                    value={this.state.mother_work_pupil}
                                    // variant="outlined"
                                    className="input-normall"
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
                                    placeholder="Adresse ??lectronique"
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
                </table>

                {this.state.modal_view ?
                    <div className="main-div-modal">
                        {modalView(this.state.modal_title, this.state.modal_main_text)}
                        <div className="sub-div-modal">
                            <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                        </div>
                    </div> : null}
            </div>
        )
    }
}