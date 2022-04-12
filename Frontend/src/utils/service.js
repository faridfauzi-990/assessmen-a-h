import http from "./httpsService";

// const apiUrl = process.env.REACT_APP_HOST;
const apiUrl = process.env.PORT || 3000;
console.log('apiUrl: '+apiUrl)

const getAllData = () =>
  http.get(`http://localhost:3000/api/courses`);
 
  const updateData = data => {
      console.log('data: '+data)
    return http.post(`${apiUrl}/api/courses/`+data.id, data);
  };
  export {
    getAllData,
    updateData 
  }