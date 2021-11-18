import { jwt } from 'jsonwebtoken';
import { bcrypt } from 'bcrypt';

export default function auth(req, res) {
  if (req.method === 'POST') {
    const { user, password } = req.body;
    res.status(200).json({ user, password });
  } else {
    res.status(400).json({ message: 'Get method not allowed' });
  }
}
