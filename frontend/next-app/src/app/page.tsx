import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Civic Commons!</h1>
        <p>Join our community to access civic resources and collaborate for a better future.</p>
        <Link href="/signup" className="signup-btn">Sign Up</Link>
      </div>
    </div>
  );
}
