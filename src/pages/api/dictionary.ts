import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { word } = req.query as { word: string };

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();


    const noDefinitionsFound = data[0].title || false

    if (response.ok && !noDefinitionsFound) {
      res.status(200).json(data);
    } else if (response.status === 404) {
      res.status(404).json({ error: "Le mot n'a pas été trouvé dans le dictionnaire." });
    } else {
      throw new Error("Une erreur s'est produite lors de l'appel à l'API.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'appel à l'API." });
  }
}