export const routeGenerator = (items) => {
  // Recursive function to process the children and map them into TRoute structure
  const processChildren = (userPaths) => {
    return userPaths.map((item) => ({
      path: item.path || "", // Default to an empty string if no path
      element: item.element || undefined, // Use element if present
      children: item.children ? processChildren(item.children) : undefined, // Recursively process children
    }));
  };

  // Map the top-level items into routes
  const routes = items.map((item) => ({
    path: item.path || "",
    element: item.element || undefined,
    children: item.children ? processChildren(item.children) : undefined,
  }));
  return routes;
};
