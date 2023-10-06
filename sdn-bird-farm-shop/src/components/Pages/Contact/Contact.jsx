import React from "react";
import Bird1 from "../../../assets/img/bird-2.jpg"
import "./Contact.css"

function Contact() {
    return (
        <div className="contact">
            <div
                className="leftSide"
                style={{ backgroundImage: `url(${Bird1})` }}
            ></div>
            <div className="rightSide">
                <h3>Have a question about a product, our company, or just want to chat? Email us!</h3>
                <p>We will be glad to assist you in any question and encourage you to share your ideas and improvements with us.</p>
                <form id="contact-form" method="POST">
                    <label htmlFor="name">Name</label>
                    <input name="name" placeholder="Name" type="text" />
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="Email" type="email" />
                    <label htmlFor="message">Message</label>
                    <textarea
                        rows="6"
                        placeholder="Message"
                        name="message"
                        required
                    ></textarea>
                    <button type="submit"> Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;