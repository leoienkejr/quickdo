<template>
    <button class="base-button"
    :style="styleVars">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'BaseButton',
    props: {
        bgColor: {
            type: String,
            default: '#EEE'
        },

        width: {
            type: String,
            default: '3rem'
        },

        height: {
            type: String,
            default: '1.5rem'
        },

        equalSides: {
            type: Boolean,
            default: false,
        },

        borderRadius: {
            type: Number,
            default: 8
        }
    },

    computed: {
        styleVars(){
            return {
                '--bg-color': this.bgColor,
                '--width': this.equalSides ? (this.width ? this.width : this.height) : this.width,
                '--height': this.equalSides ? (this.width ? this.width : this.height) : this.height,
                '--border-radius': `${this.borderRadius}px`
            }
        }
    }
}
</script>

<style scoped>
    .base-button {
        border: unset;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        background: var(--bg-color);
        width: var(--width);
        height: var(--height);
        border-radius: var(--border-radius);

    }

    .base-button:focus {
        outline: 1px solid #999;

    }

    .base-button:active {
        transform: translateY(1px);
        filter: blur(0.4px);
    }

    .base-button:hover {
        filter: brightness(0.95)
    }
</style>