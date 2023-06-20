import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { word } = req.query as { word: string };
  const url = process.env.DICTIONARY_API_URL;

  try {
    const response = await fetch(`${url}${word}`);
    const data = await response.json();

    if (response.ok && data[0]?.title) {
      res.status(404).json({ error: "Le mot n'a pas été trouvé dans le dictionnaire." });
    } else if (response.ok) {
      res.status(200).json(data);
    } else {
      throw new Error("Une erreur s'est produite lors de l'appel à l'API.");
    }
  } catch (error) {
    res.status(500).json({ error: "Une erreur s'est produite lors de l'appel à l'API." });
  }
}