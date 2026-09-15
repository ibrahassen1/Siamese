
import {
  SignIn,
  SignUp,
  SignOutButton,
  UserButton,
  useAuth,
} from '@clerk/react'

import { useEffect, useState } from 'react'

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
  const { getToken } = useAuth()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const token = await getToken()

        const response = await fetch(
          'http://localhost:8080/api/users/me',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data = await response.json()

        setUser(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCurrentUser()
  }, [getToken])

  if (loading) {
    return <p>Loading dashboard...</p>
  }

  if (error) {
    return <p>Failed to load user: {error}</p>
  }

  return (
    <main>
      <h1>Siamese Dashboard</h1>

      <p>You are authenticated.</p>

      <UserButton />

      <h2>Your Account</h2>

      <p>Siamese User ID: {user.id}</p>
      <p>Clerk User ID: {user.clerkUserId}</p>

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