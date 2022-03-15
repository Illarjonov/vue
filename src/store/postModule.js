import axios from 'axios';
import {selectIdApi, defaultApi} from "../config/api";

export  const postModule = {
    state: ()=>({
        posts:[],
        searchUsers:'',
        isPostLoading: false,
        modalVisible: false,
    }),
    getters: {
        searchedUsers(state){
            return state.posts.filter((post)=>
                [post.firstName, post.secondName].join(' ').toLowerCase().includes(state.searchUsers.toLowerCase()))
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
                const response = await axios.get(defaultApi());
                commit('setPosts', response.data);
            } catch (e) {
                console.log(e)
            } finally {
                commit('setIsPostLoading', false);
            }
        },
        async createUser({commit},post) {
            await axios.post(defaultApi(), post)
                .then(response =>{
                    if(response.status){
                        commit('setPushPosts', response.data);
                        commit('setModalVisible', false)
                    }
                }).catch(e=> console.log(e))
        },
        async deleteUser({commit},uuid) {
            await axios.delete(selectIdApi(uuid))
                .then(() =>{
                    commit('setDeletePost', uuid);
                })
                .catch(e=> console.log(e))
        },
        async editUser({commit},user){
                await axios.put( selectIdApi(user.uuid), user)
                    .then(response =>{
                        if(response.status){
                            commit('setEditUser', response.data)
                        }
                    }).catch(e=> console.log(e))
            },
        },
    namespaced: true
};
