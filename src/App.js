import Map from "./pages/Map";
import SideBar from "./pages/Sidebar";
import { Routes, Route } from "react-router-dom";
import { ProviderApp, ProviderData } from "./provider/Provider";

import DataLoader from "./pages/DataLoader";

function App() {
    const routes = [
        { path: "/", element: <Map /> }
    ];

    return (
        <ProviderData>
            <DataLoader/>
            <ProviderApp>
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
            </ProviderApp>
        </ProviderData>
    );
}


export default App;