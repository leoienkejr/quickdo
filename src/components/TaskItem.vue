<template>
    <div class="task-item px-10 pt-10 flex column"
    :style="accentColorVar">
        <div class="task-header flex column">
            <span class="task-title">Clean up bedroom</span>
            <span class="task-due">{{dueDateLocaleStr}}</span>
            
        </div>
        <div class="task-actions flex">
            <span class="mr-10">Delete </span>
            <span class="mr-10">Edit </span>
            <span class="mr-10">Done </span>
        </div>

    </div>
</template>

<script>
import {utils} from '@/utils/utils.js'

export default {
    props: {
        task: {
            type: Object,
            default: () => ({
                dueUnixTimeMilliseconds: 1624491050000,
                completedAtUnixTimeMilliseconds: 1624476724000,
            })
        },

        accentColor: {
            type: String,
            default: '#00ccff'
        }
    },

    name: 'TaskItem',
    data: () => ({
        utils: utils
    }),

    computed: {
        dueDateLocaleStr(){
            let date = new Date()
            date.setTime(this.task.dueUnixTimeMilliseconds)
            return date.toLocaleString(this.utils.getLocale(), )

        },

        accentColorVar(){
            return {
                '--accent-color': this.accentColor
            }
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
        background: #FFF;
        border-radius: 0 5px 5px 0;
        border: 1px solid var(--accent-color);
        border-left: 8px solid var(--accent-color);
        -webkit-box-shadow: 4px 4px 5px 0px rgba(163, 91, 91, 0.1);
        -moz-box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.1);
        box-shadow: 4px 4px 5px 0px rgba(0,0,0,0.1);

    }

    .task-header {
        height: 70%;
        max-width: 100%;
        overflow: hidden;
    }

    .task-actions {
        justify-content: flex-end;
    }
</style>