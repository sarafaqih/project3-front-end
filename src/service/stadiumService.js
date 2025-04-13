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

const getAllStadiums = async () => {
  try {
      const res = await api.get('/'); 
      console.log('res', res.data);
      return res.data;
  } catch (error) {
      console.log('Error fetching data:', error);
  }
};

const getOneStadium = async (id) => {
    try {
        const res = await api.get(`/${id}`); 
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

async function createStadium(formData){
  try{
      const res = await api.post(`/`,formData)
      console.log("Response from backend:", res.data);
      return res.data
  }catch(err){
      console.log(err.message)
  }
}

async function deleteStadium(id){
    if(!id){
       return console.log("No ID")
    }
    try{
        const res = await api.delete(`/${id}`)
        return res.data
    }catch(err){
        console.log(err)
    }
}

function test(){
    
}

export  {getAllStadiums, getOneStadium, createStadium, deleteStadium}; 