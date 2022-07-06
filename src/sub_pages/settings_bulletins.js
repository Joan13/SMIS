import React from 'react';
import { connect } from 'react-redux';
import { format_date, find_date, find_date2 } from '../global_vars';
import { mapStateToProps } from '../store/state_props';

class SettingsBulletins extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            domain_name: "",
            sub_domain_name: "",
            course_1: "",
            course_2:"",
            course_3:"",
            course_4:"",
            course_5:"",
            course_6:"",
            course_7:"",
            course_8:"",
            course_9:"",
            course_10:"",
            total_marks:0,
        }
    }

    load_class_data(classe) {
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/get_class_info.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                cycle_id: classe.cycle,
                class_id: classe.class,
                order_id: classe.order,
                section_id: classe.section,
                option_id: classe.option,
                school_year: classe.school_year,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });

                for(let i in this.props.classes) {
if (this.props.classes[i].id_classes === classe.id_classes) {
    this.props.classes[i].data = response;
}
                }
            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({ can_load_data:false,modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }

    save_domain() {
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/new_domain.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                domain_name:this.state.domain_name,
                cycle_id: this.props.classe.cycle,
                class_id: this.props.classe.class,
                order_id: this.props.classe.order,
                section_id: this.props.classe.section,
                option_id: this.props.classe.option,
                school_year: this.props.classe.school_year,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                if (response === '1'){
                    this.load_class_data(this.props.classe);
                    this.setState({domain_name:""});
                }

            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({ can_load_data:false,modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }

    save_sub_domain() {
        this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: true });

        let BaseURL = "http://" + this.props.url_server + "/yambi_class_SMIS/API/new_sub_domain.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                sub_domain_name:this.state.sub_domain_name,
                domain_id: this.state.domain_id,
                course_1: this.state.course_1,
                course_2: this.state.course_2,
                course_3: this.state.course_3,
                course_4: this.state.course_4,
                course_5: this.state.course_5,
                course_6: this.state.course_6,
                course_7: this.state.course_7,
                course_8: this.state.course_8,
                course_9: this.state.course_9,
                course_10: this.state.course_10,
                total_marks:this.state.total_marks,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                if (response === '1'){
                    this.load_class_data(this.props.classe);
                    this.setState({
                        sub_domain_name:"",
                    course_1:"",
                course_2:"",
                course_3:"",
                course_4:"",
                course_5:"",
                course_6:"",
                course_7:"",
                course_8:"",
            course_9:"",
            course_10:"",});
                }

            })
            .catch((error) => {
                console.log(error.toString());
                this.props.dispatch({ type: "SET_LOADING_FOOTER", payload: false });
                this.setState({ can_load_data:false,modal_title: "Information erreur", modal_main_text: "Impossible de procéder à la requête. Vérifiez que vous êtes bien connecté(e) au serveur ensuite réessayez.", modal_view: true, loading_class: false, class_loading: 0 });
            });
    }


    render() {
        return (
            <div>
                <div>
                <h2>Configurer nouveau format de bulletins pour la {this.props.classe.class_id + " " + this.props.classe.section_id + " " + this.props.classe.cycle_id}</h2><br/>
                <div>
                <strong>Enregistrer un nouveau domaine</strong><br/><br/>
                    <input
                    type="text"
                        placeholder="Entrer le nom du domaine"
                        style={{ width: 300 }}
                        onChange={(text) => this.setState({ domain_name: text.target.value })}
                    /><br/><br/>
                    <span style={{ marginLeft: 20 }} onClick={() => this.save_domain()} className="add-minus">Enregistrer le domaine</span><br /><br/>
                </div>



                    <strong>Enregistrer un sous-domaine et ajouter les cours (Max. 10 cours)</strong><br/><br/>

                    <input
                    type="text"
                        placeholder="Entrer le nom du sous-domaine"
                        style={{ width: 300 }}
                        onChange={(text) => this.setState({ sub_domain_name: text.target.value })}
                    /><br/><br/>

<input
type="number"
                        placeholder="Sous-total de la section"
                        style={{ width: 300 }}
                        onChange={(text) => this.setState({ total_marks: text.target.value })}
                    /><br/><br/>

                    <select
                                    onChange={(val) => this.setState({domain_id:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Séléctionner un domaine</option>
                                    {this.props.classe.data.domains.map((domain, index) => (<option key={index} value={domain.domain_id}>{domain.domain_name}</option>))}
                                </select><br/><br/>

                    <select
                                    onChange={(val) => this.setState({course_1:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <select
                                    onChange={(val) => this.setState({course_2:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <select
                                    onChange={(val) => this.setState({course_3:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <select
                                    onChange={(val) => this.setState({course_4:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <select
                                    onChange={(val) => this.setState({course_5:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <select
                                    onChange={(val) => this.setState({course_6:val.target.value})}
                                    style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'white' }} className="select-no-border-select">
                                    <option value="">Ajouter un cours au sous-domaine</option>
                                    {this.props.classe.data.courses.map((course, index) => (<option key={index} value={course.course_id}>{course.course_name}</option>))}
                                </select><br/><br/>

                                <span onClick={() => this.save_sub_domain()} className="add-minuss">Enregistrer le sous-domaine</span><br /><br/><br /><br/><br />

                </div>

                
            </div>
        )
    }
}

export default connect(mapStateToProps)(SettingsBulletins);