import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
//импорт констант
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
//импорт компонентов
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	setArticleParamsFormState: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleParamsFormState,
}: ArticleParamsFormProps) => {
	//переменные состояния
	const [isFormOpen, setFormIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontsize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(
		defaultArticleState.contentWidth
	);

	// закрытие формы по клику вне формы
	const ref = useRef<HTMLDivElement | null>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef: ref,
		onClose: () => setFormIsOpen(false),
	});

	// изменение значений переменных
	const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('clickSubmit');
		setArticleParamsFormState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};

	// сброс значений до начальных
	const clickReset = () => {
		setArticleParamsFormState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontsize(defaultArticleState.fontSizeOption);
	};

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={isFormOpen}
				onClick={() => setFormIsOpen(!isFormOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={clickSubmit}
					onReset={clickReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontsize}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
