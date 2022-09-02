import React from 'react';
import { FiX } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import ButtonNormal from '../includes/button_normal';

const PaiementCategories=()=>{
const paiement_categories = useSelector(state=>state.paiement_categories);
const dispatch = useDispatch();

    return(
        <div className="paiement-categories">
<div className="paiement-categories-modal">
<div style={{margin:20, marginTop:10}}>
<h3>CATEGORISATION DES PAIEMENTS DES ÉLÈVES</h3>
    <span 
    onClick={()=>dispatch({ type: "SET_MODAL_PAIEMENT_CATEGORIES", payload: false })}
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
placeholder='Entrer une nouvelle catégorie de paiement'
className='input-normall'
style={{width: '98%', marginRight:10}}
/>
<input
placeholder='Entrer une nouvelle catégorie de paiement'
className='input-normall'
style={{width: '98%'}}
/>
</div>
<ButtonNormal text="Enregistrer la catégorie de paiement" style={{marginTop: 10, marginBottom:10,width:'100%'}} />
</div>

<div style={{margin:20, marginTop:10}}>
<h3>Toutes les catégories de paiement</h3><br/>
<table style={{borderCollapse:'collapse',width:'100%'}}>
    <tr>
        <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>N0</th>
        <th className="td-border" style={{textAlign:'left',paddingLeft:10,paddingLeft:10,paddingTop:7,paddingBottom:7,backgroundColor:'rgba(0, 80, 180,0.4)'}}>Catégorie</th>
        <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Montant à payer par an</th>
        <th className="td-border" style={{backgroundColor:'rgba(0, 80, 180,0.4)'}}>Nbre d'élèves</th>
    </tr>
    {paiement_categories.map((category, index) => {
    let namec = "";
    if (category.category_name === "0")
        namec = "Exampté(e)"
    else 
        namec = category.category_name
    return(
                                        <tr>
                                        <td className="td-border" style={{textAlign:'center'}}>{index+1}</td>
                                        <td className="td-border" style={{textAlign:'left',paddingLeft:10,paddingTop:10,paddingBottom:10}} key={index}><strong>{namec}</strong></td>
                                        <td className="td-border" style={{textAlign:'center'}}>{category.category_amount}</td>
                                        <td className="td-border" style={{textAlign:'center'}}>0</td>
                                        </tr>
                                    )})}
</table>

</div>

</div>
        </div>
    )
}

export default PaiementCategories;
