import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

function UserAuctionBox(props) {
  // const { users } = props;
  const [users, setUsers] = useState([
    {
      name: "Leo Messi - The GOAT",
    },
    {
      name: "Ronaldo",
    },
    {
      name: "Mbappe",
    },
  ]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   const fetchUser = async () => {
  //     const response = await axios.get("/api/user/search", {
  //       params: {
  //         size: 1000,
  //       },
  //     });
  //     setProducts(response.data.productList.datas);
  //     setTotalPage(response.data.productList.totalData);
  //   };
  //   fetchUser();
  //   setLoading(false);
  // }, []);
  return (
    <div className="flex flex-col">
      <h1>User list</h1>
      <div className="w-[200px] border-2 border-solid border-gray-400 h-full flex flex-col p-2">
        {users.map((user) => (
          <span className="w-full rounded-md border-2 border-solid border-gray-400 p-2 mb-2">
            {user.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default UserAuctionBox;
