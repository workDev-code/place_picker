import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ children, isOpen}) {
  const dialog = useRef();

 // Nhưng bổ sung thêm effect để tự động mở/đóng khi prop isOpen thay đổi
  useEffect(() => {
    
    if (!dialog.current) return;

    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {isOpen && children}
    </dialog>,
    document.getElementById('modal')
  );
}

export default Modal;
