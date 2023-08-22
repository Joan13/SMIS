import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { year } from '../global_vars';
import { mapStateToProps } from '../store/state_props';
import JSONPackageFile from '../../package.json';
import { useSelector } from 'react-redux';

export default function Footer() {
    return (
        <div className='pl-5 w-full'>
            <div className="footer-rights overflow-x border-t truncate border-gray-50 dark:border-gray-20 bg-background-100 rounded-br-lg dark:bg-background-20 pr-5">
                <span><span className='text-gray-100'>{JSONPackageFile.app_full_name} / {JSONPackageFile.branch} / version {JSONPackageFile.version} - {JSONPackageFile.platform} / </span>Tous droits réservés © Yambi {year}</span>
            </div>
        </div>
    )
}
