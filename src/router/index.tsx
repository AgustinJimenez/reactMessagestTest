import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
