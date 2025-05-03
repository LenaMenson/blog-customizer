import styles from './App.module.scss';
import { useState, CSSProperties } from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

export const App = () => {
	const [articleStyleState, setArticleStyleState] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': articleStyleState.fontFamilyOption.value,
					'--font-size': articleStyleState.fontSizeOption.value,
					'--font-color': articleStyleState.fontColor.value,
					'--container-width': articleStyleState.contentWidth.value,
					'--bg-color': articleStyleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleParamsFormState={setArticleStyleState} />
			<Article />
		</main>
	);
};
