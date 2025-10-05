<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[40px]">Setting &gt; Location</h1>
    <div class="text-xl font-semibold mt-2 mb-4">List</div>

    <!-- ปุ่มมุมขวา -->
    <div class="flex justify-end gap-3 mb-3">
      <button class="w-10 h-10 rounded-xl bg-[#1E3AF6] text-white grid place-items-center shadow ring-2 ring-[#86A3FF]" title="Add" aria-label="Add">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z"/></svg>
      </button>
      <button class="w-10 h-10 rounded-xl bg-[#9CE11B] text-black grid place-items-center shadow ring-2 ring-[#D8F98E]" title="Edit" aria-label="Edit">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.002 1.002 0 000-1.42L18.37 3.29a1.002 1.002 0 00-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.83z"/></svg>
      </button>
      <button class="w-10 h-10 rounded-xl bg-[#FF2D2D] text-white grid place-items-center shadow ring-2 ring-[#FF9E9E]" title="Delete" aria-label="Delete">
        <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M9 3h6l1 1h4v2H4V4h4l1-1zM6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3 3v8h2v-8H9zm6 0v8h-2v-8h2z"/></svg>
      </button>
    </div>

    <!-- ตาราง (เลื่อนแนวนอนได้บนมือถือ) -->
    <div class="-mx-2 lg:mx-0">
      <div class="overflow-x-auto [ -webkit-overflow-scrolling:touch ]">
        <div class="min-w-[920px]">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- หัวตาราง -->
            <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
              <div
                class="grid items-center
                       [grid-template-columns:48px_160px_1fr_200px_120px]"
              >
                <div class="h-12"></div>
                <div class="h-12 flex items-center justify-center">Location ID</div>
                <div class="h-12 flex items-center justify-center">Location Name</div>
                <div class="h-12 flex items-center justify-center">Tel.</div>
                <div class="h-12 flex items-center justify-center">Active</div>
              </div>
            </div>

            <!-- ตัวตาราง -->
            <div class="whitespace-nowrap">
              <template v-for="loc in locations" :key="loc.id">
                <!-- แถวหลัก -->
                <div
                  class="grid items-center border-b last:border-b-0
                         [grid-template-columns:48px_160px_1fr_200px_120px]"
                >
                  <!-- ปุ่มพับ/กาง -->
                  <button
                    class="h-14 flex items-center justify-center hover:bg-gray-50 transition"
                    @click="toggle(loc.id)"
                    :aria-expanded="expanded.has(loc.id) ? 'true' : 'false'"
                    :aria-controls="`row-details-${loc.id}`"
                  >
                    <svg class="w-5 h-5 transition-transform"
                         :class="expanded.has(loc.id) ? '' : '-rotate-90'"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>

                  <div class="h-14 flex items-center justify-center px-4">{{ loc.locationId }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ loc.locationName }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ loc.tel }}</div>

                  <!-- Active (ไอคอน checkbox) -->
                  <div class="h-14 flex items-center justify-center px-4">
                    <button
                      class="hover:bg-gray-50 p-1 rounded-md"
                      @click="loc.active = !loc.active"
                      :title="loc.active ? 'Active' : 'Inactive'"
                    >
                      <svg v-if="loc.active" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M7 12l3 3 7-7" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- รายละเอียด -->
                <div v-if="expanded.has(loc.id)" :id="`row-details-${loc.id}`" class="px-4 py-4">
                  <div class="bg-white rounded-xl shadow-md ring-1 ring-black/5 px-4 py-4 space-y-3">
                    <!-- แถว 1: Lat/Lng -->
                    <div class="grid gap-x-8 md:[grid-template-columns:1fr_1fr]">
                      <p><span class="font-semibold">Latitude:</span> {{ loc.detail.lat }}</p>
                      <p><span class="font-semibold">Longitude:</span> {{ loc.detail.lng }}</p>
                    </div>
                    <!-- แถว 2: Work/Break -->
                    <div class="grid gap-x-8 md:[grid-template-columns:1fr_1fr]">
                      <p><span class="font-semibold">Work Time:</span> {{ loc.detail.workHours }} Hour</p>
                      <p><span class="font-semibold">Break Time:</span> {{ loc.detail.breakHours }} Hour</p>
                    </div>

                    <!-- ตารางเวลาเปิดปิดรายวัน -->
                    <div class="grid gap-y-2 md:[grid-template-columns:1fr_1fr]">
                      <template v-for="(d, i) in loc.detail.schedule" :key="i">
                        <div class="flex items-baseline gap-4">
                          <span class="font-semibold w-28">{{ d.day }}</span>
                          <span class="font-semibold">Open:</span>
                          <span>{{ d.open }}</span>
                        </div>
                        <div class="flex items-baseline gap-4">
                          <span class="invisible w-28 md:invisible">placeholder</span>
                          <span class="font-semibold">Close:</span>
                          <span>{{ d.close }}</span>
                        </div>
                      </template>
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

type DaySchedule = { day: string; open: string; close: string }
type LocationDetail = {
  lat: string
  lng: string
  workHours: number
  breakHours: number
  schedule: DaySchedule[]
}
type LocationRow = {
  id: number
  locationId: string
  locationName: string
  tel: string
  active: boolean
  detail: LocationDetail
}

const sched1: DaySchedule[] = [
  { day: 'Monday',    open: '10:00', close: '21:00' },
  { day: 'Tuesday',   open: '10:00', close: '21:00' },
  { day: 'Wednesday', open: '10:00', close: '21:00' },
  { day: 'Thursday',  open: '10:00', close: '21:00' },
  { day: 'Friday',    open: '10:00', close: '21:00' },
  { day: 'Saturday',  open: '09:00', close: '22:00' },
  { day: 'Sunday',    open: '09:00', close: '22:00' }
]

const locations = ref<LocationRow[]>([
  {
    id: 1,
    locationId: 'CT01',
    locationName: 'Central',
    tel: '020255548',
    active: true,
    detail: {
      lat: '1.21564846',
      lng: '-5.11554887',
      workHours: 8,
      breakHours: 1.5,
      schedule: sched1
    }
  },
  {
    id: 2,
    locationId: 'CT02',
    locationName: 'Central Chiang Mai',
    tel: '020132158',
    active: true,
    detail: {
      lat: '18.7883',
      lng: '98.9853',
      workHours: 8,
      breakHours: 1.5,
      schedule: sched1
    }
  }
])

const expanded = ref<Set<number>>(new Set()) // กางแถวแรกไว้เหมือนภาพ
const toggle = (id: number) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}
</script>

<style scoped>
/* ปรับแต่งเพิ่มได้ตามต้องการ */
</style>
