import Map from "./pages/Map";
import SideBar from "./pages/Sidebar";
import { Routes, Route } from "react-router-dom";
import Provider from "./provider/Provider";

function App() {
  const routes = [
    { path: "/", element: <Map /> }
  ];

  return (
    <Provider>
      <div className="App-header">
        <SideBar />
        <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        </main>
      </div>
    </Provider>
  );
}


export default App;