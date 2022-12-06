export const accountColumns = [
    {
      title: "ID",
      dataIndex: "_id",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sortDirections: ["descend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      render: (pic) => <img src={pic} className="h-[2.5rem] w-auto"/>
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.fullName.indexOf(value) === 0,
      sorter: (a, b) => a.fullName.length - b.fullName.length,
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      defaultSortOrder: "descend",
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email - b.email,
      sortDirections: ["descend"],
    },
  ];