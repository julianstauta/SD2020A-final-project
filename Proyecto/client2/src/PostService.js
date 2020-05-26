import axios from 'axios';

//const url = 'http://localhost:5000/api/names/'
const url = 'http://192.168.56.3:5000/api/names/'

class PostService{

    //GetNames
    static getNames(){
        return new Promise ( (resolve, reject) => {
            try{
                const res = axios.get(url)
                .then();
                console.log(res);
                resolve(
                    data.map(name => ({
                        ...name
                    }))
                );
            } catch(err){
                reject(err);
            }
        })
    }

    //CreateName
    static insertName(name){
        return axios.post(url, { name })
    }

    //DeleteName
    static deleteName(id){
        axios.delete(`${url}${id}`);
    }

}

export default PostService
