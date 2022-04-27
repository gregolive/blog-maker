import { useAuth } from '../../helpers/Auth';

const Dashboard = () => {
  const token = useAuth();

  return (
    <main>
      <h2>Dashboard (Protected)</h2>

      <div>Authenticated as {token}</div>
    </main>
  );
};

export default Dashboard;
