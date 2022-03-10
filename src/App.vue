 <template>
 <div class="app">
     <h1 style="text-align: center">Страница с пользователями</h1>
     <my-input
        v-model="searchUsers"
        @update:model-value="setSearchUsers"
        placeholder="Поиск"
     />

     <div >
        <my-button
                @click="showModal"
                class = 'addUser'
        > Добавить пользователя </my-button>
<!--        <my-selected-->
<!--            :model-value="selectedSort"-->
<!--            @update:model-value="setSelectedSort"-->
<!--            :options="sortOptions"-->
<!--            style="cursor: pointer;"-->
<!--        ></my-selected>-->
     </div>
        <my-modal
                v-model:show="modalVisible"
                @update:model-bool="setModalVisible"
        >
            <post-form
                    @create = "createPost"
                    @edit="editUser"
            />
        </my-modal>

        <post-list
                :posts = "sortedAndSearchedUsers"
                @remove = "removePost"
                v-if="!isPostLoading"
        />
        <div v-else>Loading...</div>
 </div>
</template>
/
<script> // v- @  директив
import PostForm from './components/PostForm';
import PostList from './components/PostList'
import MyButton from "./UI/MyButton";
import MySelected from "./UI/MySelected";
import MyInput from "./UI/MyInput";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    components: {
        MyInput,
        MySelected,
        MyButton,
        PostForm,
        PostList
    },
    data() { //state
        return{
            modalVisible:false
        }
    },
    methods: {
        ...mapMutations({
            setSearchUsers: 'post/setSearchUsers',
            setSelectedSort: 'post/setSelectedSort',
            setModalVisible: 'post/setModalVisible',
            setPosts: 'post/setPosts'
        }),
        ...mapActions({
            fetchUsers: 'post/fetchUsers',
            deleteUser: 'post/deleteUser',
            createUser: 'post/createUser',
            editPost: 'post/editPost'
        }),
        createPost(post){
            this.createUser(post);
            this.modalVisible= false;
        },
        editUser(user){
            this.editPost(user)
        },
        removePost(post){
           this.deleteUser(post.uuid)
        },
        showModal(){
            this.modalVisible = true;
        },
    },
    mounted(){ //перед отрисовкой
        this.fetchUsers()
    },
    beforeUpdated(){
        this.fetchUsers()
    },
    computed:{//вычисляемое свойство
        ...mapState({
            posts: state => state.post.posts,
            searchUsers:  state => state.post.searchUsers,
            selectedSort:  state => state.post.selectedSort,
            modalVisible:  state => state.post.modalVisible,
            isPostLoading:  state => state.post.isPostLoading,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedUsers: 'post/sortedUsers',
            sortedAndSearchedUsers: 'post/sortedAndSearchedUsers'
        })
    },
    watch:{//наблюдаемое свойство
        //тут можем повторить логику выше и сортировка будет работать визуально
    }
}
</script>
<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app{
    padding-left: 20%;
    padding-right: 20%;
    padding-top: 40px;
}
.addUser{
    margin-top: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
}

</style>