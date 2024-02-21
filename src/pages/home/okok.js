<div className="main-container">
    <div>
        <div className="top-bar-app">
            {this.props.loadding_header ? <LinearProgress /> : null}
            <span className="topbar-title">
                <FcOpenedFolder
                    color="orange"
                    size={22}
                    style={{ marginRight: 10, marginLeft: 20 }}
                />
                {this.props.school_name_abb}
                <span style={{ color: "gray", fontSize: 17, marginLeft: 20 }}>
                    {" "}
                    / Dossiers / {this.props.annee_scolaire.year_name}{" "}
                </span>
            </span>

            <div className="float-menu-topbar">
                {this.props.loading_footer ? (
                    <span className="user-home-tools">
                        <CircularProgress
                            style={{ color: "rgb(0, 80, 180)" }}
                            size={20}
                        />
                    </span>
                ) : null}

                <span
                    title="Revenir au menu principal"
                    className="user-home-tools"
                    onClick={() => this.back_home()}>
                    <FaHome color="black" size={20} />
                </span>

                {!online ? (
                    <span
                        title="Synchroniser les données"
                        onClick={() => this.collect_data()}
                        className="user-home-tools">
                        <FaCloudUploadAlt color="black" size={22} />
                    </span>
                ) : null}

                <span title="Notifications" className="user-home-tools">
                    <FaBell color="black" size={20} />
                </span>

                {/* <span title="Notifications"
                                onClick={() => this.props.dispatch({ type: "SET_MODAL_SELECTIONS", payload: true })}
                                className="user-home-tools">
                                <FaBell color="black" size={20} />
                            </span> */}

                <span
                    title="Rafraîchir les données"
                    onClick={() => this.refresh_window()}
                    className="user-home-tools">
                    <FiRefreshCcw color="black" size={20} />
                </span>

                <Link
                    title="Configurations"
                    className="user-home-tools"
                    to={"/settings"}>
                    <RiSettings4Fill color="black" size={22} />
                </Link>

                {this.state.logout_open ? (
                    <span
                        title="Déconnexion"
                        onClick={() => this.logout_session()}
                        className="user-home-tools"
                        style={{ fontSize: 15 }}>
                        <div className="deconnexion">
                            <FiLogOut
                                color="white"
                                size={12}
                                style={{ marginRight: 10 }}
                            />
                            Quitter
                        </div>
                    </span>
                ) : null}
                <span
                    onClick={() =>
                        this.state.logout_open
                            ? this.setState({ logout_open: false })
                            : this.setState({ logout_open: true })
                    }
                    style={{
                        display: "inline-block",
                        textAlign: "right",
                        marginRight: 10,
                    }}>
                    <strong style={{ fontSize: 13 }}>
                        {this.props.user_poste.toUpperCase()}
                    </strong>
                    <br />
                    <span style={{ display: "inline-block" }}>
                        {this.props.user_data.user_name}
                    </span>
                </span>
                <span
                    onClick={() =>
                        this.state.logout_open
                            ? this.setState({ logout_open: false })
                            : this.setState({ logout_open: true })
                    }
                    className="user-home">
                    <FiUser color="black" size={15} />
                </span>
                <FaCircle
                    style={{ marginLeft: -13, marginBottom: -13, paddingTop: 20 }}
                    size={13}
                    color="rgb(0, 180, 0)"
                />
            </div>

            <div className="menu-top-middlerere flex align-center justify-center bg-success">
                <div className="flex align-center justify-center">
                <strong>
                    {this.props.title_main}{" "}
                    {this.props.middle_func === 4
                        ? " " + this.state.periode_full.toLocaleLowerCase() + " / "
                        : null}{" "}
                    {this.props.annee_scolaire.year_name}
                </strong>
                <span style={{ marginLeft: 20 }} className="select-no-border">
                    <FaEdit color="rgba(0, 80, 180)" />
                    <select
                        onChange={(val) => this.get_general_info(val.target.value)}
                        style={{
                            color: "rgba(0, 80, 180)",
                            backgroundColor: "white",
                            textAlign: "right",
                        }}
                        className="select-no-border-select">
                        <option value={this.props.annee}>Modifier année</option>
                        {this.props.annees.map((annee, index) => (
                            <option key={index} value={annee.year_id}>
                                {annee.year_name}
                            </option>
                        ))}
                    </select>
                </span>
                </div>

                <div className="topbar-menu-float-right">
                    {/* <span
                                    onClick={() => this.new_classe_import()}
                                    style={{ color: 'rgba(0, 80, 180)' }}
                                    className={`select-no-border ${this.props.middle_func === 13 ? "select-no-border-bold" : ""}`}>
                                    <FaUserPlus style={{ marginRight: 5 }} />
                                    Uploader une classe</span> */}

                    {this.props.middle_func === 15 ? (
                        <span
                            onClick={() => this.new_worker()}
                            style={{ color: "rgba(0, 80, 180)" }}
                            className={`select-no-border ${this.props.middle_func === 6
                                ? "select-no-border-bold"
                                : ""
                                }`}>
                            <FaUserPlus style={{ marginRight: 5 }} />
                            Nouveau membre
                        </span>
                    ) : this.props.middle_func === 23 ? (
                        <span
                            onClick={() => this.timetable_settings()}
                            style={{ color: "rgba(0, 80, 180)" }}
                            className={`select-no-border ${this.props.middle_func === 22
                                ? "select-no-border-bold"
                                : ""
                                }`}>
                            <FaUserPlus style={{ marginRight: 5 }} />
                            Configuration des horaires
                        </span>
                    ) : this.props.middle_func === 12 ? (
                        <>
                            {/* <span
                                    // onClick={() => this.gestion_depenses()}
                                    style={{ color: 'rgba(0, 80, 180)' }}
                                    className={`select-no-border ${this.props.middle_func === 22 ? "select-no-border-bold" : ""}`}>
                                    <FaUserPlus style={{ marginRight: 5 }} />
                                    Gestion des dépenses</span> */}
                            <span
                                onClick={() => this.paiement_categories()}
                                style={{ color: "rgba(0, 80, 180)" }}
                                className={`select-no-border ${this.props.middle_func === 22
                                    ? "select-no-border-bold"
                                    : ""
                                    }`}>
                                <FaUserPlus style={{ marginRight: 5 }} />
                                Catégories de paiement
                            </span>
                        </>
                    ) : (
                        <span
                            onClick={() => this.new_pupil()}
                            style={{ color: "rgba(0, 80, 180)" }}
                            className={`select-no-border ${this.props.middle_func === 6
                                ? "select-no-border-bold"
                                : ""
                                }`}>
                            <FaUserPlus style={{ marginRight: 5 }} />
                            Nouveau
                        </span>
                    )}

                    {this.props.middle_func === 12 ? (
                        <span
                            onClick={() => this.open_libelles()}
                            style={{ color: "rgba(0, 80, 180)" }}
                            className={`select-no-border ${this.props.middle_func === 13
                                ? "select-no-border-bold"
                                : ""
                                }`}>
                            <span className="divider-menu-topbar"></span>
                            <FiEdit style={{ size: 17, marginRight: 5 }} />
                            Libéllés
                        </span>
                    ) : (
                        <span
                            onClick={() => this.new_classe_import()}
                            style={{ color: "rgba(0, 80, 180)" }}
                            className={`select-no-border ${this.props.middle_func === 13
                                ? "select-no-border-bold"
                                : ""
                                }`}>
                            <span className="divider-menu-topbar"></span>
                            <FaClipboard style={{ size: 17, marginRight: 5 }} />
                            Uploader une classe
                        </span>
                    )}

                    <span
                        onClick={() => this.fetch_synthese()}
                        style={{ color: "rgba(0, 80, 180)" }}
                        className={`select-no-border ${this.props.middle_func === 4 ? "select-no-border-bold" : ""
                            }`}>
                        <span className="divider-menu-topbar"></span>
                        <FaPaperclip style={{ size: 12 }} />
                        Synthèse des résultats
                    </span>
                </div>
            </div>
        </div>

        <div className="main-menu-left">
            <Classes type={1} />
        </div>

        <div className="main-middle-page">
            <div className="sub-div-main">
                {this.props.loading_middle ? (
                    <div
                        className="progress-center-main"
                        style={{ alignItems: "center" }}
                    >
                        <CircularProgress style={{ color: "rgb(0, 80, 180)" }} />
                        <br />
                        Chargement des données...
                    </div>
                ) : (
                    <div>
                        <EmployeesList />

                        {this.props.middle_func === 22 ? (
                            <div className="menu-right">
                                <CoursesTimetableConfigurator />
                            </div>
                        ) : null}

                        {this.props.allow_right_menu && this.props.class_open ? (
                            <RightClasseMenu />
                        ) : null}

                        {this.props.allow_right_menu_pupils ? (
                            <PupilsRightMenu />
                        ) : null}

                        <div className="center-fixed">
                            <div style={{ paddingLeft: 20, paddingRight: 10 }}>
                                {this.props.middle_func === 1 ? (
                                    <div id="liste-nomminative">
                                        <ListeNomminative />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 11 ? (
                                    <div id="view_pupil">
                                        <ViewPupil />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 12 ? (
                                    <div id="stats_caisse">
                                        <StatistiquesCaisse />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 13 ? (
                                    <div id="class-import">
                                        <NewClasseImport />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 15 ? (
                                    <div id="gestion-personnel">
                                        <GestionPersonnel />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 16 ? (
                                    <div id="add-worker">
                                        <AddWorker />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 22 ? (
                                    <div id="timetable-settings">
                                        <TimetableSettings />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 24 ? (
                                    <div id="paiement-categorisation">
                                        <ClassePaiementCategorisation />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 14 ? (
                                    <div id="settings-bulletins">
                                        <SettingsBulletins />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 26 ? (
                                    <div id="fiche-points-b">
                                        <FichePointsBrouillon />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 27 ? (
                                    <div id="fiche-synthese-points-b">
                                        <FicheSynthesePointsBrouillon />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 28 ? (
                                    <div id="fiche-synthese-points-b">
                                        <BulletinsBrouillon />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 29 ? (
                                    <div id="fiche-synthese-points-b">
                                        <BulletinsType2Brouillon />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 30 ? (
                                    <div id="view_worker">
                                        <ViewWorker />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 31 ? (
                                    <div id="view_worker">
                                        <Conduites />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 32 ? (
                                    <div id="view_worker">
                                        <FichesPoints />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 5 ? (
                                    <div id="fiches">
                                        {this.props.fiches_tab === "FI" ? (
                                            <div id="fiche-identity">{<FicheIdentites />}</div>
                                        ) : null}

                                        {this.props.fiches_tab === "FO" ? (
                                            <div id="fiche-observation">
                                                {/* {<FicheObservationPoints />} */}
                                            </div>
                                        ) : null}

                                        {this.props.fiches_tab === "E13" ? (
                                            <div id="fiche-e133">
                                                <FicheE13 />
                                            </div>
                                        ) : null}

                                        {this.props.fiches_tab === "E80" ? (
                                            <div id="fiche-e800">{/* {<FicheE80 />} */}</div>
                                        ) : null}
                                    </div>
                                ) : null}

                                {this.props.middle_func === 9 ? (
                                    <div>
                                        <Courses />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 8 ? (
                                    <div>
                                        <PaiementsClasse />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 0 ? (
                                    <div>
                                        <MenuHome />
                                    </div>
                                ) : null}

                                {this.props.middle_func === 2 ? (
                                    <div>
                                        {this.props.marks_tab === "FPE" ? (
                                            <FichePointsPupils />
                                        ) : null}

                                        {this.props.marks_tab === "FPC" ? (
                                            <FichesPointsCourses />
                                        ) : null}
                                    </div>
                                ) : null}

                                {this.props.middle_func === 3 ? <PalmaresPupils /> : null}

                                {this.props.middle_func === 10 ? <PalmaresFinal /> : null}

                                {this.props.middle_func === 4
                                    ? this.render_synthese()
                                    : null}

                                {this.props.middle_func === 6 ? <NewPupil /> : null}

                                {this.props.middle_func === 7 ? (
                                    <div id="liste-bulletins">
                                        <Bulletins />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

        <Footer />
        {this.props.modal_paiement_categories ? <PaiementCategories /> : null}

        {this.props.modal_libelles ? <Libelles /> : null}

        {this.props.modal_selections ? <ModalFrame type={1} /> : null}

        {/* {this.state.modal_view ?
                        <div className="main-div-modal">
                            {ModalView(this.state.modal_title, this.state.modal_main_text)}
                            <div className="sub-div-modal">
                                <Button onClick={() => this.setState({ modal_view: false })} variant="outlined" style={{ color: 'black', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}>Fermer</Button>
                            </div>
                        </div> : null} */}
    </div>
</div>