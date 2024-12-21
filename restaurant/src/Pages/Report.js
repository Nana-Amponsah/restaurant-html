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


export default function Report() {
    const navigate = useNavigate();
    const [report, setReport] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = () => {
        axios.get('https://tasty-budz-t3xi.onrender.com/report')
            .then(response => {
                setReport(response.data);
                setFilteredInfo(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the Reports!', error);
            });
    };

    const fetchInventory = () => {
        axios.get('https://tasty-budz-t3xi.onrender.com/inventory')
            .then(response => {
                setInventory(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the inventory items!', error);
            });
    };

    const showUpdateModal = () => setIsUpdateVisible(true);
    const showAddModal = () => {
        fetchInventory();
        setIsAddVisible(true);
    };

    const handleCancel = () => {
        setIsUpdateVisible(false);
        setIsAddVisible(false);
    };

    const handleSearch = (e) => {
        const searchItem = e.target.value.toUpperCase();
        const filtered = report.filter(item =>
            Object.values(item).some(val =>
                String(val).toUpperCase().includes(searchItem)
            )
        );
        setFilteredInfo(filtered);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = [["Item Name", "Quantity Purchased", "Total Price", "Purchase Date"]];
        const rows = filteredInfo.map(item => [
            item.item_name, 
            item.quantity_purchased,
            item.total_price,
            item.purchase_date 
        ]);
        doc.autoTable({
            head: headers,
            body: rows,
            theme: 'grid',
            margin: { top: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
        });
        doc.save('Report.pdf');
    };
    

    const exportToExcel = () => {
        const filteredData = filteredInfo.map(item => ({
            "Item Name": item.item_name, 
            "Quantity Purchased": item.quantity_purchased,
                "Total Price": item.total_price,
                "Purchase Date": item.purchase_date
        }));

        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(workbook, 'Report.xlsx');
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
            <Menu.Item key="1" icon={<MdOutlineInventory style={{fontSize: '18px'}}/>} onClick={showAddModal}>
                Add To Report
            </Menu.Item>
            {/* <Menu.Item key="2" icon={<MdOutlineInventory style={{fontSize: '18px'}}/>} onClick={showUpdateModal}>
                Update Report Item
            </Menu.Item> */}
        </Menu>
    );

    const handleAdd = (event) => {
        event.preventDefault();

        const form = event.target;

        const formData = {
            item_name: form.item_name.value,
            quantity_purchased: form.quantity_purchased.value,
            purchase_date: form.purchase_date.value,
            total_price: form.total_price.value
        };

        fetch('https://tasty-budz-t3xi.onrender.com/add_report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to Add Report!');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Report added successfully!');
                form.reset();
                fetchReport();
            } else {
                alert(`Failed to add report: ${data.message}`);
                form.reset();
            }
        })
        .catch((error) => {
            alert(`Failed to add report: ${error.message}`);
            form.reset();
        });

        handleCancel();
    };
        
    

    return (
        <div class="background-overlay">
            <Space className="Content">
                <SideMenu />

                 <Space direction="vertical" style={{ width: '100%', marginLeft: '40px', marginTop: '40px'}}>
                
                    <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }}>
                            <Input
                                placeholder="Search Report"
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
                        <ReportDisplay report_items={filteredInfo}/>
                    </Space>

                    <AddReport
                    visible={isAddVisible}
                    onCancel={handleCancel}
                    onSubmit={handleAdd}
                    title='Add Report'
                    inventory={inventory}
                    />
                </Space>
            </Space>
        </div>
    )
}



const ReportDisplay = ({ report_items }) => {
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
            title: 'Quantity Purchased',
            dataIndex: 'quantity_purchased',
            key: 'quantity_purchased',
        },
        {
            title: 'Total Price',
            dataIndex: 'total_price',
            key: 'total_price',
        },
        {
            title: 'Purchase Date',
            dataIndex: 'purchase_date',
            key: 'purchase_date',
        },
    ];

    const dataSource = report_items.map((item, index) => ({
        ...item,
        key: index,
    }));

    return (
        <Table
            className='report-table'
            columns={columns}
            dataSource={dataSource}
            bordered
            title={() => <div className="table-header">Report</div>}
            pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        />
    );
};

const AddReport = ({visible, onCancel, onSubmit, title, inventory}) => (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
        <form className="app-form" onSubmit={onSubmit}>
            <div className="parent-form-container">
                <select name='item_name' id='items' required>
                        <option value='' disabled selected>Select Item Name</option>
                        {inventory.map((item, index) => (
                            <option key={index} value={item.item_name}>
                                {item.item_name}
                            </option>
                        ))}
                </select>

                <input type="text" name="quantity_purchased" placeholder=" Quantity" required/>

                <input type="text" name="total_price" placeholder=" Total" required/>

                <input type="date" name="purchase_date" required/>

                <div>
                    <button type="submit" className="add-button">Add Report</button>
                </div>

            </div>
        </form>
    </Modal>
)