import { Admin, Resource } from "react-admin";
import { ShopList, ShopCreate } from "./shops";
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Dashboard } from "./Dashboard";
import { authProvider } from './authProvider';

const App = () => (
  <Admin authProvider={authProvider} dashboard={Dashboard}>
    <Resource name="shops" list={ShopList} create={ShopCreate} icon={StorefrontIcon} />
  </Admin>
);

export default App;