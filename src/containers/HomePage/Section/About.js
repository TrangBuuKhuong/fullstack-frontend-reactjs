import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";


class About extends Component {

    //boostrap
    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">Tìm hiểu thêm về bệnh ung thư</div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/pnzyhJ3CsoA"
                            title="Ung Thư Là Gì? Cách Chữa Trị và Phòng Tránh? | SỰ THẬT CƠ THỂ | MEDLATEC"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <div>
                            <h1>Những hiểu biết về bệnh ung thư</h1>
                            Ung thư là một trong những căn bệnh nguy hiểm hàng đầu trên thế giới, và nguy cơ mắc bệnh này đang ngày càng tăng cao. Nhiều yếu tố phức tạp, từ lối sống đến môi trường, đều có thể góp phần làm tăng nguy cơ ung thư.<br />

                            <h4>Những yếu tố nguy cơ chính gây ung thư:</h4>
                            <b>Hút thuốc lá:</b> Đây là yếu tố nguy cơ hàng đầu gây ung thư phổi và nhiều loại ung thư khác.<br />
                            <b>Chế độ ăn uống không lành mạnh</b>: Thực phẩm chế biến sẵn, đồ ăn nhanh, ít rau xanh, trái cây và chất xơ tăng nguy cơ ung thư đại tràng, vú và một số loại ung thư khác.<br />
                            <b>Ít vận động:</b> Thiếu vận động làm tăng nguy cơ béo phì, từ đó làm tăng nguy cơ mắc nhiều loại ung thư.<br />
                            <b>Tiếp xúc với các chất độc hại:</b> Chất phóng xạ, asbestos, một số hóa chất công nghiệp có thể gây ung thư.<br />
                            <b>Tiếp xúc với ánh nắng mặt trời quá nhiều:</b> Tia UV trong ánh nắng mặt trời có thể gây ung thư da.<br />
                            <b>Nhiễm virus:</b> Một số loại virus như HPV, viêm gan B, viêm gan C có thể gây ung thư.<br />
                            <b>Yếu tố di truyền:</b> Một số loại ung thư có liên quan đến yếu tố di truyền.<br />
                            <b>Tuổi tác:</b> Nguy cơ mắc ung thư tăng theo tuổi.<br />
                            <b>Béo phì:</b> Béo phì liên quan đến nhiều loại ung thư, đặc biệt là ung thư vú, đại tràng và tử cung.<br />
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
