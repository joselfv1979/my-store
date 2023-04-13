import React, { ReactNode, useState } from "react";
import { DeleteModalContext } from "./DeleteModalContext";

type Props = {
  children: ReactNode;
};

export const DeleteModalContextProvider = ({ children }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);

  const value = React.useMemo(
    () => ({
      showDeleteModal,
      setShowDeleteModal,
      id,
      setId
    }),
    [id, showDeleteModal]
  );
  return (
    <DeleteModalContext.Provider value={value}>
      {children}
    </DeleteModalContext.Provider>
  );
};
