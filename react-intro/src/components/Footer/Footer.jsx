import React from 'react'

import "./Footer.css"
import logo from '../styles/img/Logotype-RGB.svg'; // Импортируйте изображение

function Footer() {
    return (
        <div className='footer'>
            <div className="footer_contacts">
                <h3> тел: +7-8352-20-12-09, telegram </h3>
            </div>
            <div className='footer_img'>
                <img src={logo} alt="Логотип" />
            </div>
            <div className="signature">
                <h3> Мой Силант 2023 </h3>
            </div>
        </div>
    );
}

export default Footer;