import React, { useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "@material-tailwind/react/tailwind.css";
import { List } from "./routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Auth from "./redux/actions/auth/Auth";
import Product from "./redux/actions/product/Product";
import Category from "./redux/actions/category/Category";
import Message from "./redux/actions/message/Message";
import { toast } from "react-toastify";
// import { history } from "./helpers/history";

const tokenIsValid = (token) => {
    try {
        const { exp } = jwt_decode(token);

        if (exp < (new Date().getTime() + 1) / 1000) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};

const AppRoutes = ({
    component: Component,
    isProtected,
    roles,
    layout: Layout,
    ...rest
}) => {
    const dispatch = useDispatch();
    if (isProtected) {
        const user = localStorage.getItem("user");
        if (user) {
            const { token } = JSON.parse(user);

            if (tokenIsValid(token)) {
                const { scopes } = jwt_decode(token);
                if (scopes.some((value) => roles.includes(value))) {
                    return (
                        <Route
                            {...rest}
                            render={(props) => (
                                <Layout>
                                    <Component {...props}></Component>
                                </Layout>
                            )}
                        />
                    );
                } else {
                    /* 403 page */
                    return <Redirect to="/" />;
                }
            } else {
                /* redirect to home */
                dispatch(Auth.logout());
            }
        }
        return <Redirect to="/account/login" />;
    }
    return (
        <Route
            {...rest}
            render={(props) => (
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}
        />
    );
};

export const EntryApp = () => {
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state);
    const history = useHistory();

    const clearMsg = () => {
        dispatch(Message.clearMessage());
    };

    useEffect(() => {
        dispatch(Product.fetchProduct());
        dispatch(Category.fetchCategory());
    }, []);

    useEffect(() => {
        history.listen((location) => {
            clearMsg();
        });
    }, [dispatch]);

    useEffect(() => {
        const error = message.error;
        const info = message.info;
        const success = message.success;

        if (error) {
            toast.error(error);
            clearMsg();
        }
        if (info) {
            toast.info(info);
            clearMsg();
        }
        if (success) {
            toast.success(success);
            clearMsg();
        }
    }, [message]);

    return (
        <>
            <Switch>
                {List.map((route, index) => {
                    return (
                        <AppRoutes
                            key={index}
                            exact={route.exact}
                            path={route.path}
                            layout={route.layout}
                            roles={route.roles}
                            isProtected={route.protected}
                            component={route.component}
                        />
                    );
                })}
            </Switch>
        </>
    );
};
