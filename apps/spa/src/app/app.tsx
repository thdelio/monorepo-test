import { Route, Routes } from 'react-router-dom';
import { InventoryHome } from './modules/inventory/inventory-home';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<InventoryHome />} />
    </Routes>
  );
}

export default App;
