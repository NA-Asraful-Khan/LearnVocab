import { AiOutlineLoading } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useGetSinglelLessonQuery } from "../../../redux/features/user/lessonManagement.api";
import LessonForm from "./LessonForm";

const LessonEdit = () => {
  const { lessonId } = useParams();
  const { data, isLoading, isFetching } = useGetSinglelLessonQuery(lessonId);

  const defaultData = {
    name: data?.data?.name,
    lessonNumber: data?.data?.lessonNumber,
  };

  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <AiOutlineLoading className="text-7xl" />
      </div>
    );
  }
  return <LessonForm id={lessonId} defaultData={defaultData} />;
};

export default LessonEdit;
