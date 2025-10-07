<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[20px]">Paid</h1>

    <!-- ตัวกรอง -->
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
      </div>
    </div>

    <!-- ตาราง Card + scroll -->
    <div class="mt-4 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 overflow-hidden">
      <div class="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div class="min-w-[980px] text-sm">
          <!-- หัวตาราง -->
          <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
            <div class="grid grid-cols-[48px_140px_1fr_1fr_220px_160px_160px] items-center h-12">
              <div></div> <!-- ปุ่มขยาย -->
              <div class="flex items-center justify-center px-4">Member ID</div>
              <div class="flex items-center justify-center px-4">Name</div>
              <div class="flex items-center justify-center px-4">Surname</div>
              <div class="flex items-center justify-center px-4">Bank Account</div>
              <div class="flex items-center justify-center px-4">Total Amount</div>
              <div class="flex items-center justify-center px-4">Paid</div>
            </div>
          </div>

          <!-- แถวข้อมูล -->
          <div class="whitespace-nowrap bg-white">
            <template v-for="m in members" :key="m.id">
              <div class="grid grid-cols-[48px_140px_1fr_1fr_220px_160px_160px] items-center border-b last:border-b-0 h-14">
                <!-- ปุ่มขยาย -->
                <button
                  class="flex items-center justify-center h-14"
                  @click="toggle(m.id)"
                  :aria-expanded="expanded.has(m.id) ? 'true' : 'false'"
                  :aria-controls="`row-details-${m.id}`"
                >
                  <svg
                    class="w-5 h-5 transition-transform"
                    :class="expanded.has(m.id) ? '' : '-rotate-90'"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div class="flex items-center justify-center px-4">{{ m.memberId }}</div>
                <div class="flex items-center justify-center px-4">{{ m.name }}</div>
                <div class="flex items-center justify-center px-4">{{ m.surname }}</div>
                <div class="flex items-center justify-center px-4">{{ m.bankAccount }}</div>
                <div class="flex items-center justify-center px-4">{{ formatNumber(m.totalAmount) }}</div>
                <div class="flex items-center justify-center px-4">{{ m.paidSummary }}</div>
              </div>

              <!-- รายละเอียด (Card) -->
              <div v-if="expanded.has(m.id)" :id="`row-details-${m.id}`" class="px-4 py-4">
                <div class="bg-gray-50 rounded-xl shadow-inner ring-1 ring-gray-200 px-4 py-4 space-y-3">
                  <div v-for="(d, idx) in m.details" :key="idx" class="grid gap-y-2 gap-x-6 md:[grid-template-columns:1fr_1fr_1fr_auto]">
                    <p><span class="font-semibold">Date:</span> {{ d.date }}</p>
                    <p><span class="font-semibold">Create By:</span> {{ d.createBy }}</p>
                    <p><span class="font-semibold">Wage:</span> {{ formatNumber(d.wage) }}</p>
                    <label class="inline-flex items-center gap-2">
                      <span class="font-semibold">Paid:</span>
                      <input type="checkbox" class="w-5 h-5 accent-emerald-500" v-model="d.paid" />
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

const expanded = ref<Set<number>>(new Set())
const toggle = (id: number) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 })
</script>

<style scoped>
</style>
