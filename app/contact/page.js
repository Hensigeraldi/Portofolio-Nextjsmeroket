import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

export const metadata = {
  title: 'Contact - Hensi Geraldi Irot',
  description: 'Get in touch with Hensi Geraldi Irot'
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
      <AIChatbot />
    </>
  );
}