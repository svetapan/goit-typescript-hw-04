import React, { useMemo, useState } from "react";
import {
  PropsProvider,
  SelectedMenu,
  MenuActionContext,
  MenuSelectedContext,
} from "./4";

export function MenuProvider({ children }: PropsProvider) {
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
    <>
      <MenuActionContext.Provider value={menuContextAction}>
        <MenuSelectedContext.Provider value={menuContextSelected}>
          {children}
        </MenuSelectedContext.Provider>
      </MenuActionContext.Provider>
    </>
  );
}
