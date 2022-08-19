import React from 'react';
import { FaClipboard, FaEdit, FaStarHalfAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import ClassOverview from './class_overview';

export default function RightClasseMenu() {

    const dispatch = useDispatch();
    const middle_func = useSelector(state => state.middle_func);
    const classe = useSelector(state => state.classe);
    const fiches_tab = useSelector(state => state.fiches_tab);

    const set_page = (middle_func, marks_tab, menu_left, menu_pupils) => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
    }

    const set_page1 = (middle_func, fiche_tab, marks_tab, menu_left, menu_pupils) => {
        dispatch({ type: "SET_MIDDLE_FUNC", payload: middle_func });
        dispatch({ type: "SET_FICHES_TAB", payload: fiche_tab });
        dispatch({ type: "SET_MARKS_TAB", payload: marks_tab });
        dispatch({ type: "SET_ALLOW_RIGHT_MENU", payload: menu_left });
    }


    return (
        <div className="menu-right">
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
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Liste nomminative
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(9, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 9 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Cours
                                </span>
                            </div>

                            <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)' }}> Édition</strong>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(19, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 19 ? "select-no-border-bold" : ""}`}>
                                    <FaEdit style={{ marginRight: 7 }} />
                                    Libéllés
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(2, "FPE", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                    <FaEdit style={{ marginRight: 7 }} />
                                    Edition des points par élève
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(2, "FPC", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                    <FaEdit style={{ marginRight: 7 }} />
                                    Edition des points par cours
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(2, "FPE", false, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 17 ? "select-no-border-bold" : ""}`}>
                                    <FaEdit style={{ marginRight: 7 }} />
                                    Conduites
                                </span>
                            </div>

                            {/* <div className="item-menu-right">
                                                    <span onClick={() => this.setState({ middle_func: 3, marks_tab: "", allow_right_menu: true })} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func == 3 ? "select-no-border-bold" : ""}`}>
                                                        <FiCalendar style={{ marginRight: 7 }} />
                                                        Horaire de la classe
                                                    </span>
                                                </div> */}

                            <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Notes des élèves</strong>

                            {/* <div className="item-menu-right">
                                                    <span className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                                        <FaStarHalfAlt color="rgba(0, 80, 180)" style={{ marginRight: 7 }} />
                                                        <select
                                                            value={this.props.marks_tab}
                                                            onChange={(val) => set_page(2,val.target.value,false, false)
                                                            // this.setState({ marks_tab: val.target.value, middle_func: 2, allow_right_menu: false })
                                                            }
                                                            style={{ color: 'rgba(0, 80, 180)', backgroundColor: 'transparent' }} className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                                            <option value="">Fiche des points de la classe</option>
                                                            <option value="FPE">Fiche des points par élève</option>
                                                            <option value="FPC">Fiche des points par cours</option>
                                                        </select>
                                                    </span>
                                                </div> */}

                            {/* <div className="item-menu-right">
                                                    <span
                                                        onClick={() => 
                                                            set_page(2,"NPE",true,false)
                                                        // this.setState({ middle_func: 9, marks_tab: "", allow_right_menu: true })
                                                        }
                                                        style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 20 ? "select-no-border-bold" : ""}`}>
                                                        <FaClipboard style={{ marginRight: 7 }} />
                                                        Fiche des points par élève
                                                    </span>
                                                </div> */}

                            <div className="item-menu-right">
                                <span onClick={() => set_page(2, "NPC", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 20 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Fiche des points
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(3, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 3 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Palmarès
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(10, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 10 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Palmarès final
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page(7, "", true, false)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 7 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Bulletins
                                </span>
                            </div>

                            <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Autres fiches</strong>

                            <div className="item-menu-right">
                                <span className={`select-no-border ${middle_func === 2 ? "select-no-border-bold" : ""}`}>
                                    <FaStarHalfAlt color="rgba(0, 80, 180)" style={{ marginRight: 7 }} />
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

                            <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Finances</strong>

                            {/* {this.props.class_open ? */}
                            <div className="item-menu-right">
                                <span onClick={() => this.paiements_classe()} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 8 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Paiement des frais scolaires
                                </span>
                            </div>

                            <div className="item-menu-right">
                                <span onClick={() => set_page1(21, '', "", true, true)} style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func === 21 ? "select-no-border-bold" : ""}`}>
                                    <FaClipboard style={{ marginRight: 7 }} />
                                    Gestion des dépenses
                                </span>
                            </div>
                            {/* :null} */}

                            {/* <strong className="block-menu-right" style={{ marginTop: 10, color: 'rgb(0, 0, 0)' }}> Fiches brouillons</strong>

                                                <div className="item-menu-right">
                                                    <span className={`select-no-border ${middle_func == 2 ? "select-no-border-bold" : ""}`}>
                                                        <FaStarHalfAlt color="rgba(0, 80, 180)" style={{ marginRight: 7 }} />
                                                        <select
                                                            value={this.state.marks_tab}
                                                            onChange={(val) => this.setState({ marks_tab: val.target.value, middle_func: 2, allow_right_menu: false })}
                                                            style={{ color: 'rgba(0, 80, 180)' }} className={`select-no-border ${middle_func == 2 ? "select-no-border-bold" : ""}`}>
                                                            <option value="">Fiche des points de la classe</option>
                                                            <option value="FPE">Fiche des points par élève</option>
                                                            <option value="FPC">Fiche des points par cours</option>
                                                        </select>
                                                    </span>
                                                </div> */}
                        </div> : null : null : null}
        </div>
    )
}