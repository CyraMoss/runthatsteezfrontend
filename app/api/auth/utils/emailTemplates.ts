interface EmailTemplateParams {
  url: string;
  host: string;
  email: string;
}

export function html({ url, email }: EmailTemplateParams): string {
  return `<body>
    <p>Sign in as <strong>${email}</strong> by clicking the link below:</p>
    <p><a href="${url}">Sign in</a></p>
  </body>`;
}

export function text({
  url,
  host,
}: Omit<EmailTemplateParams, "email">): string {
  return `Sign in to ${host}\n${url}\n\n`;
}
