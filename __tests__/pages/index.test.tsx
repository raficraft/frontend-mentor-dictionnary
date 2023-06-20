import { render, screen } from '@testing-library/react';
import Home, { getStaticProps, loadDico } from '@pages/index';
import mockDictionaryApiResult from '__mocks__/apiResult/apiResult';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('Home', () => {
  test('renders the search input', () => {
    render(<Home dico={[mockDictionaryApiResult]} />);

    const searchWord = screen.getByPlaceholderText('Search for any word');

    expect(searchWord).toBeInTheDocument();
    expect(screen.getByText('trial')).toBeInTheDocument();
  });
});

describe('loadDico function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return expected data on successful fetch', async () => {
    const mockData = mockDictionaryApiResult;

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const data = await loadDico();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockData);
  });

  it('should throw error on failed fetch', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));

    await expect(loadDico()).rejects.toThrow('API error');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('getStaticProps function', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return expected props on successful fetch', async () => {
    const mockData = mockDictionaryApiResult;

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const props = await getStaticProps({});

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(props).toEqual({ props: { dico: mockData } });
  });

  it('should throw error on failed fetch', async () => {
    fetchMock.mockRejectOnce(new Error('API error'));

    await expect(getStaticProps({})).rejects.toThrow('API error');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
