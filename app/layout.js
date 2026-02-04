import './globals.css';
import { DM_Sans } from 'next/font/google';
import MainHeader from '@/components/main-header/main-header';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export const metadata = {
  title: {
    template: '%s | PhotoSharify',
    default: 'PhotoSharify',
  },
  description: 'Share your favorite photos with a community of photography enthusiasts.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans antialiased">
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
