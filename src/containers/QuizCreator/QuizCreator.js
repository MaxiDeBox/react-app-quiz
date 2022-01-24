import React from 'react';
import classes from './QuizCreator.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl} from "../../form/formFrameWork";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

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
    rightAnswerId: 1,
    formControls: createFunctionConrols()
  };

  submitHandle = (event) => {
    event.preventDefault();
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    });
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
    const select = <Select
      label='Выберите правильный ответ'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4},
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandle}>
            { this.renderInputs() }

            { select }

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
