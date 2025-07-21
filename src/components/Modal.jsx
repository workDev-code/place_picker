import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

// Modal nhận ref để điều khiển mở/đóng từ bên ngoài
const Modal = forwardRef(function Modal({ children }, ref) {
  // Tạo ref cho thẻ dialog
  const dialog = useRef();

  // Cho phép component cha gọi open/close qua ref
  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal(); // Mở modal
      },
      close: () => {
        dialog.current.close(); // Đóng modal
      },
    };
  });

  // Render modal vào phần tử #modal ngoài root thông qua portal
  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
