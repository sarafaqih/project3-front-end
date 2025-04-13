import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/stadium`





const index = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reservations`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }



  const show = async (stadiumId) => {
    try {
      const res = await fetch(`${BASE_URL}/${stadiumId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  

  const create = async (stadiumId, reservationFormData ) => {
    try {
      const res = await fetch(`${BASE_URL}/${stadiumId}/reservation`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationFormData),
      });
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      return res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

























  export { 
    index,
    show,
    create, 
  };
