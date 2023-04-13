import { createContext, useContext } from 'react';

export type DeleteModalContent = {
    showDeleteModal: boolean;
    setShowDeleteModal: (showDeleteModal: boolean) => void;
    id: string | null,
    setId: (id: string) => void;
};

const DeleteModalContext = createContext<DeleteModalContent>({
    showDeleteModal: false,
    setShowDeleteModal: () => true,
    id: null,
    setId: () => null
});

const useDeleteModalContext = () => {
    const context = useContext(DeleteModalContext);

    // if `undefined`, throw an error
    if (context === undefined) {
        throw new Error('useUserContext was used outside of its Provider');
    }

    return context;
};

export { DeleteModalContext, useDeleteModalContext };