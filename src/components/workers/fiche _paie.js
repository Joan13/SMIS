import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { find_date, find_date2, generateMonth } from "../../global_vars";

const FichePaie = () => {

    const fiche_paie = useSelector(state => state.fiche_paie);
    const annees = useSelector(state => state.annees);
    const employee = useSelector(state => state.employee);
    const autres = useSelector(state => state.autres);

    useEffect(() => {
        // console.log(fiche_paie);
    }, []);

    return (
        <div>
            <div>
                <div id="table-employee-data">
                    <div>
                        <strong>{(autres.school_name).toUpperCase()}</strong><br />
                        <strong>{autres.school_bp}</strong><br />
                        <strong>Année scolaire : {annees.filter(annee => annee.year_id == employee.worker_year)[0].year_name}</strong>
                    </div>
                    <div style={{ float: 'right', marginTop: -47 }}>
                        <div style={{ fontWeight: 'bold', fontSize: 15 }}>FICHE DE PAIYE</div>
                        <div style={{ fontWeight: 'bold', textAlign: 'right', marginTop: 2 }}>{employee.first_name.toUpperCase()} {employee.second_name.toUpperCase()} {employee.last_name}</div>
                    </div>
                </div>
                <table style={{ width: '100%', marginTop: 20 }} className="fiche-paie">
                    <thead>
                    <tr>
                        <th style={{ width: 30 }}>N0</th>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Mois</th>
                        <th>Annee scolaire</th>
                    </tr>
                    </thead>
                    {fiche_paie.map((fiche, index) => (
                        <tbody key={index}>
                            <tr style={{ backgroundColor: index % 2 === 0 ? "rgba(0,0,0,0.015)" : "rgba(0,0,0,0.050)" }}>
                            <td>{index + 1}</td>
                            <td>{find_date(fiche.date_entry)}</td>
                            <td>{fiche.montant_paye} USD</td>
                            <td>{generateMonth(parseInt(fiche.month_paye))}</td>
                            <td>{annees.filter(annee => annee.year_id == fiche.school_year)[0].year_name}</td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default FichePaie;