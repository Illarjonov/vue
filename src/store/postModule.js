import axios from 'axios';
export  const postModule = {
    state: ()=>({
        posts:[],
        searchUsers:'',
        selectedSort: '',
        sortOptions:[
            {value: 'firstName', name: 'По имени'},
            {value: 'secondName', name: 'По фамилии'}
        ],
        modalVisible: false,
        isPostLoading: false,
    }),
    getters: {
        sortedUsers(state){
            return [...state.posts].sort((a,b)=>{
                a[state.selectedSort]?.localeCompare(b[state.selectedSort])
            })
        },
        sortedAndSearchedUsers(state, getters){
            return getters.sortedUsers.filter(post=>
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
        setSelectedSort(state, selectedSort){
            state.selectedSort  = selectedSort
        },
        setModalVisible(state,bool){
            state.modalVisible = bool
        },
        setIsPostLoading(state,bool){
            state.isPostLoading = bool
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
                commit('setPosts', response.data)
                console.log('fetch')
            } catch (e) {
                console.log(e)
                // alert('Не идет запрос')
            } finally {
                commit('setIsPostLoading', false);
            }
        },
        async deleteUser(uuid) {
            console.log('delete');
            await axios.delete(`http://localhost:3123/${uuid}`)
                .then(response => alert(response.data))
                .catch(e=> console.log(e))
        },
        async createUser({commit},post) {
            console.log('post');
            await axios.post(`http://localhost:3123/`, post)
                .then(response =>{
                    if(response.status){
                        commit('setPushPosts', response.data)
                    }
                }).catch(e=> console.log(e))
        },
        async editPost({commit},user){
                console.log('edit');
                await axios.put(`http://localhost:3123/${user.uuid}`, user)
                    .then(response =>{
                        if(response.status){
                            commit('setPushPosts', response.data)
                        }
                    }).catch(e=> console.log(e))
            },
        },
    namespaced: true
};
