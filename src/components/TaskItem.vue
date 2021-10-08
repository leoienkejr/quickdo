<template>
    <div class="task-item px-10 pt-10 flex column shadow-1"
    :style="{...accentColorVar, ...taskItemStyle}">
        <div class="task-header flex column">
            <span class="task-title">{{task.title}}</span>
            <span class="task-due">{{dueDateLocaleStr}}</span>
            
        </div>
        <div class="task-actions flex justify-start align-center">

            <base-button class="mr-10"
            height="2rem"
            :style="actionBtnStyle">
                <i class="fas fa-edit"
                title="Edit"
                :style="{transform: 'scale(1.2)', opacity: 0.8}"></i>   
            </base-button>

            <base-button class="mr-10"
            height="2rem"
            :style="actionBtnStyle">
                <i class="fas fa-trash"
                title="Delete"
                :style="{opacity: 0.8}"></i>
            </base-button>

            <base-button class="ml-auto mr-5 mb-10 shadow-1"
            :bg-color="doneBtnBgColor"
            width="3rem"
            equal-sides
            :style="doneBtnBorder"
            :border-radius="999">
               <i class="fas fa-check"
               title="Mark as done"
               :style="{transform: 'scale(1.8)', opacity: 0.8,
                color: doneIconColor}"></i>
            </base-button>

        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {colors} from '@/modules/vars.js'
import BaseButton from '@/components/BaseButton.vue'

export default {
    components: {
        BaseButton
    },

    props: {
        task: {
            type: Object,
            default: () => ({
                id: 1,
                title: 'Clean up bedroom',
                dueUnixTimeMilliseconds: 1624491050000,
                completedAtUnixTimeMilliseconds: 1624476724000,
            }),
            validator: (value) => {
                let valid = true;

                [   'id',
                    'title',
                    'dueUnixTimeMilliseconds',
                    'completedAtUnixTimeMilliseconds',
                ].forEach(key => {
                   if(!Object.keys(value).includes(key)){
                        console.warn(`TaskItem: missing property '${key}' in object received as prop 'task'`)
                        valid = false;
                   }
                });

                return valid
            }
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
        }
    },

    name: 'TaskItem',
    data: () => ({
        colors: colors,
    }),

    computed: {
        ...mapGetters({
            appSettings: 'settings/getAppSettings'
        }),

        dueDateLocaleStr(){
            let date = new Date()
            date.setTime(this.task.dueUnixTimeMilliseconds)
            return date.toLocaleString(this.appSettings.locale, {dateStyle: 'short', timeStyle: 'short'})

        },

        accentColorVar(){
            return {
                '--accent-color': this.accentColor
            }
        },

        taskItemStyle(){
            let blackOrWhite = this.appSettings.theme === 'dark' ?
                this.colors['black'] : this.colors['white']

            let whiteOrBlack = this.appSettings.theme === 'dark' ?
                this.colors['white'] : this.colors['black']

            return {
                'background': blackOrWhite,
                'color': whiteOrBlack,
            }
        },

        doneBtnBgColor(){
            return this.appSettings.theme === 'dark' ?
                this.colors['black'] : this.colors['primaryGreen']
        },

        doneIconColor(){
            return this.appSettings.theme === 'dark' ?
                this.colors['primaryGreen'] : this.colors['black']
        },

        doneBtnBorder(){
            return this.appSettings.theme === 'dark' ? {
                border: `1px solid ${this.colors['primaryGreen']}`
            } : {}
        },

        actionBtnStyle(){
            return this.appSettings.theme === 'dark' ? {
                'background': 'transparent',
                'color': this.colors['white'],
                'border': '1px solid rgba(255, 255, 255, 0.8)'
            } : {}
        }
    }
}
</script>

<style scoped>
    .task-title {
        font-size: 18px;          
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .task-due {
        font-size: 14px;
        font-weight: 200;
    }

    .task-item {
        height: 110px;
        /* background: #FFF; */
        border-radius: 0 5px 5px 0;
        border: 1px solid var(--accent-color);
        border-left: 8px solid var(--accent-color);
    }

    .task-header {
        height: 70%;
        max-width: 100%;
        overflow: hidden;
    }


</style>