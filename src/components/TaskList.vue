<template>
    <div class="pb-10 task-list-wrapper"
    v-if="tasks.length > 0 || !hideEmpty">
        <div class="task-list-drawer mb-10 flex align-center"
        :style="drawerStyle">
            <span class="task-list-title">{{title}}</span>


            <base-button bg-color="transparent"
            width="2rem"
            equal-sides
            :border-radius="999"
            class="flex align-center justify-center ml-auto mr-15"
            @click="showTasks = !showTasks">
                <i :class="drawerIcon"
                    :title="showTasks ? 'Hide tasks':'Show tasks'"
                    :style="{transform: 'scale(1.2)', opacity: 0.8,
                        ...drawerStyle}"></i>
            </base-button>
        </div>

        <div v-show="showTasks && tasks.length > 0"
        class="task-list-tasks">
            <task-item v-for="task in tasks"
            :key="task.id"
            :task="task"
            class="mb-10" />
        </div>
        <div v-show="showTasks && !tasks.length > 0"
        class="task-list-empty-list-msg-container flex align-center justify-center"
        :style="drawerStyle">
            <span class="task-list-empty-list-msg">This list is empty.</span>
        </div>

    </div>
    
</template>


<script>
    import {mapGetters} from 'vuex'
    import BaseButton from '@/components/BaseButton.vue'
    import TaskItem from '@/components/TaskItem.vue'
    import {colors} from '@/modules/vars.js'

    export default {
        components: {
            TaskItem,
            BaseButton
        },

        props: {
            tasks: {
                type: Array,
                default: () => ([
                ])
            },

            title: {
                type: String,
                default: 'Tasks'
            },

            accentColor: {
                type: String,
                default: colors.primaryBlue,
                validator: (value) => {
                    if(!value.length > 0){
                        console.warn("TaskItem: prop 'accentColor' must not be empty")
                        return false
                    } else {
                        return true
                    }
                }
            },

            hideEmpty: {
                type: Boolean,
                default: false
            }
        },

        name: 'TaskList',

        data: () => ({
            showTasks: true,
            colors: colors,
        }),

        computed: {
            ...mapGetters({
                appSettings: 'settings/getAppSettings'
            }),

            drawerIcon(){
                return this.showTasks ? 'fas fa-chevron-up' : 'fas fa-chevron-down'
            },

            drawerStyle(){
                let whiteOrBlack = this.appSettings.theme === 'dark' ?
                    this.colors['white'] : this.colors['black']

                return {
                    color: whiteOrBlack
                }
            }
        },

        methods: {},
    }
</script>


<style scoped>
    .task-list-title {
        font-weight: 600;
        font-size: 1.5rem;
    }

    .task-list-drawer {
        height: 30px;
    }

    .task-list-wrapper {
        border-bottom: 1px solid #BBB;
    }

    .task-list-empty-list-msg-container {
        height: 80px;
    }

    .task-list-empty-list-msg {
        font-size: 0.8rem;
        opacity: 0.6;
    }
</style>