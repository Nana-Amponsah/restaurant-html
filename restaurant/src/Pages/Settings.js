import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space, Divider } from 'antd';
import SideMenu from "./SideMenu";
import { BsPersonRolodex } from "react-icons/bs";
import { BsPersonFillDash } from "react-icons/bs";
import { BsPersonFillAdd } from "react-icons/bs";
import { TbLayoutGridAdd } from "react-icons/tb";
import { TbLayoutGridRemove } from "react-icons/tb";
import { FaBasketShopping } from "react-icons/fa6";
import "./settings.css"


const ManageEmployees = () => {
    
    const handleRemove = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            name: form.name.value
        };

        fetch('http://localhost:5000/remove_employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Remove Employee!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Successfully Removed Employee!');
                form.reset();
            } else {
                alert(`User removal failed: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Remove Employee: ${error.message}`);
            form.reset();
        });
    };

    const handleAdd = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            name: form.name.value,
            contact: form.contact.value
        };

        fetch('http://localhost:5000/add_employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Add Employee!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Employee Added successfully!');
                form.reset();
            } else {
                alert(`Failed To Add Employee: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Add Employee: ${error.message}`);
            form.reset();
        });
    };


    return(

        <div>
            <br/>
            <br/>

            <Space direction="horizontal">

                <Space direction="vertical" style={{marginLeft: '-50px'}}>
                        <div className="items-container">
                            <BsPersonFillAdd style={{fontSize: 100}}/>
                                <h3>Add Employee</h3>

                                    <form className="app-form" name="add-employee" onSubmit={handleAdd}>
                                        <div>
                                            <label>Employee Name</label>
                                                <div className="input-field">
                                                    <input type="text" name="name" placeholder=' Fullname' required/>
                                                </div>
                                            <label>Contact</label>
                                                <div className="input-field">
                                                    <input type="text" name="contact" placeholder='+233 000 000 000' required/>
                                                </div>
                                        </div>
                                        <div className="settings-button">
                                            <button type="submit" className="add-button">Add</button>
                                        </div>
                                    </form>
                        </div>

                    </Space>
                        
                    <Space direction="vertical">
                        <div className="items-container">
                            <BsPersonFillDash style={{fontSize: 100}}/>
                                <h3>Remove Employee</h3>

                                    <form className="app-form" name="remove-employee" onSubmit={handleRemove}>
                                        <div>
                                            <label>Employee Name</label>
                                                <div className="input-field">
                                                    <input type="text" name="name" placeholder=' Fullname' required/>
                                                </div>
                                        </div>
                                        <div className="settings-button">
                                            <button type="submit" className="remove-button">Remove</button>
                                        </div>
                                    </form>
                        </div>

                    </Space>

            </Space>

        </div>
    )
};

const ManageItems = () => {

    const handleRemove = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            item_name: form.item_name.value
        };

        fetch('http://localhost:5000/remove_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Remove Item!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Successfully Removed Item!');
                form.reset();
            } else {
                alert(`Item removal failed: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Remove Item: ${error.message}`);
            form.reset();
        });
    };

    const handleAdd = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            item_name: form.item_name.value,
            quantity_stock: form.quantity_stock.value
        };

        fetch('http://localhost:5000/add_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Add Item!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Item Added successfully!');
                form.reset();
            } else {
                alert(`Failed To Add Item: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Add Item: ${error.message}`);
            form.reset();
        });
    };

    return(
        <div>
            <br/>
            <br/>

            <Space direction="horizontal">

                <Space direction="vertical" style={{marginLeft: '-50px'}}>
                        <div className="items-container">
                            <TbLayoutGridAdd style={{fontSize: 100}}/>
                                <h3>Add Item</h3>

                                <form className="app-form" onSubmit={handleAdd}> 
                                    <div className="form-group" style={{flexDirection:'column'}}>
                                        <div className="input-field">
                                            <label>Item Name</label>
                                            <input type="text" name="item_name" placeholder='  Product' required/>
                                        </div>
                                        <div className="input-field">
                                            <label>Quantity</label>
                                            <input type="text" name="quantity_stock" placeholder='  Quantity' required/>
                                        </div>
                                    </div>
                                    <div className="settings-button">
                                        <button type="submit" className="add-button">Add</button>
                                    </div>
                                </form>
                        </div>

                    </Space>
                        
                    <Space direction="vertical">
                        <div className="items-container">
                            <TbLayoutGridRemove style={{fontSize: 100}}/>
                                <h3>Remove Item</h3>

                                <form className="app-form" onSubmit={handleRemove}> 
                                    <div className="form-group">
                                        <div className="input-field">
                                            <label>Item Name</label>
                                            <input type="text" name="item_name" placeholder='  Product' required/>
                                        </div>
                                    </div>
                                    <div className="settings-button">
                                        <button type="submit" className="remove-button">Remove</button>
                                    </div>
                                </form>
                        </div>
                    </Space>

            </Space>
                    
                </div>
                
        
        
    )
};



export default function Settings() {

    const [content, setContent] = useState('');

    return (
        <div  class="background-overlay">
            
            <Space className='Content'>
                <SideMenu />
                

                <Space direction='vertical' style={{marginLeft: 30}}>
                    <h3>STAFF</h3>
                    <Space style={{marginTop: -30}}>
                        <Button className='custom-btn' icon={<BsPersonRolodex style={{ fontSize: '18px'}} />} onClick={() => setContent('AddEmployee')}>
                            <h4>Manage Employee</h4>
                        </Button>
                    </Space>

                    <h3>PRODUCT</h3>
                        <Space style={{marginTop: -30}}>
                            <Button className='custom-btn' icon={<FaBasketShopping style={{ fontSize: '18px'}} />} onClick={() => setContent('ManageItems')}>
                                <h4>Manage Items</h4> 
                            </Button>
                        </Space>
                </Space>

                <Divider type="vertical" style={{ height: '100vh', marginLeft: 20, marginRight: 10, backgroundColor: '#AFB0B6'}} />

                <Space>
                    {content === 'AddEmployee' && <ManageEmployees />}
                    {content === 'ManageItems' && <ManageItems />}
                </Space>

            </Space>
        </div>
    )
}