import { ChangeEvent, FC, useState } from 'react';
import { DataInfo } from '../Interface/data';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Button,
	Box,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface DTableProps {
	data: DataInfo[];
	tDelete: (id: string) => void;
	tEdit: (item: DataInfo) => void;
	tAdd: (item: DataInfo) => void;
}

const DTable: FC<DTableProps> = ({ data, tEdit, tDelete, tAdd }) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editData, setEditData] = useState<DataInfo | null>(null);
	const [newRowData, setNewRowData] = useState<Partial<DataInfo>>({});
	const [showAddForm, setShowAddForm] = useState<boolean>(false);

	const handleEditClick = (item: DataInfo) => {
		setEditingId(item.id);
		setEditData(item);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (editData) {
			setEditData({
				...editData,
				[name]: value,
			});
		} else {
			setNewRowData({
				...newRowData,
				[name]: value,
			});
		}
	};

	const handleDateChange = (date: Dayjs | null, field: keyof DataInfo) => {
		if (editData) {
			setEditData({
				...editData,
				[field]: date ? date.toISOString() : '',
			});
		} else {
			setNewRowData({
				...newRowData,
				[field]: date ? date.toISOString() : '',
			});
		}
	};

	const handleSaveClick = () => {
		if (editData) {
			tEdit(editData);
			setEditingId(null);
			setEditData(null);
		}
	};

	const handleAddClick = () => {
		if (newRowData) {
			tAdd(newRowData as DataInfo);
			setNewRowData({});
			setShowAddForm(false);
		}
	};

	return (
		<Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Статус документа</TableCell>
							<TableCell align="right">Номер сотрудника</TableCell>
							<TableCell align="right">Тип документа</TableCell>
							<TableCell align="right">Имя документа</TableCell>
							<TableCell align="right">Название документа</TableCell>
							<TableCell align="right">Имя подписи сотрудника</TableCell>
							<TableCell align="right">Дата добавления сотрудника</TableCell>
							<TableCell align="right">Дата добавления компанией</TableCell>
							<TableCell align="center">Действия</TableCell>
						</TableRow>
					</TableHead>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<TableBody>
							{data.map((item) => (
								<TableRow
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell>
										{editingId === item.id ? (
											<TextField
												name="documentStatus"
												value={editData?.documentStatus || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.documentStatus
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<TextField
												name="employeeNumber"
												value={editData?.employeeNumber || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.employeeNumber
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<TextField
												name="documentType"
												value={editData?.documentType || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.documentType
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<TextField
												name="documentName"
												value={editData?.documentName || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.documentName
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<TextField
												name="companySignatureName"
												value={editData?.companySignatureName || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.companySignatureName
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<TextField
												name="employeeSignatureName"
												value={editData?.employeeSignatureName || ''}
												onChange={handleInputChange}
											/>
										) : (
											item.employeeSignatureName
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<DatePicker
												label="Дата добавления сотрудника"
												value={
													editData?.employeeSigDate
														? dayjs(editData.employeeSigDate)
														: null
												}
												onChange={(date) =>
													handleDateChange(date, 'employeeSigDate')
												}
												slots={{
													textField: (params) => <TextField {...params} />,
												}}
											/>
										) : (
											item.employeeSigDate
										)}
									</TableCell>
									<TableCell align="right">
										{editingId === item.id ? (
											<DatePicker
												label="Дата добавления компанией"
												value={
													editData?.companySigDate
														? dayjs(editData.companySigDate)
														: null
												}
												onChange={(date) =>
													handleDateChange(date, 'companySigDate')
												}
												slots={{
													textField: (params) => <TextField {...params} />,
												}}
											/>
										) : (
											item.companySigDate
										)}
									</TableCell>
									<TableCell align="center">
										{editingId === item.id ? (
											<div>
												<IconButton onClick={handleSaveClick}>
													<SaveIcon />
												</IconButton>
												<IconButton onClick={() => setEditingId(null)}>
													<CloseIcon />
												</IconButton>
											</div>
										) : (
											<IconButton onClick={() => handleEditClick(item)}>
												<EditIcon />
											</IconButton>
										)}
										<IconButton onClick={() => tDelete(item.id)}>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
							{showAddForm && (
								<TableRow>
									<TableCell>
										<TextField
											name="documentStatus"
											label="Статус документа"
											value={newRowData.documentStatus || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											name="employeeNumber"
											label="Номер сотрудника"
											value={newRowData.employeeNumber || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											name="documentType"
											label="Тип документа"
											value={newRowData.documentType || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											name="documentName"
											label="Имя документа"
											value={newRowData.documentName || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											name="companySignatureName"
											label="Название документа"
											value={newRowData.companySignatureName || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<TextField
											name="employeeSignatureName"
											label="Имя подписи сотрудника"
											value={newRowData.employeeSignatureName || ''}
											onChange={handleInputChange}
											fullWidth
										/>
									</TableCell>
									<TableCell align="right">
										<DatePicker
											label="Дата добавления сотрудника"
											value={
												newRowData.employeeSigDate
													? dayjs(newRowData.employeeSigDate)
													: null
											}
											onChange={(date) =>
												handleDateChange(date, 'employeeSigDate')
											}
											slots={{
												textField: (params) => <TextField {...params} />,
											}}
										/>
									</TableCell>
									<TableCell align="right">
										<DatePicker
											label="Дата добавления компанией"
											value={
												newRowData.companySigDate
													? dayjs(newRowData.companySigDate)
													: null
											}
											onChange={(date) =>
												handleDateChange(date, 'companySigDate')
											}
											slots={{
												textField: (params) => <TextField {...params} />,
											}}
										/>
									</TableCell>
									<TableCell align="center">
										<Button
											variant="contained"
											color="primary"
											onClick={handleAddClick}
										>
											Сохранить
										</Button>
										<Button
											variant="outlined"
											color="secondary"
											onClick={() => setShowAddForm(false)}
										>
											Отмена
										</Button>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</LocalizationProvider>
				</Table>
			</TableContainer>
			{!showAddForm && (
				<Button
					variant="contained"
					color="primary"
					startIcon={<AddIcon />}
					onClick={() => setShowAddForm(true)}
				>
					Добавить строку
				</Button>
			)}
		</Box>
	);
};

export default DTable;
