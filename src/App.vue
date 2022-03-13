 <template>
 <div class="app">
     <h1 style="text-align: center">Страница с пользователями</h1>
     <my-input
            @update:model-value='setSearchUsers'
            placeholder='Поиск'>
     </my-input>

     <div >
        <my-button
                @click='showModal'
                class = 'addUser'
        > Добавить пользователя </my-button>
     </div>
        <my-modal
                v-model:show='modalVisible'
        >
            <post-form
                    @hidenModal = 'hidenModal'
            />
        </my-modal>

        <post-list
                :posts = 'searchedUsers'
                v-if='!isPostLoading'
        />
        <div v-else>Loading...</div>
 </div>
</template>
/
<script> // v- @  директив
import PostForm from './components/PostForm';
import PostList from './components/PostList'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

export default {
    components: {
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
            setPosts: 'post/setPosts'
        }),
        ...mapActions({
            fetchUsers: 'post/fetchUsers',
        }),
        hidenModal(){
            this.modalVisible= false;
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
            isPostLoading:  state => state.post.isPostLoading,
        }),
        ...mapGetters({
            searchedUsers: 'post/searchedUsers'
        })
    },
    watch:{//наблюдаемое свойство
           //useMemo
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