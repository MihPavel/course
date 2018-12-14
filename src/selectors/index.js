import {createSelector} from 'reselect';
import {mapToArr} from '../lib'
//чтобы все приложение не перестраивалось при тех же входных данных хранит в истории 1 состояние
const articlesGetter = state => state.articles.entities;
const filtersGetter = state => state.filters;

export const filtredArticlesSelector = createSelector(articlesGetter, filtersGetter, (articles, filters) => {
  //аргументы это результат выхова верхних функций
  const {selected, dataRange} = filters;

  let from = Date.parse(dataRange.from);
  let to = Date.parse(dataRange.to);

  return mapToArr(articles).filter(article => {
    let artDate = Date.parse(article.date);
    return  (!selected.length && !from && !to) || (selected.includes(article.id) && (artDate >= from && artDate <= to)) 
  });
});

const commentsGetter = state => state.comments.entities;
const idGetter = (state, props) => props.id;

export const commentSelectorFactory = () => createSelector(commentsGetter, idGetter, (comments, id) => {
  return {
    comment: comments.get(id)
  }
})