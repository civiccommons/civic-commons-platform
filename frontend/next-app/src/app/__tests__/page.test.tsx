import { render, screen } from '@testing-library/react'
import LandingPage from '../page'

describe('LandingPage', () => {
  it('renders welcome message', () => {
    render(<LandingPage />)
    
    const heading = screen.getByRole('heading', { name: /welcome to civic commons/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders sign up link', () => {
    render(<LandingPage />)
    
    const signUpLink = screen.getByRole('link', { name: /sign up/i })
    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink).toHaveAttribute('href', '/signup')
  })
})
