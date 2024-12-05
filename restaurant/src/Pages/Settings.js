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

// Add User <BsPersonFillAdd/>
//Remove Userr <BsPersonFillDash/>

const ManageEmployees = () => {
    


    return(

        <div>
            <br/>
            <br/>
            <br/>

            <Space direction="horizontal">

                <Space direction="vertical" style={{marginLeft: '-50px'}}>
                        <div className="items-container">
                            <BsPersonFillAdd style={{fontSize: 100}}/>
                                <h3>Add Employee</h3>

                                    <form name="add-employee">
                                        <div>
                                            <label>Employee Name</label>
                                                <div className="input-field">
                                                    <input type="text" name="S_name" placeholder=' Sur-name' required/>
                                                    <input type="text" name="F_name" placeholder=' First-name' required/>
                                                </div>
                                        </div>
                                        <div className="settings-button">
                                            <button type="submit" className="add-button">Add</button>
                                        </div>
                                    </form>
                        </div>

                    </Space>
                        
                    <Space direction="vertical" style={{marginLeft: '60px'}}>
                        <div className="items-container">
                            <BsPersonFillDash style={{fontSize: 100}}/>
                                <h3>Remove Employee</h3>

                                    <form name="remove-employee">
                                        <div>
                                            <label>Employee Name</label>
                                                <div className="input-field">
                                                    <input type="text" name="S_name" placeholder=' Sur-name' required/>
                                                    <input type="text" name="F_name" placeholder=' First-name' required/>
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

    return(
        <div>
            <br/>
            <br/>
            <br/>

            <Space direction="horizontal">

                <Space direction="vertical" style={{marginLeft: '-50px'}}>
                        <div className="items-container">
                            <TbLayoutGridAdd style={{fontSize: 100}}/>
                                <h3>Add Item</h3>

                                <form className="items-form"> 
                                    <div className="form-group">
                                        <div className="input-field">
                                            <label>Item Name</label>
                                            <input type="text" name="item_name" placeholder='  Product' required/>
                                        </div>
                                    </div>
                                    <div className="settings-button">
                                        <button type="submit" className="add-button">Add</button>
                                    </div>
                                </form>
                        </div>

                    </Space>
                        
                    <Space direction="vertical" style={{marginLeft: '100px'}}>
                        <div className="items-container">
                            <TbLayoutGridRemove style={{fontSize: 100}}/>
                                <h3>Remove Item</h3>

                                <form className="items-form"> 
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