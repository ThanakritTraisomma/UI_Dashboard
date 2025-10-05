<template>
  <div class="bg-gray-200 w-full h-15 flex justify-between lg:justify-end items-center px-5">
    <!-- ปุ่มรูป (มือถือเท่านั้น) -->
    <img src="/image/qq.png" alt="Menu"
      class="w-8 h-8 block lg:hidden cursor-pointer"
      @click="toggleMenu"
      :aria-expanded="showMenu ? 'true' : 'false'"
      aria-controls="mobile-drawer"
      aria-label="Toggle menu" />

    <!-- Backdrop -->
    <div v-if="showMenu" class="fixed inset-0 bg-black/40 z-40" @click="closeMenu"></div>

    <!-- Drawer -->
    <div id="mobile-drawer"
      class="fixed top-0 left-0 h-full w-80 bg-black text-white z-50 transition-transform duration-500 will-change-transform overflow-y-auto"
      :class="showMenu ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'"
      @click.stop>
      
      <div class="flex items-center justify-between p-4 border-b">
        <h2 class="text-lg font-semibold">Menu</h2>
        <button class="p-2 rounded hover:bg-gray-100" @click="closeMenu" aria-label="Close menu">✕</button>
      </div>

      <!-- รายการเมนู -->
      <nav class="p-2">
        <ul class="space-y-1">
          <li v-for="item in items" :key="item.key">
            <!-- มี children = ปุ่มพับ/กาง -->
            <template v-if="item.children?.length">
              <button class="w-full flex items-center justify-between px-3 py-2 rounded hover:bg-gray-100"
                @click="toggleSection(item.key)"
                :aria-expanded="openSections.has(item.key) ? 'true' : 'false'"
                :aria-controls="`submenu-${item.key}`">
                <span class="flex items-center gap-2">
                  <img :src="item.icon" :alt="item.label" class="w-5 h-5" />
                  <span class="font-medium">{{ item.label }}</span>
                </span>
                <svg class="w-4 h-4 transition-transform"
                  :class="openSections.has(item.key) ? 'rotate-180' : ''"
                  viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </button>

              <transition name="fade">
                <ul v-if="openSections.has(item.key)" :id="`submenu-${item.key}`"
                  class="pl-9 pr-2 py-2 space-y-1">
                  <li v-for="child in item.children" :key="child.key">
                    <NuxtLink :to="child.href"
                      class="block px-2 py-2 rounded hover:bg-gray-100"
                      @click="closeMenu">
                      {{ child.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </transition>
            </template>

            <!-- ไม่มี children = ลิงก์ปกติ -->
            <template v-else>
              <NuxtLink :to="item.href"
                class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                @click="closeMenu">
                <img :src="item.icon" :alt="item.label" class="w-5 h-5" />
                <span class="font-medium">{{ item.label }}</span>
              </NuxtLink>
            </template>
          </li>
        </ul>
      </nav>
    </div>

    <span>Logout</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
const route = useRoute()

const showMenu = ref(false)
const openSections = ref<Set<string>>(new Set())

const toggleMenu = () => { showMenu.value = !showMenu.value }
const closeMenu = () => { showMenu.value = false }

// ปิดเมนูด้วยปุ่ม Esc
const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const toggleSection = (key: string) => {
  const s = new Set(openSections.value)
  s.has(key) ? s.delete(key) : s.add(key)
  openSections.value = s
}

/** เมนู + Submenu (ตัวอย่าง: Report มี AdminReport & UserReport) */
type Child = { key: string; label: string; href: string }
type Item = { key: string; label: string; href?: string; icon: string; children?: Child[] }

const items: Item[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/', icon: '/image/home-svgrepo-com.png' },
  { key: 'timesheet', label: 'Timesheet', href: '/Timesheet', icon: '/image/calendar-week-svgrepo-com.png' },
  { key: 'member', label: 'Member', href: '/Member', icon: '/image/teamwork-team-svgrepo-com (1).png' },

  {
    key: 'report',
    label: 'Report',
    icon: '/image/report-text-svgrepo-com.png',
    children: [
      { key: 'admin-report', label: 'Admin Report', href: '/AdminReport' },
      { key: 'user-report', label: 'User Report', href: '/UserReport' },
    ]
  },

  {
    key: 'admin', label: 'Admin', icon: '/image/admin-with-cogwheels-svgrepo-com.png', children: [
      { key: 'Approve', label: 'Approve', href: '/Approve' },
      { key: 'Paid', label: 'Paid', href: '/Paid' },
    ]
  },
  {
    key: 'setting', label: 'Setting', icon: '/image/setting-5-svgrepo-com.png',
     children: [
      { key: 'User', label: 'User', href: '/UsersSetting' },
      { key: 'Member', label: 'Member', href: '/MemberSetting' },
      { key: 'Location', label: 'Location', href: '/LocationSetting' },
      { key: 'Mission', label: 'Mission', href: '/MissionSetting' },
    ]
  },
]

// เปิด submenu Report อัตโนมัติ ถ้าอยู่หน้า /AdminReport หรือ /UserReport
onMounted(() => {
  if (['/AdminReport', '/UserReport'].some(p => route.path.startsWith(p))) {
    openSections.value.add('report')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
