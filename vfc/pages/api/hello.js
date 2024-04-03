// pages/api/hello.js
export default function handler(req, res) {
    switch (req.method) {
      case 'GET':
        // Handle GET request
        res.status(200).json({ message: 'You made a GET request' });
        break;
      case 'POST':
        // Handle POST request
        // Do something with the data sent in req.body
        res.status(200).json({ message: 'You made a POST request' });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  