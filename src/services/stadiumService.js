const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/stadium`





const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
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

  

  const create = async (stadiumFormData) => {
    try {
      const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stadiumFormData),
      });
      if (!res.ok) throw new Error(`Server error: ${res.statusText}`);
      return res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  const deleteStadium = async (stadiumId) => {
    try {
      const res = await fetch(`${BASE_URL}/${stadiumId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }

  async function update(stadiumId, stadiumFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${stadiumId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stadiumFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }



  export { 
    index,
    show,
    create,
    deleteStadium,
    update,
  };
