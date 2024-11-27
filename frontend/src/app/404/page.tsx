import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page non trouvée</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link href="/">Retour à la page d'accueil</Link>
    </div>
  );
};

export default NotFoundPage;