import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./AboutSection";
import aboutImg from "../../../assets/img/background-about-1.jpg";

const AboutSection = ({ aboutClass }) => {
    return (
        <section
            className="about__section"
            style={
                aboutClass === "aboutPage"
                    ? { marginTop: "0px" }
                    : { marginTop: "280px" }
            }
        >
            <Container>
                <Row>
                    <Col lg="6" md="6">
                        <div className="about__section-content">
                            <h4 className="section__subtitle">Thông tin về chúng tôi</h4>
                            <h2 className="section__title">Chào Mừng đến Bird Farm Shop</h2>
                            <p className="section__description">
                                Chào mừng đến với Bird Farm Shop - nơi tận hưởng sự hòa quyện với thiên nhiên qua những đóa hoa bay, những cánh đồng mênh mông và tiếng ca líu lo của những chú chim xinh đẹp.<br />

                                Tại Bird Farm Shop, chúng tôi mang đến cho bạn không chỉ là những chú chim đáng yêu mà còn là niềm đam mê vô tận với thế giới của các loài động vật này. Chúng tôi tự hào mang đến một môi trường an toàn và yên bình, nơi mà các loài chim được chăm sóc chu đáo và yêu thương.<br />

                                Chúng tôi cung cấp một loạt các loại chim đa dạng với từng loài mang lại một vẻ đẹp và tính cách riêng biệt. Từ các loài cảnh điển hình đến các loại chim cao cấp, mỗi con vật tại Bird Farm Shop đều được chăm sóc tận tâm từ những người đam mê về động vật của chúng tôi.<br />

                                Hơn nữa, chúng tôi cũng cung cấp các sản phẩm và dịch vụ phụ trợ như chuồng, thức ăn, và các vật dụng cần thiết khác để đảm bảo rằng bạn có mọi thứ cần thiết để chăm sóc và nuôi dưỡng những người bạn lông mềm của mình.<br />

                                Hãy đến thăm chúng tôi tại Bird Farm Shop và khám phá thế giới tuyệt vời của các loài chim, nơi mà tình yêu và sự kỳ diệu của tự nhiên sống động mỗi ngày. Hãy cùng nhau tạo nên những khoảnh khắc đáng yêu và ý nghĩa bên cạnh những người bạn đáng quý của mình.<br />
                            </p>


                        </div>
                    </Col>

                    <Col lg="6" md="6">
                        <div className="about__img">
                            <img src={aboutImg} alt="" className="w-100" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutSection;
