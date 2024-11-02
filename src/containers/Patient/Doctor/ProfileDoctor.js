import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import { getProfileforDoctorById } from "../../../services/userService";
import _ from 'lodash';
import moment from "moment";
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });

    }
    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileforDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    };
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorId !== prevProps.doctorId) {
            this.getInforDoctor(this.props.doctorId);
        }
    }
    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - DD/MM/YYYY');
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id="patient.booking-modal.free-booking" /></div>
                </>
            );
        }
        return <></>
    }
    render() {
        let { dataProfile } = this.state;
        let { language, isShowDescription, dataTime } = this.props;

        let nameEn,
            nameVi = "";
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left"
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""
                                })`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescription === true ? (
                                <>
                                    {dataProfile &&
                                        dataProfile.Markdown &&
                                        dataProfile.Markdown.description && (
                                            <span>{dataProfile.Markdown.description}</span>
                                        )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                <div className="price">
                    <FormattedMessage id="patient.booking-modal.price" />:
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                        ? ' ' + parseFloat(
                            dataProfile.Doctor_Infor.priceTypeData.valueVi
                        ).toLocaleString("vi-VN") + "VND"
                        : ""}
                    {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                        ? " $" +
                        parseFloat(
                            dataProfile.Doctor_Infor.priceTypeData.valueEn
                        ).toLocaleString("en-US")
                        : ""}
                </div>
            </div>
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
    connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
