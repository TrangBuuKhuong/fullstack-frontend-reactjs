import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
class DetaikDoctor extends Component {

    render() {
        console.log(this.props.match.params.id);
        return (

            <div><HomeHeader /></div>

        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetaikDoctor);