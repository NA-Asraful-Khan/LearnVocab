import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGraduationCap } from "react-icons/fa";
import { useGetAllLessonsQuery } from "../../../redux/features/user/lessonManagement.api";
import {
  useAddVocabularyMutation,
  useUpdateVocabularyMutation,
} from "../../../redux/features/user/vocabularyManagement.api";

export default function VocabularyForm({ id, defaultData }) {
  const [formData, setFormData] = useState({
    word: defaultData ? defaultData?.word : "",
    pronunciation: defaultData ? defaultData?.pronunciation : "",
    meaning: defaultData ? defaultData?.meaning : "",
    whenToSay: defaultData ? defaultData?.whenToSay : "",
    lessonId: defaultData ? defaultData?.lessonNo : "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //Lesson Options
  const { data: LessonOptions } = useGetAllLessonsQuery();

  //Call Hook
  const [addVocabulary] = useAddVocabularyMutation();
  const [updateVocabulary] = useUpdateVocabularyMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const finalData = {
      word: formData.word,
      pronunciation: formData.pronunciation,
      meaning: formData.meaning,
      whenToSay: formData.whenToSay,
      lessonNo: Number(formData.lessonId),
    };
    try {
      let res;

      if (id) {
        // Update operation
        res = await updateVocabulary({
          data: finalData,
          id: id,
        });
      } else {
        // Add operation
        res = await addVocabulary(finalData);
      }

      if (!res.error) {
        toast.success(`Lesson ${id ? "Updated" : "Added"} successfuly!`);
        navigate("/admin/vocabulary_management");
      } else {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add vocabulary");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-2xl mx-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Edit" : "Add"} New Vocabulary
        </h1>
        <p className="mt-2 text-gray-600">
          Add a new vocabulary word to a lesson
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="lessonId"
              className="block text-sm font-medium text-gray-700"
            >
              Select Lesson
            </label>
            <select
              id="lessonId"
              name="lessonId"
              value={formData.lessonId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select a lesson</option>
              {LessonOptions?.data?.map((lesson, i) => (
                <option key={i} value={lesson?.lessonNumber}>
                  Lesson {lesson?.lessonNumber}: {lesson?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="word"
              className="block text-sm font-medium text-gray-700"
            >
              Japanese Word
            </label>
            <input
              type="text"
              id="word"
              name="word"
              value={formData.word}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="pronunciation"
              className="block text-sm font-medium text-gray-700"
            >
              Pronunciation
            </label>
            <input
              type="text"
              id="pronunciation"
              name="pronunciation"
              value={formData.pronunciation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="meaning"
              className="block text-sm font-medium text-gray-700"
            >
              Meaning
            </label>
            <input
              type="text"
              id="meaning"
              name="meaning"
              value={formData.meaning}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="whenToSay"
              className="block text-sm font-medium text-gray-700"
            >
              When to Say
            </label>
            <textarea
              id="whenToSay"
              name="whenToSay"
              value={formData.whenToSay}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                `${id ? "Updating" : "Adding"} Vocabulary...`
              ) : (
                <>
                  <FaGraduationCap className="h-5 w-5 mr-2" />
                  {id ? "Update" : "Add"} Vocabulary
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/vocabulary_management")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
