import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";

const App = () => {
    return (
        <div className="container-xl">
            <NavBar />
            <Switch>
                <Route path="/" component={Main} exact />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" component={Users} />
            </Switch>
        </div>
    );
};

export default App;
