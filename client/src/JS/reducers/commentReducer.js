import {
  COMMENT_SUCCESS,
  COMMENT_FAIL,
  GET_COMMENT_FAIL,
  GET_COMMENT_SUCCESS,
  REPLY_SUCCESS,
  REPLY_FAIL,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_SUCCESS,
  REMOVE,
  COMMENT_LOAD
} from "../constants/types.js"

let initState = {
  comments: [],
  error: [],
  IsComment:false,
};

const CommentReducer = (state = initState, action) => {
  switch (action.type) {
    case COMMENT_LOAD:
      return { ...state,IsComment:true};
    case COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.payload],
        error: [],
        IsComment:false
      };

    case COMMENT_FAIL:
      return {
        ...state,
        isComment: false,
        error: action.payload,
        IsComment:false
      };

    case REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: [...el.replies, action.payload],
            };
          }
          return el;
        }),
        error: [],
        IsComment:false
      };

    case REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.id) {
            return {
              ...el,
              text: action.payload.text,
            };
          }
          return el;
        }),
        error: [],
        IsComment:false
      };

    case UPDATE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case UPDATE_REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.reply_to) {
            return {
              ...el,
              replies: el.replies.map((r) => {
                if (r._id === action.payload.id) {
                  return {
                    ...r,
                    text: action.payload.text,
                  };
                }
                return r;
              }),
            };
          }
          return el;
        }),
        error: [],
        IsComment:false
      };

    case UPDATE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter((el) => el._id !== action.payload.id),
        error: [],
        IsComment:false
      };

    case DELETE_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case DELETE_REPLY_SUCCESS:
      return {
        ...state,
        comments: state.comments.map((el) => {
          if (el._id === action.payload.comment) {
            return {
              ...el,
              replies: el.replies.filter((r) => r._id !== action.payload.id),
            };
          }
          return el;
        }),
        error: [],
        IsComment:false
      };

    case DELETE_REPLY_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: [],
        IsComment:false
      };

    case GET_COMMENT_FAIL:
      return {
        ...state,
        error: action.payload,
        IsComment:false
      };

    case REMOVE:
      return {
        comments: [],
        error: [],
        IsComment:false
      };

    default:
        return state;
}
};

export default CommentReducer;