import React from 'react';
import { FaCalendarAlt, FaChartBar, FaExpandArrowsAlt, FaFolder, FaPeopleArrows, FaPeopleCarry, FaSquarespace, FaUsers } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { mapStateToProps } from '../../store/state_props';
import { FcBarChart, FcBriefcase, FcCalendar, FcCollaboration, FcComboChart, FcConferenceCall, FcCurrencyExchange, FcLibrary } from 'react-icons/fc';
import { http } from '../../global_vars';
import caisse from './../../assets/caisse.jpg';
import personnel from './../../assets/teachers.jpg';
import timetablee from './../../assets/timetable.jpg';
import library from './../../assets/library.jpg';
import meeting from './../../assets/meeting.jpg';
import logistics from './../../assets/logistics.jpg';

const MenuHome = () => {

    const dispatch = useDispatch();
    const url_server = useSelector(state => state.url_server);
    const annee = useSelector(state => state.annee);
    const user_data = useSelector(state => state.user_data);

    const fetch_workers = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/fetch_workers.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_WORKERS", payload: response.employees });
            })
            .catch((error) => { });
    };

    const fetch_tricks_timetable = () => {
        let BaseURL = http + url_server + "/yambi_class_SMIS/API/fetch_tricks_timetable.php";

        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify({
                school_year: annee,
            })
        })
            .then((response) => response.json())
            .then((response) => {
                dispatch({ type: "SET_TRICKS_TIMETABLE", payload: response.tricks_timetable });
            })
            .catch((error) => { });
    };

    const stats_caisse = () => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 12 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "État Journalier de caisse" });
    }

    const gestion_personnel = () => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 15 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Gestion du personnel" });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });

        fetch_workers();
    }

    const timetable = () => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: 23 });
        dispatch({ type: "SET_TITLE_MAIN", payload: "Horaires" });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU_PUPILS", payload: false });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: true });

        fetch_workers();
        fetch_tricks_timetable();
    }

    const open_gestion_personnel = () => {
        if (parseInt(user_data.poste) === 1 || parseInt(user_data.poste) === 4 || parseInt(user_data.poste) === 3) {
            gestion_personnel();
        }
    }

    return (
        <div className=' w-full mt-5 mb-5 flex justify-center items-center container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={caisse} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Caisse</div>
                        <div className="text-gray-100 mt-3 mb-3">Rapports journaliers et finaux avec tous les détails possibles.</div>
                        <button onClick={() => stats_caisse()} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>

                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={library} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Bibliothèque</div>
                        <div className="text-gray-100 mt-3 mb-3">Retrouvez et identifiez facilement les livres classés.</div>
                        <button onClick={() => { }} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>

                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={personnel} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Personnel</div>
                        <div className="text-gray-100 mt-3 mb-3">Vue d'ensemble du personnel et horaires de prestation.</div>
                        <button onClick={() => open_gestion_personnel()} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>

                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={timetablee} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Horaires</div>
                        <div className="text-gray-100 mt-3 mb-3">Tout un pannel de possibilités et d'outils à votre disposition.</div>
                        <button onClick={() => { }} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>

                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={meeting} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Réunions et chat</div>
                        <div className="text-gray-100 mt-3 mb-3">Passez en live et communiquez avec des collègues et les parents en temps réel.</div>
                        <button onClick={() => { }} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>

                <div className="ml-5 mr-5 mb-10">
                    <div className="p-2 bg-background-50 shadow-lg hover:shadow-xl rounded-xl dark:bg-background-20 flex flex-col">
                        <img src={logistics} className='object-cover rounded-lg' />
                        <div className='text-xl font-bold mt-5'>Logistique</div>
                        <div className="text-gray-100 mt-3 mb-3">Gérez, classez et suivez l'amortissement du mobilier dans votre établissement.</div>
                        <button onClick={() => { }} className='nodrag bg-primary-100 rounded-lg text-text-20 py-3 hover:scale-105 active:scale-100  duration-300 hover:bg-primary-50 shadow-md '>
                            Consulter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuHome;
