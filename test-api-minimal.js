const axios = require('axios');

const baseURL = 'https://ujobsindia.com/aayusha-backend/public/api/v1';

async function test() {
  try {
    console.log('Testing Locations...');
    const locRes = await axios.get(`${baseURL}/web/locations`);
    console.log('Response Type:', typeof locRes.data);
    console.log('Response Start:', String(locRes.data).substring(0, 500));

  } catch (error) {
    console.error('Test failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
    } else {
      console.error('Message:', error.message);
    }
  }
}

test();
