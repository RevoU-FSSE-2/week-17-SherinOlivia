import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '../../../matchMedia';
import CategoryForm from '.';

const categoryContent = {
   content: "Category Form Title"
}

describe('Test List of Category Component', () => {
    const mockProps = jest.fn();
    beforeEach(() => {
      mockProps.mockReset(); 
    })

    it('Name Title & Input Renders Correctly',async () => {
        const { getByPlaceholderText } = render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
        const title = screen.getByText('Name')
        const form = getByPlaceholderText("Enter Name") as HTMLInputElement

        await waitFor(()=> {
          expect(title).toBeDefined()
          expect(form).toBeDefined()  
        })   
    })

    it('Status Title & Select Renders Correctly',async () => {
        render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
        const title = screen.getByText('Status')
        const form = screen.getByText("Select Status") as HTMLSelectElement

        await waitFor(()=> {
          expect(title).toBeDefined()
          expect(form).toBeDefined()     
        })
    })

    it('Back/Return Link Renders Correctly', async () => {
        const { getByText } = render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
        const returnLink = getByText('Back') as HTMLLinkElement

        fireEvent.click(returnLink);
        
        await waitFor(() => {
            expect(returnLink).toBeDefined();
        });
    })

    it('Create Button Renders Correctly', async () => {
        const { getByText } = render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
        const createButton = getByText('Create') as HTMLButtonElement

        fireEvent.click(createButton);
        
        await waitFor(() => {
            expect(createButton).toBeDefined();
        });
    });

    it('Test onSubmit (Select Option: "Active") Works Correctly', async () => {
        const { getByPlaceholderText, getByText } = render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
        const nameInput = getByPlaceholderText("Enter Name") as HTMLInputElement
        const selectMenu = getByText("Select Status") as HTMLSelectElement
        const createButton = getByText('Create') as HTMLButtonElement

        fireEvent.change(nameInput, {target: {value: 'testcreatename' }});
        fireEvent.mouseDown(selectMenu);
        fireEvent.click(screen.getByText('Active'));

        fireEvent.click(createButton);

        await waitFor(()=> {
            expect(mockProps).toHaveBeenCalledTimes(1);
            expect(mockProps).toHaveBeenCalledWith({
                name: 'testcreatename',
                is_active: 'true',
            });
        });
    });

    it('Test onSubmit (Select Option: "Deactive") Works Correctly', async () => {
      const { getByPlaceholderText, getByText } = render(<BrowserRouter><CategoryForm onSubmit={mockProps} content={categoryContent.content} /></BrowserRouter>)
      const nameInput = getByPlaceholderText("Enter Name") as HTMLInputElement
      const selectMenu = getByText("Select Status") as HTMLSelectElement
      const createButton = getByText('Create') as HTMLButtonElement

      fireEvent.change(nameInput, {target: {value: 'testcreatename' }});
      fireEvent.mouseDown(selectMenu);
      fireEvent.click(screen.getByText('Deactive'));

      fireEvent.click(createButton);

      await waitFor(()=> {
          expect(mockProps).toHaveBeenCalledTimes(1);
          expect(mockProps).toHaveBeenCalledWith({
              name: 'testcreatename',
              is_active: 'false',
          });
      });
    });
})

// pnpm run test 'src/components/CategoryForm/CategoryForm.test.tsx'