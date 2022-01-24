import React from 'react';
import classes from './QuizCreator.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFrameWork";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым'
  }, {
    required: true
  });
};

function createFunctionConrols() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым'
    }, {
      required: true
    }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

export default class QuizCreator extends React.Component {

  state = {
    quiz: [],
    formControls: createFunctionConrols()
  };

  submitHandle = (event) => {
    event.preventDefault();
  }

  addQuestionHandler = () => {

  }

  changeHandler = (value, controlName) => {

  }

  createQuizHandler = () => {

  }


  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const control = this.state.formControls[controlName];

      return (
        <Auxiliary key={controlName + idx}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => {this.changeHandler(event.target.value, controlName)}}
          />
          {idx === 0 ? <hr/> : null}
        </Auxiliary>
      );
    });
  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandle}>
            { this.renderInputs() }

            <select></select>

            <Button
              type='primary'
              onClick={this.addQuestionHandler}
            >Добавить вопрос</Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
            >Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}
