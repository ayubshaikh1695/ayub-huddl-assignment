import axios from 'axios';

export function fetchPosts() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

export function fetchUsers() {
    return axios.get('https://jsonplaceholder.typicode.com/users');
}