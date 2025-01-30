import axios from 'axios';

const fetchData = async (slug) => {
  try {
    if (!slug) {
      console.error('Error: slug is undefined or empty');
      return null;
    }
    console.log('Fetching data for slug:', slug);

    const response = await axios.get(
      `http://localhost:1337/api/pages?filters[slug][$eq]=${slug}&populate=*`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default fetchData;