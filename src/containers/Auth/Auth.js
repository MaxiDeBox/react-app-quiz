import React from 'react';
import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default class Auth extends React.Component {
  state = {
    isFormValid: false,
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
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFromValid = true;
    Object.keys(formControls).forEach((name) => {
      isFromValid = formControls[name].valid && isFromValid;
    });

    this.setState({
      formControls: formControls,
      isFormValid: isFromValid
    });
  }

  validateControl(value, validation) {
    if(!validation) {
      return true;
    }

    let isValid = true;
    // Валидация на обазательное заполнение поля
    if (validation.require) {
      isValid = value.trim() !== '' && isValid;
    }

    // Валидация поля почты
    if(validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    // Валидация минимального значения введенного текста в поле
    if(validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid;
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
              disabled={!this.state.isFormValid}
              onClik={this.loginHandler}
            >Войти</Button>
            <Button
              type='primary'
              disabled={!this.state.isFormValid}
              onClik={this.registerHandler}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    );
  }
}
