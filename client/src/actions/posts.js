import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, COMMENT, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes.js";
import * as api from "../api/index.js";

// Action Creators
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: { post: data } });
        //Don't delete END_LOADING it is important
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("getPost error:", error);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });

        const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("getPosts error:", error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);

        dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log("getPostsBySearch error:", error);
    }
};

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });

        history.push(`/posts/${data._id}`);
    } catch (error) {
        console.log("createPost error:", error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log("updatePost error:", error);
    }
};

export const likePost = (id) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));

    try {
        const { data } = await api.likePost(id, user?.token);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log("likePost error:", error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);

        dispatch({ type: COMMENT, payload: data });

        return data.comments;
    } catch (error) {
        console.log("commentPost error:", error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log("deletePost error:", error);
    }
};