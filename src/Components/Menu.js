import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import React, { useState } from 'react';

function Menu() {
    const [dropdown, setDropdown] = useState(false);

    const OpenCloseDropdown = () => {
        setDropdown(!dropdown);
    }

    const actions=() =>{
        alert("Im Item 1");
    }
    return (
        <Dropdown isOpen={dropdown} toggle={OpenCloseDropdown}>
            <DropdownToggle caret>
                Dropdown Ejemplo
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem header>Header</DropdownItem>
                <DropdownItem onClick={()=> actions()}>Item 1</DropdownItem>
                <DropdownItem>Item 2</DropdownItem>
                <DropdownItem>Item 3</DropdownItem>
                <DropdownItem disabled>Item 4 (disabled)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default Menu;