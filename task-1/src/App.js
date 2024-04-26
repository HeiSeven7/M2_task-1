import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);
	let isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		let promptValue = prompt('Введите новое значение', '');
		const errorMes = <div className={styles.error}>Введенное значение должно содержать минимум 3 символа</div>;
		if (promptValue.length < 3) {
			setError(errorMes);
		} else {
			setValue(promptValue);
			setError(false);
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			const id = Date.now();
			// const updatedList = [...list, { id, value }];
			setList((list) => [...list, { id, value }]);
			setValue('');
			setError(false);
		}
	};

	function formatTime(timestamp) {
		const date = new Date(timestamp);
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
	  }

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error}
			<div className={styles['buttons-container']}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={onAddButtonClick} disabled={!isValueValid}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				<ul className={styles.list}>
					{list.map(({ id, value }) => (
						<li key={id} className={styles['list-item']}>
							{value} - {formatTime(id)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
