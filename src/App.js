import React, {useEffect} from "react";
import Layout from "./hoc/Layout/Layout";
import Quiz from "./containers/Quiz/Quiz";
import {Route, Routes} from "react-router-dom";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {WithRouter} from "./hoc/WithRouter/WithRouter";
import {autoLogin} from "./store/actions/auth";

const App = (props) => {
  useEffect(() => {
    props.autoLogin();
  });

  let routes = (
    <Routes>
      <Route path='/auth' element={<Auth />} />
      <Route path='/quiz/:id' element={<Quiz />} />
      <Route path='/' exact element={<QuizList />} />
      <Route
        path="*"
        element={<Logout to="/" />}
      />
    </Routes>
  );

  if(props.isAuthenticated) {
    routes = (
      <Routes>
        <Route path='/quiz-creator' element={<QuizCreator />} />
        <Route path='/quiz/:id' element={<Quiz />} />
        <Route path='/' exact element={<QuizList />} />
        <Route path='/logout' element={<Logout />} />
        <Route
          path="*"
          element={<QuizList to="/" />}
        />
      </Routes>
    );
  }

  return (
    <Layout>
      {routes}
    </Layout>
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  };
}

export default WithRouter(connect(mapStateToProps, mapDispatchToProps)(App));
