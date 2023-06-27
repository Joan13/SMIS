import React, { useEffect } from 'react';
import { FaClipboard, FaEdit, FaStarHalfAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ClassOverview from './class_overview';
import { FcBusinessman, FcDataSheet, FcDocument, FcFile, FcGrid, FcList } from 'react-icons/fc';
import { BiEdit } from 'react-icons/bi';
import { TbReportMoney } from 'react-icons/tb';

export default function RightClasseMenu() {

    const dispatch = useDispatch();
    const middle_func = useSelector(state => state.middle_func);
    const classe = useSelector(state => state.classe);
    const fiches_tab = useSelector(state => state.fiches_tab);
    const user_data = useSelector(state => state.user_data);

    const set_page = (middle_func, marks_tab, menu_left, menu_pupils) => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
    }

    const set_page1 = (middle_func, fiche_tab, marks_tab, menu_left, menu_pupils) => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_FICHES_TAB", payload: fiche_tab });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: fiche_tab });

        // if(middle_func === 5 && fiche_tab === "FI") {
        //     dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: !fiche_tab });
        // }
    }

    // useEffect(() => {
    //     console.log(user_data.poste);
    // }, []);


    return (
        <div className="menu-right">
            <br />
            {middle_func !== 22 ?
                middle_func !== 2 ?
                    middle_func !== 23 ?
                        <div>
                            <span className='text-gray-100'>Dossier :</span> <strong>{classe.class_id} {classe.section_id} {classe.order_id}<br /></strong>
                            <ClassOverview />

                            <div className="border-top-dividerddd"></div>

                            <strong className="block-menu-right-first mt-6 border-t border-background-50 dark:border-gray-20"> Général</strong>

                            <div className="flex items-center ml-5 text-primary-50 mb-3">
                                <FcList style={{ marginRight: 7 }} />
                                <span onClick={() => set_page(1, "", true, false)} className={`select-no-border ${middle_func === 1 ? "select-no-border-bold" : ""}`}>
                                    Liste nomminative
                                </span>
                            </div>

                            {/* <div className="item-menu-right">
                                <span 
                                // onClick={() => set_page(9, "", true, false)} 
                                style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 90 ? "select-no-border-bold" : ""}`}>
                                    <FcBusinessman style={{ marginRight: 7 }} />
                                    Cartes d'élève
                                </span>
                            </div> */}

                            <div className="flex items-center ml-5 text-primary-50 mb-3">
                                <FcDocument style={{ marginRight: 7 }} />
                                <span onClick={() => set_page(9, "", true, false)} className={`select-no-border ${middle_func === 9 ? "select-no-border-bold" : ""}`}>
                                    Cours
                                </span>
                            </div>

                            {parseInt(user_data.poste) !== 6 && parseInt(user_data.poste) !== 3 ?
                                <div>
                                    <strong className="block-menu-right"> Édition</strong>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <BiEdit style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(2, "FPE", false, false)} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                            Edition des points par élève
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <BiEdit style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(2, "FPC", false, false)} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                            Edition des points par cours
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <BiEdit style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(31, "", true, false)} className={`select-no-border ${middle_func === 31 ? "select-no-border-bold" : ""}`}>
                                            Conduites
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <BiEdit style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(34, "", true, false)} className={`select-no-border ${middle_func === 34 ? "select-no-border-bold" : ""}`}>
                                            Migrations
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10 }}> Notes des élèves</strong>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcDataSheet style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(32, "", true, false)} className={`select-no-border ${middle_func === 32 ? "select-no-border-bold" : ""}`}>
                                            Fiche des points
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcDataSheet style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(33, "", true, false)} className={`select-no-border ${middle_func === 33 ? "select-no-border-bold" : ""}`}>
                                            Notes individuelles
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcFile style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(3, "", true, false)} className={`select-no-border ${middle_func === 3 ? "select-no-border-bold" : ""}`}>
                                            Palmarès
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcFile style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(10, "", true, false)} className={`select-no-border ${middle_func === 10 ? "select-no-border-bold" : ""}`}>
                                            Palmarès final
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcGrid style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(7, "", true, false)} className={`select-no-border ${middle_func === 7 ? "select-no-border-bold" : ""}`}>
                                            Bulletins
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10, }}> Autres fiches</strong>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcFile style={{ marginRight: 7 }} />
                                        <span className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>

                                            <select value={fiches_tab} onChange={(val) => set_page1(5, val.target.value, "", true, true)}
                                                style={{ backgroundColor: 'transparent' }} className={`select-no-border ${middle_func === 5 ? "select-no-border-bold" : ""}`}>
                                                <option value="">Sélectionner une fiche</option>
                                                <option value="FI">Fiche des identités</option>
                                                {/* <option value="FO">Fiche d'observation</option> */}
                                                <option value="E13">Fiche E13</option>
                                                {/* <option value="E80">Fiche E80</option> */}
                                            </select>
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10 }}> Fiches brouillon</strong>

                                    {/* {this.props.class_open ? */}
                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcFile style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(26, "", true, true)} className={`select-no-border ${middle_func === 26 ? "select-no-border-bold" : ""}`}>
                                            Fiche des points brouillon
                                        </span>
                                    </div>

                                    <div className="flex items-center ml-5 text-primary-50 mb-3">
                                        <FcFile style={{ marginRight: 7 }} />
                                        <span onClick={() => set_page(28, "", true, true)} className={`select-no-border ${middle_func === 28 ? "select-no-border-bold" : ""}`}>
                                            Bulletins brouillons
                                        </span>
                                    </div>
                                </div>
                                : null}

                            <strong className="block-menu-right" style={{ marginTop: 10 }}> Finances</strong>

                            {/* {this.props.class_open ? */}
                            <div className="flex items-center ml-5 text-primary-50 mb-3">
                                <TbReportMoney style={{ marginRight: 7 }} />
                                <span onClick={() => set_page(8, "", true, false)} className={`select-no-border ${middle_func === 8 ? "select-no-border-bold" : ""}`}>
                                    Paiement des frais scolaires
                                </span>
                            </div>

                            <div className="flex items-center ml-5 text-primary-50 mb-5">
                                <FcFile style={{ marginRight: 7 }} />
                                <span onClick={() => set_page(24, "", true, false)} className={`select-no-border ${middle_func === 24 ? "select-no-border-bold" : ""}`}>
                                    Catégorisation des paiements
                                </span>
                            </div>
                        </div> : null : null : null}
        </div>
    )
}