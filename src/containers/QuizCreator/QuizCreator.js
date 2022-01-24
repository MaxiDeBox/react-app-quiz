import React from 'react';
import classes from './QuizCreator.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

export default class QuizCreator extends React.Component {
  submitHandle = (event) => {
    event.preventDefault();
  }

  addQuestionHandler = () => {

  }

  createQuizHandler = () => {

  }

  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>

          <form onSubmit={this.submitHandle}>
            <Input />
            <hr />
            <Input />
            <Input />
            <Input />
            <Input />

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
