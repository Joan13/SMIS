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

    useEffect(() => {
        console.log(user_data.poste);
    }, []);


    return (
        <div className="menu-right">
            <br />
            {middle_func !== 22 ?
                middle_func !== 2 ?
                    middle_func !== 23 ?
                        <div>
                            <strong>Dossier : {classe.class_id} {classe.section_id} {classe.order_id}<br /></strong>
                            <ClassOverview />

                            <div className="border-top-divider"></div>

                            <strong className="block-menu-right-first" style={{ color: 'rgb(0, 0, 0)' }}> Général</strong>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(1, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 1 ? "select-no-border-bold" : ""}`}>
                                    <FcList style={{ marginRight: 7 }} />
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

                            <div className="item-menu-right">
                                <span onClick={() => set_page(9, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 9 ? "select-no-border-bold" : ""}`}>
                                    <FcDocument style={{ marginRight: 7 }} />
                                    Cours
                                </span>
                            </div>

                            {parseInt(user_data.poste) !== 6 && parseInt(user_data.poste) !== 3 ?
                                <div>
                                    <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)' }}> Édition</strong>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(2, "FPE", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                            <BiEdit style={{ marginRight: 7 }} />
                                            Edition des points par élève
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(2, "FPC", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                            <BiEdit style={{ marginRight: 7 }} />
                                            Edition des points par cours
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(2, "FPE", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 17 ? "select-no-border-bold" : ""}`}>
                                            <BiEdit style={{ marginRight: 7 }} />
                                            Conduites
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Notes des élèves</strong>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(2, "NPC", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 20 ? "select-no-border-bold" : ""}`}>
                                            <FcDataSheet style={{ marginRight: 7 }} />
                                            Fiche des points
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(3, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 3 ? "select-no-border-bold" : ""}`}>
                                            <FcFile style={{ marginRight: 7 }} />
                                            Palmarès
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(10, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 10 ? "select-no-border-bold" : ""}`}>
                                            <FcFile style={{ marginRight: 7 }} />
                                            Palmarès final
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(7, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 7 ? "select-no-border-bold" : ""}`}>
                                            <FcGrid style={{ marginRight: 7 }} />
                                            Bulletins
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Autres fiches</strong>

                                    <div className="item-menu-right">
                                        <span className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                            <FcFile style={{ marginRight: 7 }} />
                                            <select value={fiches_tab} onChange={(val) => set_page1(5, val.target.value, "", true, true)}
                                                style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'transparent' }} className={`select-no-border ${middle_func === 5 ? "select-no-border-bold" : ""}`}>
                                                <option value="">Sélectionner une fiche</option>
                                                <option value="FI">Fiche des identités</option>
                                                <option value="FO">Fiche d'observation</option>
                                                <option value="E13">Fiche E13</option>
                                                <option value="E80">Fiche E80</option>
                                            </select>
                                        </span>
                                    </div>

                                    <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Fiches brouillon</strong>

                                    {/* {this.props.class_open ? */}
                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(26, "", true, true)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 26 ? "select-no-border-bold" : ""}`}>
                                            <FcFile style={{ marginRight: 7 }} />
                                            Fiche des points brouillon
                                        </span>
                                    </div>

                                    <div className="item-menu-right">
                                        <span onClick={() => set_page(28, "", true, true)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 28 ? "select-no-border-bold" : ""}`}>
                                            <FcFile style={{ marginRight: 7 }} />
                                            Bulletins brouillons
                                        </span>
                                    </div>
                                </div>
                                : null}

                            <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Finances</strong>

                            {/* {this.props.class_open ? */}
                            <div className="item-menu-right">
                                <span onClick={() => set_page(8, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 8 ? "select-no-border-bold" : ""}`}>
                                    <TbReportMoney style={{ marginRight: 7 }} />
                                    Paiement des frais scolaires
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(24, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 24 ? "select-no-border-bold" : ""}`}>
                                    <FcFile style={{ marginRight: 7 }} />
                                    Catégorisation des paiements
                                </span>
                            </div>
                        </div> : null : null : null}
        </div>
    )
}