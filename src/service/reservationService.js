import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/stadium`;
  
  const api = axios.create({
      baseURL: BASE_URL 
  });

  api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const getAllReservations = async () => {
  try {
      const res = await api.get('/reservations'); 
      console.log('res', res.data);
      return res.data;
  } catch (error) {
      console.log('Error fetching data:', error);
  }
};

const getOneReservation = async (id) => {
    try {
        const res = await api.get(`reservations/${id}`); 
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

async function createReservation(stadiumId,formData){
  try{
      const res = await api.post(`/${stadiumId}/reservation`,formData)
      console.log("Response from backend:", res.data);
      return res.data
  }catch(err){
      console.log(err.message)
  }
}


export  {getAllReservations, getOneReservation, createReservation}; 