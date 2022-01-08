<template>
  <div>
    <Wall />
  </div>
</template>

<script>
import Wall from './../components/Wall.vue';

document.title = 'Publications | Groupomania';

export default {
  name: 'userWall',
  components: {
    Wall
  }
};
</script>
