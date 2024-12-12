import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { demoLessons, demoVocabulary } from "../../../data/demoData";
import { FiVolume2 } from "react-icons/fi";
import Confetti from "react-confetti";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function LessonDetails() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [vocabulary, setVocabulary] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const foundLesson = demoLessons.find((l) => l.id === lessonId);
    const lessonVocabulary = demoVocabulary.filter(
      (v) => v.lessonId === lessonId
    );

    if (foundLesson && lessonVocabulary.length > 0) {
      setLesson(foundLesson);
      setVocabulary(lessonVocabulary);
    } else {
      setLesson(foundLesson);
      setVocabulary([]);
    }
  }, [lessonId, navigate]);

  const playPronunciation = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    window.speechSynthesis.speak(utterance);
  };

  const handleNext = () => {
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      navigate("/user/lessons");
    }, 3000);
  };

  if (!lesson) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const currentWord = vocabulary[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {showConfetti && <Confetti />}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Lesson {lesson.lessonNumber}: {lesson.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Word {currentIndex + 1} of {vocabulary.length}
        </p>
      </div>
      {vocabulary.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              No Vocabulary On This Lesson
            </h2>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => playPronunciation(currentWord.pronunciation)}
              className="bg-indigo-100 p-4 rounded-full hover:bg-indigo-200 transition-colors"
            >
              <FiVolume2 className="h-8 w-8 text-indigo-600" />
            </button>
          </div>

          <div className="text-center mb-8">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4 cursor-pointer"
              onClick={() => playPronunciation(currentWord.pronunciation)}
            >
              {currentWord.word}
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              {currentWord.pronunciation}
            </p>
            <p className="text-lg text-gray-800 mb-4">{currentWord.meaning}</p>
            <p className="text-gray-600 italic">{currentWord.whenToSay}</p>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <BiChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </button>

            {currentIndex === vocabulary.length - 1 ? (
              <button
                onClick={handleComplete}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Complete Lesson
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600"
              >
                Next
                <BiChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
