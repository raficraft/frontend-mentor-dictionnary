import DictionaryApiResult from "@api/types";


const mockDictionaryApiResult: DictionaryApiResult = {
  word: 'test',
  phonetic: 'test',
  phonetics: [
    {
      text: 'test',
      audio: 'test',
      sourceUrl: 'https://example.com',
      license: {
        name: 'Test License',
        url: 'https://example.com/license',
      },
    },
  ],
  meanings: [
    {
      partOfSpeech: 'noun',
      definitions: [
        {
          definition: 'a procedure intended to establish the quality, performance, or reliability of something, especially before it is taken into widespread use',
          synonyms: ['trial', 'experiment', 'assessment'],
          antonyms: ['unreliable'],
          example: 'the aircraft underwent stringent testing',
        },
      ],
      synonyms: ['trial', 'experiment', 'assessment'],
      antonyms: ['unreliable'],
    },
  ],
  license: {
    name: 'Test License',
    url: 'https://example.com/license',
  },
  sourceUrls: ['https://example.com/source'],
};

export default mockDictionaryApiResult;
