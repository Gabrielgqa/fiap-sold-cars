import { Router } from 'express';
import axios from 'axios';

const routes = Router();

routes.get('/cars', async (req, res) => {
    try {
      // Fazer login e obter access_token
      const loginResponse = await axios.post('http://localhost:3333/sessions', {
          email: "johndoe@gmail.com",
          password: "123456"
      });
  
      const accessToken = loginResponse.data.access_token;
  
      // Buscar os carros não vendidos com o access_token
      const response = await axios.get('http://localhost:3333/cars/unsold', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      res.status(200).json({ message: 'Data saved to database', data: response.data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching or saving data' });
    }
});

routes.post('/car/sale/:id', async (req, res) => {

  const cpfBuyer = req.body.cpfBuyer;
  const id = req.params.id;

  const loginResponse = await axios.post('http://localhost:3333/sessions', {
    email: "johndoe@gmail.com",
    password: "123456"
  });

  const accessToken = loginResponse.data.access_token;

  const response = await axios.put('http://localhost:3333/cars/unsold/'+id, {
    cpfBuyer
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

})

export default routes;
