import React from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

export default class Auth extends React.Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          require: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          require: true,
          minLength: 6
        }
      }
    }
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Input
          key={controlName + idx}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  onChangeHandler = (event, controlName) => {
    console.log(`${controlName}: `, `${event.target.value}`)
  }

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
            { this.renderInputs() }

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
