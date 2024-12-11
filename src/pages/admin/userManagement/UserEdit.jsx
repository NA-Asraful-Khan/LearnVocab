import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { userId } = useParams();
  return (
    <div>
      <h1> This is UserEdit Component {userId} </h1>
    </div>
  );
};

export default UserEdit;
