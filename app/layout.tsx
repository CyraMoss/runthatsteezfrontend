import '../styles/global.css';
import ClientProviders from '../components/ClientProviders';
import Navbar from '../components/NavBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Navbar />
          <main className="pt-16">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
