import {
	List,
	Datagrid,
	TextField,
	EditButton,
	SimpleForm,
	Create,
	TextInput,
} from "react-admin";

const shopFilters = [
	<TextInput source="q" label="Search" alwaysOn />,
];

export const ShopList = () => (
	<List filters={shopFilters}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="name" />
			<TextField source="location" />
			<EditButton />
		</Datagrid>
	</List>
);

export const ShopCreate = () => (
	<Create title="Add a Shop">
		<SimpleForm>
			<TextInput source="name" />
			<TextInput source="location" multiline rows={5} />
		</SimpleForm>
	</Create>
);