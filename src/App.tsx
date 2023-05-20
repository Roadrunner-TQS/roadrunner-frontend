import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { PickUpPointList } from './components/PickUpPointList';

const App: React.FC = () => {
    return (
    <Admin dataProvider={restProvider('http://localhost:5000')}>
        <Resource name="pickUpLocation" list={PickUpPointList} />
    </Admin>);
};

export default App;


