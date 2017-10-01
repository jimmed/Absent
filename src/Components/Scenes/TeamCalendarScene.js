import React, {Component} from 'react';
import {getShortMonth, isWeekend, getDatesAfter} from '../../Store/Helpers/DateHelpers'
import './TeamCalendarScene.css';

export class TeamCalendarScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleDays: getDatesAfter(new Date(2016, 10, 15), 31)
        }
    }

    render() {
        if (!this.props.users.isFetching && !this.props.absences.isFetching) {
            return (
                <div className="team-calendar-scene">
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--12-col">

                            <table className="absences-calendar mdl-data-table mdl-js-data-table">
                                <thead>
                                {this.getMonthHeaderRow()}
                                {this.getDayHeaderRow()}
                                </thead>
                                <tbody>
                                {this.getUserRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }

    getMonthHeaderRow() {
        return (
            <tr className="month-headers">
                {this.getMonthHeaders()}
            </tr>
        )
    }

    getMonthHeaders() {
        let columns = [];
        columns.push(<th></th>);

        for (let i = 0; i < this.state.visibleDays.length; i++) {
            if (i === 0 || this.state.visibleDays[i].getDate() === 1) {
                columns.push(
                    <th className="span-multiple-columns mdl-data-table__cell--non-numeric">
                        <label key={i}>{getShortMonth(this.state.visibleDays[i])}</label>
                    </th>
                )
            }
            else {
                columns.push(<th key={i} className="mdl-data-table__cell--non-numeric"></th>)
            }

        }

        return (
            columns
        )
    }

    getDayHeaderRow() {
        return (
            <tr className="day-headers">
                {this.getDayHeaders()}
            </tr>
        )
    }

    getDayHeaders() {
        let columns = [];

        columns.push(
            <th key={-1} className="mdl-data-table__cell--non-numeric"></th>
        );

        for (let i = 0; i < this.state.visibleDays.length; i++) {
            columns.push(
                <th key={i}
                    className={"mdl-data-table__cell--non-numeric" + this.getDayHeaderConditionalClasses(this.state.visibleDays[i])}>
                    {this.state.visibleDays[i].toString().split(' ')[0][0]}
                </th>
            )
        }

        return (
            columns
        )
    }

    getUserRows() {
        let rows = [];

        for (let id in this.props.users.usersById) {
            if (this.props.users.usersById.hasOwnProperty(id)) {
                let user = this.props.users.usersById[id];
                rows.push(
                    <tr key={user.id} className="user-days">
                        <td className="mdl-data-table__cell--non-numeric">
                            <label>{user.name}</label>
                        </td>
                        {this.getUserDays(user)}
                    </tr>
                )
            }
        }
        return (
            rows
        )
    }

    getUserDays(user) {
        let columns = [];

        for (let i = 0; i < this.state.visibleDays.length; i++) {
            let day = this.state.visibleDays[i];
            let absenceClasses = this.getAbsenceClasses(user, day);

            columns.push(
                <td className={this.getUserDayConditionalClasses(day)}>
                    {day.getDate()}
                    <div className={"AM " + absenceClasses.am}></div>
                    <div className={"PM " + absenceClasses.pm}></div>
                </td>
            )
        }

        return (
            columns
        )
    }

    getAbsenceClasses(user, date) {
        let classes = {
            am: "",
            pm: "",

        };

        let userAbsences = this.props.absences.absencesByUserId[user.id][date.getTime()];

        if (userAbsences) {
            userAbsences.forEach((absence) => {
                if (absence.unit === "AM") {
                    classes.am = "booked " + absence.type;
                }
                else if (absence.unit === "PM") {
                    classes.pm = "booked " + absence.type;
                }
                classes.isoDate = absence.isoDate;
            })
        }

        return classes;
    }

    getDayHeaderConditionalClasses(date) {
        let conditionalClasses = "";
        if (isWeekend(date)) {
            conditionalClasses += " weekend";
        }

        return conditionalClasses;
    }

    getUserDayConditionalClasses(date) {
        let conditionalClasses = "";
        if (isWeekend(date)) {
            conditionalClasses += " weekend";
        }

        return conditionalClasses;
    }



}

export default TeamCalendarScene;


