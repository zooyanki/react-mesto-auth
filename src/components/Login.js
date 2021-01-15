import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';

    function Login (props) {
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
            if (!email || !password) {
                return;
            }

            props.onLogin({
                email: email,
                password: password
            })
        }
   
        return (
            <div className="sign">
                <h2 className="sign__header">Вход</h2>
                <input className="sign__input" name="email" defaultValue={email} type="email" onChange={handleChange}/>
                <input className="sign__input" name="password" defaultValue={password} type="password" onChange={handleChange}/>
                <button className="sign__buttonSubmit" type="submit" onClick={handleSubmit}>Войти</button>
            </div>
        )
    }

export default withRouter(Login);




