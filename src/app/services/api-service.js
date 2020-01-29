import axios from 'axios';

export function fetchPosts() {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`);
}

export function fetchUsers() {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
}

export function fetchPostById(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

export function fetchUserById(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
}

export function fetchCommentsByPostId(id) {
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
}