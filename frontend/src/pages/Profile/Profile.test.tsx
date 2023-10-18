import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppProvider, { AuthContext } from '../../provider/AppProvider';
import 'jest-localstorage-mock';
import '../../../matchMedia';
import Profile from '.';

const mockResponse = {
  name: 'testname',
  email: 'test@gmail.com',
};

globalThis.fetch = jest.fn().mockResolvedValue({
  json: async () =>  ({ data: {  name: 'testname', email: 'test@gmail.com', token: 'mockToken' }}),
});

describe('Testing Profile Page', () => {
  it("Test Profile's Rendered Information", async () => {
    const setUser = jest.fn();
    render(
      <BrowserRouter>
        <AppProvider>
          <AuthContext.Provider value={{ user: undefined, setUser }}>
            <Profile />
          </AuthContext.Provider>
        </AppProvider>
      </BrowserRouter>
    );

    localStorage.setItem('authToken', 'mockToken');

    await waitFor( () => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        `https://mock-api.arikmpt.com/api/user/profile`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer mockToken`,
          },
        })
      );
      expect(localStorage.getItem).toHaveBeenCalledWith('authToken');
      expect(setUser).toHaveBeenCalledTimes(1);
      expect(setUser).toHaveBeenCalledWith(mockResponse);
    });
  });
});

// pnpm run test 'src/pages/Profile/Profile.test.tsx'