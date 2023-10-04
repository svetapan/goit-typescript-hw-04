import React, { createContext, useMemo, useState, useContext } from "react";
import noop from "lodash/noop";

// Додати тип Menu Selected
type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };
type SelectedMenu = { id: MenuIds };
type MenuSelected = { selectedMenu: SelectedMenu };

const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: {},
});

// Додайте тип MenuAction
type MenuAction = {
  // onSelectedMenu: SelectedMenu;
  onSelectedMenu: (menu: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: React.ReactElement; // Додати тип для children
};

const MenuProvider = ({ children }: PropsProvider) => {
  // Додати тип для SelectedMenu він повинен містити { id }
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({});

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
};

type PropsMenu = {
  menus: Menu[]; // Додайте вірний тип для меню
};

const MenuComponent = ({ menus }: PropsMenu) => {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu: Menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{" "}
          {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
};

export const ComponentApp = () => {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
};
