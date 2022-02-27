import React from 'react';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { FaChevronDown, FaCircle, FaSearch, FaExpandAlt, FaCheck, FaToolbox, FaHome, FaTools, FaUserPlus, FaClipboard, FaCreativeCommonsSamplingPlus, FaUsers, FaFolder, FaUser, FaPaperclip, FaDatabase, FaStarHalfAlt, FaEdit, FaParagraph, FaChartBar, FaRegChartBar, FaChartLine, FaChartArea, FaChartPie, FaCalendar, FaNapster, FaComment, FaBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FiBarChart, FiCalendar, FiClipboard, FiLogOut, FiMinimize2, FiPaperclip, FiRefreshCcw } from 'react-icons/fi';
import modalView from '../includes/modal';
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';
const input = document.getElementById('classe'); 

export default class NewClasseImport extends React.Component {

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
            classe:[],
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
                this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, is_loading_home: false, loading_middle: false });
            });
    };

    register_classe() {
        let url_server = sessionStorage.getItem('yambi_smis_url_server');
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/new_classe.php";

        if (this.state.cycle_school_pupil === "" || this.state.school_year_pupil === "" || this.state.class_school_pupil === "") {
            // this.setState({ modal_title: "Information erreur", modal_main_text: "Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identité de base de l'élève et son orientation scolaire.", modal_view: true, loading_middle: false });
        } else {
            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    cycle_school_pupil: this.state.cycle_school_pupil,
                    class_school_pupil: this.state.class_school_pupil,
                    class_order_pupil: this.state.class_order_pupil,
                    class_section_pupil: this.state.class_section_pupil,
                    class_option_pupil: this.state.class_option_pupil,
                    school_year_pupil: this.state.school_year_pupil,
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    
                })
                .catch((error) => {
                    console.log(error.toString());
                    this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        }

for(let i in this.state.classe) {

    if (this.state.first_name === "" || this.state.second_name === "" || this.state.cycle_school_pupil === "" || this.state.school_year_pupil === "" || this.state.class_school_pupil === "") {
        this.setState({ modal_title: "Information erreur", modal_main_text: "Vous devez renseigner tous les champs obligatoires avant la validation. Ce sont l'identité de base de l'élève et son orientation scolaire.", modal_view: true, loading_middle: false });
    } else {
    this.setState({
        loading_middle: true,
    });

    let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/new_pupil_classe.php";

    let nom = this.state.classe[i].Nom;
    let postnom = this.state.classe[i].Postnom;
    let prenom = this.state.classe[i].Prenom;
    // let namee = nom.trim();
    let name = nom.substring(nom.indexOf(" ") + 1);
    // let name1 = postnom.substring(postnom.indexOf(" ") + 1);

    // console.log(postnom);
    // if(prenom ==undefined){
    //     console.log("ok");
    // }

    if(postnom == undefined || postnom  =="") {
        nom = nom.replace(name,"");
        postnom = name;
        // console.log(nom + " " +postnom);
    }

    if(prenom == undefined ||prenom=="") {
        // postnom = postnom.replace(postnom,"");
        // prenom = name1;
        // console.log(nom + " " +postnom+" "+prenom);

        prenom = "";
    }

    // console.log(postnom)

    fetch(BaseURL, {
        method: 'POST',
        body: JSON.stringify({
            first_name_pupil: nom,
            second_name_pupil: postnom,
            last_name_pupil: prenom,
            gender_pupil: "0",
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
            this.setState({ modal_title: "Information Succès", modal_main_text: "Vous venez d'enregistrer une nouvelle classe. Vous pourrez editer ses informations au moment voulu.", modal_view: true, loading_middle: false });
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
            console.log(error.toString());
            this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
        });
    }
}
    };

    uploadClasse =(file)=> {

        const promise =new Promise((resolve,reject) =>{
             const fileReader = new FileReader();
             fileReader.readAsArrayBuffer(file);
             fileReader.onload=(e)=>{
                 const bufferArray=e.target.result;
                 const wb=XLSX.read(bufferArray,{type:"buffer"});
                 const wsname = wb.SheetNames[0];
                 const ws=wb.Sheets[wsname];
                 const data = XLSX.utils.sheet_to_json(ws);

                 resolve(data);
             }

             fileReader.onerror=(err) => {
                 reject(err)
             }
        });

        promise.then((data)=>{
            this.setState({classe:data});
        });
    }

    componentDidMount() {
        this.get_general_info("");
    }

    render() {
        return (
            <div className="center-fixed">

                <div
                    className="save-pupil"
                    onClick={() => this.register_classe()}>
                    Enregistrer la classe
                </div>

                <span className="title-background">I. IDENTITÉ DE LA CLASSE</span>
                <table className="tables-new-pupil">
                    <tbody>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ school_year_pupil: val.target.value })}
                                    label="Année scolaire"
                                    variant="outlined"
                                    value={this.state.school_year_pupil}
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {/* <MenuItem value="">Sélectionner le cycle</MenuItem> */}
                                    {this.state.annees.map((annee, index) => (
                                        <MenuItem value={annee.year_id} key={index}>{annee.year_name}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ cycle_school_pupil: val.target.value })}
                                    label="Cycle d'étude"
                                    variant="outlined"
                                    value={this.state.cycle_school_pupil}
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {/* <MenuItem value="">Sélectionner le cycle</MenuItem> */}
                                    {this.state.cycles.map((cycle, index) => (
                                        <MenuItem value={cycle.cycle_id} key={index}>{cycle.cycle_name}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ class_school_pupil: val.target.value })}
                                    label="Classe"
                                    variant="outlined"
                                    value={this.state.class_school_pupil}
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {this.state.class_numbers.map((classe, index) => (
                                        <MenuItem value={classe.class_id} key={index}>{classe.class_number}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ class_order_pupil: val.target.value })}
                                    label="Ordre de classe"
                                    variant="outlined"
                                    value={this.state.class_order_pupil}
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {this.state.orders.map((order, index) => (
                                        <MenuItem value={order.order_id} key={index}>{order.order_name}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ paddingRight: 0, textAlign: 'left', width: '50%' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ class_section_pupil: val.target.value })}
                                    label="Section"
                                    value={this.state.class_section_pupil}
                                    variant="outlined"
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {this.state.sections.map((section, index) => (
                                        <MenuItem value={section.section_id} key={index}>{section.section_name}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                            <td style={{ paddingLeft: 0, textAlign: 'right' }}>
                                <TextField
                                    select
                                    onChange={(val) => this.setState({ class_option_pupil: val.target.value })}
                                    label="Option"
                                    variant="outlined"
                                    value={this.state.class_option_pupil}
                                    style={{ width: '95%', textAlign: 'left' }}>
                                    {this.state.options.map((option, index) => (
                                        <MenuItem value={option.option_id} key={index}>{option.option_name}</MenuItem>
                                    ))}
                                </TextField>
                            </td>
                        </tr>
                    </tbody>
                </table>


                {this.state.classe.map((eleve,index)=>{
                    return(
                        <table style={{width:'100%',backgroundColor:'white'}} key={index}>
                        <tbody>
                        <tr>
                        <td style={{width:50}}>{index+1}</td>
                            <td style={{width:'27%'}}>{eleve.Nom}</td>
                            <td style={{width:'27%'}}>{eleve.Postnom}</td>
                            <td style={{width:'27%'}}>{eleve.Prenom}</td>
                            <td style={{width:100}}>{eleve.Sexe}</td>
                        </tr>
                        </tbody>
                    </table>
                    )
                })}

                <div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
                <div style={{textAlign:'center',paddingTop:0,paddingBottom:25,color:'black',marginLeft:50,marginRight:50}}>
Uploader un fichier Excel contenant les noms des élèves de la classe. Renseignez aussi les identités de la classe afin de procéder à l'enregistrement des élèves un à un. Les noms entrés devront s'afficher dans un tableau ci-haut. Sinon, assurez-vous de bien uploader le fichier avant la validation.
                </div>
                <input style={{display:'none'}} type="file" id="classe" onChange={(data) => this.uploadClasse(data.target.files[0])} />
                <label className='button-primary' style={{paddingLeft:25,paddingRight:25}} for="classe">Uploader le fichier Excel (au format .xlsx)</label>
                </div>

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