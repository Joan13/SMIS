import React from 'react'
import { FiPrinter } from 'react-icons/fi';
import { home_redirect, http } from '../../global_vars';
import { useSelector } from 'react-redux';

const PrintDocument = (props) => {
    const url_server = useSelector(state => state.url_server);

    const printContent = (divName) => {

        let printContents = document.getElementById(divName).innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();

        document.body.innerHTML = originalContents;
        window.location.href = http + url_server + home_redirect;
        window.location.replace(http + url_server + home_redirect);
    }

    return (
        <div onClick={() => printContent(props.div)} style={{ fontWeight: 'bold', float: 'right', paddingTop: 7 }} className='flex text-text-50 items-center'>
            <FiPrinter className='mr-2' /> <span> IMPRIMER LA FICHE</span>
        </div>
    )
}

export default PrintDocument;
