import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

function Register (props) {
    const [email, setEmail] = useState('E-mail');
    const [password, setPassword] = useState('Пароль');

    const handleChange = (event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value);
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.onRegister({
            email: email,
            password: password
        })
    }

        return (
            <div className="sign">
                <h2 className="sign__header">Регистрация</h2>
                <input className="sign__input" name="email" defaultValue={email} onChange={handleChange} type="email"/>
                <input className="sign__input" name="password" defaultValue={password} onChange={handleChange} type="password"/>
                <button className="sign__buttonSubmit" type="submit" onClick={handleSubmit}>Зарегистрировать</button>
                <h3 className="sign__text">Уже зарегистрированы?
                    <a className="sign__enterlink" href="/signin"> Войти</a>
                </h3>
            </div>
        );
} 
    
export default withRouter(Register);