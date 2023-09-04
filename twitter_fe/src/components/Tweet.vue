<template>
    <div>
        <blockquote class="border-2 border-feldgrau rounded-lg">
            <p class="border-b-2 border-feldgrau bg-feldgrau text-white p-3">Tweet From {{ props.user }}</p>
            <div class="p-3 space-y-3">
                <img v-show="props.image_path" :src="props.image_path" :alt="props.image_name">
                <p class="text-feldgrau">{{ props.content }}</p>
                <button class="border-2 border-tropicalindigo  px-4 rounded-xl " :class="{'bg-tropicalindigo' : isLiked, 'text-white': isLiked, 'text-tropicalindigo': !isLiked}" @click="toggleLike">Like</button>
            </div>
        </blockquote>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  user: String,
  content: String,
  image_name: String,
  image_path: String
});


const isLiked = ref(false)

const toggleLike = () => {
    isLiked.value = !isLiked.value
}

</script>