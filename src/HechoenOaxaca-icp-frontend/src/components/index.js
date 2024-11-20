import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";
import { HechoenOaxaca_backend } from "../../declarations/HechoenOaxaca-icp-backend";

let authClient = null;

async function init() {
  authClient = await AuthClient.create();
}

document.querySelector("#greetForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");
  const name = document.getElementById("name").value;

  button.setAttribute("disabled", true);

  const greeting = await HechoenOaxaca_backend.greet(name);

  button.removeAttribute("disabled");
  document.getElementById("greeting").innerText = greeting;
});

function handleSuccess() {
  const principalId = authClient.getIdentity().getPrincipal().toText();
  document.getElementById("principalId").innerText = `Tu PrincipalId: ${principalId}`;

  Actor.agentOf(HechoenOaxaca_backend).replaceIdentity(authClient.getIdentity());
}

document.getElementById("login").addEventListener("click", async () => {
  if (!authClient) throw new Error("AuthClient no inicializado");

  const APP_NAME = "Hecho en Oaxaca";
  const APP_LOGO = "/path-to-logo.png";
  const identityProvider = `https://nfid.one/authenticate?applicationName=${APP_NAME}&applicationLogo=${APP_LOGO}`;

  authClient.login({
    identityProvider,
    onSuccess: handleSuccess,
  });
});

init();
