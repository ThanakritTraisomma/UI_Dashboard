<template>
  <aside
    class="hidden lg:block h-screen bg-black text-white transition-all duration-300 ease-in-out overflow-y-auto"
    :class="collapsed ? 'w-25' : 'w-64'"
  >
    <div class="flex flex-col mx-4 my-5">
      <!-- Hamburger -->
      <button
        class="flex items-center  px-3 py-2 rounded-md transition text-gray-300 hover:bg-white/5 hover:text-white"
        @click="onToggle"
        aria-label="Toggle sidebar"
      >
        <img src="/image/menu-svgrepo-com.png" alt="Menu" class="w-8 h-8" />
      </button>

      <ul class="mt-4 space-y-1">
        <li v-for="item in items" :key="item.key">
          <!-- กรณีมี children = ทำเป็นปุ่มพับ/กาง -->
          <template v-if="item.children?.length">
            <button
              class="w-full flex items-center px-3 py-2 rounded-md transition"
              :class="[
                isActiveAny(item) ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                collapsed ? 'justify-center gap-0' : 'gap-3'
              ]"
              @click="toggleSection(item.key)"
              :aria-expanded="openSections.has(item.key) ? 'true' : 'false'"
              :aria-controls="`submenu-${item.key}`"
            >
              <img :src="item.icon" :alt="item.label" class="w-7 h-7 shrink-0" />
              <span v-if="!collapsed" class="truncate ml-3 flex-1">{{ item.label }}</span>

              <!-- caret -->
              <svg
                v-if="!collapsed"
                class="w-4 h-4 transition-transform"
                :class="openSections.has(item.key) ? 'rotate-180' : ''"
                viewBox="0 0 24 24" fill="currentColor"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </button>

            <!-- Submenu -->
            <transition name="fade" mode="out-in">
              <ul
                v-if="openSections.has(item.key) && !collapsed"
                :id="`submenu-${item.key}`"
                class="pl-12 pr-2 py-1 space-y-2"
              >
                <li v-for="child in item.children" :key="child.key">
                  <NuxtLink
                    :to="child.href"
                    class="block px-2 py-1.5 rounded-md"
                    :class="isActive(child.href)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </template>

          <!-- กรณีไม่มี children = ลิงก์ปกติ -->
          <template v-else>
            <NuxtLink
              :to="item.href"
              :title="collapsed ? item.label : ''"
              class="flex items-center px-3 py-2 rounded-md transition"
              :class="[
                isActive(item.href) ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                collapsed ? 'justify-center gap-0' : 'gap-3'
              ]"
              :aria-label="item.label"
            >
              <img :src="item.icon" :alt="item.label" class="w-7 h-7 shrink-0" />
              <span v-if="!collapsed" class="truncate ml-3">{{ item.label }}</span>
            </NuxtLink>
          </template>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const route = useRoute()

type ChildItem = {
  key: string
  label: string
  href: string
}
type Item = {
  key: string
  label: string
  href?: string
  icon: string
  children?: ChildItem[]
}

const items: Item[] = [
  { key: 'dashboard', label: 'Dashboard', href: '/',          icon: '/image/home-svgrepo-com.png' },
  { key: 'timesheet', label: 'Timesheet', href: '/Timesheet', icon: '/image/calendar-week-svgrepo-com.png' },
  { key: 'member',    label: 'Member',    href: '/Member',    icon: '/image/teamwork-team-svgrepo-com (1).png' },

  // รายการที่มี Submenu: Report
  {
    key: 'report',
    label: 'Report',
    icon: '/image/report-text-svgrepo-com.png',
    children: [
      // ชื่อไฟล์หน้าใน Nuxt: pages/AdminReport.vue และ pages/UserReport.vue
      { key: 'admin-report', label: 'Admin Report', href: '/AdminReport' },
      { key: 'user-report',  label: 'User Report',  href: '/UserReport'  },
    ]
  },

  { key: 'admin',   label: 'Admin',     icon: '/image/admin-with-cogwheels-svgrepo-com.png' ,  children: [
            { key: 'Approve', label: 'Approve', href: '/Approve' },
            { key: 'Paid', label: 'Paid', href: '/Paid' },
        ]},
  { key: 'setting', label: 'Setting', icon: '/image/setting-5-svgrepo-com.png',
        children: [
            { key: 'User', label: 'User', href: '/UsersSetting' },
            { key: 'Member', label: 'Member', href: '/MemberSetting' },
            { key: 'Location', label: 'Location', href: '/LocationSetting' },
            { key: 'Mission', label: 'Mission', href: '/MissionSetting' },
        
        ]
   },
]

// ย่อ/ขยาย sidebar ทั้งแถบ
const collapsed = ref(false)
const onToggle = () => { collapsed.value = !collapsed.value }

// ชุดคีย์ของ section ที่ถูกกางอยู่
const openSections = ref<Set<string>>(new Set())

const toggleSection = (key: string) => {
  const s = new Set(openSections.value)
  s.has(key) ? s.delete(key) : s.add(key)
  openSections.value = s
}

const isActive = (href?: string) => {
  if (!href) return false
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

// ใช้เช็คว่า parent ควร active ไหม (ถ้ามีลูก active)
const isActiveAny = (parent: Item) => {
  if (parent.children?.length) {
    return parent.children.some(c => isActive(c.href))
  }
  return isActive(parent.href)
}

// เปิด submenu “Report” อัตโนมัติถ้าอยู่ในหน้าลูก
onMounted(() => {
  const report = items.find(i => i.key === 'report')
  if (report?.children?.some(c => isActive(c.href))) {
    openSections.value.add('report')
  }
})
</script>

<style scoped>
/* ทรานซิชันนุ่ม ๆ ตอนเปิด/ปิด submenu */
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
