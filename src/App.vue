 <template>
     <div class="app">
         <h1 style="text-align: center">Страница с пользователями</h1>
         <my-input
                @update:model-value="setSearchUsers"
                placeholder="Поиск">
         </my-input>

         <div >
            <my-button
                    @click="showModal"
                    class = "addUser"
            > Добавить пользователя </my-button>
         </div>
            <my-modal v-model:show="modalVisible">
                <post-form/>
            </my-modal>

            <post-list
                    :posts = "searchedUsers"
                    v-if="!isPostLoading"
            />
            <div v-else class="loader">Loading...</div>
     </div>
</template>

<script>
import PostForm from './components/PostForm';
import PostList from './components/PostList'
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
//спасибо что проверяете в 3 раз, старался сделать чтобы этот раз был последним
export default {
    components: {
        PostForm,
        PostList
    },
    methods: {
        ...mapMutations({
            setSearchUsers: 'post/setSearchUsers',
            setModalVisible: 'post/setModalVisible'
        }),
        ...mapActions({
            fetchUsers: 'post/fetchUsers',
        }),
        showModal(){
            this.setModalVisible(true);
        },
    },
    mounted(){ //перед отрисовкой
        this.fetchUsers()
    },
    beforeUpdated(){//после изменений стейта
        this.fetchUsers()
    },
    computed:{//вычисляемое свойство
        ...mapState({//если isPostLoading перенести в getter, не работает
            isPostLoading:  state => state.post.isPostLoading,
            modalVisible: state=> state.post.modalVisible
        }),
        ...mapGetters({
            searchedUsers: 'post/searchedUsers',
            searchUsers: 'post/state/searchUsers',
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
.loader{
    display: flex;
    justify-content: center;
    font-size: 20px;
    color: green;
}
</style>