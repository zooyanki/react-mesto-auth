import React, { useState } from 'react';
import Logo from '../images/Vector.svg'
import navButtonLine from '../images/line_button.svg';
import closeButton from '../images/closebutton_little.svg';

function Header(props) {
    const [header, setHeader] = useState(false);

    const headerOpen = () => {
        setHeader(true);
    }
    
    const headerClose = () => {
        setHeader(false);
    }

    return (
  
            <header>
                <div className={`header__link-block-mobile ${header?'header__link-block-mobile_open':''}`}>
                    <h2 className="header__header header__header_mobile">{props.email}</h2>
                    <a className="header__link" href={props.link} onClick={props.onSign}>{props.text}</a>
                </div>
                <div className="header block-width">
                    <img src={Logo} className="header__logo" alt="Лого Место" />
                    
                    <div className="header__nav">
                        {header? <img className="header__nav-buttonclose" src={closeButton} alt="кнопка закрыть" onClick={headerClose}/> : <img className="header__nav-button" src={navButtonLine} alt="кнопка открыть" onClick={headerOpen}/>}
                        <div className="header__link-block">
                            <h2 className="header__header">{props.email}</h2>
                            <a className="header__link" href={props.link} onClick={props.onSign}>{props.text}</a>
                        </div>
                    </div>
                </div>
            </header>
    );
}

export default Header;