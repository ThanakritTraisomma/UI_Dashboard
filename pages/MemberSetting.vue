<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[40px]">Setting &gt; Member</h1>
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
        <div class="min-w-[980px]">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <!-- หัวตาราง -->
            <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
              <div
                class="grid items-center
                       [grid-template-columns:48px_140px_1fr_1fr_160px_120px]"
              >
                <div class="h-12"></div>
                <div class="h-12 flex items-center justify-center">Member ID</div>
                <div class="h-12 flex items-center justify-center">Name</div>
                <div class="h-12 flex items-center justify-center">Surname</div>
                <div class="h-12 flex items-center justify-center">Sale</div>
                <div class="h-12 flex items-center justify-center">Active</div>
              </div>
            </div>

            <!-- แถวข้อมูล -->
            <div class="whitespace-nowrap">
              <template v-for="m in members" :key="m.id">
                <div
                  class="grid items-center border-b last:border-b-0
                         [grid-template-columns:48px_140px_1fr_1fr_160px_120px]"
                >
                  <!-- ปุ่มพับ/กาง -->
                  <button
                    class="h-14 flex items-center justify-center hover:bg-gray-50 transition"
                    @click="toggle(m.id)"
                    :aria-expanded="expanded.has(m.id) ? 'true' : 'false'"
                    :aria-controls="`row-details-${m.id}`"
                  >
                    <svg class="w-5 h-5 transition-transform"
                         :class="expanded.has(m.id) ? '' : '-rotate-90'"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>

                  <div class="h-14 flex items-center justify-center px-4">{{ m.memberId }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.name }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ m.surname }}</div>
                  <div class="h-14 flex items-center justify-center px-4">{{ formatNumber(m.sale) }}</div>

                  <!-- Active: checkbox ไอคอน -->
                  <div class="h-14 flex items-center justify-center px-4">
                    <button
                      class="hover:bg-gray-50 p-1 rounded-md"
                      @click="m.active = !m.active"
                      :title="m.active ? 'Active' : 'Inactive'"
                    >
                      <svg v-if="m.active" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M7 12l3 3 7-7" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- รายละเอียด (การ์ด 3 คอลัมน์ตามภาพ) -->
                <div v-if="expanded.has(m.id)" :id="`row-details-${m.id}`" class="px-4 py-4">
                  <div
                    class="bg-white rounded-xl shadow-md ring-1 ring-black/5 px-4 py-4
                           grid gap-y-3 gap-x-8 md:[grid-template-columns:1fr_1fr_1fr]"
                  >
                    <p><span class="font-semibold">Citizen ID:</span> {{ m.detail.citizenId }}</p>
                    <p><span class="font-semibold">Mobile Phone:</span> {{ m.detail.mobile }}</p>
                    <p><span class="font-semibold">Nickname:</span> {{ m.detail.nickname }}</p>

                    <p><span class="font-semibold">Address:</span> {{ m.detail.address }}</p>
                    <p><span class="font-semibold">Province:</span> {{ m.detail.province }}</p>
                    <p><span class="font-semibold">Postal Code:</span> {{ m.detail.postalCode }}</p>

                    <p><span class="font-semibold">Location ID:</span> {{ m.detail.locationId1 }}</p>
                    <p><span class="font-semibold">Location Name:</span> {{ m.detail.locationName1 }}</p>
                    <div></div>

                    <p><span class="font-semibold">Location ID:</span> {{ m.detail.locationId2 }}</p>
                    <p><span class="font-semibold">Location Name:</span> {{ m.detail.locationName2 }}</p>
                    <div></div>
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

type MemberDetail = {
  citizenId: string
  mobile: string
  nickname: string
  address: string
  province: string
  postalCode: string
  locationId1: string
  locationName1: string
  locationId2: string
  locationName2: string
}
type MemberRow = {
  id: number
  memberId: string
  name: string
  surname: string
  sale: number
  active: boolean
  detail: MemberDetail
}

const members = ref<MemberRow[]>([
  {
    id: 1,
    memberId: '001',
    name: 'A',
    surname: 'AA',
    sale: 2793,
    active: true,
    detail: {
      citizenId: '12400778959930',
      mobile: '0998370447',
      nickname: 'A',
      address: '123 Street',
      province: 'Bangkok',
      postalCode: '20023',
      locationId1: 'CT01',
      locationName1: 'Central',
      locationId2: 'CT02',
      locationName2: 'Central Chiang Mai'
    }
  },
  {
    id: 2,
    memberId: '002',
    name: 'B',
    surname: 'BB',
    sale: 2125,
    active: true,
    detail: {
      citizenId: 'XXXXXXXXXXXXX',
      mobile: '0811111111',
      nickname: 'B',
      address: '456 Street',
      province: 'Bangkok',
      postalCode: '10000',
      locationId1: 'CT03',
      locationName1: 'Somewhere',
      locationId2: 'CT04',
      locationName2: 'Anywhere'
    }
  },

])

const expanded = ref<Set<number>>(new Set()) // กางแถวแรกไว้เหมือนภาพ
const toggle = (id: number) => {
  const s = new Set(expanded.value)
  s.has(id) ? s.delete(id) : s.add(id)
  expanded.value = s
}

const formatNumber = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 })
</script>

<style scoped>
/* ปรับเพิ่มได้ตามต้องการ */
</style>
