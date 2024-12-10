import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.path,
        icon: item.icon,
        access: true,
        name: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        // name: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        name: item.name,
        icon: item.icon,
        content: true,
        access: true,
        children:
          item.children?.map((child) => ({
            key: child.path ?? "",
            access: true,
            name: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
            icon: child.icon,
          })) ?? [],
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};
