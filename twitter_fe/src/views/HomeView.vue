<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue'
import Form from '../components/Form.vue';
import Tweet from '@/components/Tweet.vue'
import { useDataFetching, usePostTweet, usePostTweetWithUpload } from '@/composable/dataFetching.js'
import Navbar from '@/components/Navbar.vue';

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

import { useAuthStore } from '../stores/auth';
import { useRefreshAccessToken } from '@/composable/refreshToken.js'; // Adjust the path accordingly

const dataTweet = ref([])

const { fetchData } = useDataFetching()
const { createTweet } = usePostTweet()
const { createTweetWithUpload } = usePostTweetWithUpload()

const { isRefreshingToken, refreshAccessTokenIfNeeded } = useRefreshAccessToken();

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated)

const limit = ref(5)
const max_item = 10
const getMoreTweet = () => {
  limit.value = limit.value + max_item
}
const isLoading = ref(false)
const fetchDataAndDisplayData = async () => {
  try {
    isLoading.value = true
    const result = await fetchData(import.meta.env.VITE_API_BASE_URL + '/api/tweets', limit.value)
    console.log(result)
    dataTweet.value = result.data
    isLoading.value = false
  } catch (e) {
    console.error(e)
  }
}

const tweet = reactive({
  content: ""
})

const tweetUpload = reactive({
  content: "",
  file: ""
})


const handleFileChange = (event)=>{
  tweetUpload.file = event.target.files[0]
}



const handleUploadFile = async () => {
  try {
    // console.log(tweetUpload)
    await refreshAccessTokenIfNeeded();
    const formData = new FormData();
    formData.append('content', tweetUpload.content); // Send JSON data as a string
    formData.append('file', tweetUpload.file); // Send the file
    const response = await createTweetWithUpload(import.meta.env.VITE_API_BASE_URL + '/api/tweets', formData, authStore.accessToken)
    if (response.success) {
      showSuccessModal.value = true
      successModalMessage.value = "Tweet Berhasil Ditambahkan!"
      fetchDataAndDisplayData()
    }
  } catch (e) {
    console.error(e)
  }
}
const successModalMessage = ref('')
const crateNewTweet = async () => {
  try {
    await refreshAccessTokenIfNeeded();
    const response = await createTweet(import.meta.env.VITE_API_BASE_URL + '/api/tweets', tweet, authStore.accessToken)
    if (response.success) {
      showSuccessModal.value = true
      successModalMessage.value = "Tweet Berhasil Ditambahkan!"
      fetchDataAndDisplayData()
    }
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  refreshAccessTokenIfNeeded()
  fetchDataAndDisplayData()
})

const isOpen = ref(false)

const setIsOpen = () => {
  isOpen.value = !isOpen.value
}

const showSuccessModal = ref(false)

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

watch(limit, () => {
  fetchDataAndDisplayData()
})
</script>

<template>
  <Navbar />
  <main class="mt-7 text-feldgrau font-semibold mx-52">
    <p class="space-x-10 text-4xl">Home Page</p>
    <Form @Submit.prevent v-if="isAuthenticated">
      <div class="flex flex-col">
        <label for="tweet" class="mt-3">Tweet</label>
        <textarea class="border-2 rounded-md bg-slate-200 focus:bg-white border-feldgrau" cols="20" rows="5"
          placeholder="Write your tweet here" v-model="tweet.content"></textarea>
      </div>
      <button
        class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 mr-3 hover:bg-white hover:text-feldgrau hover:border-2 hover:border-feldgrau"
        @click="crateNewTweet">Submit</button>
      <button
        class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 hover:bg-white hover:text-feldgrau hover:border-2 hover:border-feldgrau"
        @click="setIsOpen">Upload File</button>
    </Form>
    <p class="text-2xl mt-2">Other Tweet</p>
    <button
      class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 hover:bg-white hover:text-feldgrau hover:border-2 hover:border-feldgrau"
      @click="getMoreTweet">
      More Tweet</button>
    <div v-if="isLoading" class="flex mb-5 mt-5 text-tropicalindigo">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100" class="animate-spin">
        <!-- Define the circle -->
        <circle cx="50" cy="50" r="40" fill="none" stroke="#7f7eff" stroke-width="8" stroke-dasharray="251.2"
          stroke-dashoffset="0">
          <!-- Add animation to create the border effect -->
          <animate attributeName="stroke-dashoffset" from="0" to="251.2" dur="1s" repeatCount="indefinite" />
        </circle>
      </svg> 
      Loading...
    </div>
    <div v-else>
      <!-- Display your data here when loading is complete -->
      <div v-for="item in dataTweet" :key="item.id">
        <!-- {{ item }} -->
        <Tweet :user="item.user.username" :content="item.content" class="my-3" :image_path="item.image_path"
          :image_name="item.image_name" />
      </div>
    </div>

    <Teleport to="body">
      <Dialog :open="isOpen" @close="setIsOpen">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel class="w-full max-w-sm rounded bg-white p-5">
            <DialogTitle class="font-bold text-feldgrau text-2xl">Upload File</DialogTitle>
            <DialogDescription>
              <Form @Submit.prevent >
                
                <div class="flex flex-col">
                  <label for="tweet" class="mt-3 underline  text-feldgrau">Upload</label>
                  <input type="file" class="w-full text-gray-800 text-sm

            file:mr-4 file:px-4 file:py-2 file:text-sm file:border-0

            file:rounded-full file:font-semibold file:text-feldgra

          hover:file:bg-amber-100 hover:file:cursor-pointer" @change="handleFileChange">
                </div>
                <div class="flex flex-col">
                  <label for="tweet" class="mt-3 underline text-feldgrau">Caption</label>
                  <textarea class="mt-2 border-2 rounded-md bg-slate-200 focus:bg-white border-feldgrau" cols="20"
                    rows="5" placeholder="Write your tweet here" v-model="tweetUpload.content"></textarea>
                </div>
              </Form>
            </DialogDescription>
            <button type="submit"
              class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 mr-3 hover:bg-white hover:text-feldgrau h over:border-2 hover:border-feldgrau" @click="handleUploadFile">Submit</button>
            <button
              class="bg-white border-2 hover:bg-feldgrau hover:border-none hover:text-white border-feldgrau text-feldgrau p-2 rounded-lg mt-3 px-10"
              @click="setIsOpen">Cancel</button>
          </DialogPanel>
        </div>
      </Dialog>
    </Teleport>

    <Dialog :open="showSuccessModal" @close="closeSuccessModal">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-sm rounded bg-white p-5">
          <DialogTitle class="font-bold text-feldgrau text-2xl">Notifikasi!</DialogTitle>
          <DialogDescription>
            <p class="p-3 mt-4 text-feldgrau">{{ successModalMessage }}</p>
          </DialogDescription>
          <button
            class="bg-white border-2 hover:bg-feldgrau hover:border-none hover:text-white border-feldgrau text-feldgrau p-2 rounded-lg mt-3 px-10"
            @click="closeSuccessModal">Cancel</button>
        </DialogPanel>
      </div>
    </Dialog>
  </main>
</template>
