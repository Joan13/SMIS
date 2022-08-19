import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { year } from '../global_vars';
import { mapStateToProps } from '../store/state_props';
import JSONPackageFile from '../../package.json';
import { useSelector } from 'react-redux';

export default function Footer() {
    const loading_footer = useSelector(state => state.loading_footer);
    return (
        <div>
            {loading_footer ?
                <div className="information-footer">
                    <CircularProgress size={20} color="inherit" style={{ marginRight: 20 }} />
                    Chargement des données parallèles...
                </div> : null}
            <div className="footer-rights">
                <span style={{ marginRight: 20 }}><span style={{ color: 'gray' }}> {JSONPackageFile.app_full_name} / {JSONPackageFile.branch} / version {JSONPackageFile.version} - {JSONPackageFile.platform} / </span>Tous droits réservés © Agisha Migani Joan - Yambi, Inc. {year}</span>
            </div>
        </div>
    )
}
