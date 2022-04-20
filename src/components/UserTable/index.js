import UserProfile from "../UserProfile";
import "./index.css";

const UsersTable = (props) => {
  let { searchInput, usersPerPage, searchedUsersList, onDeleteUser } = props;

  const deleteUser = (id) => {
    onDeleteUser(id);
  };

  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead>
          <tr className="heading-row">
            <th className="headings">
              <p className="mobile-heading">Users Details</p>
              <p className="heading">Name</p>
              <p className="heading">Mail</p>
              <p className="heading">Role</p>
              <p className="heading">Actions</p>
            </th>
          </tr>
        </thead>
        <hr className="line" />
        <tbody>
          {searchInput === ""
            ? usersPerPage.map((user) => (
              <>
                <UserProfile userDetails={user} deleteUser={deleteUser} />
              </>
            ))
            : searchedUsersList.map((user) => (
              <>
                <UserProfile userDetails={user} deleteUser={deleteUser} />
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
