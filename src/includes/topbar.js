import React, { Component } from 'react';
import { FaCircle, FaHospital, FaTools, FaUser } from 'react-icons/fa';

export default class TopBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_data: []
        }
    }

    user_data() {

        let user = sessionStorage.getItem('assemble_user_data');
        user = JSON.parse(user);
        this.setState({ user_data: user });
    }

    componentDidMount() {
        this.user_data();
    }
    render() {
        return (
            <div className="top-bar-app">
                <FaHospital color="black" size={22} style={{ marginRight: 10, marginLeft: 20 }} color="green" />
                <h1>Centre Médical Bioglodi</h1>
                <div className="float-menu-topbar">
                    <span className="user-home-tools">
                        <FaTools color="black" size={25} />
                    </span>
                    <div style={{ display: 'inline-block', textAlign: 'right', marginRight: 10 }}>
                        <strong style={{ fontSize: 13 }}>{this.state.user_data.username}</strong><br />
                        <span style={{ display: 'inline-block' }}>{this.state.user_data.username}</span>
                    </div>
                    <span className="user-home">
                        <FaUser color="black" size={25} />
                    </span>
                    <FaCircle style={{ marginLeft: -13, marginBottom: -13, paddingTop: 20 }} size={13} color="green" />
                </div>
            </div>
        )
    }
}