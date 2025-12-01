import axios from 'axios';
export async function request() {
  const { data } = await axios.get('fake.url')
  return data
}