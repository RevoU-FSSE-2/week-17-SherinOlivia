import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Register from '.';


describe('Test Register Form', () => {
    const mockProps = jest.fn();
    it('Register Title Renders Correctly',async () => {
        render(<BrowserRouter>
        <Register onSubmit={mockProps} />
        </BrowserRouter>)
        const title = screen.getByText('Register')
        expect(title).toBeDefined()       
    })

    it('Name Title Renders Correctly',async () => {
        render(<BrowserRouter>
        <Register onSubmit={mockProps} />
        </BrowserRouter>)
        const title = screen.getByText('Name')
        const form = screen.getByPlaceholderText("Enter Your Name") as HTMLInputElement
        expect(title).toBeDefined()       
        expect(form).toBeDefined()
    })

    it('Email Title Renders Correctly',async () => {
        render(<BrowserRouter>
        <Register onSubmit={mockProps} />
        </BrowserRouter>)
        const title = screen.getByText('Email')
        const form = screen.getByPlaceholderText("Enter Your Email") as HTMLInputElement
        expect(title).toBeDefined()       
        expect(form).toBeDefined()
    })

    it('Password Title Renders Correctly',async () => {
        render(<BrowserRouter>
        <Register onSubmit={mockProps} />
        </BrowserRouter>)
        const title = screen.getByText('Password')
        const form = screen.getByPlaceholderText("Enter Your Password") as HTMLInputElement
        expect(title).toBeDefined()  
        expect(form).toBeDefined()     
    })

    it('Register Button Renders Correctly',async () => {
        render(<BrowserRouter>
        <Register onSubmit={mockProps} />
        </BrowserRouter>)
        const title = screen.getByText('register') as HTMLButtonElement
        expect(title).toBeDefined()       
    })

    it('onSubmit Works Correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<BrowserRouter><Register onSubmit={mockProps} /></BrowserRouter>);
        const nameInput = getByPlaceholderText("Enter Your Name") as HTMLInputElement
        const emailInput = getByPlaceholderText("Enter Your Email") as HTMLInputElement
        const passwordInput = getByPlaceholderText("Enter Your Password") as HTMLInputElement
        const registerButton = getByText("register") as HTMLButtonElement;

        fireEvent.change(nameInput, {target: {value: "testname" }});
        fireEvent.change(emailInput, {target: {value: "test@gmail.com" }});
        fireEvent.change(passwordInput, {target: {value: "test123Password" }});
        fireEvent.click(registerButton)
    
        await waitFor(() => {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                name: "testname",
                email: "test@gmail.com",
                password: "test123Password",
            });
        });
    });
})

// pnpm run test 'src/components/Register/Register.test.tsx'