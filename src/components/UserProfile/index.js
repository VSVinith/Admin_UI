import "./index.css";

const UserProfile = (props) => {
  const { userDetails, deleteUser } = props;
  const { name, role, email, id } = userDetails;

  const onDelete = () => {
    deleteUser(id);
  };

  return (
    <div>
      <div className="user-profile-container">
        <tr className="user-profile">
          <td className="details">
            <p className="detail">{name}</p>
            <p className="detail">{email}</p>
            <p className="detail">{role}</p>
            <span className="detail">
              <button className="edit-button">Edit</button>
              <button className="delete-button" onClick={onDelete}>
                Delete
              </button>
            </span>
          </td>
        </tr>
      </div>
      <hr></hr>
    </div>

  );
};

export default UserProfile;
