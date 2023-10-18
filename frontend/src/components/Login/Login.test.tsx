import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Login from '.';


describe('Test Login Form', () => {
    const mockProps = jest.fn();
    it('Login Title Renders Correctly',async () => {
        render(<BrowserRouter> <Login onSubmit={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Login')
        expect(title).toBeDefined()       
    })

    it('Email Title Renders Correctly',async () => {
        render(<BrowserRouter> <Login onSubmit={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Email')
        const form = screen.getByPlaceholderText('Enter Your Email') as HTMLInputElement
        expect(title).toBeDefined()     
        expect(form).toBeDefined()  
    })

    it('Password Title Renders Correctly',async () => {
        render(<BrowserRouter> <Login onSubmit={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Password')
        const form = screen.getByPlaceholderText('Enter Your Password') as HTMLInputElement
        expect(title).toBeDefined()     
        expect(form).toBeDefined()  
    })

    it('Log in Button Renders Correctly',async () => {
        render(<BrowserRouter> <Login onSubmit={mockProps} /> </BrowserRouter>)
        const title = screen.getByText('Log in') as HTMLButtonElement
        expect(title).toBeDefined()       
    })

    it('onSubmit Works Correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<BrowserRouter><Login onSubmit={mockProps} /></BrowserRouter>);
        const emailInput = getByPlaceholderText("Enter Your Email") as HTMLInputElement
        const passwordInput = getByPlaceholderText("Enter Your Password") as HTMLInputElement
        const loginButton = getByText('Log in') as HTMLButtonElement;

        fireEvent.change(emailInput, {target: {value: 'test@gmail.com' }});
        fireEvent.change(passwordInput, {target: {value: 'testpassword' }});

        fireEvent.click(loginButton);

        await waitFor(()=> {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                email: 'test@gmail.com',
                password: 'testpassword',
            });
        });
    });
})

// pnpm run test 'src/components/Login/Login.test.tsx'