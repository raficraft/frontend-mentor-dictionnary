import { render, screen } from '@testing-library/react';
import Home, { loadDico, getStaticProps } from '@pages/index';
import mockDictionaryApiResult from '../../__mocks__/apiResult/apiResult';

import useApiStore from '@store/useDictionaryAPI/useDictionaryApi';

jest.mock('@store/useDictionaryAPI/useDictionaryApi', () => jest.fn());

describe('Home', () => {
  it('renders the search input', () => {
    render(<Home dico={[mockDictionaryApiResult]} />);

    const searchWord = screen.getByPlaceholderText('Search for any word');

    expect(searchWord).toBeInTheDocument();
    expect(screen.getByText('trial')).toBeInTheDocument();
  });
});
