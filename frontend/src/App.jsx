import {
  Show,
  SignInButton,
  UserButton,
} from '@clerk/react'

function App() {
  return (
    <main>
      <h1>Siamese Clerk Test</h1>

      <Show when="signed-out">
        <p>You are signed out.</p>
        <SignInButton />
      </Show>

      <Show when="signed-in">
        <p>Signed in successfully.</p>
        <UserButton />
      </Show>
    </main>
  )
}

export default App