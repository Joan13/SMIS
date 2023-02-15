import { connect, useSelector } from 'react-redux';
import { home_redirect, http } from '../../global_vars'
import { mapStateToProps } from '../../store/state_props';
function FicheIdentites() {

    const autres = useSelector(state => state.autres);
    const classe = useSelector(state => state.classe);

    function printContent(divName) {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        // window.location.reload();
        window.location.href = http + this.state.url_server + home_redirect;
        window.location.replace(http + this.state.url_server + home_redirect);
    }

    return (
        <div className="center-fixedd" style={{ marginBottom: 50, paddingTop: 0 }}>
            <span onClick={() => printContent("identities")} className="add-minus" style={{ fontWeight: 'bold' }}>
                IMPRIMER LA FICHE
            </span><br /><br />

            <div id="identities">
                <table style={{ width: '100%' }}>
                    <tbody>
                        <tr>
                            <td valign="top">
                                <div>
                                    <strong>{autres.school_name.toUpperCase()}</strong><br />
                                    <strong>{autres.school_bp}</strong><br />
                                    <strong>Année scolaire : {autres.annee}</strong>
                                </div>
                                <table className="full-table-liste">
                                    <caption>
                                        <h4>
                                            FICHE DES IDENTITÉS<br />
                                            {classe.class_id + " " + classe.section_id + " " + classe.order_id}
                                        </h4>
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 30, textAlign: 'center' }}>No</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Post-nom</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Prénom</th>
                                            <th style={{ width: 50, textAlign: 'center' }}>Sexe</th>
                                            <th style={{ textAlign: 'center' }}>Lieu naiss.</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Date naiss.</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Num. Id.</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Num. permanent</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Noms du père</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Noms de la mère</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Nationalité</th>
                                            <th style={{ paddingLeft: 10, textAlign: 'left' }}>Adresse</th>
                                        </tr>
                                    </thead>
                                    {classe.pupils.map((pupil, index) => (
                                        <tbody key={index}>
                                            <tr>
                                                <td style={{ width: 30, textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.first_name}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.second_name}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.last_name}</td>
                                                <td style={{ width: 50, textAlign: 'center' }}>{pupil.pupil.gender == "0" ? "F" : "M"} </td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.birth_place}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.birth_date}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.identification_number}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.permanent_number}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.father_names}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.mother_names}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.nationality}</td>
                                                <td style={{ paddingLeft: 10 }}>{pupil.pupil.physical_address}</td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(FicheIdentites);
