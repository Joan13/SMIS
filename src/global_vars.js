import { connect } from "react-redux";
import { mapStateToProps } from "./store/state_props";

export let home_redirect = "/wima";

export function printContent(divName) {

    let printContents = document.getElementById(divName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();

    document.body.innerHTML = originalContents;
    // window.location.reload();
    window.location.href = "http://" + this.state.url_server + home_redirect;
    window.location.replace( "http://" + this.state.url_server + home_redirect);
}

export function find_date(date) {
    let year = date.substr(6, 4);
    let month = date.substr(3, 2);
    let day = date.substr(0, 2);

    if (month === "1" || month === "01") {
        month = "Janvier";
    } else if (month === "2" || month === "02") {
        month = "Février";
    } else if (month === "3" || month === "03") {
        month = "Mars";
    } else if (month === "4" || month === "04") {
        month = "Avril";
    } else if (month === "5" || month === "05") {
        month = "Mai";
    } else if (month === "6" || month === "06") {
        month = "Juin";
    } else if (month === "7" || month === "07") {
        month = "Juillet";
    } else if (month === "8" || month === "08") {
        month = "Août";
    } else if (month === "9" || month === "09") {
        month = "Septembre";
    } else if (month === "10") {
        month = "Octobre";
    } else if (month === "11") {
        month = "Novembre";
    } else if (month === "12") {
        month = "Décembre";
    }
    else {
        month = "Non défini";
    }

    let fullDate = day + " " + month + " " + year;

    return fullDate;
}

export function find_date2(date) {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);

    if (month === "1" || month === "01") {
        month = "Janvier";
    } else if (month === "2" || month === "02") {
        month = "Février";
    } else if (month === "3" || month === "03") {
        month = "Mars";
    } else if (month === "4" || month === "04") {
        month = "Avril";
    } else if (month === "5" || month === "05") {
        month = "Mai";
    } else if (month === "6" || month === "06") {
        month = "Juin";
    } else if (month === "7" || month === "07") {
        month = "Juillet";
    } else if (month === "8" || month === "08") {
        month = "Août";
    } else if (month === "9" || month === "09") {
        month = "Septembre";
    } else if (month === "10") {
        month = "Octobre";
    } else if (month === "11") {
        month = "Novembre";
    } else if (month === "12") {
        month = "Décembre";
    }
    else {
        month = "Non défini";
    }

    let fullDate = day + " " + month + " " + year;

    return fullDate;
}

export function format_date(date) {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);

    let date_return = day + "/" + month + "/" + year;

    return date_return;
}
