import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiBook, BiChevronRight } from "react-icons/bi";
import { useGetAllLessonsByPaginationQuery } from "../../../redux/features/user/lessonManagement.api";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../../components/ui/Loader";

export default function Lessons() {
  const params = [];
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    setFinalData([]);
    setHasMore(true);
  }, []);
  // Get All Lesson Data
  const { data, isLoading, isFetching } = useGetAllLessonsByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "lessonNumber" },
    ...params,
  ]);

  //lessonData
  const lessons = data?.data;
  //pagination Data
  const pagination = data?.pagination;

  useEffect(() => {
    if (lessons) {
      if (Array.isArray(lessons)) {
        setFinalData((prevData) => [...prevData, ...lessons]);
        setHasMore(pagination?.page !== pagination?.totalPage);
      } else {
        console.warn("newData is not an array:", lessons);
      }
    }
  }, [lessons, pagination]);

  const handleFetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Japanese Lessons</h1>
        <p className="mt-2 text-gray-600">Select a lesson to start learning</p>
      </div>
      <InfiniteScroll
        style={{ overflow: "none" }}
        dataLength={finalData?.length}
        next={handleFetchMore}
        hasMore={hasMore}
        loader={
          isLoading || isFetching ? <Loader size="lg" color="red" /> : null
        }
        scrollableTarget="scrollableDiv"
      >
        <div className="grid gap-6">
          {finalData?.map((lesson, i) => (
            <Link
              key={i}
              to={`${lesson?.lessonNumber}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <BiBook className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Lesson {lesson.lessonNumber}: {lesson.name}
                    </h2>
                    <p className="text-gray-500 mt-1">
                      {lesson.vocabularyCount} vocabulary words
                    </p>
                  </div>
                </div>
                <BiChevronRight className="h-6 w-6 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
