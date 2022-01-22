import React from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default class Auth extends React.Component {
  loginHandler() {

  }

  registerHandler() {

  }

  submitHandler = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form
            className={classes.AuthForm}
            onSubmit={this.submitHandler}
          >
            <Input
              label='Email'
            />
            <Input
              label='Пароль'
              errorMessage='test'
            />

            <Button
              type='success'
              onClik={this.loginHandler}
            >Войти</Button>
            <Button
              type='primary'
              onClik={this.registerHandler}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}
