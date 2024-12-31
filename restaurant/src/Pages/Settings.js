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
import { VscGroupByRefType } from "react-icons/vsc";
import { FaSitemap } from "react-icons/fa6";
import { TbSitemapOff } from "react-icons/tb";
import "./settings.css"


const ManageEmployees = () => {
    
    const handleRemove = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            name: form.name.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/remove_employee', {
            // fetch('http://localhost:5000/remove_employee', {
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

        fetch('https://tasty-budz-t3xi.onrender.com/add_employee', {
            // fetch('http://localhost:5000/add_employee', {
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
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('http://tasty-budz-t3xi.onrender.com/category')
        // fetch('http://localhost:5000/category')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories!');
                }
                return response.json();
            })
            .then(data => {
                setCategory(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error.message);
            });
    }, []);

    const handleRemove = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            item_name: form.item_name.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/remove_item', {
            // fetch('http://localhost:5000/remove_item', {
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
            quantity_stock: form.quantity_stock.value,
            category: form.category.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/add_item', {
            // fetch('http://localhost:5000/add_item', {
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
                                        <div className="input-field">
                                            <select name='category' id='category' required>
                                                <option value='' disabled selected>Category</option>
                                                {category.map((item,index) => (
                                                    <option key={index} value={item.category}>
                                                        {item.category}
                                                    </option>
                                                ))}
                                            </select>
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


const ManageCategory = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('http://tasty-budz-t3xi.onrender.com/category')
        // fetch('http://localhost:5000/category')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories!');
                }
                return response.json();
            })
            .then(data => {
                setCategory(data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error.message);
            });
    }, []);

    const handleRemove = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            category: form.category.value
        };
        

        fetch('https://tasty-budz-t3xi.onrender.com/remove_category', {
        // fetch('http://localhost:5000/remove_category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Remove Category!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Successfully Removed Category!');
                form.reset();
                setCategory(category.filter(item => item.category !== formData.category));
            } else {
                alert(`Category removal failed: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Remove Category: ${error.message}`);
            form.reset();
        });
    };

    const handleAdd = (event) => {
        event.preventDefault();
        
        const form = event.target;

        const formData = {
            category: form.category.value,
        };

        fetch('https://tasty-budz-t3xi.onrender.com/add_category', {
            // fetch('http://localhost:5000/add_category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed To Add Category!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Category Added successfully!');
                form.reset();
                setCategory([...category, { category: formData.category }]);
            } else {
                alert(`Failed To Add Category: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed To Add Category: ${error.message}`);
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
                        <FaSitemap style={{fontSize: 100}}/>
                            <h3>Add Category</h3>

                            <form className="app-form" onSubmit={handleAdd}> 
                                    <div className="form-group" style={{flexDirection:'column'}}>
                                        <div className="input-field">
                                            <label>Category Name</label>
                                            <input type="text" name="category" placeholder='  Category' required/>
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
                            <TbSitemapOff style={{fontSize: 100}}/>
                                <h3>Remove Category</h3>

                                <form className="app-form" onSubmit={handleRemove}>
                                    <div className="form-group">
                                        <div className="input-field">
                                            <select name='category' id='category' required style={{width: '150px'}}>
                                                <option value='' disabled selected>Category</option>
                                                {category.map((item,index) => (
                                                    <option key={index} value={item.category}>
                                                        {item.category}
                                                    </option>
                                                ))}
                                            </select>
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
                        <Space style={{marginTop: -30}} direction='vertical'>
                            <Button className='custom-btn' icon={<FaBasketShopping style={{ fontSize: '18px'}} />} onClick={() => setContent('ManageItems')}>
                                <h4>Manage Items</h4> 
                            </Button>

                            <Button className='custom-btn' style={{marginTop: 40}} icon={<VscGroupByRefType style={{ fontSize: '18px'}} />} onClick={() => setContent('ManageCategory')}>
                                <h4>Manage Category</h4> 
                            </Button>
                        </Space>
                </Space>

                <Divider type="vertical" style={{ height: '100vh', marginLeft: 20, marginRight: 10, backgroundColor: '#AFB0B6'}} />

                <Space>
                    {content === 'AddEmployee' && <ManageEmployees />}
                    {content === 'ManageItems' && <ManageItems />}
                    {content === 'ManageCategory' && <ManageCategory />}
                </Space>

            </Space>
        </div>
    )
}
