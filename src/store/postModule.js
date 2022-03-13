import axios from 'axios';
export  const postModule = {
    state: ()=>({
        posts:[],
        searchUsers:'',
        isPostLoading: false,
        modalVisible: false,
    }),
    getters: {
        searchedUsers(state){
            return [...state.posts].filter(post=>
                post.firstName.toLowerCase().includes(state.searchUsers.toLowerCase()))
        },
    },
    mutations: {
        setPosts(state,posts){
           state.posts = posts
        },
        setPushPosts(state,post){
           state.posts.push(post) //А так можно?
        },
        setEditUser(state, post){
           const index = state.posts.findIndex((x)=> post.uuid === x.uuid)
           state.posts[index].firstName = post.firstName;
           state.posts[index].secondName = post.secondName;
        },
        setDeletePost(state, uuid){
            const deleteIndex = state.posts.findIndex((x)=> uuid === x.uuid)
            state.posts.splice(deleteIndex, 1);
        },
        setIsPostLoading(state,bool){
            state.isPostLoading = bool
        },
        setModalVisible(state,bool){
            state.modalVisible = bool;
        },
        setSearchUsers(state,searchUsers){
            state.searchUsers = searchUsers
        },
    },
    actions: {
        async fetchUsers({commit}) {
            try {
                commit('setIsPostLoading', true);
                const response = await axios.get('http://localhost:3123/');
                commit('setPosts', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsPostLoading', false);
            }
        },
        async deleteUser({commit},uuid) {
            await axios.delete(`http://localhost:3123/${uuid}`)
                .then((response) =>{
                    commit('setDeletePost', uuid);
                })
                .catch(e=> console.log(e))
        },
        async createUser({commit},post) {
            await axios.post(`http://localhost:3123/`, post)
                .then(response =>{
                    if(response.status){
                        commit('setPushPosts', response.data)
                    }
                }).catch(e=> console.log(e))
        },
        async editUser({commit},user){
                await axios.put(`http://localhost:3123/${user.uuid}`, user)
                    .then(response =>{
                        if(response.status){
                            commit('setEditUser', response.data)
                        }
                    }).catch(e=> console.log(e))
            },
        },
    namespaced: true
};
