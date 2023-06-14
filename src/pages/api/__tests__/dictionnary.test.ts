import { NextApiRequest, NextApiResponse } from 'next';
import handler from '../dictionary';

describe('API handler', () => {
  let mockRequest: Partial<NextApiRequest>;
  let mockResponse: Partial<NextApiResponse>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(() => mockResponse),
      json: jest.fn(),
    };
  });

  it('returns data if word is found in the dictionary', async () => {
    const word = 'test';
    const data = [{ title: 'Test', definition: 'This is a test' }];

    // Mock la fonction fetch et retourne les données attendues
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(data),
    });

    mockRequest.query = { word };

    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    // Vérifie que la fonction fetch est appelée avec l'URL attendue
    expect(fetch).toHaveBeenCalledWith(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    // Vérifie que la réponse a le statut 200 et renvoie les données
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(data);
  });

  it("returns an error if word is not found in the dictionary", async () => {
    const word = "nonexistent";

    // Mock la fonction fetch et retourne une réponse avec un statut 404
    global.fetch = jest.fn().mockResolvedValue({
      status: 404,
    });

    mockRequest.query = { word };

    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    // Vérifie que la fonction fetch est appelée avec l'URL attendue
    expect(fetch).toHaveBeenCalledWith(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    // Vérifie que la réponse a le statut 404 et renvoie un message d'erreur
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Le mot n'a pas été trouvé dans le dictionnaire.",
    });
  });

  it("returns an error if an error occurs during the API call", async () => {
    const word = "test";

    // Mock la fonction fetch et lance une erreur
    global.fetch = jest.fn().mockRejectedValue(new Error("API error"));

    mockRequest.query = { word };

    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    // Vérifie que la fonction fetch est appelée avec l'URL attendue
    expect(fetch).toHaveBeenCalledWith(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    // Vérifie que la réponse a le statut 500 et renvoie un message d'erreur
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: "Une erreur s'est produite lors de l'appel à l'API.",
    });
  });
});
