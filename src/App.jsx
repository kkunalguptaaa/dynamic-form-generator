import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import FormGenerator from "./components/FormGenerator";
import FormPreview from "./components/FormPreview";
import FormList from "./components/FormList";
import Header from "./components/Header";
import { store } from "./store";
import "./common.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<FormList />} />
          <Route path="/add-form" element={<FormGenerator />} />
          <Route path="/form-preview/:id" element={<FormPreview />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
