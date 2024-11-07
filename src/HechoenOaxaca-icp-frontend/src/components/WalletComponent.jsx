import React, { useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";

const WalletComponent = () => {
  const [principalId, setPrincipalId] = useState(null);

  async function handleLogin() {
    const authClient = await AuthClient.create();
    
    authClient.login({
      identityProvider: 'https://icp.dfinity.com/authenticate',
      onSuccess: () => {
        setPrincipalId(authClient.getIdentity().getPrincipal().toText());
      },
      onError: (error) => console.error('Error al iniciar sesión:', error)
    });
  }

  return (
    <div>
      <h2>Wallet</h2>
      {!principalId ? (
        <button onClick={handleLogin}>Iniciar sesión</button>
      ) : (
        <div>
          <h3>Tu identidad:</h3>
          <p>{principalId}</p>
        </div>
      )}
    </div>
  );
};

export default WalletComponent;
