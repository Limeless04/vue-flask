<template>
  <main class="mt-7 text-feldgrau font-semibold mx-52">
    <p class="space-x-10 text-4xl">{{ props.pageName }}</p>
    <Form @Submit.prevent class="mb-4">
      <div class="flex flex-col">
        <label for="username" class="mt-3">Username</label>
        <input type="text" id="username" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none "
        :class="{'error-input': (submitted && isEmpty(newUser.username))}"
          v-model="newUser.username">
          <p v-if="submitted && isEmpty(newUser.username)" class="text-red-500">Username tidak boleh kosong</p>
      </div>
      <div class="flex flex-col">
        <label for="email" class="mt-3">Email</label>
        <input type="text" id="eamil" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none "
        :class="{'error-input': (submitted && isEmpty(newUser.username))}"
          v-model="newUser.email">
          <p v-if="submitted && isEmpty(newUser.email)" class="text-red-500">Email tidak boleh kosong</p>
      </div>
      <div class="flex flex-col">
        <label for="role" class="mt-3">Role</label>
        <Listbox v-model="selectedRole">
          <ListboxButton
            class="bg-gray-50 h-10 hover:bg-gray-200 hover:border-b-4 hover:border-feldgrau hover:rounded-md text-left">{{
              selectedRole.name }}</ListboxButton>
          <ListboxOptions>
            <ListboxOption v-for="person in role" :key="person.id" :value="person" :disabled="person.unavailable"
              class="bg-gray-50 h-10 hover:bg-gray-200 hover:border-b-4 hover:rounded-md border-feldgrau outline-none">
              {{ person.name }}
            </ListboxOption>
          </ListboxOptions>
        </Listbox>
      </div>
      <div class="flex flex-col">
        <label for="password" class="mt-3">Password</label>
        <input type="password" id="password" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none " 
        :class="{'error-input': (submitted && isEmpty(newUser.password)), 'error-input': falsePassword}"
          v-model="newUser.password">
      </div>
      <div class="flex flex-col">
        <label for="cpassword" class="mt-3">Confirm Password</label>
        <input type="password" id="cpassword" class="bg-gray-50 h-10 focus:border-b-4 border-feldgrau focus:outline-none "
        :class="{'error-input': (submitted && isEmpty(newUser.password)), 'error-input': falsePassword}"
          v-model="confirmPassword">
        <p v-if="falsePassword" class="text-red-500">Passwords do not match.</p>
        <p v-if="submitted && isEmpty(newUser.password)" class="text-red-500">Confirm Password tidak boleh kosong</p>
      </div>
      <button type="submit"
        class="bg-feldgrau text-white p-2 rounded-lg mt-3 px-10 mr-3 hover:bg-white hover:text-feldgrau hover:border-2 hover:border-feldgrau"
        @click="createNewUser">Submit</button>
    </Form>
    <RouterLink to="/login" class="underline mt-10 hover:text-tropicalindigo">Kembali Ke halaman Login!</RouterLink>

    <Teleport to="body">
      <Dialog :open="showSuccessModal" @close="closeSuccessModal">
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel class="w-full max-w-sm rounded bg-white p-5">
            <DialogTitle class="font-bold text-feldgrau text-2xl">Notifikasi!</DialogTitle>
            <DialogDescription>
              <p class="p-3 mt-4 text-feldgrau">{{ response }}</p>
            </DialogDescription>
            <button
              class="bg-white border-2 hover:bg-feldgrau hover:border-none hover:text-white border-feldgrau text-feldgrau p-2 rounded-lg mt-3 px-10"
              @click="closeSuccessModal">Cancel</button>
          </DialogPanel>
        </div>
      </Dialog>
    </Teleport>
  </main>
</template>
 
<script setup>
import { ref, reactive, watch, computed } from 'vue'
import Form from '@/components/Form.vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'

import { useRegisterUser } from '@/composable/auth.js'

const props = defineProps({
  pageName: String
})
const role = [
  { id: 1, name: 'Choose Role', unavailable: false },
  { id: 2, name: 'admin', unavailable: false },
  { id: 3, name: 'user', unavailable: false },
]
const selectedRole = ref(role[0])

const confirmPassword = ref("")


watch(selectedRole, (newValue) => {
  newUser.role = newValue ? newValue.name : '';
});

const newUser = reactive({
  username: "",
  password: "",
  email: "",
  role: selectedRole.value ? selectedRole.value.name : '',
  password: ""

})

//validasi password
const submitted = ref(false);

const falsePassword = ref(false)

const isEmpty = (value) => {
  return !value || value.trim() === '';
};


watch(() => {
  if (confirmPassword.value !== newUser.password) {
    falsePassword.value = true;
  } else {
    falsePassword.value = false;
  }
});

const showSuccessModal = ref(false)

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const response = ref(null)

const { registerUser } = useRegisterUser()

const createNewUser = async () => {
  try {
    // console.log(newUser)
    const result = await registerUser(import.meta.env.VITE_API_BASE_URL + '/api/auth/register', newUser)
    if (result.success) {
      response.value = result.message
      showSuccessModal.value = true
    }
  } catch (e) {
    console.error(e)
    response.value = "An error occurred during registration."; // Set an error message
    showSuccessModal.value = true;
    submitForm.value = true
  }
}
</script>

<style>
.error-input{
  border: 2px solid red;
  border-radius: .5rem;
}

</style>