import jwt from 'jsonwebtoken';
import { SiteClient } from 'datocms-client';

import { env } from 'process';

let cachedDato = null;

function connectToDato() {
  if (cachedDato) return cachedDato;

  return new SiteClient(env.DATO_KEY);
}

const handleRegister = async (req, res) => {
  if (req.method === 'POST') {
    const { user, password } = req.body;

    const server = connectToDato();

    cachedDato = server;

    try {
      await server.items.create({
        itemType: '1415781',
        username: user,
        password,
      });
      const token = jwt.sign({ username: user }, env.SECRET, {
        expiresIn: 60 * 60 * 1, // 1 hour
      });

      res.status(201).json({ username: user, token });
    } catch (err) {
      const errorCode = err.body.data[0].attributes.details.code;
      if (errorCode === 'VALIDATION_UNIQUE') {
        res.status(400).json({ message: 'User already exists' });
      } else {
        res.status(400).json({ message: 'User not created' });
      }
    }
  } else {
    res.status(405).json({ message: 'Get method is not allowed' });
  }
};

export default handleRegister;
