import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GeneralStatsCaisse=()=> {

    const title_main = useSelector(state=>state.title_main);
    const annee_scolaire = useSelector(state=>state.annee_scolaire);
    const pupils = useSelector(state=>state.pupils);
    const paiement_categories = useSelector(state=>state.paiement_categories);
    const url_server = useSelector(state=>state.url_server);
    const annee = useSelector(state=>state.annee);
    const dispatch = useDispatch();
    // const [paiements, setPaiements] = useState([]);
    const [trim1, setTrim1] = useState(0);
    const [trim2, setTrim2] = useState(0);
    const [trim3, setTrim3] = useState(0);
    const [ttrims, setTtrims] = useState(0);
    const [t1_payed, setT1_payed] = useState(0);
    const [t2_payed, setT2_payed] = useState(0);
    const [t3_payed, setT3_payed] = useState(0);
    const [total_trim1,setTotal_trim1] = useState(0);
    const [total_trim2,setTotal_trim2] = useState(0);
    const [total_trim3,setTotal_trim3] = useState(0);
    const [nombre_trim1, setNombre_trim1] = useState(0);
    const [nombre_trim2, setNombre_trim2] = useState(0);
    const [nombre_trim3, setNombre_trim3] = useState(0);
    const [loading_stats, setLoading_stats] = useState(false);
    const [payes, setPayes] = useState(0);
    const [total_annee, setTotal_annee] = useState(0);
    const [exampte, setExamptes] = useState(0);

    const generate_general_stats = () => {
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/stats_general.php";
        setLoading_stats(true);

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log(paiements);

                const promise_general_stats = new Promise((resolve, reject)=>{
            //         const paiements = response.paiements;
            //         for (let i in pupils) {
            // // if(pupils[i].pupil.pupil)
            // // console.log(pupils[i].pupil.pupil_id);
            // if (pupils[i].pupil.paiement_category === "0") {
    
            // } else {
            //     let category = [];
            // category = paiement_categories.filter(category=>category.category_id === pupils[i].pupil.paiement_category);
            // if(category.length === 0)  category[0] = paiement_categories[0];
    
            // // const ttrim1 = total_annee/3;
            // // const ttrim2 = ttrim1*2;
            // // const ttrim3 = ttrim1*3;
    
            // // setTotal_annee(total_annee + parseInt(category[0].category_amount));
            // // setTotal_trim1(total_trim1 + parseInt(ttrim1));
            // // setTotal_trim2(total_trim2 + parseInt(ttrim2));
            // // setTotal_trim3(total_trim3 + parseInt(ttrim3));
    
            // for (let j in pupils[i].pupil.paiements) {
            //     const paiement = pupils[i].pupil.paiements[j];
    
            //     if(paiement.length !== 0)
            //         console.log(paiement);
            // }
            // }
                
        // }

        const t1_percentages = response.t1_percentages;
        const t2_percentages = response.t2_percentages;
        const t3_percentages = response.t3_percentages;

        let t1ps = 0;
        let t2ps = 0;
        let t3ps = 0;

        for(let i in t1_percentages) {
            t1ps = t1ps + parseInt(t1_percentages[i]);
        }

        for(let i in t2_percentages) {
            t2ps = t2ps + parseInt(t2_percentages[i]);
        }

        for(let i in t3_percentages) {
            t3ps = t3ps + parseInt(t3_percentages[i]);
        }

        setTrim1(t1ps / t1_percentages.length);
        setTrim2(t2ps / t1_percentages.length);
        setTrim3(t3ps / t2_percentages.length);
        setTtrims(response.ttrims);
        setTotal_annee(response.montant_total);
        setPayes(response.montants_payes);
        setT1_payed(response.t1_payed);
        setT2_payed(response.t2_payed);
        setT3_payed(response.t3_payed);
        
        resolve();
                }).then(()=>{});

                promise_general_stats.finally(()=>{
                    setLoading_stats(false);
                })
            })
            .catch((error) => { });
    };

    useEffect(()=>{
        generate_general_stats();
    },[]);

    return(
        <div>

{loading_stats ?
<div style={{textAlign:'center', marginTop:100}}>
<CircularProgress size={40} style={{color:"rgb(0, 80, 180)"}} /><br/>
Génération des statistiques générales de caisse...
</div>
:
<div>
<h3 style={{textAlign:'center', display:'block', marginTop:20, marginBottom:30}}>Statistiques générales de la caisse</h3>
<table style={{ width: "100%" }} className="table-border">
                    <thead>
                        <tr>
                            <td style={{ paddingTop: 20, paddingBottom: 20, textAlign: 'center', color: "rgba(0,80,180)", fontSize: 17 }} colSpan="3">
                                <strong>{title_main} {annee_scolaire.year_name}</strong> (Paiements scolaires et frais divers)
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Premier Trimestre</th>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Deuxième trimestre</th>
                            <th style={{ textAlign: 'center', width: '33.33%', paddingTop: 10, paddingBottom: 10 }}>Troisième Trimestre</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                            <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                Payé     <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t1_payed}</strong>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t2_payed}</strong>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{t3_payed}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                Sur      {ttrims.toString().substr(0, 9)}
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                {ttrims.toString().substr(0, 9)}
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                {ttrims.toString().substr(0, 9)}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "33.33%", paddingLeft: 0, textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{trim1.toString().substr(0, 5)} %</strong>
                                <div style={{marginTop:13,fontSize:12}}>{trim1}</div>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{trim2.toString().substr(0, 5)} %</strong>
                                <div style={{marginTop:13,fontSize:12}}>{trim2}</div>
                            </td>
                            <td style={{ width: "33.33%", textAlign: "center", paddingTop: 10, paddingBottom: 10 }}>
                                <strong style={{ color: 'rgb(0, 80, 180)', fontSize: 15 }}>{trim3.toString().substr(0, 5)} %</strong>
                                <div style={{marginTop:13,fontSize:12}}>{trim3}</div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                            <td style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} colSpan="3"><strong style={{ color: 'rgb(0, 80, 180)', fontSize: 16 }}>Montant déjà payé {payes} dollars Américains</strong></td>
                        </tr>
                        <tr>
                            <td style={{ paddingTop: 10, paddingBottom: 10, textAlign: 'center' }} colSpan="3"><strong style={{ color: 'rgb(0, 80, 180)', fontSize: 16 }}>Montant à totaliser {total_annee} dollars Américains</strong></td>
                        </tr>
                    </tfoot>
                </table>
</div>}
        </div>
    )
}

export default GeneralStatsCaisse;
