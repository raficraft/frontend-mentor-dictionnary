import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@api/dictionary';
import fetchMock from 'jest-fetch-mock';
import DictionaryApiResult from '@api/types';

fetchMock.enableMocks();

describe('handler function', () => {
  let mockRes: NextApiResponse<DictionaryApiResult | { error: string }>;
  let mockReq: any;
  let statusFn: jest.Mock;
  let jsonFn: jest.Mock;

  beforeEach(() => {
    mockReq = {
      query: { word: 'test' },
    };

    statusFn = jest.fn();
    jsonFn = jest.fn();

    // Ici, nous créons un mock de l'objet de réponse qui respecte la structure attendue par Next.js
    mockRes = {
      status(code: number) {
        statusFn(code);
        return this; // ici 'this' se réfère à l'objet mockRes
      },
      json: jsonFn,
      writeHead: jest.fn(() => mockRes), // Exemple d'autres méthodes que vous pouvez mocker si nécessaire
    } as any;

    fetchMock.resetMocks();
  });

  it('should return 200 when response is ok', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ word: 'test' }]));

    await handler(mockReq, mockRes);

    expect(statusFn).toHaveBeenCalledWith(200);
    expect(jsonFn).toHaveBeenCalledWith([{ word: 'test' }]);
  });

  it('should return 404 when no definitions are found', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ title: 'No Definitions found', word: 'test' }])
    );

    await handler(mockReq, mockRes);

    expect(statusFn).toHaveBeenCalledWith(404);
    expect(jsonFn).toHaveBeenCalledWith({
      error: "Le mot n'a pas été trouvé dans le dictionnaire.",
    });
  });

  it('should return 500 when fetch throws an error', async () => {
    fetchMock.mockReject(new Error('API error'));

    await handler(mockReq, mockRes);

    expect(statusFn).toHaveBeenCalledWith(500);
    expect(jsonFn).toHaveBeenCalledWith({
      error: "Une erreur s'est produite lors de l'appel à l'API.",
    });
  });

  it('should return 500 when API response is not OK and no title is provided', async () => {
    const responseBody = JSON.stringify([{}]); // Ici on renvoie un tableau avec un objet vide (pas de titre)
    fetchMock.mockResponse(responseBody, { status: 500 }); // Ici on simule une erreur HTTP 500

    await handler(mockReq, mockRes);

    expect(statusFn).toHaveBeenCalledWith(500);
    expect(jsonFn).toHaveBeenCalledWith({
      error: "Une erreur s'est produite lors de l'appel à l'API.",
    });
  });
});
