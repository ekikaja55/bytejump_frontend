// rico 
import axios from '$lib/utils/axios';

export const getArticles = async () => {
    try {
        const res = await axios.get('/articles')
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}
export const getArticleWithTag= async () => {
    try {
        const res = await axios.get('/articles/tags')
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}
export const getArticlesTop = async () => {
    try {
        const res = await axios.get('/articles/1')
        return res.data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
}