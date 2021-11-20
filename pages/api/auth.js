import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { env } from 'process';
import { SiteClient } from 'datocms-client';

let cachedDato = null;

function connectToDato() {
  if (cachedDato) return cachedDato;

  return new SiteClient(env.DATO_KEY);
}

export default async function auth(req, res) {
  if (req.method === 'POST') {
    const { user, password } = req.body;

    const server = connectToDato();

    cachedDato = server;

    const users = await server.items.all();

    const [datoUser] = users.filter((item) => user === item.username);

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
