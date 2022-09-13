export const mapStateToProps = (state) => {
    return {
        user_data: state.user_data,
        user_poste: state.user_poste,
        url_server: state.url_server,
        classes: state.classes,
        annees: state.annees,
        class_numbers: state.class_numbers,
        orders: state.orders,
        sections: state.sections,
        options: state.options,
        annee: state.annee,
        school_name: state.school_name,
        school_name_abb: state.school_name_abb,
        attributions: state.attributions,
        is_loading_home: state.is_loading_home,
        loading_middle: state.loading_middle,
        annee_scolaire: state.annee_scolaire,
        title_main: state.title_main,
        classe: state.classe,
        autres: state.autres,
        middle_func: state.middle_func,
        marks_tab: state.marks_tab,
        class_open: state.class_open,
        periode_synthese: state.periode_syhntese,
        classes_synthese: state.classes_synthese,
        pupils:state.pupils,
        all_pupils: state.all_pupils,
        nbr_ee: state.nbr_ee,
        nbr_tb: state.nbr_tb,
        nbr_bb1: state.nbr_bb1,
        nbr_bb2: state.nbr_bb2,
        nbr_me: state.nbr_me,
        nbr_ma: state.nbr_ma,
        nbr_classes: state.nbr_classes,
        periode_full: state.periode_full,
        modal_view: state.modal_view,
        logout_open: state.logout_open,
        loading_class: state.loading_class,
        courses_count: state.courses_count,
        allow_right_menu: state.allow_right_menu,
        allow_right_menu_pupils: state.allow_right_menu_pupils,
        fiches_tab: state.fiches_tab,
        class_loading: state.class_loading,
        pupils_school: state.pupils_school,
        pupils_count: state.pupils_count,
        number_pupils_show: state.number_pupils_show,
        can_load_class: state.can_load_class,
        reussites: state.reussites,
        doubles: state.doubles,
        fiche_tab:state.fiche_tab,
        echecs: state.echecs,
        abandon: state.abandon,
        val: state.val,
        pupil: state.pupil,
        pupils_marks: state.pupils_marks,
        courses: state.courses,
        pupils_count_male: state.pupils_count_male,
        pupils_count_female: state.pupils_count_female,
        searching_pupil: state.searching_pupil,
        pps: state.pps,
        can_mount_home: state.can_mount_home,
        cycles: state.cycles,
        new_paiement: state.new_paiement,
        libelles: state.libelles,
        all_paiements: state.all_paiements,
        paiements_frais_divers: state.paiements_frais_divers,
        montant_total: state.montant_total,
        pupils_count_paiements: state.pupils_count_paiements,
        loading_footer: state.loading_footer,
        workers:state.workers,
        timetable:state.timetable,
        trics_timetable:state.trics_timetable,
        course:state.course,
        paiement_categories: state.paiement_categories,
        modal_paiement_categories:state.modal_paiement_categories,
        modal_libelles: state.modal_libelles,
        paiements_day:state.paiements_day,
        frais_divers_day: state.frais_divers_day,
        day:state.day,
    }
}

