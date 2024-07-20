import { useEffect, useState } from 'react';
import DTable from '../../Components/DTable';
import { useAuth } from '../../Data/Loader';
import { Data, DataInfo } from '../../Interface/data';

const Table = () => {
	const [data, setData] = useState<Data | null>(null);
	const [loginError, setLoginError] = useState(false);
	const { fetchData, createData, updateData, deleteData } = useAuth();

	useEffect(() => {
		const loadData = async () => {
			try {
				const response = await fetchData();
				setData(response);
				setLoginError(false);
			} catch (error) {
				setLoginError(true);
			}
		};

		loadData();
	}, []);

	const handleCreate = async (item: DataInfo) => {
		console.log(item);
		try {
			const response = await createData(item);
			if (response.error_code === 0) {
				setData((prevData) => ({
					...prevData!,
					data: [...(prevData?.data || []), response.data],
				}));
			}
		} catch (error) {
			setLoginError(true);
		}
	};

	const handleEdit = async (item: DataInfo) => {
		try {
			const response = await updateData(item.id, item);
			if (response.error_code === 0) {
				setData((prevData) => ({
					...prevData!,
					data: (prevData?.data || []).map((dataItem) =>
						dataItem.id === response.data.id ? response.data : dataItem
					),
				}));
			}
		} catch (error) {
			setLoginError(true);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteData(id);
			setData((prevData) => ({
				...prevData!,
				data: (prevData?.data || []).filter((item) => item.id !== id),
			}));
		} catch (error) {
			setLoginError(true);
		}
	};
	return (
		<>
			{loginError && <div>Ошибка загрузки данных</div>}
			{!data ? (
				<p>Загрузка...</p>
			) : (
				<DTable
					tEdit={handleEdit}
					tAdd={handleCreate}
					tDelete={handleDelete}
					data={data?.data}
				/>
			)}
		</>
	);
};

export default Table;
