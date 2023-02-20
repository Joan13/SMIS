import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { year } from '../global_vars';
import { mapStateToProps } from '../store/state_props';
import JSONPackageFile from '../../package.json';
import { useSelector } from 'react-redux';

export default function Footer() {
    // const loading_footer = useSelector(state => state.loading_footer);
    return (
        <div>
            <div className="footer-rights">
                <span style={{ marginRight: 20, fontSize:13 }}><span style={{ color: 'gray' }}> {JSONPackageFile.app_full_name} / {JSONPackageFile.branch} / version {JSONPackageFile.version} - {JSONPackageFile.platform} / </span>Tous droits réservés © Agisha Migani Joan - Yambi, Inc. {year}</span>
            </div>
        </div>
    )
}
