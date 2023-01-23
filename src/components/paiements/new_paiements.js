import { Button, CircularProgress } from '@material-ui/core';
import { NumberToLetter } from 'convertir-nombre-lettre';
import React, { Component } from 'react'
import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { connect } from 'react-redux'
import { http } from '../../global_vars';
import modalView from '../../includes/modal';
import { mapStateToProps } from '../../store/state_props'

class NewPaiements extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal_view: false,
            loading_middle: false,
            modal_main_text: "",
            modal_title: "",
            montant_paie: "",
            montant_text_paie: "",
            libelle_paie: "",
            total_montant: "",
            success: "",
            loading_middle2: false,
            montant_frais: "",
            libelle_frais: "",
            success_2: "",
            category: this.props.paiement_categories.filter(category => category.category_id === this.props.pupil.pupil.paiement_category).length === 0 ? this.props.paiement_categories[0] : this.props.paiement_categories.filter(category => category.category_id === this.props.pupil.pupil.paiement_category)[0],

        }
    }

    componentDidMount() {
        // const category = this.props.paiement_categories.filter(category=>category.category_id === this.props.pupil.pupil.paiement_category);
        // setTimeout(()=>{
        //     this.setState({category: category});
        // console.log(this.state.category);
        // }, 2000);
        // Object.assign({}, this.state.category);
        // console.log(this.props.libelles);
    }

    new_frais_divers() {

        let date = new Date();

        let montant = this.state.montant_frais;
        let libelle = this.state.libelle_frais;
        let school_year = this.props.pupil.pupil.school_year;
        let pupil = this.props.pupil.pupil.pupil_id;
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

        if (montant !== "" && libelle !== "") {

            let url_server = sessionStorage.getItem('yambi_smis_url_server');
            this.setState({ loading_middle2: true });

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/new_frais_divers.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil,
                    montant_frais_divers: montant,
                    libelle_frais_divers: libelle,
                    school_year: school_year,
                    date_entry: date
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        montant_frais: "",
                        libelle_frais: "",
                        loading_middle2: false,
                        success_2: "Operation successful"
                    });
                    this.props.dispatch({ type: "SET_PUPIL", payload: response.pupil });
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        } else {
            this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à l'enregistrement dupaiement des frais divers. Tous les champs sont obligatoires, notamment le libellé et le champ du montant.", modal_view: true, loading_middle: false });
        }
    }

    new_paiement() {

        let date = new Date();

        let montant = this.state.montant_paie;
        let montant_text = this.state.montant_text_paie;
        let libelle = this.state.libelle_paie;
        let total_montant = this.state.total_montant;
        let school_year = this.props.pupil.pupil.school_year;
        let pupil = this.props.pupil.pupil.pupil_id;
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

        if (montant !== "" && montant_text !== "" && libelle !== "") {
            let url_server = sessionStorage.getItem('yambi_smis_url_server');
            this.setState({ loading_middle: true });

            let BaseURL = http + url_server + "/yambi_class_SMIS/API/new_paiement.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    pupil_paiement: pupil,
                    input_montant: montant,
                    input_montant_text: montant_text,
                    selectionner_le_libelle: libelle,
                    total_montant: this.state.category.category_amount,
                    school_year: school_year,
                    date_entry: date
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    this.setState({
                        montant_paie: "",
                        montant_text_paie: "",
                        libelle_paie: "",
                        total_montant: "",
                        loading_middle: false,
                        success: "Operation successful"
                    })

                    this.props.dispatch({ type: "SET_PUPIL", payload: response.pupil });
                })
                .catch((error) => {
                    console.log(error)
                    this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_middle: false });
                });
        } else {
            this.setState({ modal_title: "Information erreur", modal_main_text: "Impossible de procéder à l'enregistrement du nouveau paiement. Tous les champs sont obligatoires, notamment le libellé et les champs des montants.", modal_view: true, loading_middle: false });
        }
    }

    render() {
        return (
            <div>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "50%", textAlign: 'left', paddingLeft: 0 }}><strong>Paiement des frais scolaires</strong></th>
                            <th style={{ width: "50%", textAlign: 'left', paddingLeft: 0 }}><strong>Paiement des frais divers</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="td-border-right">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        {
                                            this.props.pupil.pupil.paiement_category === "0" ?
                                                <div>
                                                    Cet élève est exempté(e) de tout paiement des frais scolaires.
                                                </div>
                                                :
                                                <>
                                                    <tr>
                                                        <td>
                                                            <select
                                                                value={this.state.libelle_paie}
                                                                onChange={(val) => this.setState({ libelle_paie: val.target.value })}
                                                                style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white', marginBottom: 10, width: '80%' }} className="select-no-border-select">
                                                                <option value="">Sélectionner le libellé</option>
                                                                {this.props.libelles.map((libelle, index) => {
                                                                    if (parseInt(libelle.gender_libelle) === 1) { return (<option key={index} value={libelle.libelle_id}>{libelle.description_libelle}</option>) }
                                                                })}
                                                            </select>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            Montant (en dollars US):<br />
                                                            <input
                                                                value={this.state.montant_paie}
                                                                onChange={(value) => {
                                                                    this.setState({ montant_paie: value.target.value });
                                                                    if (parseInt(value.target.value) >= 0) this.setState({ montant_text_paie: NumberToLetter(value.target.value) })
                                                                }}
                                                                placeholder="Ex: 130"
                                                                maxLength={14}
                                                                className="input-montant"
                                                                type="number" />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style={{ paddingTop: 10 }}>
                                                            {this.state.montant_paie !== "" ?
                                                                <div><strong style={{ color: 'rgb(0, 80, 180)' }}>{this.state.montant_text_paie} </strong>dollars Américains<br /></div> : null}
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td style={{ paddingTop: 10 }}>
                                                            Catégorie : <span style={{ fontWeight: 'bold', color: 'rgb(0, 80, 180)' }}>{this.state.category.category_name} </span>  |
                                                            Montant total à payer : <span style={{ fontWeight: 'bold', color: 'rgb(0, 80, 180)' }}> {this.state.category.category_amount}</span>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            {this.state.success !== "" ?
                                                                <><span style={{ color: 'green', marginBottom: 5 }}>
                                                                    <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                                                    {this.state.success}
                                                                </span><br /></> : null}
                                                            <br />
                                                            {this.state.loading_middle ?
                                                                <><CircularProgress style={{ color: 'rgb(0, 80, 180)', marginLeft: '35%' }} /><br /></>
                                                                :
                                                                <><button
                                                                    onClick={() => this.new_paiement()}
                                                                    className="button-primary" style={{ width: '83%' }}>Valider le paiement</button></>
                                                            }
                                                        </td>
                                                    </tr>
                                                </>
                                        }
                                    </tbody>
                                </table>
                            </td>


                            <td valign="top">
                                <table style={{ width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <select
                                                    value={this.state.libelle_frais}
                                                    onChange={(val) => this.setState({ libelle_frais: val.target.value })}
                                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white', marginBottom: 10, width: '80%' }} className="select-no-border-select">
                                                    <option value="">Sélectionner le libellé</option>
                                                    {this.props.libelles.map((libelle, index) => {
                                                        if (parseInt(libelle.gender_libelle) === 1) { return (<option key={index} value={libelle.libelle_id}>{libelle.description_libelle}</option>) }
                                                    })}
                                                </select>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                Montant (en dollars US):<br />
                                                <input
                                                    value={this.state.montant_frais}
                                                    onChange={(value) => this.setState({ montant_frais: value.target.value })}
                                                    placeholder="Ex: 10"
                                                    className="input-montant"
                                                    type="number" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td style={{ paddingTop: 10 }}>
                                                {this.state.montant_frais !== "" ?
                                                    <div><strong style={{ color: 'rgb(0, 80, 180)' }}>{NumberToLetter(this.state.montant_frais)} </strong>dollars Américains<br /></div> : null}
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                {this.state.success_2 !== "" ?
                                                    <><span style={{ color: 'green', marginBottom: 5 }}>
                                                        <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                                        {this.state.success_2}
                                                    </span><br /></> : null}
                                                <br />
                                                {this.state.loading_middle2 ?
                                                    <><CircularProgress style={{ color: 'rgb(0, 80, 180)', marginLeft: '35%' }} /><br /></>
                                                    :
                                                    <><button
                                                        onClick={() => this.new_frais_divers()}
                                                        className="button-primary" style={{ width: '83%' }}>Enregistrer les frais</button></>
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
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

export default connect(mapStateToProps)(NewPaiements)
