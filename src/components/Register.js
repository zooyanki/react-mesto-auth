import React from 'react';
import {withRouter} from 'react-router-dom';
import {apireg} from '../Utils/apireg';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'E-mail',
            password: 'Пароль'
        } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        apireg.signup(this.state.password, this.state.email).then((res) => {
            if (res) {
                this.setState({message :
                ''}, () => {
                    this.props.history.push('/signin');
                    this.props.onInfoToolTip();
                    console.log(this.props.history.push('/signin'))
                })
            } else {
                this.setState({
                    message: 'Упс.... шо то не то'
                })
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="sign">
                <h2 className="sign__header">Регистрация</h2>
                <input className="sign__input" name="email" value={this.state.email} onChange={this.handleChange} type="email"/>
                <input className="sign__input" name="password" value={this.state.password} onChange={this.handleChange} type="password"/>
                <button className="sign__buttonSubmit" type="submit" onClick={this.handleSubmit}>Зарегистрировать</button>
                <h3 className="sign__text">Уже зарегистрированы?
                    <a className="sign__enterlink" href="/signin"> Войти</a>
                </h3>
            </div>
        );
    }

}
    

    
export default withRouter(Register);