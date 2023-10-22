import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import CommonSection from "../../UI/CommonSection/CommonSection";

import "./contact.css";

const socialLinks = [
    {
        url: "#",
        icon: "ri-facebook-line",
    },
    {
        url: "#",
        icon: "ri-instagram-line",
    },
    {
        url: "#",
        icon: "ri-twitter-line",
    },
];

const Contact = () => {
    return (
        <div className="Contact">
            <CommonSection title="Liên Hệ" />
            <section>
                <Container>
                    <Row>
                        <Col lg="7" md="7">
                            <h6 className="fw-bold mb-4">Thông tin</h6>

                            <Form>
                                <FormGroup className="contact__form">
                                    <Input placeholder="Your Name" type="text" />
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <Input placeholder="Email" type="email" />
                                </FormGroup>
                                <FormGroup className="contact__form">
                                    <textarea
                                        rows="5"
                                        placeholder="Message"
                                        className="textarea form-control"
                                    ></textarea>
                                </FormGroup>

                                <button className=" contact__btn" type="submit">
                                    Gửi tin nhắn
                                </button>
                            </Form>
                        </Col>

                        <Col lg="5" md="5" className="description">
                            <div className="contact__info">
                                <h6 className="fw-bold">Thông tin liên hệ</h6>
                                <p className="section__description mb-0">
                                    Bird Farm Shop
                                </p>
                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="fs-6 mb-0">Số điện thoại liên lạc:</h6>
                                    <p className="section__description mb-0">0978286454</p>
                                </div>

                                <div className=" d-flex align-items-center gap-2">
                                    <h6 className="mb-0 fs-6">Email:</h6>
                                    <p className="section__description mb-0">birdfarmshop@gmail.com</p>
                                </div>

                                <h6 className="fw-bold mt-4">Theo dõi chúng tôi</h6>

                                <div className=" d-flex align-items-center gap-4 mt-3">
                                    {socialLinks.map((item, index) => (
                                        <Link
                                            to={item.url}
                                            key={index}
                                            className="social__link-icon"
                                        >
                                            <i class={item.icon}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Contact;
