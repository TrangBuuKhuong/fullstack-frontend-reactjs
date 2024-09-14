import React, { Component } from "react";
import { connect } from "react-redux";
import "./Handbook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Handbook extends Component {

    //boostrap
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 1</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 2</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 3</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 4</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 5</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                            <div className="section-customize">
                                <div className="outer-bg-section-handbook">
                                    <div className="bg-image section-handbook"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 6</div>
                                    <div>Cơ xương khớp</div>
                                </div>

                            </div>
                        </Slider>
                    </div>

                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
