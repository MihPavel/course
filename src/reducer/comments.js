import { normalizedComments as defaultComments } from '../fixtures';
import {ADD_COMMENT, START, SUCCESS, LOAD_COMMENTS, FAIL} from '../constants'
import {arrToMap} from '../lib';
import {OrderedMap, Record} from 'immutable';

const CommentRecord = Record({
  id: null,
  user: null,
  text: null
});

const ReducerState = Record({
  entities: new OrderedMap({})
});

const defaultState = new ReducerState();
export default (commentsState = defaultState, action) => {
  const {type, payload, randomId, response} = action;
  switch(type){
    case ADD_COMMENT: 
      return commentsState.setIn(['entities', randomId], new CommentRecord({...payload.comment, id: randomId}));
    case LOAD_COMMENTS + SUCCESS:
      return commentsState.update('entities', entities => entities.merge(arrToMap(payload.response, CommentRecord)));
  }
  return commentsState;
}
