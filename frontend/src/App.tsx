import React, { useCallback } from 'react'

import './App.css'

const App = (): JSX.Element => {
  const handleLogin = useCallback(async () => {
    const data = new FormData()
    data.append('user', 'xdigu')
    data.append('pass', '1234')

    fetch('http://localhost/api/auth', {
      method: 'POST',
      body: data
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className="Container">
          <p>User</p>
          <input />
        </div>
        <div className="Container">
          <p>Pass</p>
          <input />
        </div>

        <button onClick={handleLogin} className="Button" type="button">
          Login
        </button>
      </header>
    </div>
  )
}

export default App
