import React from 'react';
import {withRouter} from 'react-router-dom';
import {apireg} from '../Utils/apireg';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'E-mail',
            password: 'Пароль'
        }
        this.handleChange = this.handleChange.bind(this); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (!this.state.email || !this.state.password) {
            return;
        }
        apireg.signin(this.state.password, this.state.email).then((data) => {
            if (data.token) {
                this.setState({password:'', email: this.state.email},() => {
                    this.props.handleLogin(this.state.email);
                    this.props.onInfoToolTip();
                    this.props.history.push('/main');
                })
            }
        })
        .catch((err) => {            
            this.props.onInfoToolTip(err);
            console.log(err)});
    }

    render() {
        return (
            <div className="sign">
                <h2 className="sign__header">Вход</h2>
                <input className="sign__input" name="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                <input className="sign__input" name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                <button className="sign__buttonSubmit" type="submit" onClick={this.handleSubmit}>Войти</button>
            </div>
        )
    }
}

export default withRouter(Login);




