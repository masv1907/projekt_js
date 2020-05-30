import axios from 'axios';

const url = '/api/posts/';

class PostService {
    // Hämta inlägg 
    static getPosts() {
        return new Promise((resolve, reject) => {
            axios.get(url).then((res) => {
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    );
                })
                .catch((err) => {
                    reject(err);
                })

        });

    }

    // Skapa inlägg 
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // Uppdatera inlägg
    static updatePost(id, text) {
        return axios.put(`${url}${id}`, {
            text
        });
    }

    // Radera inlägg
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;