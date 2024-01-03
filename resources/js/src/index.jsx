import React from "react";
import ReactDOM from "react-dom";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, useHistory } from "react-rounter-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EntryApp } from "./EntryApp";
// import "../../css/app.css";
// import "../../js/app.js";

function App() {
    const history = useHistory();

    return (
        <Provider store={store}>
            <Router history={history}>
                <EntryApp history={history} />
            </Router>
            <ToastContainer position="bottom-right" draggable="true" />
        </Provider>
    );
}

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

if (document.getElementById("root")) {
    console.log("test de la page");
    ReactDOM.render(<App />, document.getElementById("root"));
}
