// src/utils/freshworks.ts
export const loadFreshworksChat = () => {
  if (document.getElementById("freshworks-chat")) return; // prevent duplicates

  const script = document.createElement("script");
  script.id = "freshworks-chat";
  script.src = "//uae.fw-cdn.com/40287256/177564.js"; // use your exact script URL
  script.setAttribute("chat", "true");
  script.async = true;

  document.body.appendChild(script);
};

