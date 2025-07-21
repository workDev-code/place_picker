// Component xác nhận xóa địa điểm
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div id="delete-confirmation">
      {/* Tiêu đề xác nhận */}
      <h2>Are you sure?</h2>
      {/* Nội dung hỏi người dùng có chắc chắn muốn xóa */}
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        {/* Nút hủy thao tác xóa, gọi hàm onCancel */}
        <button onClick={onCancel} className="button-text">
          No
        </button>
        {/* Nút xác nhận xóa, gọi hàm onConfirm */}
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
