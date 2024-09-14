import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";


class HomeFooter extends Component {

    //boostrap
    render() {
        return (
            <div className="section-share home-footer">
                <p>&copy; 2024 Booking care <a target="_blank" href="https://www.youtube.com/watch?v=XENGw99u4uw">More infomation</a></p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
