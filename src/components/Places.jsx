// Component hiển thị danh sách các địa điểm
export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      {/* Tiêu đề của danh mục địa điểm */}
      <h2>{title}</h2>
      {/* Nếu không có địa điểm nào thì hiển thị văn bản dự phòng */}
      {places.length === 0 && <p className='fallback-text'>{fallbackText}</p>}
      {/* Nếu có địa điểm thì hiển thị danh sách */}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              {/* Nút hiển thị thông tin địa điểm, khi nhấn gọi hàm onSelectPlace với id */}
              <button onClick={() => onSelectPlace(place.id)}>
                <img src={place.image.src} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
