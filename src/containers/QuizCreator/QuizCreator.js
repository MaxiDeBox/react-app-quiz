import React from 'react';
import classes from './QuizCreator.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, Validate, validateForm} from "../../form/formFrameWork";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz';

function createOptionControl(number) {
  return createControl({
    id: number,
    label: `Вариант ${number}`,
    errorMessage: 'Значение не может быть пустым',
    value: ''
  }, {
    required: true
  });
};

function createFunctionControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Вопрос не может быть пустым',
      value: ''
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
    isFormValid: false,
    quiz: [],
    rightAnswerId: 1,
    formControls: createFunctionControls()
  };

  submitHandle = (event) => {
    event.preventDefault();
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  }

  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const idx = quiz.length + 1;

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: idx,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id, },
        { text: option2.value, id: option2.id, },
        { text: option3.value, id: option3.id, },
        { text: option4.value, id: option4.id, }
      ]
    };

    quiz.push(questionItem);

    this.setState({
      isFormValid: false,
      quiz: quiz,
      rightAnswerId: 1,
      formControls: createFunctionControls()
    });
  }

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value.trim().length > 0 ? value : '';
    control.valid = Validate(control.value, control.validation);
    console.log(control);
    formControls[controlName] = control;

    this.setState({
      isFormValid: validateForm(formControls),
      formControls: formControls
    })
  }

  createQuizHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/quizes.json', this.state.quiz);

      this.setState({
        isFormValid: false,
        quiz: [],
        rightAnswerId: 1,
        formControls: createFunctionControls()
      });
    } catch (error) {
      console.log(error);
    }
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
              disabled={!this.state.isFormValid}
            >Добавить вопрос</Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}
