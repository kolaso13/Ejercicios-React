// import { Table, Input, Button, Popconfirm, Form, Modal } from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { useContext, useState, useEffect, useRef } from "react";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
// function App() {
//   const [dataSource, setDataSource] = useState([
//     {
//       id: 1,
//       name: "John",
//       email: "john@gmail.com",
//       address: "john address",
//     },
//     {
//       id: 2,
//       name: "Peter",
//       email: "peter@gmail.com",
//       address: "peter address",
//     },
//     {
//       id: 3,
//       name: "Carlos",
//       email: "carlos@gmail.com",
//       address: "carlos address",
//     },
//   ]);
//   const [editingRow, setEditingRow] = useState(null);
//   const [form] = Form.useForm();
//   const columns = [
//     {
//       title: "ID",
//       dataIndex: "id",
//       render: (text, record) => {
//         if (editingRow === record.id) {
//           return (
//             <Form.Item
//               name="id"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter your id",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           );
//         } else {
//           return <p>{text}</p>;
//         }
//       },
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       render: (text, record) => {
//         if (editingRow === record.id) {
//           return (
//             <Form.Item
//               name="name"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter your name",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           );
//         } else {
//           return <p>{text}</p>;
//         }
//       },
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       render: (text, record) => {
//         if (editingRow === record.id) {
//           return (
//             <Form.Item
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter your email",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           );
//         } else {
//           return <p>{text}</p>;
//         }
//       },
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       render: (text, record) => {
//         if (editingRow === record.id) {
//           return (
//             <Form.Item
//               name="address"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please enter your address",
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           );
//         } else {
//           return <p>{text}</p>;
//         }
//       },
//     },
//     {
//       title: "Actions",
//       render: (_, record) => {
//         return (
//           <>
//             <EditOutlined
//               onClick={() => {
//                 setEditingRow(record.id);
//                 form.setFieldsValue({
//                   id: record.id,
//                   name: record.name,
//                   email: record.email,
//                   address: record.address,
//                 });
//               }}
//             />
//             <Button type="link" htmlType="submit">
//               Save
//             </Button>
//             <DeleteOutlined
//               onClick={() => {
//                 onDeleteStudent(record);
//               }}
//               style={{ color: "red", marginLeft: 12 }}
//             />
//           </>
//         );
//       },
//     },
//   ];
//   const onAddStudent = () => {
//     const randomNumber = parseInt(Math.random() * 1000);
//     const newStudent = {
//       id: randomNumber,
//       name: "Name " + randomNumber,
//       email: randomNumber + "@gmail.com",
//       address: "Address" + randomNumber,
//     };
//     setDataSource((pre) => {
//       return [...pre, newStudent];
//     });
//   };
//   const onDeleteStudent = (record) => {
//     Modal.confirm({
//       title: "Estas seguro que quieres eliminarlo?",
//       okText: "Si",
//       okType: "danger",
//       onOk: () => {
//         setDataSource((pre) => {
//           return pre.filter((student) => student.id !== record.id);
//         });
//       },
//     });
//   };
//   const onFinish = (values) => {
//     const updatedDataSource = [...dataSource];
//     updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
//     setDataSource(updatedDataSource);
//     setEditingRow(null);
//   };
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Button onClick={onAddStudent}>Add a new Student</Button>
//         <Form form={form} onFinish={onFinish}>
//           <Table dataSource={dataSource} columns={columns}></Table>
//         </Form>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const App = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "age",
      dataIndex: "age",
      width: "15%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default App;
