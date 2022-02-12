import React from 'react';
import classes from './QuizCreator.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import {createControl, Validate, validateForm} from "../../form/formFrameWork";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

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

class QuizCreator extends React.Component {

  state = {
    isFormValid: false,
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

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id, },
        { text: option2.value, id: option2.id, },
        { text: option3.value, id: option3.id, },
        { text: option4.value, id: option4.id, }
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
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

  /**
   * Метод вызова создания Quiz
   *
   * @param event
   */
  createQuizHandler = (event) => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFunctionControls()
    });

    this.props.finishCreateQuiz();
  }

  /**
   * Метод генерации полей
   *
   * @returns {unknown[]}
   */
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
              disabled={this.props.quiz.length === 0}
            >Создать тест</Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
