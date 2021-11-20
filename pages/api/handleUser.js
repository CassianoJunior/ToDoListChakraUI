import { env } from 'process';
import { SiteClient } from 'datocms-client';
import jwt from 'jsonwebtoken';

let cachedDato = null;

function connectToDato() {
  if (cachedDato) return cachedDato;

  return new SiteClient(env.DATO_KEY);
}

export default async function handleUser(req, res) {
  if (req.method === 'POST') {
    const server = connectToDato();
    cachedDato = server;

    const { defaultUser, user, description } = req.body;

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
              description
            }
          }`,
      }),
    });

    const datoResponse = await datoRequest.json();

    const datoUsers = datoResponse.data.allUsers;

    // Verificar se ja existe um usuario com o novo nome
    const [existingUser] = datoUsers.filter(
      (userObject) => user === userObject.username,
    );

    if (existingUser && user !== defaultUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const [userSelected] = datoUsers.filter(
      (userObject) => defaultUser === userObject.username,
    );

    const updatedUser = await server.items.update(userSelected.id, {
      username: user,
      description,
    });

    const token = jwt.sign(
      {
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          description: updatedUser.description,
        },
      },
      env.SECRET,
      {
        expiresIn: 60 * 60 * 1, // 1 hour
      },
    );

    res.status(200).json({
      message: 'Successfully updated',
      userUpdated: {
        id: updatedUser.id,
        username: updatedUser.username,
        description: updatedUser.description,
      },
      token,
    });
  } else {
    res.status(405).json({ message: 'Get method not allowed' });
  }
}
