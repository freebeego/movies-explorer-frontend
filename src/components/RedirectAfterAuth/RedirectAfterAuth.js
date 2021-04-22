import { Route, Redirect } from "react-router-dom";

const RedirectAfterAuth = ({ component: Component, loggedIn, ...props }) => {
  return (
    <Route>
      {!loggedIn ? <Component {...props} /> : <Redirect to="/movies" />}
    </Route>
  );
};

export default RedirectAfterAuth;
