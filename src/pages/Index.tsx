import { Navigate } from 'react-router-dom';

const Index = () => {
  // Redirect to public inicio
  return <Navigate to="/public/inicio" replace />;
};

export default Index;
