import axios from 'axios';

export default async () => {
  let access = "90ee6db8991ecc8a6ab598eac7563b32"
  let response = await axios.get(`https://api.ipstack.com/check?access_key=${access}&fields=ip,country_code`)
  return response.data
}