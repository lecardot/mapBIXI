import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import MainStationPanel from '../components/MainStationPanel';
import { PartialStationVisual, AllStationVisual } from '../components/StationVisual';
import { SwitchBicycle2Dock } from '../components/SwitchPanel';

import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { AppContext } from '../context/Context';

function SideBar() {

    const { api } = useContext(AppContext)

    return (
        <Sidebar
            style={{
                height: "100vh",
                margin: "0 auto",
                zIndex: "1000",
                position: "absolute",
                backgroundColor: "rgba(37, 182, 255, 0.5)"
            }}>
            <Menu>
                <MainStationPanel />
                <SubMenu label="Détails">
                    <PartialStationVisual/>
                    <AllStationVisual/>
                </SubMenu>
                <SubMenu label="Carte">
                    <MenuItem> Voies cyclables </MenuItem>
                    <MenuItem><SwitchBicycle2Dock/></MenuItem>
                </SubMenu>
                <SubMenu label="Paramètres">
                    <MenuItem>      
                        <Button 
                            variant="outline-primary"
                            onClick={() => api.changeMainStationMode()}
                            >Définir une nouvelle station</Button>
                    </MenuItem>
                    <MenuItem>      
                        <Button 
                            variant="outline-primary"
                            onClick={api.clearCookies}
                            >Supprimer les cookies</Button>
                    </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SideBar;