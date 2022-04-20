import { Component } from "react";
import UsersTable from "../UserTable";
import Pagination from "../Pagination";
import "./index.css";

class AdminPanel extends Component {
  state = {
    searchInput: "",
    initialUsersList: [],
    usersPerPage: [],
    errorMessage: false,
  };

  componentDidMount() {
    this.getUsersData();
  }

  getUsersData = async () => {
    const usersApi =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(usersApi, options);
      const usersList = await response.json();
      this.setState({
        initialUsersList: usersList,
        usersPerPage: usersList.slice(0, 10),
      });
    } catch (error) {
      this.setState({ errorMessage: true });
      console.log(this.state.errorMessage);
    }
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  onDeleteUser = (id) => {
    const { usersPerPage } = this.state;
    const filteredUsersList = usersPerPage.filter((user) => user.id !== id);
    this.setState({ usersPerPage: filteredUsersList });
  };

  firstPage = () => {
    const { initialUsersList } = this.state;
    this.setState({
      searchInput: "",
      usersPerPage: initialUsersList.slice(0, 10),
    });
  };

  lastPage = () => {
    const { initialUsersList } = this.state;
    this.setState({
      searchInput: "",
      usersPerPage: initialUsersList.slice(
        (Math.ceil(initialUsersList.length / 10) - 1) * 10
      ),
    });
  };

  pageHandler = (pageNumber) => {
    const { initialUsersList } = this.state;
    this.setState({
      searchInput: "",
      usersPerPage: initialUsersList.slice(
        pageNumber * 10 - 10,
        pageNumber * 10
      ),
    });
  };

  render() {
    const { initialUsersList, searchInput, usersPerPage, errorMessage } = this.state;
    const searchedUsersList = initialUsersList.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
      <div className="admin-panel">
        <h1> ADMIN PANEL </h1>
        <input
          type="search"
          className="search-bar"
          placeholder="search here..."
          onChange={this.onChangeSearchInput}
        />
        {errorMessage ? <p>Can't get Details</p> : <div className="table-data">
          <UsersTable
            searchInput={searchInput}
            usersPerPage={usersPerPage}
            searchedUsersList={searchedUsersList}
            onDeleteUser={this.onDeleteUser}
          />
          <Pagination
            initialUsersList={initialUsersList}
            pageHandler={this.pageHandler}
            firstPage={this.firstPage}
            lastPage={this.lastPage}
          />
        </div>}
      </div>
    );
  }
}

export default AdminPanel;
