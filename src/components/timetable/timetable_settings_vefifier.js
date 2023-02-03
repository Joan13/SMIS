import React,{useSelector} from 'react';
import { useDispatch } from 'react-redux';

const TimetableSettingsVerifier=()=>{
    const dispatch = useDispatch();
    const classe = useSelector(state => state.classe);
    const course = useSelector(state => state.course);
    const url_server = useSelector(state => state.url_server);
    const annee_scolaire = useSelector(state => state.annee_scolaire);

    return(
        <div>
            
        </div>
    )
};
