import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
import { Button, Table, Input, Modal, Dropdown, Menu, Space, Divider } from 'antd';
import SideMenu from "./SideMenu";
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { LuFolderEdit } from 'react-icons/lu';
import { CiExport } from 'react-icons/ci';
import 'jspdf-autotable';
import { BiCartAdd } from "react-icons/bi";

export default function Inventory() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    useEffect(() => {
        fetchCategories();
        fetchInventory();
    }, []);

    const fetchCategories = () => {
        axios.get('https://tasty-budz-t3xi.onrender.com/category')
        // axios.get('http://localhost:5000/category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories!', error);
            });
    };

    const fetchInventory = () => {
        axios.get('https://tasty-budz-t3xi.onrender.com/inventory')
        // axios.get('http://localhost:5000/inventory')
            .then(response => {
                setInventory(response.data);
                setFilteredInfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching inventory!', error);
            });
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const filteredItems = inventory.filter(item => item.category === category);
        setFilteredInfo(filteredItems);
    };

    const handleSearch = (e) => {
        const searchItem = e.target.value.toUpperCase();
        const filtered = inventory.filter(item =>
            Object.values(item).some(val =>
                String(val).toUpperCase().includes(searchItem)
            )
        );
        setFilteredInfo(filtered);
    };

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = {
            item_name: form.item_name.value,
            quantity_stock: form.quantity_stock.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/update_inventory', {
            // fetch('http://localhost:5000/update_inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inventory Item updated successfully!');
                fetchInventory();
                handleCancel();
            } else {
                alert(`Update failed: ${data.message}`);
            }
        })
        .catch(error => alert(`Error: ${error.message}`));
    };

    const handleCancel = () => setIsUpdateVisible(false);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = [["Item Name", "Quantity In Stock"],];
        const rows = filteredInfo.map(item => [item.item_name, item.quantity_stock]);
        doc.autoTable({ head: headers, body: rows });
        doc.save('Inventory.pdf');
    };

    const exportToExcel = () => {
        const filteredData = filteredInfo.map(item => ({
            "Item Name": item.item_name,
            "Quantity In Stock": item.quantity_stock
        }));
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
        XLSX.writeFile(workbook, 'Inventory.xlsx');
    };

    const exportMenu = (
        <Menu>
            <Menu.Item key="1" icon={<FaFilePdf />} onClick={exportToPDF}>Export to PDF</Menu.Item>
            <Menu.Item key="2" icon={<BsFiletypeXlsx />} onClick={exportToExcel}>Export to Excel</Menu.Item>
        </Menu>
    );

    const addUpdateMenu = (
        <Menu>
            <Menu.Item key="1" icon={<BiCartAdd />} onClick={() => setIsUpdateVisible(true)}>
                Update Inventory Item
            </Menu.Item>
        </Menu>
    );

    const columns = [
        { title: '#', dataIndex: 'index', key: 'index', render: (text, record, index) => index + 1 },
        { title: 'Item Name', dataIndex: 'item_name', key: 'item_name' },
        { title: 'Quantity In Stock', dataIndex: 'quantity_stock', key: 'quantity_stock' }
    ];

    return (
        <div className="background-overlay">
            <Space className="Content">
                <SideMenu />

                <Space direction='vertical' style={{ marginLeft: 30 }}>
                    <Space style={{ marginTop: 60 }} direction='vertical'>
                        {categories.map((category, index) => (
                            <Button key={index} className='custom-btn' style={{ marginTop: index === 0 ? 0 : 40 }} onClick={() => handleCategoryClick(category.category)}>
                                <h4>{category.category}</h4>
                            </Button>
                        ))}
                    </Space>
                </Space>

                <Divider type="vertical" style={{ height: '100vh', marginLeft: 20, marginRight: 10, backgroundColor: '#AFB0B6' }} />

                <Space direction="vertical" style={{ width: '100%', marginLeft: '40px', marginTop: '40px' }}>
                    <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
                        <Input placeholder="Search Inventory" onChange={handleSearch} style={{ width: 200, height: 35 }} prefix={<SearchOutlined />} />
                        <Space>
                            <Dropdown overlay={exportMenu} trigger={['click']}>
                                <Button icon={<CiExport />} type="primary" style={{ backgroundColor:'#d49200' }}>Export</Button>
                            </Dropdown>
                            <Dropdown overlay={addUpdateMenu} trigger={['click']}>
                                <Button icon={<LuFolderEdit />} type="primary" style={{ backgroundColor:'#d49200' }}>Edit</Button>
                            </Dropdown>
                        </Space>
                    </Space>
                    <Table
                        columns={columns}
                        dataSource={filteredInfo.map((item, index) => ({ ...item, key: index }))}
                        bordered
                        title={() => <div className="table-header">Inventory</div>}
                        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
                    />
                </Space>
            </Space>
            <UpdateItem 
            visible={isUpdateVisible} 
            onCancel={handleCancel} 
            onSubmit={handleUpdate} 
            title='Update Inventory Item' 
            inventory={inventory} 
            selectedCategory={selectedCategory}
            />
        </div>
    );
};

const UpdateItem = ({visible, onCancel, onSubmit, title, inventory, selectedCategory}) => (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
        <form className="app-form" name='addItem' onSubmit={onSubmit}>
            <div className="parent-form-container">

                <select name='item_name' id='items' required>
                    <option value='' disabled selected>Select Item</option>
                    {inventory
                        .filter(item => !selectedCategory || item.category === selectedCategory)
                        .map((item, index) => (
                            <option key={index} value={item.item_name}>
                                {item.item_name}
                            </option>
                        ))
                    }
                </select>
                
                <input type='text' name='quantity_stock' placeholder='Quantity' required/>

                <div>
                    <button type='submit' className='add-button'>Add Item</button>
                </div>

            </div>
        </form>
    </Modal>
);
