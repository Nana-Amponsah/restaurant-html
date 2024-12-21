import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space } from 'antd';
import SideMenu from "./SideMenu";
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons';
import { FaFilePdf } from "react-icons/fa6";
import { BsFiletypeXlsx } from "react-icons/bs";
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { LuFolderEdit } from 'react-icons/lu';
import { CiExport } from 'react-icons/ci';
import 'jspdf-autotable';
import { BiCartAdd } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import Column from "antd/es/table/Column";

export default function Inventory() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState([]);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = () => {
        axios.get('https://tasty-budz-t3xi.onrender.com/inventory')
            .then(response => {
                setInventory(response.data);
                setFilteredInfo(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the inventory items!', error);
            });
    };


    const handleUpdate = (event) => {
        event.preventDefault();

        const form = event.target;

        const formData = {
            item_name: form.item_name.value,
            quantity_stock: form.quantity_stock.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/update_inventory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Update Inventory Item Failed!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Inventory Item updated successfully!');
                form.reset();
                fetchInventory();
            } else {
                alert(`Inventory Item update failed: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Inventory Item update failed: ${error.message}`);
            form.reset();
        });

        handleCancel();
    }

    const showUpdateModal = () => setIsUpdateVisible(true);
    const showAddModal = () => setIsAddVisible(true);

    const handleCancel = () => {
        setIsUpdateVisible(false);
        setIsAddVisible(false);
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

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = [["Item Name", "Quantity In Stock"]];
        const rows = filteredInfo.map(item => [
            item.item_name, 
            item.quantity_stock 
        ]);
        doc.autoTable({
            head: headers,
            body: rows,
            theme: 'grid',
            margin: { top: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
        });
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
            <Menu.Item key="1" icon={<FaFilePdf style={{fontSize: '18px'}}/>} onClick={exportToPDF}>
                Export to PDF
            </Menu.Item>
            <Menu.Item key="2" icon={<BsFiletypeXlsx style={{fontSize: '18px'}}/>} onClick={exportToExcel}>
                Export to Excel
            </Menu.Item>
        </Menu>
    );

    const addUpdateMenu = (
        <Menu>
            {/* <Menu.Item key="1" icon={<BiCartAdd style={{fontSize: '18px'}}/>} onClick={showAddModal}>
                Add To Inventory
            </Menu.Item> */}
            <Menu.Item key="2" icon={<BiCartAdd style={{fontSize: '18px'}}/>} onClick={showUpdateModal}>
                Update Inventory Item
            </Menu.Item>
        </Menu>
    );
    

    return (
        <div class="background-overlay">
            <Space className="Content">
                <SideMenu />

                <Space direction="vertical" style={{ width: '100%', marginLeft: '40px', marginTop: '40px'}}>

                <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
                        <Input
                            placeholder="Search Inventory"
                            onChange={handleSearch}
                            style={{ width: 200, height: 35 }}
                            prefix={<SearchOutlined />}
                        />
                        <Space>
                            <Dropdown overlay={exportMenu} trigger={['click']}>
                                <Button icon={<CiExport />} type="primary" style={{backgroundColor:'#d49200'}}>
                                    Export
                                </Button>
                            </Dropdown>
                            <Dropdown overlay={addUpdateMenu} trigger={['click']}>
                                <Button icon={<LuFolderEdit />} type="primary" style={{backgroundColor:'#d49200'}}>
                                    Edit
                                </Button>
                            </Dropdown>
                        </Space>
                        
                    </Space> 


                <Space direction="horizontal" style={{ width: '100%', marginLeft: '40px', marginTop: '20px' }}>
                    <InventoryDisplay inventory_items={filteredInfo}/>
                </Space>

                <UpdateItem
                visible={isUpdateVisible}
                onCancel={handleCancel}
                onSubmit={handleUpdate}
                title='Update Inventory Item'
                inventory={inventory}
                />

                </Space>
                
            </Space>
        </div>
    );
}



const InventoryDisplay = ({ inventory_items }) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Item Name',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: 'Quantity In Stock',
            dataIndex: 'quantity_stock',
            key: 'quantity_stock',
        },
    ];

    const dataSource = inventory_items.map((item, index) => ({
        ...item,
        key: index,
    }));

    return (
        <Table
            className='inventory-table'
            columns={columns}
            dataSource={dataSource}
            bordered
            title={() => <div className="table-header">Inventory</div>}
            pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        />
    );
};


const UpdateItem = ({visible, onCancel, onSubmit, title, inventory}) => (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
        <form className="app-form" name='addItem' onSubmit={onSubmit}>
            <div className="parent-form-container">
                <select name='item_name' id='items' required>
                        <option value='' disabled selected>Select Item</option>
                        {inventory.map((item, index) => (
                            <option key={index} value={item.item_name}>
                                {item.item_name}
                            </option>
                        ))}
                </select>
                
                <input type='text' name='quantity_stock' placeholder='Quantity' required/>

                <div>
                    <button type='submit' className='add-button'>Add Item</button>
                </div>

            </div>
            
        </form>
    </Modal>
)