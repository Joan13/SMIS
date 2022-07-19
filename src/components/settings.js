import React, { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Footer from '../includes/footer';
import EditPassword from '../sub_components/edit_password';

export default function Settings() {

    const [tab_main, setTab_main] = useState(0);

    return (
        <div>
            <div className='header-settings'>
            <Link className='back-settings' to={'/'}>
            {/* <FiChevronLeft size={20} /> */}
            Retour
            </Link>
            <div style={{marginLeft:'10%',marginTop:-20}}>
            <strong className='title-settings'>Paramètres de l'utilisateur</strong>

<div style={{marginTop:20}}>
    <span onClick={() =>setTab_main(0)} className={`tab-settings ${tab_main === 0 ? "tab-settings-selected" : ""}`}>Configuration de compte</span>
    <span onClick={() =>setTab_main(1)} className={`tab-settings ${tab_main === 1 ? "tab-settings-selected" : ""}`}>Espace de travail</span>
</div>
            </div>
            </div>

            {/* <div className='menu-settings'></div> */}

            <div className='body-settings'>
<EditPassword />

            </div>
            <Footer/>
        </div>
    )
}

