<template>
  <div class="container lg:mx-auto px-2 py-5 lg:px-5 lg:py-5">
    <h1 class="text-[20px]">Setting &gt; Mission</h1>

    <div class="text-xl font-semibold mt-2 mb-4">List</div>

    <!-- Action buttons (right) -->
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

    <!-- Table (scrollable on mobile) -->
    <div class="-mx-2 lg:mx-0">
      <div class="overflow-x-auto [ -webkit-overflow-scrolling:touch ]">
        <div class="min-w-[800px]">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden text-sm">
            <!-- Header -->
            <div class="bg-emerald-500 text-white font-bold whitespace-nowrap">
              <div
                class="grid items-center
                       [grid-template-columns:1fr_2fr_140px]"
              >
                <div class="h-12 flex items-center px-6">Mission ID</div>
                <div class="h-12 flex items-center px-6">Mission Description</div>
                <div class="h-12 flex items-center justify-center px-4">Active</div>
              </div>
            </div>

            <!-- Rows -->
            <div class="whitespace-nowrap">
              <template v-for="m in missions" :key="m.id">
                <div
                  class="grid items-center border-b last:border-b-0
                         [grid-template-columns:1fr_2fr_140px]"
                >
                  <div class="h-14 flex items-center px-6">{{ m.missionId }}</div>
                  <div class="h-14 flex items-center px-6">{{ m.description }}</div>

                  <!-- Active checkbox icon -->
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

type MissionRow = {
  id: number
  missionId: string
  description: string
  active: boolean
}

const missions = ref<MissionRow[]>([
  { id: 1, missionId: 'MI01', description: 'Mission Description', active: true },
  { id: 2, missionId: 'MI02', description: 'Mission Description', active: true }
])
</script>

<style scoped>
/* ปรับแต่งเพิ่มเติมได้ตามต้องการ */
</style>
