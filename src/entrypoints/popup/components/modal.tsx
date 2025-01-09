import { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 w-full h-full bg-zinc-600 bg-opacity-60 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[76%] h-[76%] bg-white text-black p-6 overflow-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
