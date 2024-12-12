import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name && !item.children) {
      acc.push({
        key: item.path,
        name: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
        access: true,
      });
    }
    if (item.children && item.multimenu === false) {
      acc.push({
        key: item.path,
        name: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        icon: item.icon,
        access: true,
      });
    }
    if (item.children && item.multimenu === true) {
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
