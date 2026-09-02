import {
  Show,
  SignIn,
  SignUp,
  SignOutButton,
  UserButton,
} from '@clerk/react'

function App() {
  const path = window.location.pathname

  if (path === '/sign-in' || path.startsWith('/sign-in/')) {
    return (
      <main>
        <SignIn path="/sign-in" />
      </main>
    )
  }

  if (path === '/sign-up' || path.startsWith('/sign-up/')) {
    return (
      <main>
        <SignUp path="/sign-up" />
      </main>
    )
  }

  return (
    <main>
      <Show when="signed-out">
        <h1>Welcome to Siamese</h1>

        <p>
          <a href="/sign-in">Log in</a>
        </p>

        <p>
          <a href="/sign-up">Create account</a>
        </p>
      </Show>

      <Show when="signed-in">
        <h1>Siamese Dashboard</h1>

        <p>You are logged in.</p>

        <UserButton />

        <div>
          <SignOutButton>
            <button type="button">
              Log out
            </button>
          </SignOutButton>
        </div>
      </Show>
    </main>
  )
}

export default App