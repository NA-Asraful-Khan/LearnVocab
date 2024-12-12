import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiEdit, BiLoader, BiPlus } from "react-icons/bi";
import { FiVolume2 } from "react-icons/fi";
import {
  useDeleteVocabularyMutation,
  useGetAllVocabularyByPaginationQuery,
} from "../../../redux/features/user/vocabularyManagement.api";
import { useGetAllLessonsQuery } from "../../../redux/features/user/lessonManagement.api";
import Swal from "sweetalert2";
import { AiFillDelete } from "react-icons/ai";

export default function VocabularyList() {
  const [selectedLesson, setSelectedLesson] = useState("");
  const navigate = useNavigate();
  const params = [
    selectedLesson !== "" && { name: "lessonNo", value: selectedLesson },
  ].filter(Boolean);

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const { data: LessonOptions } = useGetAllLessonsQuery();
  const { data, isLoading, isFetching } = useGetAllVocabularyByPaginationQuery([
    { name: "limit", value: pageSize },
    { name: "page", value: page },
    { name: "sort", value: "-createdAt" },
    ...params,
  ]);
  const [deleteVocabulary] = useDeleteVocabularyMutation();

  //vocabularyData
  const vocabularyData = data?.data;
  //pagination Data
  const pagination = data?.pagination;
  const startIndex = (page - 1) * pagination?.limit;
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleDelete = (vocabId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform delete action here
        deleteVocabulary(vocabId);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const playPronunciation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Manage Vocabulary
          </h1>
          <p className="mt-2 text-gray-600">
            View and manage all vocabulary items
          </p>
        </div>
        <button
          onClick={() => navigate("create")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center"
        >
          <BiPlus className="h-5 w-5 mr-2" />
          Add New Vocabulary
        </button>
      </div>

      <div className="mb-6">
        <label
          htmlFor="lessonFilter"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by Lesson
        </label>
        <select
          id="lessonFilter"
          value={selectedLesson}
          onChange={(e) => setSelectedLesson(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Lessons</option>
          {LessonOptions?.data?.map((lesson, index) => (
            <option key={index} value={lesson?.lessonNumber}>
              Lesson {lesson?.lessonNumber}: {lesson?.name}
            </option>
          ))}
        </select>
      </div>
      {isLoading && isFetching ? (
        <div className="w-full text-7xl flex justify-center items-center">
          <BiLoader />
        </div>
      ) : !data ? (
        <div className="w-full text-4xl flex justify-center items-center">
          <h2>Failed To Fetch Data!</h2>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Word
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pronunciation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meaning
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  When to Say
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            {vocabularyData?.length <= 0 ? (
              <div className="w-full text-3xl text-center flex justify-center items-center">
                <h2>No Data To Show!</h2>
              </div>
            ) : (
              <tbody className="bg-white divide-y divide-gray-200">
                {vocabularyData?.map((vocab, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {vocab?.word}
                        </div>
                        <button
                          onClick={() =>
                            playPronunciation(vocab?.pronunciation)
                          }
                          className="ml-2 text-indigo-600 hover:text-indigo-900"
                        >
                          <FiVolume2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vocab?.pronunciation}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {vocab?.meaning}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {vocab?.whenToSay}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-4">
                        <Link to={`/admin/vocabulary_management/${vocab?._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900 flex items-center rounded p-2 border border-indigo-900">
                            <BiEdit className="h-4 w-4 mr-1" />
                          </button>
                        </Link>
                        <button
                          className="text-indigo-600 hover:text-indigo-900 flex items-center rounded p-2 border border-indigo-900"
                          onClick={() => handleDelete(vocab._id)}
                        >
                          <AiFillDelete className="h-4 w-4 mr-1" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>

          {/* Pagination Controls */}
          {vocabularyData?.length !== 0 && (
            <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Previous
                </button>
                {Array.from(
                  { length: pagination?.totalPage },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      page === page
                        ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                        : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination?.totalPage}
                  className="ml-3 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to
                    <span className="font-medium">
                      {Math.min(
                        startIndex + pagination?.limit,
                        pagination?.total
                      )}
                    </span>{" "}
                    of <span className="font-medium">{pagination?.total}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    {Array.from(
                      { length: pagination?.totalPage },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === page
                            ? "bg-indigo-50 border-indigo-500 text-indigo-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === pagination?.totalPage}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
