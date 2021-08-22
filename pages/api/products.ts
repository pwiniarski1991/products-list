// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import data from './data.json';
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  let filteredData = data;
  if (typeof query === 'string') {
    filteredData = data.filter(obj => obj.name.toLowerCase().includes(query.toLowerCase()));
  }
  res.status(200).json(filteredData);
}
