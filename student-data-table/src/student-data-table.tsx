import { useEffect, useState } from "react";

interface Users {
  id: string;
  name: string;
  email: string;
  address: {city: string};
 
}

export const StudentDataTable = () => {
  const [usersData, setUsersData] = useState<Users[]>([]);
  const [selectedUser, setSelectedUsers] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(usersData.length / selectedUser);

  const currentPageUserData = usersData.slice(
    (currentPage - 1) * selectedUser,
    currentPage * selectedUser
  );

  const getUsersData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    });

    if (!response.ok) {
      return alert("error in fetching data");
    }

    const getData: Users[] = await response.json();
    const formatedUserData = getData.map((data) => ({
      id: data.id.toString(),
      name: data.name,
      email: data.email,
      address: { city: data.address.city },
    }));

    setUsersData(formatedUserData);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {currentPageUserData.map((user) => (
              <tr>
                <td>{user.id} </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <select
          onChange={(e) => setSelectedUsers(Number(e.target.value))}
          value={selectedUser}
        >
          <option value={3}>{"Show 3"}</option>
          <option value={5}>{"Show 5"}</option>
          <option value={7}>{"Show 7"}</option>
        </select>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {" "}
          prev{" "}
        </button>
        <span>
          {" "}
          <p>
            {" "}
            Show {currentPage} of {totalPages}{" "}
          </p>{" "}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {" "}
          next{" "}
        </button>
      </div>
    </>
  );
};
