<template>
  <v-menu
    style="cursor: pointer"
    v-bind="$props"
    v-on="$listeners"
    v-model="internalValue"
    :close-on-content-click="false"
    :nudge-right="nudgeRight"
    transition="scale-transition"
    offset-y>
    <template #activator="{ on }">
      <slot name="activator" :scope="{ on }"/>
    </template>
    <slot name="popup"/>
    <slot/>
  </v-menu>
</template>
<script>
export default {
  name: 'PickerInput',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    nudgeRight: {
      type: Number,
      default: 40
    }
  },
  data () {
    return {
      fallbackValue: false
    }
  },
  computed: {
    internalValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
