export function html({ url, host, email }) {
    return `<body>
      <p>Sign in as <strong>${email}</strong> by clicking the link below:</p>
      <p><a href="${url}">Sign in</a></p>
    </body>`;
  }
  
  export function text({ url, host }) {
    return `Sign in to ${host}\n${url}\n\n`;
  }
  