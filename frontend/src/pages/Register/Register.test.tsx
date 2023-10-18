import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Register from '.';

globalThis.fetch = jest.fn().mockResolvedValue({
  json: async () => ({ success: true }),
  ok: true,
});

  describe('Testing Register Page', () => {
    it("Test Register's onSubmit Function", async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      const name = screen.getByPlaceholderText("Enter Your Name") as HTMLInputElement
      const email = screen.getByPlaceholderText('Enter Your Email') as HTMLInputElement;
      const password = screen.getByPlaceholderText('Enter Your Password') as HTMLInputElement;
      const registerButton = screen.getByText('register') as HTMLButtonElement;
  
      act(() => {

        fireEvent.change(name, { target: { value: 'testname' } });
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.change(password, { target: { value: 'test123Password' } });
  
        fireEvent.click(registerButton);
      });
  
      await waitFor(async () => {
        expect(fetch).toHaveBeenCalledWith(
          `https://mock-api.arikmpt.com/api/user/register`,
          expect.objectContaining({
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'testname',
              email: 'test@gmail.com',
              password: 'test123Password',
            }),
          })
        );
      });
    });
  });
  
// pnpm run test 'src/pages/Register/Register.test.tsx'