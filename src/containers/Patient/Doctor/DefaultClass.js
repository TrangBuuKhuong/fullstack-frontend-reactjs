import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
class DefaultClass extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    async componentDidUpdate(prevProps, prevState, snapshot) { }

    render() {
        return <div></div>;
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
    connect(mapStateToProps, mapDispatchToProps)(DefaultClass)
);
