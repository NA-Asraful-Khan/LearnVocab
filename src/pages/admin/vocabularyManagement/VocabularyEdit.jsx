import { useParams } from "react-router-dom";
import VocabularyForm from "./VocabularyForm";
import { useGetSinglelVocabularyQuery } from "../../../redux/features/user/vocabularyManagement.api";
import { AiOutlineLoading } from "react-icons/ai";

const VocabularyEdit = () => {
  const { vocabularyId } = useParams();
  const { data, isLoading, isFetching } =
    useGetSinglelVocabularyQuery(vocabularyId);

  const defaultData = {
    word: data?.data?.word,
    pronunciation: data?.data?.pronunciation,
    meaning: data?.data?.meaning,
    whenToSay: data?.data?.whenToSay,
    lessonNo: data?.data?.lessonNo,
  };
  if (isFetching || isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <AiOutlineLoading className="text-7xl" />
      </div>
    );
  }
  return <VocabularyForm id={vocabularyId} defaultData={defaultData} />;
};

export default VocabularyEdit;
