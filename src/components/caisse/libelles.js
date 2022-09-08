import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNormal from '../includes/button_normal';

const Libelles=()=>{
const libelles = useSelector(state=>state.libelles);
const dispatch = useDispatch();
const url_server = useSelector(state=>state.url_server);
const annee = useSelector(state=>state.annee);
const [description_libelle, setDescription_libelle] = useState("");
const user_data = useSelector(state=>state.user_data);

const add_libelle =()=> {

    let gender_libelle = "";
   if(user_data.poste === "6") gender_libelle = "1";

    if (description_libelle !== "") {
        let BaseURL = "http://" + url_server + "/yambi_class_SMIS/API/add_libelle.php";

    fetch(BaseURL, {
        method: 'POST',
        body: JSON.stringify({
            school_year: annee,
            description_libelle:description_libelle,
            gender_libelle: gender_libelle,
        })
    })
        .then((response) => response.json())
        .then((response) => {
            dispatch({type:"SET_LIBELLES", payload:response.libelles});
setDescription_libelle("");
        })
        .catch((error) => {});
    }
};

    return(
        <div className="paiement-categories">
<div className="paiement-categories-modal">
<div style={{margin:20, marginTop:10}}>
<h3 style={{textAlign:'center'}}>LIBELLES</h3>
    <span 
    onClick={()=>dispatch({ type: "SET_MODAL_LIBELLES", payload: false })}
    style={{
        float:'right',
        padding:10,
        paddingBottom: 7,
        backgroundColor:'#780006',
        cursor:'pointer',
        borderRadius:'50%',
    }}><FiX color='white' /></span>
<br/>
<div style={{display:'flex'}}>
<input
value={description_libelle}
onChange={(text)=>setDescription_libelle(text.target.value)}
placeholder="Entrer l'intitulé du libellé"
className='input-normall'
style={{width: '99%', marginRight:10}}
/>
</div>
<ButtonNormal onPress={()=>add_libelle()} text="Enregistrer le libellé" style={{marginTop: 10, marginBottom:10,width:'100%'}} />
</div>

<div style={{margin:20, marginTop:10}}>
<h3>Tous les libellés</h3><br/>
<table style={{borderCollapse:'collapse',width:'100%'}}>
    <tr>
        <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>N0</th>
        <th className="td-border" style={{textAlign:'left',paddingLeft:10,paddingLeft:10,paddingTop:7,paddingBottom:7,backgroundColor:'rgba(0, 80, 180,0.4)'}}>Intitulé du libellé</th>
        {/* <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Montant à payer par an</th> */}
        {/* <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Intitulé du libellé</th> */}
    </tr>
    {libelles.map((libelle, index) => {
    return(
                                        <tr>
                                        <td className="td-border" style={{textAlign:'center'}}>{index+1}</td>
                                        <td className="td-border" style={{textAlign:'left',paddingLeft:10,paddingTop:10,paddingBottom:10}} key={index}>{libelle.description_libelle}</td>
                                        {/* <td className="td-border" style={{textAlign:'center'}}>{category.category_amount}</td>
                                        <td className="td-border" style={{textAlign:'center'}}>0</td> */}
                                        </tr>
                                    )})}
</table>

</div>

</div>
        </div>
    )
}

export default Libelles;
