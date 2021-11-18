import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from 'process';

export default async function auth(req, res) {
  if (req.method === 'POST') {
    const { user, password } = JSON.parse(req.body);

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
            password
          }
        }`,
      }),
    });

    const datoResponse = await datoRequest.json();

    const users = datoResponse.data.allUsers;

    const datoUser = users.filter((item) => user === item.username);

    if (!datoUser[0]) {
      res.status(400).json({ message: 'User not found' });
    } else {
      const macth = await compare(password, datoUser[0].password);
      if (macth) {
        const token = jwt.sign({ username: user }, env.SECRET, {
          expiresIn: 60 * 60 * 1, // 1 hour
        });
        res.status(200).json({ message: 'Login success', token });
      } else {
        res.status(400).json({ message: 'Invalid password' });
      }
    }
  } else {
    res.status(400).json({ message: 'Get method not allowed' });
  }
}
