<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[40px]">Report > admin report</h1>

    <!-- แถวหัวข้อ + ตัวกรอง -->
    <div class="flex flex-col lg:flex-row lg:justify-between gap-3 lg:items-center">
      <span>Summary</span>
      <div class="flex items-center gap-3 flex-wrap">
       <div class="flex gap-2 ">
                 <div class="flex justify-center items-center">
                       <label for="">From:</label>
                    <input type="date" class="border rounded px-2 py-1" />
                 </div>
                   <div class="flex justify-center items-center">
                     <label for="">To:</label>
                    <input type="date" class="border rounded px-2 py-1" />
                   </div>
                </div>
       <!-- วางในตำแหน่งปุ่ม Filter เดิม -->
<div class="relative z-10">
  <!-- ปุ่ม Filter -->
  <button
    @click="filterOpen = !filterOpen"
    :aria-expanded="filterOpen ? 'true' : 'false'"
    aria-haspopup="menu"
    class="inline-flex items-center gap-2 px-4 py-2 rounded-xl
           text-white bg-[#7A2AF7] ring-2 ring-[#4DB5FF]
           shadow-sm hover:bg-[#6822e8] active:scale-[.98]
           transition"
  >
    <!-- ไอคอนกรวย -->
    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 5a1.5 1.5 0 0 1 1.2-.6h14.6a1.5 1.5 0 0 1 1.2 2.4l-6.3 7.9v3.6a1.5 1.5 0 0 1-2.2 1.3l-3-1.7a1.5 1.5 0 0 1-.8-1.3v-1.9L3.5 6.8A1.5 1.5 0 0 1 3.5 5z"/>
    </svg>
    <span class="font-medium">Filter</span>
  </button>

  <!-- Backdrop (คลิกนอกเพื่อปิด) -->
  <div v-if="filterOpen" class="fixed inset-0 z-40" @click="filterOpen = false"></div>

  <!-- เมนูตัวเลือก -->
  <div
    v-if="filterOpen"
    role="menu"
    class="absolute lg:right-0 mt-2 w-44 z-50
           bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-2"
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

    <!-- ตาราง -->
    <div class="mt-6">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- หัวตาราง -->
        <div class="bg-emerald-500 text-white font-bold">
          <div class="grid grid-cols-[48px_1fr_1fr_1fr_1fr_1fr] items-center">
            <div class="h-12"></div>
            <div class="h-12 flex items-center justify-center">Member ID</div>
            <div class="h-12 flex items-center justify-center">Name</div>
            <div class="h-12 flex items-center justify-center">Surname</div>
            <div class="h-12 flex items-center justify-center">Create By</div>
            <div class="h-12 flex items-center justify-center">Wage</div>
          </div>
        </div>

        <!-- ตัวตาราง -->
        <div>
          <template v-for="m in members" :key="m.id">
            <!-- แถวหลัก -->
            <div class="grid grid-cols-[48px_1fr_1fr_1fr_1fr_1fr] items-center border-b last:border-b-0">
              <!-- ปุ่มขยาย -->
              <button
                class="h-14 flex items-center justify-center hover:bg-gray-50 transition"
                @click="toggle(m.id)"
                :aria-expanded="expanded.has(m.id) ? 'true' : 'false'"
                :aria-controls="`row-details-${m.id}`"
              >
                <svg
                  class="w-5 h-5 transition-transform"
                  :class="expanded.has(m.id) ? 'rotate-90' : ''"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div class="h-14 flex items-center justify-center">{{ m.memberId }}</div>
              <div class="h-14 flex items-center justify-center">{{ m.name }}</div>
              <div class="h-14 flex items-center justify-center">{{ m.surname }}</div>
              <div class="h-14 flex items-center justify-center">{{ (m.total) }}</div>
              <div class="h-14 flex items-center justify-center">
                {{ m.paid != null ? formatNumber(m.paid) : '-' }}
              </div>
            </div>

            <!-- แถวรายละเอียด (ขยาย) -->
            <div
              v-if="expanded.has(m.id)"
              :id="`row-details-${m.id}`"
              class="px-4 py-4 bg-gray-50 border-b last:border-b-0"
            >
              <div class="text-sm text-gray-700">
                <div class="grid grid-cols-3">
                    <div><b>Citizen ID:</b> 1248877503385</div>
                    <div><b>Bank Account:</b> 0448195733</div>
                    <div><b>Mobile Phone</b> 0904817340</div>
                    <div><b>Date:</b> 02/09/2025</div>
                    <div><b>Work:</b> 8</div>
                    <div><b>OT:</b> 2</div>
                </div>
                <!-- <p class="font-semibold mb-1">Details for Member ID: {{ m.memberId }}</p>
                <ul class="list-disc ml-5 space-y-1">
                  <li>Example detail line 1</li>
                  <li>Example detail line 2</li>
                </ul> -->
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Member = {
  id: number
  memberId: string
  name: string
  surname: string
  total: string
  paid: number | null
}

const members = ref<Member[]>([
  { id: 1, memberId: '001', name: 'A', surname: 'AA', total: 'Navaphan', paid: 520 },
  { id: 2, memberId: '002', name: 'B', surname: 'BB', total:  'Navaphan', paid: 500 },
])

const expanded = ref<Set<number>>(new Set())

const toggle = (id: number) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 })


//   import { ref } from 'vue'

const filterOpen = ref(false)
const filterOptions = ['Request', 'Approve', 'Paid'] as const
type FilterType = (typeof filterOptions)[number]

const currentFilter = ref<FilterType | null>(null)

function selectFilter(opt: FilterType) {
  currentFilter.value = opt
  filterOpen.value = false
  // TODO: ใส่ logic กรองตารางของคุณตรงนี้ เช่น call API หรือกรองใน client-side
  // console.log('filter by:', opt)
}
</script>

<style scoped>
/* เติมสไตล์เฉพาะได้ตามต้องการ */
</style>
