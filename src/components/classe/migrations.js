import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { http } from '../../global_vars';
import PrintDocument from '../includes/print';

const Migrations = () => {

    const url_server = useSelector(state => state.url_server);
    const autres = useSelector(state => state.autres);
    const annee_scolaire = useSelector(state => state.annee_scolaire);
    const classe = useSelector(state => state.classe);
    const [annee, setAnnee] = useState("");
    const annees = useSelector(state => state.annees);
    const [modifier, setModifier] = useState(false);
    const dispatch = useDispatch();

    const conseil_deliberation = (pupil, main_conseil) => {
        if (pupil !== null) {
            let BaseURL = http + url_server + "/yambi_class_SMIS/API/conseil_deliberation.php";

            fetch(BaseURL, {
                method: 'POST',
                body: JSON.stringify({
                    pupil_id: pupil,
                    main_conseil: main_conseil,
                    school_year: classe.school_year
                })
            })
                .then((response) => response.json())
                .then((response) => {
                    if (parseInt(response) === 1) {
                        // alert("Conseil de délibération enregistrée avec succès");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const findConseil = (pupil_id) => {

        let conseil = "";
        let title = "";
        for (let i in classe.data.conseil_deliberation) {
            if (parseInt(classe.data.conseil_deliberation[i].pupil_id) === parseInt(pupil_id)) {
                conseil = classe.data.conseil_deliberation[i];

                if (parseInt(conseil.main_conseil) === 0) {
                    title = "PASSE";
                } else if (parseInt(conseil.main_conseil) === 1) {
                    title = "DOUBLE";
                } else if (parseInt(conseil.main_conseil) === 2) {
                    title = "EXCLU(E)";
                } else if (parseInt(conseil.main_conseil) === 6) {
                    title = "ABANDON";
                } else if (parseInt(conseil.main_conseil) === 3) {
                    title = "PASSE (2)";
                } else if (parseInt(conseil.main_conseil) === 4) {
                    title = "DOUBLE (2)";
                } else if (parseInt(conseil.main_conseil) === 5) {
                    title = "EXCLU(E) (2)";
                } else {
                    title = "-";
                }
            }
        }

        return title;
    }

    return (
        <div style={{ marginBottom: 50, paddingTop: 0, marginRight: 10 }}>

<PrintDocument div="migrations" />
<div onClick={()=>setModifier(!modifier)} className='float-right cursor-pointer text-text-50 mt-2'>MODIFIER</div>

            <div id="migrations" style={{ marginTop: 0 }}>

                {/* <div className='mt-3 mb-3'> */}
                {/* <select
                                                    onChange={(val) => setAnnee(val.target.value)}
                                                    className="nodrag select-no-border-select bg-background-100 dark:bg-background-20 ml-2">
                                                    <option value={annee}>Année de migration</option>
                                                    {annees.map((annee, index) => (
                                                        <option key={index} value={annee.year_id}>
                                                            {annee.year_name}
                                                        </option>
                                                    ))}
                                                </select>
</div> */}
<div>
                    <strong>{(autres.school_name).toUpperCase()}</strong><br />
                    <strong>{autres.school_bp}</strong><br />
                    <strong>Année scolaire : {annee_scolaire.year_name}</strong>
                </div>
                <table className="w-full" style={{ marginTop: -40 }}>
                    <caption>
                        <h4 className='font-bold'>
                            FICHE DU CONSEIL DE DÉLIBÉRATION<br />
                            {classe.class_id + " " + classe.section_id + " " + classe.cycle_id + " " + classe.order_id}
                        </h4>
                        
                    </caption>
                    <thead>
                        <tr>
                            <th className='border pt-2 pb-2 border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 30, textAlign: 'center' }}>No</th>
                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ paddingLeft: 10, textAlign: 'left' }}>Noms</th>
                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ width: 50, textAlign: 'center' }}>Sexe</th>
                            <th className='border border-gray-50 dark:border-gray-20  bg-background-50 dark:bg-background-20' style={{ textAlign: 'center', width: 150 }}>Conseil délibération</th>
                        </tr>
                    </thead>
                    {classe.pupils.map((pupil, index) => (
                        <tbody key={index}>
                            <tr className='hover:bg-background-50 hover:dark:bg-gray-100'>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>{pupil.pupil.first_name.toUpperCase()} {pupil.pupil.second_name.toUpperCase()} {pupil.pupil.last_name.toUpperCase()}</td>
                                <td className='border border-gray-50 dark:border-gray-20' style={{ width: 50, textAlign: 'center' }}>{parseInt(pupil.pupil.gender) === 0 ? "F" : "M"} </td>
                                <td className='pt-1 pb-1 border border-gray-50 dark:border-gray-20' style={{ paddingLeft: 10 }}>
                                    {modifier ?
                                    <select
                                    onChange={(e)=>conseil_deliberation(pupil.pupil.pupil_id, e.target.value)}
                                    className='bg-transparent-20 w-full cursor-pointer'>
                                    <option>Sélectionner</option>
                                    <optgroup label="Avant 2e session">
                                        <option value="0">PASSE</option>
                                        <option value="1">DOUBLE</option>
                                        <option value="2">EXCLU(E)</option>
                                    </optgroup>
                                    <optgroup label="Apres 2e session">
                                        <option value="3">PASSE</option>
                                        <option value="4">DOUBLE</option>
                                        <option value="5">EXCLU(E)</option>
                                    </optgroup>
                                    <optgroup label="Autre">
                                        <option value="6">ABANDON</option>
                                    </optgroup>
                                </select>
                                :
                                findConseil(pupil.pupil.pupil_id)}
                                </td>
                            </tr>
                        </tbody>
                    )
                    )}
                </table>
            </div>
        </div>
    )
}

export default Migrations;
