import React from 'react';
import '../styles/global.css';
import Navbar from '../components/NavBar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="pt-16">{children}</main>
            </body>
        </html>
    );
}