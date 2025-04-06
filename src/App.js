import Map from "./pages/Map";

import { ToastContainer } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import Provider from "./provider/Provider";

function App() {
  const routes = [
    { path: "/", element: <Map /> }
  ];

  // remove right click
  document.oncontextmenu = () => false

  // remove scroll default action
  window.onkeydown = function(e) {
    return !( (e.key == ' ' | e.key == 'ArrowUp' | e.key == 'ArrowDown' ) && e.target == document.body);
  };

  return (
    <Provider>
      <div className="App-header">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
      <ToastContainer />
    </Provider>
  );
}


export default App;