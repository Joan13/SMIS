import React, { useState } from 'react';
import { FaCalendar } from 'react-icons/fa';

export default function BasicInfo() {
    const [annee_scolaire, setAnnee_scolaire] = useState("");
    const [cycle, setCycle] = useState("");
    const [classe, setClasse] = useState("");
    const [order, setOrder] = useState("");
    const [section, setSection] = useState("");
    const [option, setOption] = useState("");

    return (
        <div>
            <h3>Ajouter les information générales de base</h3>  <span style={{ color: 'gray' }}>(Année scolaire, cycle, classe, section, option, ordre de classe)</span><br />

            <label>Ajouter une nouvelle année scolaire<br />
                <span style={{ color: 'gray' }}>Une année scolaire ne peut-être entrée q'une seule fois.
                    Suivez le modèle qui suit (2021-2022)</span>
            </label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    style={{ width: '95%', marginLeft: 10 }}
                    className="input"
                    value={annee_scolaire}
                    onChange={(text) => setAnnee_scolaire(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer l'année scolaire
            </button>
            <br /><br />


            <label>Ajouter un cycle</label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    placeholder='Ex: Secondaire'
                    style={{ width: '85%', marginLeft: 10 }}
                    className="input"
                    value={cycle}
                    onChange={(text) => setCycle(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer le cycle
            </button>
            <br /><br />


            <label>Ajouter un numéro de classe<br />
                <span style={{ color: 'gray' }}>Par exemple pour la classe de 1ère année, vous entrez simplement <strong>1</strong></span>
            </label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    placeholder='Ex: 1'
                    style={{ width: '85%', marginLeft: 10 }}
                    className="input"
                    value={classe}
                    onChange={(text) => setClasse(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer le numéro de classe
            </button>
            <br /><br />


            <label>Ajouter ordre de classe</label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    placeholder='Ex: B'
                    style={{ width: '85%', marginLeft: 10 }}
                    className="input"
                    value={order}
                    onChange={(text) => setOrder(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer l'ordre de classe
            </button>
            <br /><br />

            <label>Ajouter une section</label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    placeholder='Ex: Commerciale et gestion'
                    style={{ width: '85%', marginLeft: 10 }}
                    className="input"
                    value={section}
                    onChange={(text) => setSection(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer la section
            </button>
            <br /><br />

            <label>Ajouter une option</label>
            <div className="input-div-border-icon" style={{ width: '40%' }}>
                <FaCalendar style={{ marginBottom: -3 }} />
                <input
                    type="text"
                    placeholder='Ex: Latin-Philosophie'
                    style={{ width: '85%', marginLeft: 10 }}
                    className="input"
                    value={option}
                    onChange={(text) => setOption(text.target.value)} />
            </div>
            <button style={{ color: 'white', backgroundColor: 'rgb(0, 80,180)', border: 'none', borderRadius: 5, cursor: 'pointer' }} className="button-default">
                Enregistrer l'option
            </button>
            <br /><br />
        </div>
    )
}
