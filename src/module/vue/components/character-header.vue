<template>
  <header class="sheet-header">
    <img
      :src="actor.img"
      :title="actor.name"
      class="profile-img"
      data-edit="img"
      height="50"
      width="50"
    />
    <h1 class="charname">
      <input
        :placeholder="$t('IRONSWORN.Name')"
        v-model="actor.name"
        name="name"
        type="text"
      />
    </h1>
    <div class="flexrow xp">
      <h4 style="flex-grow: 0; margin: 5px">{{ $t('IRONSWORN.XP') }}</h4>
      <div class="flexrow">
        <xp-box
          :actor="actor"
          v-for="n in xpArray"
          v-bind:key="n"
          :value="n"
          :current="actor.data.xp"
        />
        <xp-box :actor="actor" :value="0">×</xp-box>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    actor: Object,
  },

  data() {
    return {
      xpArray: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    }
  },

  watch: {
    'actor.name'() {
      const actor = game.actors?.get(this.actor._id)
      actor.update({ name: this.actor.name })
    },
  },
}
</script>
