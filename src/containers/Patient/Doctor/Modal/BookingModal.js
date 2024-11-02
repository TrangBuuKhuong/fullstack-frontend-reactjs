import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _, { values } from 'lodash';
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            birthday: '',
            reason: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        };
    }

    componentDidMount() {
        this.props.getGenders();
    }
    buidDatagender = (data) => {
        let result = [];
        let language = this.props.language;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);

            })
        }
        return result;
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buidDatagender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buidDatagender(this.props.genders)
            })
        }
        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }
    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({ ...stateCopy })
    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (select) => {
        this.setState({
            selectedGender: select
        })

    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            date: date,
            reason: this.state.reason,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed')
            this.props.closeBookingModal();
        }
        else {
            toast.error('Booking a new appointment error')
        }
    }
    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : '';

        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left"><FormattedMessage id="patient.booking-modal.title" /></span>
                        <span className="right" onClick={closeBookingModal}><i className="fas fa-times"></i></span>
                    </div>
                    <div className="booking-modal-body">
                        {/* {JSON.stringify(dataTime)} */}
                        <div className="doctor-infor">
                            <ProfileDoctor doctorId={doctorId}
                                isShowDescription={false}
                                dataTime={dataTime}
                            />
                        </div>
                        <div className="row">
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                <input className="form-control" value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.phone-number" />i</label>
                                <input className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                <input className="form-control"
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                ></input>
                            </div>

                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input className="form-control"
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                ></input>
                            </div>
                            <div className="col-12 form-group">
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input className="form-control"
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')}
                                ></input>
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker onChange={this.handleOnchangeDatePicker}
                                    className='form-control'
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-comfirm"
                            onClick={() => this.handleConfirmBooking()}
                        ><FormattedMessage id="patient.booking-modal.btn-confirm" /></button>
                        <button className="btn-booking-cancel" onClick={closeBookingModal}><FormattedMessage id="patient.booking-modal.btn-close" /></button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
