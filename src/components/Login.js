import React, {useRef} from 'react';
import {withRouter} from 'react-router-dom';

    function Login (props) {
        const emailRef = useRef();
        const passwordRef = useRef();

        const handleSubmit = (event) => {
            event.preventDefault();
            if (!emailRef.current.value || !passwordRef.current.value) {
                return;
            }

            props.onLogin({
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        }
   
        return (
            <div className="sign">
                <h2 className="sign__header">Вход</h2>
                <input className="sign__input" ref={emailRef} name="email" defaultValue="E-mail" type="email"/>
                <input className="sign__input" ref={passwordRef} name="password" defaultValue="Пароль" type="password"/>
                <button className="sign__buttonSubmit" type="submit" onClick={handleSubmit}>Войти</button>
            </div>
        )
    }

export default withRouter(Login);




