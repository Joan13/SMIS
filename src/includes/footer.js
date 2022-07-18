import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { year } from '../global_vars';
import { mapStateToProps } from '../store/state_props';

class Footer extends Component {
    render() {
        return (
            <>
                {this.props.loading_footer ?
                    <div className="information-footer">
                        <CircularProgress size={20} color="inherit" style={{ marginRight: 20 }} />
                        Chargement des données parallèles...
                    </div> : null}
                <div className="footer-rights">
                    <span style={{ marginRight: 20 }}><span style={{ color: 'gray' }}>Yambi School Managment Information System / stable / version 3.4.6 - Web / </span>Tous droits réservés © Agisha Migani Joan - Yambi, Inc. {year}</span>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps)(Footer);