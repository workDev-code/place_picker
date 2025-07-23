import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { AVAILABLE_PLACES } from '../data.js';
import { sortPlacesByDistance } from '../loc.js';

export function usePickedPlaces(){
  // pickedPlaceIds là mảng id, được đồng bộ với localStorage
    const [pickedPlaceIds, setPickedPlaceIds] = useLocalStorage('pickedPlaces', []);

    const [pickedPlaces, setPickedPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // 🌍 Thêm state lưu vị tri


    useEffect(() => {
      const places = pickedPlaceIds
        .map((id) => AVAILABLE_PLACES.find((place) => place.id === id))
        .filter((place) => place !== undefined); // loại bỏ undefined nếu không tìm thấy id
      console.log('Picked places:', places);
    }, [pickedPlaceIds]);

    
    // Cập nhật localStorage khi pickedPlaces thay đổi
    useEffect(() => {
      const ids = pickedPlaces.map((place) => place.id);
      setPickedPlaceIds(ids);
    }, [pickedPlaces]);

  // Load dữ liệu từ localStorage khi app khởi động
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Current position:', position);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting current position:', error);
      }
    );
  }, []);

    // Khi pickedPlaces hoặc userLocation thay đổi => sắp xếp lại
    useEffect(
    () => {
      if(pickedPlaces.length === 0 || !userLocation) return;
       const sortedPlaces = sortPlacesByDistance(
        pickedPlaces,
        userLocation.lat,
        userLocation.lng);
        setPickedPlaces(sortedPlaces);
      },
             
      [pickedPlaces.length, userLocation] // Chỉ khi pickedPlaces hoặc userLocation thay đổi
    )

  // Trả về các giá trị và hàm để sử dụng trong component
  return {
    pickedPlaces,
    setPickedPlaces,
    userLocation,
  };
}