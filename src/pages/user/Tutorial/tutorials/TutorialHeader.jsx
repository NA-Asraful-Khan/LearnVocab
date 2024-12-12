import { BiVideo } from "react-icons/bi";

export default function TutorialHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <div className="bg-indigo-100 p-3 rounded-full">
          <BiVideo className="h-8 w-8 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Japanese Language Tutorials
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        Enhance your learning with our curated collection of Japanese language
        tutorials. These videos cover essential topics from basic greetings to
        writing systems.
      </p>
    </div>
  );
}
