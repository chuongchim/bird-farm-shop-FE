import React from "react";

import CommonSection from "../../UI/CommonSection/CommonSection";
import AboutSection from "../../UI/AboutSection/AboutSection";
import { Container, Row, Col } from "reactstrap";


import BirdImg from "../../../assets/img/background-about-2.jpg";
import OurMembers from "../../UI/OurMember/OurMembers";
import "./about.css";

const About = () => {
    return (
        <div className="About">
            <CommonSection title="Thông tin về chúng tôi" />
            <AboutSection aboutClass="aboutPage" />

            <section className="about__page-section">
                <Container>
                    <Row>
                        <Col lg="6" md="6" sm="12">
                            <div className="about__page-img">
                                <img src={BirdImg} alt="" className="w-100 rounded-3" />
                            </div>
                        </Col>

                        <Col lg="6" md="6" sm="12">
                            <div className="about__page-content">
                                <h2 className="section__title">
                                    Giải pháp, chất lượng đảm bảo dành cho khách hàng
                                </h2>

                                <p className="section__description">
                                    Chúng tôi cam kết mang đến cho quý khách hàng những giải pháp vượt trội và chất lượng không chỉ đáp ứng mà còn vượt xa sự kỳ vọng của họ. Với tâm huyết và sự tận tâm, chúng tôi luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu. Chất lượng không chỉ là một tiêu chí, mà là cam kết vững chắc của chúng tôi. Mỗi sản phẩm và dịch vụ tại Bird Farm Shop được đảm bảo về chất lượng, từ quá trình chăm sóc tận tâm đến việc cung cấp những sản phẩm tốt nhất.
                                </p>

                                <p className="section__description">
                                    Chúng tôi rất hân hạnh được phục vụ và chia sẻ niềm đam mê của mình với quý khách hàng. Hãy đến với Bird Farm Shop và trải nghiệm sự khác biệt về chất lượng và dịch vụ mà chúng tôi mang đến. Chúng tôi tin rằng sự hài lòng của quý khách hàng chính là sự thành công của chúng tôi.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>



            <section className="member">
                <Container>
                    <Row>
                        <Col lg="12" className="mb-5 text-center">
                            <h6 className="section__subtitle">Thông tin</h6>
                            <h2 className="section__title">Thông tin thành viên</h2>
                        </Col>
                        <OurMembers />
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default About;
