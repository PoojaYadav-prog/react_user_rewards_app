// UserRewards.test.js
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import UserRewards from '../UserRewards'; // Adjust the path as necessary

jest.mock('axios');

describe('UserRewards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', async () => {
    axios.get.mockResolvedValueOnce({ data: { transactionData: [] } });

    const { getByText } = render(<UserRewards />);

    expect(getByText('...Loading')).toBeInTheDocument();

    await act(async () => {
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/transactionData');
        expect(getByText('...Loading')).toBeInTheDocument();
      });
    });
  });

  it('renders data correctly after successful API fetch', async () => {
    const mockData = {
      transactionData: [
        {
          customerId: 10,
          customerName: 'James Brown',
          transactions: [
            { transactionId: 100, purchaseAmount: 120, dateOfTransaction: '01/04/2024' },
            { transactionId: 101, purchaseAmount: 100, dateOfTransaction: '01/05/2024' },
          ],
        },
        {
          customerId: 11,
          customerName: 'Michael Phelps',
          transactions: [
            { transactionId: 102, purchaseAmount: 50, dateOfTransaction: '01/04/2024' },
            { transactionId: 103, purchaseAmount: 150, dateOfTransaction: '01/08/2024' },
          ],
        },
      ],
    };

    axios.get.mockResolvedValueOnce({ data: mockData });

    const { getByText, getByTestId } = render(<UserRewards />);

    await act(async () => {
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/transactionData');
        expect(getByText('James Brown')).toBeInTheDocument();
        expect(getByText('Michael Phelps')).toBeInTheDocument();

        // Example assertions for specific data points
        expect(getByTestId('user-reward-0')).toHaveTextContent('James Brown');
        expect(getByTestId('user-reward-0')).toHaveTextContent('220'); // Total rewards calculation for James Brown
        expect(getByTestId('user-reward-1')).toHaveTextContent('Michael Phelps');
        expect(getByTestId('user-reward-1')).toHaveTextContent('200'); // Total rewards calculation for Michael Phelps
      });
    });
  });

  it('handles API fetch error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const { getByText } = render(<UserRewards />);

    await act(async () => {
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/transactionData');
        expect(getByText('...Loading')).toBeInTheDocument();
        expect(getByText('API Error')).toBeInTheDocument();
      });
    });
  });
});
