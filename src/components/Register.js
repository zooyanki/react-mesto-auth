import React, {useRef} from 'react';
import {withRouter} from 'react-router-dom';

function Register (props) {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onRegister({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
    }



        return (
            <div className="sign">
                <h2 className="sign__header">Регистрация</h2>
                <input className="sign__input" name="email" ref={emailRef} defaultValue="E-mail" type="email"/>
                <input className="sign__input" name="password" ref={passwordRef} defaultValue="Пароль" type="password"/>
                <button className="sign__buttonSubmit" type="submit" onClick={handleSubmit}>Зарегистрировать</button>
                <h3 className="sign__text">Уже зарегистрированы?
                    <a className="sign__enterlink" href="/signin"> Войти</a>
                </h3>
            </div>
        );
} 
    
export default withRouter(Register);