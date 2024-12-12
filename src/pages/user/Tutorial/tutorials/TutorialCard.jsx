import { BiPlay } from "react-icons/bi";

export default function TutorialCard({ tutorial }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={tutorial.url}
          title={tutorial.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="bg-indigo-100 p-2 rounded-full">
              <BiPlay className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {tutorial.title}
            </h3>
            {tutorial.description && (
              <p className="mt-1 text-sm text-gray-500">
                {tutorial.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
