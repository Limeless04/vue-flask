<template>
    <Navbar />
    <main class="mt-7 text-feldgrau font-semibold mx-52">
        <p class="text-4xl">Leaderboad Page</p>
        <DataTable :columns="columns" :data="data" id="example" class="display bg-gray-50 border-2 border-feldgrau text-center" style="width:100%">
        <thead class="border-2 border-feldgrau text-bold">
            <tr>
                <th>No.</th>
                <th>Username</th>
                <th>Tweet Count</th>
            </tr>
        </thead>
        
    </DataTable>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { useDataFetching } from '@/composable/dataFetching.js'
//import library datatable
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
 
DataTable.use(DataTablesCore);

const columns = [
  { title: 'No.', render: (data, type, row, meta) => { return meta.row + 1; }, className: 'border-feldgrau' },
  { data: 'username', title: 'Username' },
  { data: 'count_tweet', title: 'Tweet Count' },
];

const { fetchData } = useDataFetching()
const data = ref([])
const fetchDataAndDisplayData = async () => {
  try{
    const result = await fetchData(import.meta.env.VITE_API_BASE_URL + '/api/counts')
    data.value = result.data
  }catch(e){
    console.error(e)
  }
}

onMounted(() => {
  fetchDataAndDisplayData()
})

</script>

<style>
 .datatable { border-collapse: collapse}
    .datatable th{
        border-right: solid 2px #526760; 
        border-left: solid 2px #526760;
        font-weight: bold;
        color: #526760;
    }
    .datatable td {
    border-right: solid 2px #526760; 
    border-left: solid 2px #526760;
    border-bottom: solid 2px #526760;
    }
</style>