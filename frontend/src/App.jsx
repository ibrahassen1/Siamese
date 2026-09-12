import {
  SignIn,
  SignUp,
  SignOutButton,
  UserButton,
  useAuth,
} from '@clerk/react'

import {
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router'

function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  return children
}

function Home() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <h1>Siamese</h1>

      {isSignedIn ? (
        <>
          <p>You are signed in.</p>
          <Link to="/dashboard">Go to Dashboard</Link>
        </>
      ) : (
        <>
          <p>Practice investing without risking real money.</p>

          <Link to="/sign-in">Sign In</Link>

          <br />

          <Link to="/sign-up">Create Account</Link>
        </>
      )}
    </main>
  )
}

function Dashboard() {
  return (
    <main>
      <h1>Siamese Dashboard</h1>

      <p>You are authenticated.</p>

      <UserButton />

      <br />
      <br />

      <SignOutButton>
        <button type="button">Log out</button>
      </SignOutButton>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/sign-in/*"
        element={
          <SignIn
            path="/sign-in"
            routing="path"
            fallbackRedirectUrl="/dashboard"
          />
        }
      />

      <Route
        path="/sign-up/*"
        element={
          <SignUp
            path="/sign-up"
            routing="path"
            fallbackRedirectUrl="/dashboard"
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App