import React from 'react';
import { useSelector } from 'react-redux';

export default function EmployeesList() {

const employees = useSelector(state=>state.workers);
const teachers = employees.filter(employee=>employee.poste === "5");
const etudes = employees.filter(employee=>employee.poste === "7");
const secretaires = employees.filter(employee=>employee.poste === "4");
const discipline = employees.filter(employee=>employee.poste === "2");
const finances = employees.filter(employee=>employee.poste === "3");
const caisse = employees.filter(employee=>employee.poste === "6");

    return(
        <div>
<strong>Membres du personnel</strong><br/><br/>
<div className="border-top-divider" style={{marginTop: -2}}></div>
<strong className="block-menu-right-first" style={{ color: 'rgb(0, 0, 0)' }}>Corps Enseignant ({teachers.length})</strong>
<div>
                                                    {teachers.map((employee, index) => {
                                                            if (employee.poste === "5") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>

                                                <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)', marginTop: 20 }}>Secrétaires ({secretaires.length})</strong>
<div>
                                                    {secretaires.map((employee, index) => {
                                                            if (employee.poste === "4") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>

                                                <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)', marginTop: 20 }}>Directeurs des Études ({etudes.length})</strong>
<div>
                                                    {etudes.map((employee, index) => {
                                                            if (employee.poste === "7") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>

                                                <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)', marginTop: 20 }}>Directeurs de Discipline ({discipline.length})</strong>
<div>
                                                    {discipline.map((employee, index) => {
                                                            if (employee.poste === "2") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>

                                                <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)', marginTop: 20 }}>Financiers / Économe ({finances.length})</strong>
<div>
                                                    {finances.map((employee, index) => {
                                                            if (employee.poste === "3") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>

                                                <strong className="block-menu-right" style={{ color: 'rgb(0, 0, 0)', marginTop: 20 }}>Caissiers ({caisse.length})</strong>
<div>
                                                    {caisse.map((employee, index) => {
                                                            if (employee.poste === "6") {
                                                                return (
                                                                    <div
                                                                        // onClick={() => this.view_pupil(pupil)}
                                                                        key={index} className="pupils-list-home">
                                                                        {index + 1}. {employee.first_name.toString().toUpperCase()} {employee.second_name.toString().toUpperCase()} {employee.last_name.toString().toUpperCase()} ({employee.gender === "1" ? "M" : "F"})
                                                                    </div>
                                                                )
                                                            }
                                                    })}
                                                </div>
</div>
    )
}