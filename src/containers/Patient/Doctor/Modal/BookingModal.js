import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''; return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                size="lg"
                centered
            >
                <div className="booking-modal-content">
                    <div className="booking-modal-header">
                        <span className="left">Thong tin dat lich kham ben</span>
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
                                <label>Họ tên</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Giới tính</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Số điện thoại</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ email</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Đặt cho ai</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-6 form-group">
                                <label>Địa chỉ liên hệ</label>
                                <input className="form-control"></input>
                            </div>
                            <div className="col-12 form-group">
                                <label>Lý do khám</label>
                                <input className="form-control"></input>
                            </div>
                        </div>
                    </div>
                    <div className="booking-modal-footer">
                        <button className="btn-booking-comfirm">Xac nhan</button>
                        <button className="btn-booking-cancel" onClick={closeBookingModal}>Cancel</button>
                    </div>
                </div>

            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BookingModal)
);
