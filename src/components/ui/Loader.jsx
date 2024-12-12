const Loader = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    purple: "border-purple-500",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-t-transparent rounded-full animate-spin ${colorClasses[color]}`}
      ></div>
    </div>
  );
};

export default Loader;
