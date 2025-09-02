export const loadFreshworksChat = () => {
  if (document.getElementById("freshworks-chat")) return;

  const script = document.createElement("script");
  script.id = "freshworks-chat";
  script.src = "//uae.fw-cdn.com/40287256/177564.js";
  script.setAttribute("chat", "true");
  script.async = true;

  document.body.appendChild(script);
};
