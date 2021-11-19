import { env } from 'process';
import { SiteClient } from 'datocms-client';

let cachedDato = null;

function connectToDato() {
  if (cachedDato) return cachedDato;

  return new SiteClient(env.DATO_KEY);
}

export default async function handleUser(req, res) {
  if (req.method === 'POST') {
    const server = connectToDato();
    cachedDato = server;

    const { user, description, avatar } = req.body;

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
              description,
              password
            }
          }`,
      }),
    });

    const datoResponse = await datoRequest.json();

    const datoUsers = datoResponse.data.allUsers;

    const userSelectedArray = datoUsers.filter(
      (userObject) => user === userObject.username,
    );

    const userSelected = userSelectedArray[0];

    const updatedUser = await server.items.update(userSelected.id, {
      username: user,
      description,
    });

    res
      .status(200)
      .json({ message: 'Successfully updated', user: updatedUser });
  } else {
    res.status(405).json({ message: 'Get method not allowed' });
  }
}
