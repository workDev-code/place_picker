import { useState, useEffect } from "react";

// Custom hook: useLocalStorage
export function useLocalStorage(key, defaultValue) {
  const getInitialValue = () => {
    try {
      const ids = JSON.parse(localStorage.getItem(key));
      return ids === null ? defaultValue : ids;
    } catch (error) {
      console.error("useLocalStorage error:", error);
      return defaultValue;
    }
  };

  const [storePlaceIds, setStorePlaceIds] = useState(getInitialValue);

  // Ghi vào localStorage mỗi khi storePlaceIds thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storePlaceIds));
    } catch (error) {
      console.error("useLocalStorage write error:", error);
    }
  }, [key, storePlaceIds]);

  return [storePlaceIds, setStorePlaceIds];
}