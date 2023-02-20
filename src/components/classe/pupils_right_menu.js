import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';

const PupilsRightMenu = () => {

    const dispatch = useDispatch();
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const url_server = useSelector(state => state.url_server);
    const searching_pupil = useSelector(state => state.searching_pupil);
    const pupils_count = useSelector(state => state.pupils_count);
    const pupils_school = useSelector(state => state.pupils_school);
    const pupill = useSelector(state => state.pupil);

    const searchPupil = (name) => {
        dispatch({ type: "SET_SEARCHING_PUPIL", payload: true });
        dispatch({ type: "SET_NUMBER_PUPILS_SHOW", payload: false });
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/search_pupil.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                annee: annee_scolaire.year_id,
                name: name
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_SEARCHING_PUPIL", payload: false });
                dispatch({ type: "SET_PUPILS_SCHOOL", payload: response.pupils });
                dispatch({ type: "SET_PUPILS_COUNT", payload: response.pupils_count });

            })
            .catch((error) => { });
    };

    const find_pupil = (pupil) => {
        dispatch({ type: "SET_SEARCHING_PUPIL", payload: true });
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/get_pupil_infos.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                pupil_id: pupil,
            })
        })
            .then((response) => response.json())
            .then((response) => {

                dispatch({ type: "SET_SEARCHING_PUPIL", payload: false });
                dispatch({ type: "SET_PUPIL", payload: response.pupil });
            })
            .catch((error) => { });
    };

    const view_pupil = (pupil) => {
        dispatch({ type: "SET_NEW_PAIEMENT", payload: false });
        dispatch({ type: "SET_CLASSE", payload: [] });
        dispatch({ type: "SET_PAIEMENTS_FRAIS_DIVERS", payload: false });
        dispatch({ type: "SET_ALL_PAIEMENTS", payload: true });
        dispatch({ type: "SET_PUPIL", payload: pupil });
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 11 });
        dispatch({ type: "SET_EDIT_PUPIL", payload: false });
        dispatch({ type: "SET_TITLE_MAIN", payload: (pupil.pupil.first_name + " " + pupil.pupil.second_name + " " + pupil.pupil.last_name).toUpperCase() });

        find_pupil(pupil.pupil.pupil_id);
    }

    return (
        <div className="menu-right">
            <br />
            <div>
                <strong>Tous les élèves ({pupils_count})</strong>

                <div style={{ marginTop: 10 }} className="div-search">
                    <FaSearch color="gray" style={{ marginLeft: 10, marginRight: 10, alignSelf: 'center' }} />

                    <input
                        onChange={(val) => searchPupil(val.target.value)}
                        style={{ backgroundColor: 'transparent' }}
                        placeholder="Recherchez un élève" />

                    {searching_pupil ?
                        <CircularProgress size={20} style={{ color: "rgb(0, 80, 180)", marginLeft: 10, marginRight: 10, alignSelf: 'center' }} /> : null}
                </div>
                <div style={{ marginLeft: 10 }}>
                    <table>
                        <tbody>
                            {pupils_school.map((pupil, index) => {
                                if (index < 50) {
                                    return (
                                        <tr key={index}>
                                            <td style={{ minWidth: 23 }}>{index + 1}. </td>
                                            <td style={{ paddingBottom: 5 }}
                                                onClick={() => view_pupil(pupil)}
                                                key={index} className="pupils-list-home">
                                                {pupil.pupil.first_name.toString().toUpperCase()} {pupil.pupil.second_name.toString().toUpperCase()} {pupil.pupil.last_name.toString().toUpperCase()} ({parseInt(pupil.pupil.gender) === 1 ? "M" : "F"})
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PupilsRightMenu;
