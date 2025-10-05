<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[40px]">Paid</h1>

    <!-- ตัวกรอง (คงของเดิมไว้ได้) -->
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

        <!-- ปุ่ม Filter -->
        <!-- <div class="relative z-10">
          <button
            @click="filterOpen = !filterOpen"
            :aria-expanded="filterOpen ? 'true' : 'false'"
            aria-haspopup="menu"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl
                   text-white bg-[#7A2AF7] ring-2 ring-[#4DB5FF]
                   shadow-sm hover:bg-[#6822e8] active:scale-[.98] transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.5 5a1.5 1.5 0 0 1 1.2-.6h14.6a1.5 1.5 0 0 1 1.2 2.4l-6.3 7.9v3.6a1.5 1.5 0 0 1-2.2 1.3l-3-1.7a1.5 1.5 0 0 1-.8-1.3v-1.9L3.5 6.8A1.5 1.5 0 0 1 3.5 5z"/>
            </svg>
            <span class="font-medium">Filter</span>
          </button>

          <div v-if="filterOpen" class="fixed inset-0 z-40" @click="filterOpen = false"></div>
          <div
            v-if="filterOpen"
            role="menu"
            class="absolute right-0 mt-2 w-44 z-50 bg-white rounded-xl shadow-xl ring-1 ring-black/5 py-2"
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
        </div> -->
      </div>
    </div>

    <!-- ตาราง (สกรอลล์แนวนอนได้บนมือถือ) -->
    <div class="mt-6 -mx-2 lg:mx-0">
      <div class="overflow-x-auto [ -webkit-overflow-scrolling:touch ]">
        <div class="min-w-[1100px]">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- หัวตาราง -->
            <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
              <div
                class="grid items-center
                       [grid-template-columns:48px_140px_1fr_1fr_220px_160px_160px]"
              >
                <div class="h-12"></div>
                <div class="h-12 flex items-center justify-center">Member ID</div>
                <div class="h-12 flex items-center justify-center">Name</div>
                <div class="h-12 flex items-center justify-center">Surname</div>
                <div class="h-12 flex items-center justify-center">Bank Account</div>
                <div class="h-12 flex items-center justify-center">Total Amount</div>
                <div class="h-12 flex items-center justify-center">Paid</div>
              </div>
            </div>

            <!-- แถวข้อมูล -->
            <div class="whitespace-nowrap">
              <template v-for="m in members" :key="m.id">
                <div
                  class="grid items-center border-b last:border-b-0
                         [grid-template-columns:48px_140px_1fr_1fr_220px_160px_160px]"
                >
                  <!-- ปุ่มขยาย -->
                  <button
                    class="h-14 flex items-center justify-center hover:bg-gray-50 transition"
                    @click="toggle(m.id)"
                    :aria-expanded="expanded.has(m.id) ? 'true' : 'false'"
                    :aria-controls="`row-details-${m.id}`"
                  >
                    <!-- เปิด = ลูกศรลง / ปิด = ลูกศรขวา -->
                    <svg
                      class="w-5 h-5 transition-transform"
                      :class="expanded.has(m.id) ? '' : '-rotate-90'"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  <div class="h-14 flex items-center justify-center px-4">{{ m.memberId }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.name }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.surname }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.bankAccount }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ formatNumber(m.totalAmount) }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.paidSummary }}</div>
                </div>

                <!-- รายละเอียด (การ์ด) -->
                <div
                  v-if="expanded.has(m.id)"
                  :id="`row-details-${m.id}`"
                  class="px-4 py-4"
                >
                  <div class="bg-white rounded-xl shadow-md ring-1 ring-black/5 px-4 py-4 space-y-3">
                    <div
                      v-for="(d, idx) in m.details"
                      :key="idx"
                      class="grid gap-y-2 gap-x-6 md:[grid-template-columns:1fr_1fr_1fr_auto]"
                    >
                      <p><span class="font-semibold">Date:</span> {{ d.date }}</p>
                      <p><span class="font-semibold">Create By:</span> {{ d.createBy }}</p>
                      <p><span class="font-semibold">Wage:</span> {{ formatNumber(d.wage) }}</p>

                      <label class="inline-flex items-center gap-2">
                        <span class="font-semibold">Paid:</span>
                        <input
                          type="checkbox"
                          class="w-5 h-5 accent-emerald-500"
                          v-model="d.paid"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Detail = {
  date: string
  createBy: string
  wage: number
  paid: boolean
}
type MemberRow = {
  id: number
  memberId: string
  name: string
  surname: string
  bankAccount: string
  totalAmount: number
  paidSummary: 'No Paid' | 'Partial Paid' | 'Paid All'
  details: Detail[]
}

const members = ref<MemberRow[]>([
  {
    id: 1,
    memberId: '001',
    name: 'A',
    surname: 'AA',
    bankAccount: '4002513699',
    totalAmount: 1500,
    paidSummary: 'No Paid',
    details: [
      { date: '09/09/2025', createBy: 'Navaphan', wage: 500, paid: false },
      { date: '15/09/2025', createBy: 'Navaphan', wage: 500, paid: false },
      { date: '25/09/2025', createBy: 'Navaphan', wage: 500, paid: false },
    ]
  },
  {
    id: 2,
    memberId: '002',
    name: 'B',
    surname: 'BB',
    bankAccount: '531587550',
    totalAmount: 1500,
    paidSummary: 'Partial Paid',
    details: [
      { date: '02/09/2025', createBy: 'Noyjinda', wage: 500, paid: true  },
      { date: '03/09/2025', createBy: 'Noyjinda', wage: 500, paid: true  },
      { date: '14/09/2025', createBy: 'Noyjinda', wage: 500, paid: false },
    ]
  }
])

const expanded = ref<Set<number>>(new Set([1])) // ให้แถวแรกกางไว้เหมือนภาพ
const toggle = (id: number) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 })

/* Filter demo (ยังไม่ได้ต่อกับข้อมูลจริง) */
const filterOpen = ref(false)
const filterOptions = ['All', 'No Paid', 'Partial Paid', 'Paid All'] as const
type FilterType = (typeof filterOptions)[number]
const currentFilter = ref<FilterType | null>(null)
function selectFilter(opt: FilterType) {
  currentFilter.value = opt
  filterOpen.value = false
}
</script>

<style scoped>
/* เพิ่ม/ปรับได้ตามต้องการ */
</style>
