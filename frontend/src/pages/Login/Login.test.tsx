import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import 'jest-localstorage-mock';
import '../../../matchMedia';
import Login from '.';


globalThis.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ data: { token: 'mockToken' }})
  });
  
  describe('Testing Login Page', () => {
    afterEach(() => {
      localStorage.clear(); 
    });
  
    it('Test onSubmit Function (Submit Form and Set The Received JWT Token to localStorage)', async () => {
      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      const email = screen.getByPlaceholderText('Enter Your Email') as HTMLInputElement;
      const password = screen.getByPlaceholderText('Enter Your Password') as HTMLInputElement;
      const loginButton = screen.getByText('Log in') as HTMLButtonElement;
  
      act(() => {
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.change(password, { target: { value: 'testpassword' } });
  
        fireEvent.click(loginButton);
      });
  
      await waitFor(async () => {
        expect(globalThis.fetch).toHaveBeenCalledWith(
          `https://mock-api.arikmpt.com/api/user/login`,
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: 'test@gmail.com',
              password: 'testpassword',
            }),
          })
        );
  
        expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mockToken');
      });
    });
  });
  
// pnpm run test 'src/pages/Login/Login.test.tsx'