import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./report.css";
import  { Button, Table, Input, Modal, Dropdown, Menu, Space } from 'antd';
import SideMenu from "./SideMenu";
import axios from "axios";
import { TbCashRegister } from "react-icons/tb";
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


export default function Employee() {
    const navigate = useNavigate();
    const [employeePay, setEmployeePay] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState([]);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);
    const [isAddVisible, setIsAddVisible] = useState(false);

    useEffect(() => {
        fetchPaysheet();
    }, []);

    const fetchPaysheet = () => {
        axios.get('http://localhost:5000/employee')
            .then(response => {
                setEmployeePay(response.data);
                setFilteredInfo(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the Paysheet!', error);
            });
    };

    const fetchEmployees = () => {
        axios.get('http://localhost:5000/employees')
            .then(response => {
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employees!', error);
            });
    };

    const showUpdateModal = () => setIsUpdateVisible(true);
        const showAddModal = () => {
            fetchEmployees();
            setIsAddVisible(true);
        }
    
        const handleCancel = () => {
            setIsUpdateVisible(false);
            setIsAddVisible(false);
        };
    
        const handleSearch = (e) => {
            const searchItem = e.target.value.toUpperCase();
            const filtered = employeePay.filter(item =>
                Object.values(item).some(val =>
                    String(val).toUpperCase().includes(searchItem)
                )
            );
            setFilteredInfo(filtered);
        };
    
        const exportToPDF = () => {
            const doc = new jsPDF();
            const headers = [["Employee Name", "Payment Type", "Amount Paid", "Payment Date"]];
            const rows = filteredInfo.map(item => [
                item.name, 
                item.payment_type,
                item.amount_paid,
                item.payment_date
            ]);
            doc.autoTable({
                head: headers,
                body: rows,
                theme: 'grid',
                margin: { top: 20 },
                styles: { fontSize: 10, cellPadding: 3 },
            });
            doc.save('Pay Sheet.pdf');
        };
        
    
        const exportToExcel = () => {
            const filteredData = filteredInfo.map(item => ({
                "Employee Name": item.name,
                "Payment Type": item.payment_type,
                "Amount Paid": item.amount_paid,
                "Payment Date": item.payment_date
            }));
    
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Pay Sheet");
            XLSX.writeFile(workbook, 'Pay Sheet.xlsx');
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
                <Menu.Item key="1" icon={<TbCashRegister style={{fontSize: '18px'}}/>} onClick={showAddModal}>
                    Add Payment Entry
                </Menu.Item>
                {/* <Menu.Item key="2" icon={<MdOutlineInventory style={{fontSize: '18px'}}/>} onClick={showUpdateModal}>
                    Update *** Item
                </Menu.Item> */}
            </Menu>
        );

        const handleAdd = (event) => {
            event.preventDefault();
    
            const form = event.target;
    
            const formData = {
                name: form.name.value,
                amount_paid: form.amount_paid.value,
                payment_date: form.payment_date.value,
                payment_type: form.payment_type.value
            };
    
            fetch('http://localhost:5000/add_paysheet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to Add Payment Record!');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert('Payment recorded successfully!');
                    form.reset();
                    fetchPaysheet();
                } else {
                    alert(`Failed to add payment record: ${data.message}`);
                    form.reset();
                }
            })
            .catch((error) => {
                alert(`Failed to add payment record: ${error.message}`);
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
                                placeholder="Search Employee"
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
                        <PaySheetDisplay inventory_items={filteredInfo}/>
                    </Space>
                    
                    <AddPay
                    visible={isAddVisible}
                    onCancel={handleCancel}
                    onSubmit={handleAdd}
                    title={'Add Pay Record'}
                    employees={employees}
                    />

                </Space>

            </Space>
        </div>
    )
};

const PaySheetDisplay = ({ inventory_items }) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Employee Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Payment Type',
            dataIndex: 'payment_type',
            key: 'payment_type',
        },
        {
            title: 'Amount Paid',
            dataIndex: 'amount_paid',
            key: 'amount_paid',
        },
        {
            title: 'Payment Date',
            dataIndex: 'payment_date',
            key: 'payment_date',
        },
    ];

    const dataSource = inventory_items.map((item, index) => ({
        ...item,
        key: index,
    }));

    return (
        <Table
            className='employee-table'
            columns={columns}
            dataSource={dataSource}
            bordered
            title={() => <div className="table-header">Employee Payment Sheet</div>}
            pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        />
    );
};

const AddPay = ({visible, onCancel, onSubmit, title, employees}) => (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
        <form className="app-form" name="addPay" onSubmit={onSubmit}>
        <div className="parent-form-container">
                <select name='name' id='items' required>
                        <option value='' disabled selected>Select Name</option>
                        {employees.map((item, index) => (
                            <option key={index} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                </select>

                <input type="text" name="payment_type" placeholder=" Payment Type" required/>

                <input type="text" name="amount_paid" placeholder=" Amount Paid" required/>

                <input type="date" name="payment_date" required/>

                <div>
                    <button type="submit" className="add-button">Add Report</button>
                </div>

            </div>
        </form>
    </Modal>
)