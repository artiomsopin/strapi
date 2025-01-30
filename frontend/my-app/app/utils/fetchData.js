import axios from 'axios';

const fetchData = async (slug = '') => {
  try {
    const url = slug
      ? `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`
      : `http://localhost:1337/api/pages?populate=*`; 

    console.log('Fetching data from:', url);

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;