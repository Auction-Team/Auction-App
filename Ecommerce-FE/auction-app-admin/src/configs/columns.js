import { convertMongodbTimeToString, Sorter } from "./../utils/utils";
import Fallback from "./../assets/fallback.jpg";
const direction = ["ascend", "descend", ""];
export const categoryColumns = [
  {
    title: "Tên thể loại",
    dataIndex: "name",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },
];
export const accountColumns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    render: (pic) => (
      <img src={Fallback} className="h-[2.5rem] w-auto" alt="avatar" />
    ),
    width: 50,
  },
  {
    title: "Tên",
    dataIndex: "fullName",
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.fullName.indexOf(value) === 0,
    sorter: (a, b) => a.fullName.length - b.fullName.length,
    sortDirections: direction,
  },
  {
    title: "Email",
    dataIndex: "email",
    defaultSortOrder: "descend",
    onFilter: (value, record) => record.email.indexOf(value) === 0,
    sorter: (a, b) => a.email - b.email,
    sortDirections: direction,
  },
];
export const productColumns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "auctionName",
    onFilter: (value, record) => record.auctionName.indexOf(value) === 0,
    sorter: (a, b) => Sorter.sort(a.auctionName, b.auctionName),
    sortDirections: direction,
  },
  {
    title: "Loại sản phẩm",
    dataIndex: "categoryName",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Thời gian bắt đầu đấu giá",
    dataIndex: "startAuctionTime",
    render: (text) => <span>{convertMongodbTimeToString(text)}</span>,
  },
  {
    title: "Thời gian kết thúc đấu giá",
    dataIndex: "endAuctionTime",
    render: (text) => <span>{convertMongodbTimeToString(text)}</span>,
  },
  {
    title: "Chủ sở hữu",
    dataIndex: "owner",
  },
];
