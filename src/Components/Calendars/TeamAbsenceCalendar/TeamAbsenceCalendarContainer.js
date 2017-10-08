import { connect } from 'react-redux';
import {TeamAbsenceCalendar} from './TeamAbsenceCalendar';

const mapStateToProps = (state) => {
    return {
        absences: state.absences,
        users: state.users,
        dates: state.teamCalendar.visibleDates,
        currentUserId: state.auth.currentUserId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const TeamAbsenceCalendarContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TeamAbsenceCalendar);

export default TeamAbsenceCalendarContainer

