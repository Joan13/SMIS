import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import { FaHome, FaUser } from 'react-icons/fa';

class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            menu: ""
        }

    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default withRouter(MainMenu);