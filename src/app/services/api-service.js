import axios from 'axios';

export function fetchPosts(abortSignal) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`, abortSignal);
}

export function fetchUsers(abortSignal) {
    return axios.get(`https://jsonplaceholder.typicode.com/users`, abortSignal);
}

export function fetchPostById(id, abortSignal) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`, abortSignal);
}

export function fetchUserById(id, abortSignal) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, abortSignal);
}

export function fetchCommentsByPostId(id, abortSignal) {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, abortSignal);
}