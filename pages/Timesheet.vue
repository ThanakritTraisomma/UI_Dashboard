<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[20px]">Timesheet</h1>

    <div class="text-xl font-semibold mt-2 mb-4">List</div>

    <!-- แถวหัวข้อ + ช่วงวันที่ + ปุ่มเพิ่ม -->
    <div class="flex flex-col lg:flex-row lg:justify-end gap-3 lg:items-center">
      <div class="flex items-center gap-3 flex-wrap">
        <div class="flex justify-center items-center">
          <label for="">From:</label>
          <input type="date" class="border rounded px-2 py-1 w-33" />
        </div>
        <div class="flex justify-center items-center">
          <label for="">To:</label>
          <input type="date" class="border rounded px-2 py-1 w-33" />
        </div>

        <button
          class="inline-flex items-center justify-center w-10 h-10 rounded-xl
                 text-white bg-[#000000] ring-2 ring-[#4DB5FF]
                 shadow-sm hover:bg-[#6822e8] active:scale-[.98] transition"
          aria-label="Add"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ตาราง Card + scroll -->
    <div class="mt-4 bg-white rounded-2xl shadow-lg ring-1 ring-gray-200 overflow-hidden">
      <div class="overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <div class="min-w-[1100px] text-sm">
          <!-- หัวตาราง -->
          <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
            <div class="grid grid-cols-[48px_140px_120px_1fr_1fr_120px_120px_120px_140px] items-center h-12">
              <div></div>
              <div class="flex items-center justify-center">Date</div>
              <div class="flex items-center justify-center">Member ID</div>
              <div class="flex items-center justify-center">Name</div>
              <div class="flex items-center justify-center">Surname</div>
              <div class="flex items-center justify-center">Clock In</div>
              <div class="flex items-center justify-center">Clock Out</div>
              <div class="flex items-center justify-center">Amt (฿)</div>
              <div class="flex items-center justify-center">Status</div>
            </div>
          </div>

          <!-- ตัวตาราง -->
          <div class="whitespace-nowrap bg-white">
            <template v-for="r in rows" :key="r.id">
              <!-- แถวหลัก -->
              <div class="grid grid-cols-[48px_140px_120px_1fr_1fr_120px_120px_120px_140px] items-center border-b last:border-b-0 h-14">
                <button
                  class="flex items-center justify-center hover:bg-gray-50 transition"
                  @click="toggle(r.id)"
                  :aria-expanded="expanded.has(r.id) ? 'true' : 'false'"
                  :aria-controls="`row-details-${r.id}`"
                >
                  <svg
                    class="w-5 h-5 transition-transform"
                    :class="expanded.has(r.id) ? 'rotate-90' : ''"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div class="flex items-center justify-center">{{ r.date }}</div>
                <div class="flex items-center justify-center">{{ r.memberId }}</div>
                <div class="flex items-center justify-center">{{ r.name }}</div>
                <div class="flex items-center justify-center">{{ r.surname }}</div>
                <div class="flex items-center justify-center">{{ r.clockIn }}</div>
                <div class="flex items-center justify-center">{{ r.clockOut }}</div>
                <div class="flex items-center justify-center">{{ formatNumber(r.amount) }}</div>
                <div class="flex items-center justify-center">{{ r.status }}</div>
              </div>

              <!-- แถวรายละเอียด -->
              <div
                v-if="expanded.has(r.id)"
                :id="`row-details-${r.id}`"
                class="px-4 py-4 bg-gray-50 border-b last:border-b-0"
              >
                <div class="text-sm text-gray-700 rounded-xl ring-1 ring-gray-200 p-4 grid gap-y-3 gap-x-6 md:[grid-template-columns:1fr_1fr]">
                  <p><b>Location ID:</b> {{ r.detail.locationId }}</p>
                  <p><b>Location Name:</b> {{ r.detail.locationName }}</p>
                  <p><b>Create By:</b> {{ r.detail.createBy }}</p>
                  <p><b>Create Date:</b> {{ r.detail.createDate }}</p>
                  <p><b>Mission ID:</b> {{ r.detail.missionId }}</p>
                  <p><b>PC Off:</b> {{ r.detail.pcOff }}</p>
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

type Row = {
  id: number
  date: string
  memberId: string
  name: string
  surname: string
  clockIn: string
  clockOut: string
  amount: number
  status: 'Paid' | 'Approve' | 'Request'
  detail: {
    locationId: string
    locationName: string
    createBy: string
    createDate: string
    missionId: string
    pcOff: string
  }
}

const rows = ref<Row[]>([
  {
    id: 1,
    date: '01/09/2025',
    memberId: '001',
    name: 'A',
    surname: 'AA',
    clockIn: '8:45',
    clockOut: '18:05',
    amount: 520,
    status: 'Paid',
    detail: {
      locationId: 'CT01',
      locationName: 'Central',
      createBy: 'Navaphan',
      createDate: '05/09/2025',
      missionId: 'MI01',
      pcOff: 'Off'
    }
  },
  {
    id: 2,
    date: '03/09/2025',
    memberId: '001',
    name: 'A',
    surname: 'AA',
    clockIn: '9:03',
    clockOut: '18:39',
    amount: 520,
    status: 'Approve',
    detail: {
      locationId: 'CT01',
      locationName: 'Central',
      createBy: 'Navaphan',
      createDate: '05/09/2025',
      missionId: 'MI01',
      pcOff: 'Off'
    }
  },
  {
    id: 3,
    date: '09/09/2025',
    memberId: '001',
    name: 'A',
    surname: 'AA',
    clockIn: '10:12',
    clockOut: '20:34',
    amount: 520,
    status: 'Request',
    detail: {
      locationId: 'CT01',
      locationName: 'Central',
      createBy: 'Navaphan',
      createDate: '05/09/2025',
      missionId: 'MI01',
      pcOff: 'Off'
    }
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
/* เพิ่มสไตล์เฉพาะตามต้องการ */
</style>
