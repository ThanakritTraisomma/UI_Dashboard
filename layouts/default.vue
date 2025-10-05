<template>
  <div>
    <div class="flex">
      <Sidebar />
      <div class="w-full">
        <Header />
        <slot />
      </div>
    </div>

  </div>


</template>
<script>
export default{
  name: 'DefaultLayout',
}
</script>
