import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layouts/users";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";

const App = () => {
    return (
        <div className="container-xl">
            <NavBar />
            <AuthProvider>
                <ProfessionProvider>
                    <QualityProvider>
                        <Switch>
                            <Route path="/" component={Main} exact />
                            <Route path="/login/:type?" component={Login} />
                            <Route
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                        </Switch>
                    </QualityProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
