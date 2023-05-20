import React from 'react'
import { List, Datagrid, TextField } from 'react-admin'
export const PickUpPointList: React.FC = (props) => {
    return (
        <div>
            <List {...props}>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="address" />
                    <TextField source="city" />
                    <TextField source="latitude" />
                    <TextField source="longitude" />
                </Datagrid>
            </List>
        </div>
    );
}

