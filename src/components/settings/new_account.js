import React, {useState} from 'react';
import { FaUser } from 'react-icons/fa';

export default function NewAccount() {
    const [username,setUsername] = useState("");

    return(
        <div>
            <h3>Créer un utilisateur</h3>

            <div className="input-div-border-icon">
                            <FaUser style={{ marginBottom: -3 }} />
                            <input
                                placeholder="Noms de l'utilisateur"
                                style={{ width: '85%', marginLeft: 10 }}
                                className="input"
                                onChange={(text) => this.setState({ names: text.target.value })} />
                        </div>
            
        </div>
    )
}