import { useRef, useState } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';

function App() {
  // Tạo ref để điều khiển modal xác nhận xóa
  const modal = useRef();
  // Lưu id của địa điểm được chọn để xóa
  const selectedPlace = useRef();
  // State lưu danh sách các địa điểm đã chọn
  const [pickedPlaces, setPickedPlaces] = useState([]);

  // Khi người dùng bắt đầu thao tác xóa một địa điểm
  function handleStartRemovePlace(id) {
    modal.current.open(); // Mở modal xác nhận
    selectedPlace.current = id; // Lưu id địa điểm cần xóa
  }

  // Đóng modal khi người dùng hủy thao tác xóa
  function handleStopRemovePlace() {
    modal.current.close();
  }

  // Thêm địa điểm vào danh sách đã chọn nếu chưa có
  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      // Nếu địa điểm đã có trong danh sách thì không thêm nữa
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      // Tìm địa điểm theo id trong danh sách có sẵn
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      // Thêm vào đầu danh sách đã chọn
      return [place, ...prevPickedPlaces];
    });
  }

  // Xóa địa điểm khỏi danh sách đã chọn
  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close(); // Đóng modal sau khi xóa
  }

  return (
    <>
      {/* Modal xác nhận xóa địa điểm */}
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace} // Hủy thao tác xóa
          onConfirm={handleRemovePlace}   // Xác nhận xóa
        />
      </Modal>

      {/* Header giới thiệu ứng dụng */}
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {/* Danh sách các địa điểm đã chọn */}
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace} // Nhấn vào để xóa
        />
        {/* Danh sách các địa điểm có sẵn để chọn */}
        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace} // Nhấn vào để thêm
        />
      </main>
    </>
  );
}

export default App;