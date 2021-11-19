import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from 'process';

export default async function auth(req, res) {
  if (req.method === 'POST') {
    const { user, password } = req.body;
    // const { user, password } = JSON.parse(req.body);

    const datoRequest = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        Authorization: env.DATO_KEY,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: `query {
          allUsers {
            id,
            username,
            password,
            description
          }
        }`,
      }),
    });

    const datoResponse = await datoRequest.json();

    const users = datoResponse.data.allUsers;

    const datoUserArray = users.filter((item) => user === item.username);

    const datoUser = datoUserArray[0];

    if (!datoUser) {
      res.status(400).json({ message: 'User not found' });
    } else {
      const macth = await compare(password, datoUser.password);
      if (macth) {
        const token = jwt.sign(
          {
            user: {
              id: datoUser.id,
              username: datoUser.username,
              description: datoUser.description,
            },
          },
          env.SECRET,
          {
            expiresIn: 60 * 60 * 1, // 1 hour
          },
        );
        res.status(200).json({ message: 'Login success', token });
      } else {
        res.status(400).json({ message: 'Invalid password' });
      }
    }
  } else {
    res.status(400).json({ message: 'Get method not allowed' });
  }
}
