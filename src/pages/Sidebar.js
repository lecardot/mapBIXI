import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import MainStationPanel from '../components/MainStationPanel';
import { PartialStationVisual, AllStationVisual } from '../components/StationVisual';

function SideBar() {

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
                <MainStationPanel/>
                <AllStationVisual/>
                <PartialStationVisual/>
                <SubMenu label="Carte">
                    <MenuItem> Voies cyclables </MenuItem>
                    <MenuItem> Vélos disponibles </MenuItem>
                </SubMenu>
                <SubMenu label="Paramètres">
                    <MenuItem> Station principale </MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    );
}

export default SideBar;