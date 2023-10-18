import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'jest-localstorage-mock';
import '../../../matchMedia';
import CategoryList from '.';

const response = {
  "data": [
    {
      id: "29151629-7870-4ca0-9d59-303c4e32c433",
      "name": "testtest",
      "is_active": false
    }
  ]
}

  globalThis.fetch = jest.fn().mockResolvedValue({
    json: () => Promise.resolve(response)
  })
  
  describe('Testing CategoryList Page', () => {
    it('Test CategoryList Page Renders correctly', async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path='/' element={<CategoryList />} />
          </Routes>

        </MemoryRouter>
      )

    
  
      await waitFor(async () => {
        expect(globalThis.fetch).toHaveBeenCalledWith(
          `https://mock-api.arikmpt.com/api/user/category`,
          expect.objectContaining({
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer mockToken`
            }
            
          })
        );
        expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mockToken');
        expect(screen.getByText('testtest')).toBeDefined();
        expect(screen.getByText('List of Category')).toBeDefined();
        expect(screen.getByText('Action')).toBeDefined();
        expect(screen.getByText('Edit')).toBeDefined();
        expect(screen.getByText('Delete')).toBeDefined();
      });
    });
  });
  
// pnpm run test 'src/pages/CategoryList/CategoryList.test.tsx'