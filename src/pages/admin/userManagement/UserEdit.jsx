import { useParams } from "react-router-dom";
import UserForm from "./UserForm";
import { useGetSinglelUserQuery } from "../../../redux/features/user/userManagement.api";
import { AiOutlineLoading } from "react-icons/ai";

const UserEdit = () => {
  const { userId } = useParams();
  const { data, isLoading, isFetching } = useGetSinglelUserQuery(userId);

  const defaultData = {
    name: data?.data?.name,
    email: data?.data?.email,
    role: data?.data?.role,
    photo: data?.data?.photo,
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <AiOutlineLoading className="text-7xl" />
      </div>
    );
  }
  return <UserForm id={userId} defaultData={defaultData} />;
};

export default UserEdit;
