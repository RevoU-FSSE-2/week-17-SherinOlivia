import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import Profile from '.';

const user = {
    name: 'testname',
    email: 'test@gmail.com'
}

describe('Test Profile Page Component', () => {
    it('Profile Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile name={user.name} email={user.email} /> </BrowserRouter>)
        const title = screen.getByText('Profile Page')
        expect(title).toBeDefined()       
    })

    it('Name Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile name={user.name} email={user.email} /> </BrowserRouter>)
        const title = screen.getByText('Name:')
        expect(title).toBeDefined()     
    })

    it('Email Title Renders Correctly',async () => {
        render(<BrowserRouter> <Profile name={user.name} email={user.email} /> </BrowserRouter>)
        const title = screen.getByText('Email:')
        expect(title).toBeDefined()     
    })

    it('Return Link Works Correctly', async () => {
        const { getByText } = render(<BrowserRouter><Profile name={user.name} email={user.email} /></BrowserRouter>);
        const returnLink = getByText('Return') as HTMLLinkElement

        fireEvent.click(returnLink);
        
        await waitFor(() => {
            expect(returnLink).toBeDefined();
        });
    });
})

// pnpm run test 'src/components/Profile/Profile.test.tsx'