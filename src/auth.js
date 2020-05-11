export function getAuthForm() {

  return `
    <form class="mui-form" name="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" name="email-input" id="email-input" required>
        <label for="email-input">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" name="password-input" id="password-input" required>
        <label for="password-input">Password</label>
      </div>
      <button
          type="submit"
          class="mui-btn mui-btn--raised mui-btn--primary"
          name="auth-btn"
          >Sign in
      </button>
    </form>
  `;

}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyDasJPX47ubWyavFumzLnTGEuiyqSae9Ac";

  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email, password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(response => response.json())
    .then(data => data.idToken)
}