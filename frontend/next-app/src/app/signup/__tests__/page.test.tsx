import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUpPage from '../page'

// Mock tesseract.js
jest.mock('tesseract.js', () => ({
  recognize: jest.fn(() => Promise.resolve({
    data: { text: 'License Number: ABC123\nLicense Type: Driver\nIssuer: State of California' }
  }))
}))

describe('SignUpPage', () => {
  it('renders sign up form', () => {
    render(<SignUpPage />)
    
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
  })

  it('shows success message after form submission', async () => {
    const user = userEvent.setup()
    render(<SignUpPage />)
    
    await user.type(screen.getByPlaceholderText(/name/i), 'John Doe')
    await user.type(screen.getByPlaceholderText(/email/i), 'john@example.com')
    await user.type(screen.getByPlaceholderText(/password/i), 'password123')
    await user.type(screen.getByPlaceholderText(/license number/i), 'ABC123')
    await user.type(screen.getByPlaceholderText(/license type/i), 'Driver')
    await user.type(screen.getByPlaceholderText(/license issuer/i), 'State')
    
    await user.click(screen.getByRole('button', { name: /create account/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/thank you for signing up/i)).toBeInTheDocument()
    })
  })
})
