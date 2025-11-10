import { generateInitialDataset } from '../../lib/dataGenerator';
import DataProvider from '../../components/providers/DataProvider';
import DashboardShell from '../../components/DashboardShell';

export default async function DashboardPage() {
  const initialData = generateInitialDataset(10000, Date.now() - 60000);

  return (
    <DataProvider initialData={initialData}>
      <DashboardShell />
    </DataProvider>
  );
}
