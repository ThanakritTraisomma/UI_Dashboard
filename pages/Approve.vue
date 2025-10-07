<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[20px]">Admin &gt; Approve</h1>

    <!-- ส่วนตัวกรอง -->
    <div class="flex flex-col lg:flex-row lg:justify-between gap-3 lg:items-center mt-4">
      <span>Summary</span>
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex gap-2">
          <div class="flex justify-center items-center">
            <label for="">From:</label>
            <input type="date" class="border rounded px-2 py-1 w-33" />
          </div>
          <div class="flex justify-center items-center">
            <label for="">To:</label>
            <input type="date" class="border rounded px-2 py-1 w-33" />
          </div>
        </div>

        <!-- ปุ่ม Filter -->
        <div class="relative z-10">
          <button
            @click="filterOpen = !filterOpen"
            :aria-expanded="filterOpen ? 'true' : 'false'"
            aria-haspopup="menu"
            class="inline-flex items-center gap-2 px-2 py-1 rounded-xl
                   text-white bg-[#000000] ring-2 ring-[#4DB5FF]
                   shadow-sm hover:bg-[#6822e8] active:scale-[.98] transition"
          >
            <span class="font-medium">{{ currentFilter ?? 'Filter' }}</span>
          </button>

          <div v-if="filterOpen" class="fixed inset-0 z-40" @click="filterOpen = false"></div>

          <div
            v-if="filterOpen"
            role="menu"
            class="absolute lg:right-0 mt-2 w-44 z-50 bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-2"
          >
            <button
              v-for="opt in filterOptions"
              :key="opt"
              role="menuitem"
              class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              @click="selectFilter(opt)"
            >
              {{ opt }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ตาราง Card + scroll -->
    <div class="mt-4 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 overflow-hidden">
      <div class="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div class="min-w-[980px] text-sm">
          <!-- หัวตาราง -->
          <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
            <div class="grid grid-cols-[160px_1fr_1fr_140px_1fr_160px_120px] items-center h-12">
              <div class="flex items-center justify-center px-4">Member ID</div>
              <div class="flex items-center justify-center px-4">Name</div>
              <div class="flex items-center justify-center px-4">Surname</div>
              <div class="flex items-center justify-center px-4">Wage</div>
              <div class="flex items-center justify-center px-4">Create By</div>
              <div class="flex items-center justify-center px-4">Create Date</div>
              <div class="flex items-center justify-center px-4">Approve</div>
            </div>
          </div>

          <!-- แถวข้อมูล -->
          <div class="whitespace-nowrap bg-white">
            <template v-for="r in rowsShown" :key="r.id">
              <div class="grid grid-cols-[160px_1fr_1fr_140px_1fr_160px_120px] items-center border-b last:border-b-0 h-14">
                <div class="flex items-center justify-center px-4">{{ r.memberId }}</div>
                <div class="flex items-center justify-center px-4">{{ r.name }}</div>
                <div class="flex items-center justify-center px-4">{{ r.surname }}</div>
                <div class="flex items-center justify-center px-4">{{ formatNumber(r.wage) }}</div>
                <div class="flex items-center justify-center px-4">{{ r.createBy }}</div>
                <div class="flex items-center justify-center px-4">{{ r.createDate }}</div>

                <!-- Approve: สวิตช์ checkbox -->
                <button
                  class="flex items-center justify-center px-4 h-14 hover:bg-gray-50 transition"
                  @click="r.approved = !r.approved"
                  :aria-pressed="r.approved ? 'true' : 'false'"
                  :title="r.approved ? 'Approved' : 'Not approved'"
                >
                  <svg v-if="r.approved" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M7 12l3 3 7-7" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Row = {
  id: number
  memberId: string
  name: string
  surname: string
  wage: number
  createBy: string
  createDate: string
  approved: boolean
}

const rows = ref<Row[]>([
  { id: 1, memberId: '001', name: 'A', surname: 'AA', wage: 500, createBy: 'Navaphan', createDate: '09/09/2025', approved: true },
  { id: 2, memberId: '002', name: 'B', surname: 'BB', wage: 500, createBy: 'Noyjinda', createDate: '02/09/2025', approved: false },
  { id: 3, memberId: '003', name: 'C', surname: 'CC', wage: 500, createBy: 'Someone', createDate: '15/09/2025', approved: true },
])

const filterOpen = ref(false)
const filterOptions = ['All', 'Approved', 'Not Approved'] as const
type FilterType = (typeof filterOptions)[number]
const currentFilter = ref<FilterType | null>(null)

const rowsShown = computed(() => {
  if (currentFilter.value === 'Approved') return rows.value.filter(r => r.approved)
  if (currentFilter.value === 'Not Approved') return rows.value.filter(r => !r.approved)
  return rows.value
})

function selectFilter(opt: FilterType) {
  currentFilter.value = opt
  filterOpen.value = false
}

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 })
</script>

<style scoped>
</style>
