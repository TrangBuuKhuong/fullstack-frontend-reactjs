import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from 'moment';
import { withRouter } from 'react-router';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import { getScheduleByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalbooking: false,
            dataTime: {}
        }


    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                }
                else {
                    let labelVi = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
                    object.label = this.capitalizeFirstLetter(labelVi);
                }

            }
            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                }
                else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }

            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);

        }
        return allDays;
    }

    async componentDidMount() {

        let { language } = this.props;
        let allDays = this.getArrDays(language);

        this.setState({
            allDays: allDays
        })



    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

    }
    handleOnchangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }

    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalbooking: true,
            dataTime: time
        })

    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalbooking: false
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalbooking, dataTime } = this.state;
        let { language } = this.props;

        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnchangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (

                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="fa fa-calendar" aria-hidden="true"><span><FormattedMessage id="patient.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?

                                <>
                                    <div className='time-content-btns'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <button key={index} onClick={() => this.handleClickScheduleTime(item)}
                                                    className={language === LANGUAGES.VI ? 'btb-vi' : ' btn-en'}
                                                >{timeDisplay}</button>
                                            )

                                        })}
                                    </div>


                                    <div className='book-free'>
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className='far fa-hand-point-up'></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>

                                :
                                <div className='no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal isOpenModal={isOpenModalbooking}
                    closeBookingModal={this.closeBookingModal}
                    dataTime={dataTime}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule));
