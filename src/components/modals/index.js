import { FiArrowLeft, FiPlus, FiX } from "react-icons/fi";
import { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { CircularProgress } from "@material-ui/core";
import { http } from "../../global_vars";
import { useDispatch, useSelector } from "react-redux";
import Classes from "../../includes/classes";

const ModalFrame = (props) => {
    const [frame_type, setFrame_type] = useState(0);
    const [success, setSuccess] = useState("");
    const [loading_middle, setLoading_middle] = useState(false);
    const url_server = useSelector(state => state.url_server);
    const user_data = useSelector(state => state.user_data);
    const classes_selected = useSelector(state => state.classes_selected);
    const [selection_name, setSelection_name] = useState('');
    const [selection_type, setSelection_type] = useState('');
    const dispatch = useDispatch();

    let title = "";
    if (props.type === 1) {
        title = "Selections - groupes";
    }

    const can_proceed_selection = () => {
        if (selection_name !== "" && selection_type !== "") {
            return true;
        }

        return false;
    }

    const create_selection = () => {
        if (selection_name !== "" && selection_type !== "" && classes_selected.length !== 0) {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/new_selection.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    selection_name: selection_name,
                    selection_type: selection_type,
                    selection_privacy: '0',
                    user_id: user_data.worker_id,
                    school_year: user_data.worker_year,
                    selection_data: classes_selected
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    if (parseInt(response.success) === 1) {
                        dispatch({ type: "SET_CLASSES_SELECTED", payload: [] });
                        setSelection_name('')
                        setSelection_type('');
                        setSuccess("Sélection enregistrée avec succèss");
                    }
                })
                .catch((error) => { });
        } else {
            alert("Vous devez sélectionner entrer l'intitulé de la sélection, le type et sélectionner les classes avant de procéder");
        }
    }

    const can_show_classes = () => {
        if (selection_name !== '' && selection_type !== '') {
            return true;
        }

        return false;
    }

    return (
        <div className="main-div-modal">
            <div style={{
                borderRadius: 15,
                backgroundColor: 'white',
                width: 800,
                paddingBottom: 12,
            }}>
                <div style={{
                    textAlign: 'right',
                    backgroundColor: 'rgb(240,240,240)',
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 25,
                    height: 35,
                    justifyContent: 'space-between',
                }}>
                    <span>
                        {title}
                    </span>
                    <span
                        onClick={() => dispatch({ type: "SET_MODAL_SELECTIONS", payload: false })}
                        style={{
                            backgroundColor: 'red',
                            width: 20,
                            height: 20,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            borderTopRightRadius: 15,
                            marginLeft: 25,
                            borderRadius: 15,
                            marginRight: 25
                        }}>
                        <FiX color='white' size={12} />
                    </span>
                </div>
                <div style={{
                    padding: 25,
                    backgroundColor: "white",
                    borderRadius: 15,
                }} className="div-in-modal">
                    <div>
                        {frame_type === 0 ?
                            <div>
                                <div style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>Nouvelle selection
                                    <div
                                        onClick={() => setFrame_type(1)}
                                        className="add-button">
                                        <FiArrowLeft color='white' size={15} />
                                    </div>
                                </div>

                                <div style={{
                                    marginTop: 10
                                }}>
                                    <input type="text"
                                        value={selection_name}
                                        className="input-montant"
                                        onChange={(e) => setSelection_name(e.target.value)}
                                        placeholder="Intilulé de la sélection" /><br /><br />

                                    <select
                                        value={selection_type}
                                        style={{
                                            color: 'rgba(0, 80, 180)',
                                            backgroundColor: 'white',
                                            marginBottom: 10,
                                            width: '67%'
                                        }} className="select-borderr"
                                        onChange={(e) => setSelection_type(e.target.value)} >
                                        <option value="">Type de sélection</option>
                                        <option value="1">Groupement des Classes</option>
                                    </select><br />

                                    {can_show_classes() ?
                                        <div><br />
                                            Liste des classes à groupper<br /><br />
                                            <Classes type={2} />
                                        </div> : null}

                                    {success !== "" ?
                                        <><span style={{ color: 'green', marginBottom: 5 }}>
                                            <FaCheckCircle color="green" size={11} style={{ marginRight: 5, marginTop: 10 }} />
                                            {success}
                                        </span><br /></> : null}
                                    <br />
                                    {loading_middle ?
                                        <><CircularProgress style={{ color: 'rgb(0, 80, 180)', marginLeft: '35%' }} size={30} /><br /></>
                                        :
                                        <><button
                                            onClick={() => create_selection()}
                                            className={`${!can_proceed_selection() ? 'button-primary-disabled' : 'button-primary'}`} style={{ width: '66%' }}>Enregistrer la selection</button></>
                                    }
                                </div>
                            </div>
                            :
                            <div>
                                <div style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>Toutes les sélections
                                    <div
                                        onClick={() => setFrame_type(0)}
                                        className="add-button">
                                        <FiPlus color='white' size={15} />
                                    </div>
                                </div>
                            </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFrame;
