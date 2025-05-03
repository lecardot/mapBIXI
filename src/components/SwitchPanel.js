import React, { useContext } from 'react';
import { Form } from 'react-bootstrap';
import { AppContext } from '../context/Context';

function SwitchPanel({ label, onChange }) {
    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                label={label}
                onChange={onChange}
            />
        </Form>
        );
}

function SwitchBicycle2Dock() {

    const { api } = useContext(AppContext);
    
    return (
        <SwitchPanel 
            label={""}
            onChange={api.changeCyclesDocks}
        />
        );
}

export { SwitchBicycle2Dock };