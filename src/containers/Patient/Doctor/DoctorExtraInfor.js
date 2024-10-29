import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import NumberFormat from 'react-number-format';
import { FormattedMessage } from "react-intl";
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        };
    }


    componentDidMount() { }


    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let response = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (response && response.errCode === 0) {
                this.setState({
                    extraInfor: response.data
                })
            }
        }

    }
    showHideDetailInfor = () => {
        this.setState((prev) => ({
            isShowDetailInfor: !prev.isShowDetailInfor,
        }));
    };
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.address" /></div>
                        <div className="name-clinic">
                            {extraInfor && extraInfor.nameClinic && language === LANGUAGES.VI ? extraInfor.nameClinic : ''}
                            {extraInfor && extraInfor.nameClinic && language === LANGUAGES.EN ? extraInfor.nameClinic : ''}
                        </div>
                        <div className="detail-address">
                            {extraInfor && extraInfor.addressClinic && language === LANGUAGES.VI ? extraInfor.addressClinic : ''}
                            {extraInfor && extraInfor.addressClinic && language === LANGUAGES.EN ? extraInfor.addressClinic : ''}
                        </div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfor === false ? (
                            <div className="short-infor">
                                <span style={{ marginRight: 5 }}><FormattedMessage id="patient.extra-infor-doctor.price" />:</span>
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI ? parseFloat(extraInfor.priceTypeData.valueVi).toLocaleString('vi-VN') + ' VND ' : ''}
                                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN ? '$' + parseFloat(extraInfor.priceTypeData.valueEn).toLocaleString('en-US') : ''}
                                <span className="span-detail" onClick={() => this.showHideDetailInfor()}>
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                        ) : (
                            <>
                                <div className="title-price"><FormattedMessage id="patient.extra-infor-doctor.price" />:</div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left"><FormattedMessage id="patient.extra-infor-doctor.price" />:</span>
                                        <span className="right">
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI ? parseFloat(extraInfor.priceTypeData.valueVi).toLocaleString('vi-VN') + ' VND ' : ''}
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN ? '$' + parseFloat(extraInfor.priceTypeData.valueEn).toLocaleString('en-US') : ''}
                                        </span>
                                    </div>
                                    <div className="note">
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                </div>
                                <div className="payment">
                                    <span><FormattedMessage id="patient.extra-infor-doctor.payment" />: </span>
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ? extraInfor.paymentTypeData.valueVi : ''}
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ? extraInfor.paymentTypeData.valueEn : ''}
                                </div>
                                <div className="hide-price">
                                    <span className="span-detail" onClick={() => this.showHideDetailInfor()}>
                                        <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
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
    connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor)
);
