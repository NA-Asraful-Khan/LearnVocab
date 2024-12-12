import { useState } from "react";
import { BiBookOpen } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddLessonMutation,
  useUpdateLessonMutation,
} from "../../../redux/features/user/lessonManagement.api";

export default function LessonForm({ id, defaultData }) {
  const [formData, setFormData] = useState({
    name: id ? defaultData?.name : "",
    lessonNumber: id ? defaultData?.lessonNumber : "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //Call Hook
  const [addLesson] = useAddLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const finalData = {
      name: formData.name,
      lessonNumber: Number(formData.lessonNumber),
    };
    try {
      let res;

      if (id) {
        // Update operation
        res = await updateLesson({
          data: finalData,
          id: id,
        });
      } else {
        // Add operation
        res = await addLesson(finalData);
      }

      if (!res.error) {
        toast.success(`Lesson ${id ? "Updated" : "Added"} successfuly!`);
        navigate("/admin/lesson_management");
      } else {
        toast.error(res.error.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to add lesson");
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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {id ? "Edit" : "Add"} New Lesson
        </h1>
        <p className="mt-2 text-gray-600">Create a new lesson for students</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="lessonNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Lesson Number
            </label>
            <input
              type="number"
              id="lessonNumber"
              name="lessonNumber"
              value={formData.lessonNumber}
              onChange={handleChange}
              className="border  mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
              min="1"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Lesson Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border  mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                `${id ? "Updating" : "Adding"} Lesson...`
              ) : (
                <>
                  <BiBookOpen className="h-5 w-5 mr-2" />
                  {id ? "Update" : "Add"} Lesson
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/lesson_management")}
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
