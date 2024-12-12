import { useState, useEffect } from "react";
import { tutorialVideos } from "../../../data/tutorialData";
import TutorialHeader from "./tutorials/TutorialHeader";
import TutorialGrid from "./tutorials/TutorialGrid";

export default function Tutorials() {
  const [tutorials, setTutorials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchTutorials = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
        setTutorials(tutorialVideos);
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600">Loading tutorials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <TutorialHeader />
      <TutorialGrid tutorials={tutorials} />
    </div>
  );
}
