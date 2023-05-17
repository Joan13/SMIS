export const home_redirect = "/";
export const year = "2018 - 2023";
export const http = "http://";
export const url_online = "gestion.collegeafajiri.net";
// export const url_online = "192.168.10.2";
// export const url_online = "";
export const online = true;

export const find_date = (date) => {
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

export const find_date2 = (date) => {
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

export const format_date = (date) => {
    let year = date.substr(0, 4);
    let month = date.substr(5, 2);
    let day = date.substr(8, 2);

    let date_return = day + "/" + month + "/" + year;

    return date_return;
}

export const generateMonth = (month) => {
    if (parseInt(month === 1) || month === '01') {
        return "Janvier";
    } else if (parseInt(month === 2) || month === '02') {
        return "Février";
    } else if (parseInt(month === 3) || month === '03') {
        return "Mars";
    } else if (parseInt(month === 4) || month === '04') {
        return "Avril";
    } else if (parseInt(month === 5) || month === '05') {
        return "Mai";
    } else if (parseInt(month === 6) || month === '06') {
        return "Juin";
    } else if (parseInt(month === 7) || month === '07') {
        return "Juillet";
    } else if (parseInt(month === 8) || month === '08') {
        return "Août";
    } else if (parseInt(month === 9) || month === '09') {
        return "Septembre";
    } else if (parseInt(month === 10) || month === '10') {
        return "Octobre";
    } else if (parseInt(month === 11) || month === '11') {
        return "Novembre";
    } else {
        return "Décembre"
    }
}
