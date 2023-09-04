<template>
<div id="modal" class="fixed inset-0 flex items-center justify-center z-50">
  <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
    <div class="modal-content py-4 text-left px-6">
      <!-- Modal content goes here -->
      <slot>

      </slot>
    </div>
  </div>
</div>
    
</template>